"use client";

import { useState, useEffect } from "react";
import { clockIn, clockOut, logoutTimeclock, getRecentTimesheets } from "@/app/actions/timeclock";
import { LogOut, Clock, CalendarDays, History, Play, Square, Loader2, ChevronLeft, Settings } from "lucide-react";
import { format, differenceInSeconds } from "date-fns";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function TimeclockApp({ employees, initialShiftMap }: { employees: any[], initialShiftMap: Record<string, any> }) {
    const router = useRouter();
    const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);
    const [shifts, setShifts] = useState(initialShiftMap);
    const [view, setView] = useState<"action" | "timesheets">("action");
    const [loading, setLoading] = useState(false);
    const [recentLogs, setRecentLogs] = useState<any[]>([]);

    // Timer state for active shift
    const [activeSeconds, setActiveSeconds] = useState(0);

    // Update timer every second if clocked in
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (selectedEmployee && shifts[selectedEmployee.id]) {
            const shift = shifts[selectedEmployee.id];
            const start = new Date(shift.clock_in);

            setActiveSeconds(differenceInSeconds(new Date(), start));
            interval = setInterval(() => {
                setActiveSeconds(differenceInSeconds(new Date(), start));
            }, 1000);
        } else {
            setActiveSeconds(0);
        }
        return () => clearInterval(interval);
    }, [selectedEmployee, shifts]);

    // Fetch timesheets when switching to that view
    useEffect(() => {
        if (selectedEmployee && view === "timesheets") {
            getRecentTimesheets(selectedEmployee.id).then(setRecentLogs);
        }
    }, [selectedEmployee, view]);

    const formatDuration = (totalSeconds: number) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleClockIn = async () => {
        if (!selectedEmployee) return;
        setLoading(true);
        try {
            const newShift = await clockIn(selectedEmployee.id);
            setShifts({ ...shifts, [selectedEmployee.id]: newShift });
        } catch (error) {
            console.error(error);
            alert("Failed to clock in");
        }
        setLoading(false);
    };

    const handleClockOut = async () => {
        if (!selectedEmployee || !shifts[selectedEmployee.id]) return;
        setLoading(true);
        try {
            await clockOut(shifts[selectedEmployee.id].id);
            const newShifts = { ...shifts };
            delete newShifts[selectedEmployee.id]; // Remove active shift
            setShifts(newShifts);
            // Auto switch to timesheets after clock out for confirmation
            setView("timesheets");
        } catch (error) {
            console.error(error);
            alert("Failed to clock out");
        }
        setLoading(false);
    };

    // Screen 1: Employee Selection (Roster)
    if (!selectedEmployee) {
        return (
            <div className="max-w-4xl mx-auto p-6 pt-12 pb-24">
                <div className="flex flex-wrap justify-between items-end gap-4 mb-12">
                    <div>
                        <h1 className="font-bebas text-5xl text-concrete tracking-wide">CREW <span className="text-safety-amber">ROSTER</span></h1>
                        <p className="font-mono text-concrete/50 text-xs uppercase tracking-widest mt-2">{format(new Date(), "EEEE, MMMM do, yyyy")}</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/timeclock/admin" className="text-concrete/40 hover:text-safety-amber transition-colors flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
                            <Settings className="w-4 h-4" /> Admin
                        </Link>
                        <button onClick={() => logoutTimeclock()} className="text-red-400/50 hover:text-red-400 transition-colors flex items-center gap-2 font-mono text-xs uppercase tracking-widest">
                            <LogOut className="w-4 h-4" /> Exit
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {employees.map(emp => {
                        const isClockedIn = !!shifts[emp.id];
                        return (
                            <button
                                key={emp.id}
                                onClick={() => setSelectedEmployee(emp)}
                                className={`text-left p-6 rounded-[2rem] border transition-all duration-300 relative overflow-hidden ${isClockedIn
                                    ? "bg-industrial border-safety-amber/30 hover:border-safety-amber ring-1 ring-safety-amber/20 shadow-[0_0_30px_rgba(255,149,0,0.1)]"
                                    : "bg-industrial border-white/5 hover:bg-white/5"
                                    }`}
                            >
                                <div className="font-heading font-bold text-xl text-concrete uppercase tracking-wide truncate">{emp.first_name}</div>
                                <div className="font-sans text-emerald-500 text-sm opacity-80 mt-1">{emp.last_name}</div>

                                {isClockedIn && (
                                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-safety-amber animate-pulse shadow-[0_0_10px_#FF9500]" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Screen 2: Action / Timesheets Loop
    const isClockedIn = !!shifts[selectedEmployee.id];

    return (
        <div className="max-w-md mx-auto p-6 pt-12 h-screen flex flex-col">
            <button
                onClick={() => { setSelectedEmployee(null); setView("action"); }}
                className="text-concrete/50 hover:text-white transition-colors flex items-center gap-2 font-mono text-xs uppercase tracking-widest mb-10"
            >
                <ChevronLeft className="w-4 h-4" /> Back to Roster
            </button>

            <div className="text-center mb-10">
                <h2 className="font-bebas text-5xl text-concrete tracking-wide">{selectedEmployee.first_name} <span className="text-safety-amber">{selectedEmployee.last_name}</span></h2>
                <div className="inline-flex mt-4 items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-industrial text-concrete/80 font-mono text-xs font-bold uppercase tracking-widest">
                    {isClockedIn ? (
                        <><span className="w-2 h-2 rounded-full bg-safety-amber animate-pulse" /> CLOCKED IN</>
                    ) : (
                        <><span className="w-2 h-2 rounded-full bg-concrete/20" /> CLOCKED OUT</>
                    )}
                </div>
            </div>

            {/* TABS */}
            <div className="flex bg-industrial p-1 rounded-xl mb-8">
                <button
                    onClick={() => setView("action")}
                    className={`flex-1 py-3 rounded-lg font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${view === "action" ? "bg-white/10 text-white" : "text-concrete/40 hover:text-white/80"}`}
                >
                    <Clock className="w-4 h-4" /> Status
                </button>
                <button
                    onClick={() => setView("timesheets")}
                    className={`flex-1 py-3 rounded-lg font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${view === "timesheets" ? "bg-white/10 text-white" : "text-concrete/40 hover:text-white/80"}`}
                >
                    <History className="w-4 h-4" /> Timesheets
                </button>
            </div>

            {/* ACTION VIEW */}
            {view === "action" && (
                <div className="flex-1 flex flex-col items-center justify-center">
                    {isClockedIn ? (
                        <>
                            <div className="text-center mb-12">
                                <p className="font-mono text-concrete/40 text-sm uppercase tracking-widest mb-2">Current Shift Duration</p>
                                <p className="font-mono text-[4rem] font-bold text-safety-amber leading-none tracking-tight tabular-nums">
                                    {formatDuration(activeSeconds)}
                                </p>
                                <p className="font-sans text-concrete/60 mt-4 text-sm">
                                    Started at {format(new Date(shifts[selectedEmployee.id].clock_in), "h:mm a")}
                                </p>
                            </div>

                            <button
                                onClick={handleClockOut}
                                disabled={loading}
                                className="w-full h-24 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-500 rounded-[2rem] flex items-center justify-center gap-4 font-heading font-bold text-3xl uppercase tracking-wider transition-all disabled:opacity-50"
                            >
                                {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : <><Square className="w-8 h-8 fill-current" /> CLOCK OUT</>}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleClockIn}
                            disabled={loading}
                            className="w-full h-48 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 rounded-[3rem] flex flex-col items-center justify-center gap-4 font-heading font-bold text-4xl uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-[0_0_50px_rgba(16,185,129,0.1)]"
                        >
                            {loading ? <Loader2 className="w-12 h-12 animate-spin" /> : <><Play className="w-12 h-12 fill-current" /> CLOCK IN</>}
                        </button>
                    )}
                </div>
            )}

            {/* TIMESHEETS VIEW */}
            {view === "timesheets" && (
                <div className="flex-1 overflow-y-auto">
                    {recentLogs.length === 0 ? (
                        <div className="text-center py-20 text-concrete/30 font-mono text-sm uppercase tracking-widest">
                            No recent shifts found
                        </div>
                    ) : (
                        <div className="space-y-4 pb-12">
                            {recentLogs.map((log) => {
                                const start = new Date(log.clock_in);
                                const end = log.clock_out ? new Date(log.clock_out) : null;
                                const durationSecs = end ? differenceInSeconds(end, start) : 0;
                                const hoursStr = end ? (durationSecs / 3600).toFixed(2) : "0.00";

                                return (
                                    <div key={log.id} className="bg-industrial border border-white/5 rounded-2xl p-5 relative overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10" />
                                        <div className="flex justify-between items-start mb-4 pl-2">
                                            <div className="flex items-center gap-2">
                                                <CalendarDays className="w-4 h-4 text-safety-amber" />
                                                <span className="font-sans font-bold text-concrete">{format(start, "MMM do, yyyy")}</span>
                                            </div>
                                            <div className="bg-white/5 px-2 py-1 rounded font-mono text-xs font-bold text-high-vis-yellow tracking-widest">
                                                {hoursStr} HRS
                                            </div>
                                        </div>
                                        <div className="flex justify-between font-mono text-xs text-concrete/60 pl-2">
                                            <span>{format(start, "h:mm a")}</span>
                                            <span className="text-white/20">→</span>
                                            <span>{end ? format(end, "h:mm a") : "Missed out-punch"}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
