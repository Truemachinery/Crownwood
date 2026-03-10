"use client";

import React, { useState } from "react";
import { logoutTimeclockAdmin, createEmployee, updateEmployee, updateTimeEntryAdmin, deleteTimeEntryAdmin } from "@/app/actions/timeclock";
import { LogOut, Users, Clock, DollarSign, CalendarDays, Plus, Edit2, Check, X, Trash2, ChevronDown, ChevronUp, Download } from "lucide-react";
import { format, differenceInSeconds, startOfWeek, endOfWeek, isWithinInterval, startOfYear } from "date-fns";

export function AdminDashboard({ initialEmployees, initialTimeEntries }: { initialEmployees: any[], initialTimeEntries: any[] }) {
    const [view, setView] = useState<"shifts" | "employees" | "payroll">("shifts");

    // Server state
    const [employees, setEmployees] = useState(initialEmployees);
    const [timeEntries, setTimeEntries] = useState(initialTimeEntries);

    // --- EMPLOYEES TAB STATE ---
    const [isAddingEmp, setIsAddingEmp] = useState(false);
    const [empForm, setEmpForm] = useState({ first_name: "", last_name: "", hourly_rate: "0" });
    const [editingEmpId, setEditingEmpId] = useState<string | null>(null);

    // --- SHIFTS TAB STATE ---
    const [editingShiftId, setEditingShiftId] = useState<string | null>(null);
    const [shiftForm, setShiftForm] = useState({ clock_in: "", clock_out: "", notes: "" });

    // --- PAYROLL EXPANSION STATE ---
    const [expandedEids, setExpandedEids] = useState<string[]>([]);

    const togglePayrollExpand = (eid: string) => {
        setExpandedEids(prev => prev.includes(eid) ? prev.filter(id => id !== eid) : [...prev, eid]);
    };

    // --- HELPERS ---
    const formatDuration = (startStr: string, endStr: string | null) => {
        if (!endStr) return "Active";
        const secs = differenceInSeconds(new Date(endStr), new Date(startStr));
        return (secs / 3600).toFixed(2) + " hrs";
    };

    // --- EMPLOYEE ACTIONS ---
    const handleSaveEmployee = async () => {
        try {
            if (editingEmpId) {
                const res = await updateEmployee(editingEmpId, {
                    first_name: empForm.first_name,
                    last_name: empForm.last_name,
                    hourly_rate: parseFloat(empForm.hourly_rate)
                });
                setEmployees(employees.map(e => e.id === editingEmpId ? res : e));
                setEditingEmpId(null);
            } else {
                const res = await createEmployee(empForm.first_name, empForm.last_name, parseFloat(empForm.hourly_rate));
                setEmployees([res, ...employees]);
                setIsAddingEmp(false);
            }
        } catch (e) {
            alert("Error saving employee");
        }
    };

    const handleToggleActive = async (id: string, current: boolean) => {
        try {
            const res = await updateEmployee(id, { is_active: !current });
            setEmployees(employees.map(e => e.id === id ? res : e));
        } catch (e) {
            alert("Error toggling status");
        }
    };

    // --- SHIFT ACTIONS ---
    const handleSaveShift = async () => {
        if (!editingShiftId) return;
        try {
            // Must format strings for postgres timestamp
            const res = await updateTimeEntryAdmin(
                editingShiftId,
                new Date(shiftForm.clock_in).toISOString(),
                shiftForm.clock_out ? new Date(shiftForm.clock_out).toISOString() : null,
                shiftForm.notes
            );
            // Re-inject the employee relation data
            const orig = timeEntries.find(t => t.id === editingShiftId);
            const updated = { ...res, employees: orig?.employees };
            setTimeEntries(timeEntries.map(t => t.id === editingShiftId ? updated : t));
            setEditingShiftId(null);
        } catch (e) {
            alert("Error saving shift. Ensure valid datetime format like YYYY-MM-DDTHH:mm");
        }
    };

    const handleDeleteShift = async (id: string) => {
        if (confirm("Delete this shift entirely?")) {
            await deleteTimeEntryAdmin(id);
            setTimeEntries(timeEntries.filter(t => t.id !== id));
        }
    };

    // --- PAYROLL CALCS ---
    // Group all complete shifts in the current week
    const now = new Date();
    const currWeekStart = startOfWeek(now, { weekStartsOn: 1 }); // Monday
    const currWeekEnd = endOfWeek(now, { weekStartsOn: 1 });

    const payrollMap = employees.reduce((acc, emp) => {
        acc[emp.id] = { ...emp, totalHours: 0, totalPay: 0, weeklyShifts: [] };
        return acc;
    }, {} as Record<string, any>);

    timeEntries.forEach(t => {
        if (!t.clock_out) return; // Ignore incomplete shifts
        const start = new Date(t.clock_in);
        if (isWithinInterval(start, { start: currWeekStart, end: currWeekEnd })) {
            const hrs = differenceInSeconds(new Date(t.clock_out), start) / 3600;
            const empId = t.employee_id;
            if (payrollMap[empId]) {
                payrollMap[empId].totalHours += hrs;
                payrollMap[empId].totalPay += (hrs * payrollMap[empId].hourly_rate);
                payrollMap[empId].weeklyShifts.push({ ...t, calculatedHours: hrs });
            }
        }
    });

    // Sort shifts inside each employee chronologically
    Object.values(payrollMap).forEach((emp: any) => {
        emp.weeklyShifts.sort((a: any, b: any) => new Date(a.clock_in).getTime() - new Date(b.clock_in).getTime());
    });

    const payrollList = Object.values(payrollMap).filter((p: any) => p.totalHours > 0 || p.is_active).sort((a: any, b: any) => b.totalHours - a.totalHours);

    // --- RENDER ---
    const handleExport1099 = () => {
        const yearStart = startOfYear(now);

        // Group all YTD data
        const ytdMap = employees.reduce((acc, emp) => {
            acc[emp.id] = { ...emp, ytdHours: 0, ytdPay: 0 };
            return acc;
        }, {} as Record<string, any>);

        timeEntries.forEach(t => {
            if (!t.clock_out) return;
            const start = new Date(t.clock_in);
            if (start >= yearStart) {
                const hrs = differenceInSeconds(new Date(t.clock_out), start) / 3600;
                if (ytdMap[t.employee_id]) {
                    ytdMap[t.employee_id].ytdHours += hrs;
                    ytdMap[t.employee_id].ytdPay += (hrs * ytdMap[t.employee_id].hourly_rate);
                }
            }
        });

        const ytdList = Object.values(ytdMap).filter((p: any) => p.ytdHours > 0 || p.is_active);

        // Generate CSV
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Employee Name,Status,Hourly Rate,YTD Hours,YTD Gross Pay\n";
        ytdList.forEach((p: any) => {
            const status = p.is_active ? "Active" : "Archived";
            csvContent += `"${p.first_name} ${p.last_name}","${status}","${p.hourly_rate.toFixed(2)}","${p.ytdHours.toFixed(2)}","${p.ytdPay.toFixed(2)}"\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `Crownwood_1099_YTD_${format(now, "yyyy")}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-6">
                <div>
                    <h1 className="font-bebas text-4xl md:text-5xl text-concrete tracking-wide">TIMECLOCK <span className="text-safety-amber">ADMIN</span></h1>
                </div>
                <button onClick={() => logoutTimeclockAdmin()} className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-2 font-mono text-xs uppercase tracking-widest bg-red-400/10 px-3 py-1.5 rounded-lg border border-red-400/20">
                    <LogOut className="w-4 h-4" /> Sign Out
                </button>
            </div>

            {/* NAVIGATION */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 hide-scrollbar">
                <button
                    onClick={() => setView("shifts")}
                    className={`shrink-0 px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${view === "shifts" ? "bg-safety-amber text-asphalt" : "bg-white/5 text-concrete/60 hover:bg-white/10 hover:text-white"}`}
                >
                    <Clock className="w-4 h-4" /> All Shifts
                </button>
                <button
                    onClick={() => setView("employees")}
                    className={`shrink-0 px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${view === "employees" ? "bg-safety-amber text-asphalt" : "bg-white/5 text-concrete/60 hover:bg-white/10 hover:text-white"}`}
                >
                    <Users className="w-4 h-4" /> Manage Crew
                </button>
                <button
                    onClick={() => setView("payroll")}
                    className={`shrink-0 px-6 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${view === "payroll" ? "bg-emerald-500 text-white" : "bg-white/5 text-concrete/60 hover:bg-white/10 hover:text-white"}`}
                >
                    <DollarSign className="w-4 h-4" /> Weekly Payroll
                </button>
            </div>

            {/* VIEW CONTENT */}
            <div className="bg-industrial border border-white/5 rounded-[2rem] p-6 shadow-2xl min-h-[60vh]">

                {/* --- SHIFTS VIEW --- */}
                {view === "shifts" && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-heading font-bold text-xl text-white">Log History</h2>
                            <p className="font-mono text-xs text-concrete/50">Recent {timeEntries.length} entries</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5 text-concrete/40 font-mono text-xs uppercase tracking-widest">
                                        <th className="pb-3 pr-4 font-normal">Employee</th>
                                        <th className="pb-3 px-4 font-normal">Clock In</th>
                                        <th className="pb-3 px-4 font-normal">Clock Out</th>
                                        <th className="pb-3 px-4 font-normal">Total</th>
                                        <th className="pb-3 px-4 font-normal text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {timeEntries.map(t => {
                                        const isEditing = editingShiftId === t.id;
                                        const empName = t.employees ? `${t.employees.first_name} ${t.employees.last_name}` : "Unknown";

                                        return (
                                            <tr key={t.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group">
                                                <td className="py-4 pr-4 align-top">
                                                    <div className="font-bold text-concrete">{empName}</div>
                                                    {t.notes && <div className="text-xs text-white/40 mt-1 italic leading-tight max-w-[200px] truncate" title={t.notes}>"{t.notes}"</div>}
                                                </td>

                                                {isEditing ? (
                                                    <td colSpan={3} className="py-4 px-4 bg-black/20 rounded-xl my-2">
                                                        <div className="grid md:grid-cols-2 gap-2">
                                                            <div>
                                                                <label className="text-[10px] uppercase text-white/30 ml-1">Clock In (YYYY-MM-DDTHH:mm)</label>
                                                                <input type="text" value={shiftForm.clock_in} onChange={e => setShiftForm({ ...shiftForm, clock_in: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 text-xs text-white font-mono" />
                                                            </div>
                                                            <div>
                                                                <label className="text-[10px] uppercase text-white/30 ml-1">Clock Out</label>
                                                                <input type="text" value={shiftForm.clock_out} onChange={e => setShiftForm({ ...shiftForm, clock_out: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 text-xs text-white font-mono" />
                                                            </div>
                                                            <div className="md:col-span-2">
                                                                <label className="text-[10px] uppercase text-white/30 ml-1">Notes</label>
                                                                <input type="text" value={shiftForm.notes} onChange={e => setShiftForm({ ...shiftForm, notes: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-md px-2 py-1 text-xs text-white" />
                                                            </div>
                                                        </div>
                                                    </td>
                                                ) : (
                                                    <>
                                                        <td className="py-4 px-4 align-top">
                                                            <div className="text-sm text-concrete">{format(new Date(t.clock_in), "MM/dd/yyyy")}</div>
                                                            <div className="font-mono text-xs text-safety-amber">{format(new Date(t.clock_in), "hh:mm:ss a")}</div>
                                                        </td>
                                                        <td className="py-4 px-4 align-top">
                                                            {t.clock_out ? (
                                                                <>
                                                                    <div className="text-sm text-concrete">{format(new Date(t.clock_out), "MM/dd/yyyy")}</div>
                                                                    <div className="font-mono text-xs text-concrete/70">{format(new Date(t.clock_out), "hh:mm:ss a")}</div>
                                                                </>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Active
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="py-4 px-4 align-top">
                                                            <span className="font-mono text-sm font-bold text-white">{formatDuration(t.clock_in, t.clock_out)}</span>
                                                        </td>
                                                    </>
                                                )}

                                                <td className="py-4 px-4 align-top text-right">
                                                    {isEditing ? (
                                                        <div className="flex justify-end gap-2">
                                                            <button onClick={() => setEditingShiftId(null)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white/50"><X className="w-4 h-4" /></button>
                                                            <button onClick={handleSaveShift} className="p-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-lg"><Check className="w-4 h-4" /></button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex justify-end gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => {
                                                                    setShiftForm({
                                                                        clock_in: new Date(t.clock_in).toISOString().slice(0, 16),
                                                                        clock_out: t.clock_out ? new Date(t.clock_out).toISOString().slice(0, 16) : "",
                                                                        notes: t.notes || ""
                                                                    });
                                                                    setEditingShiftId(t.id);
                                                                }}
                                                                className="p-1.5 hover:bg-white/10 rounded text-concrete/50 transition-colors" title="Edit"
                                                            >
                                                                <Edit2 className="w-3.5 h-3.5" />
                                                            </button>
                                                            <button onClick={() => handleDeleteShift(t.id)} className="p-1.5 hover:bg-red-500/20 rounded text-concrete/50 hover:text-red-400 transition-colors" title="Delete">
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}


                {/* --- EMPLOYEES VIEW --- */}
                {view === "employees" && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="font-heading font-bold text-xl text-white">Roster Management</h2>
                            <button
                                onClick={() => { setIsAddingEmp(true); setEmpForm({ first_name: "", last_name: "", hourly_rate: "0" }); setEditingEmpId(null); }}
                                className="px-3 py-1.5 bg-safety-amber hover:bg-high-vis-yellow text-asphalt rounded-lg font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                            >
                                <Plus className="w-3.5 h-3.5" /> Add Employee
                            </button>
                        </div>

                        {(isAddingEmp || editingEmpId) && (
                            <div className="bg-black/20 border border-white/10 p-5 rounded-xl flex flex-wrap gap-4 items-end mb-6">
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block text-[10px] font-mono uppercase text-white/40 mb-1 ml-1">First Name</label>
                                    <input type="text" value={empForm.first_name} onChange={e => setEmpForm({ ...empForm, first_name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-safety-amber/50" placeholder="John" />
                                </div>
                                <div className="flex-1 min-w-[150px]">
                                    <label className="block text-[10px] font-mono uppercase text-white/40 mb-1 ml-1">Last Name</label>
                                    <input type="text" value={empForm.last_name} onChange={e => setEmpForm({ ...empForm, last_name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-safety-amber/50" placeholder="Doe" />
                                </div>
                                <div className="w-32">
                                    <label className="block text-[10px] font-mono uppercase text-white/40 mb-1 ml-1">Hourly Rate ($)</label>
                                    <input type="number" step="0.5" value={empForm.hourly_rate} onChange={e => setEmpForm({ ...empForm, hourly_rate: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white outline-none focus:border-safety-amber/50 font-mono" />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => { setIsAddingEmp(false); setEditingEmpId(null); }} className="px-4 py-2 border border-white/10 hover:bg-white/5 text-white/60 rounded-lg font-mono text-xs uppercase tracking-widest">Cancel</button>
                                    <button onClick={handleSaveEmployee} className="px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-500 border border-emerald-500/30 rounded-lg font-mono text-xs uppercase tracking-widest font-bold">Save</button>
                                </div>
                            </div>
                        )}

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {employees.map(emp => (
                                <div key={emp.id} className={`p-5 rounded-2xl border transition-colors ${emp.is_active ? 'bg-white/[0.02] border-white/10' : 'bg-black/20 border-white/5 opacity-50'}`}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-heading font-bold text-xl text-white uppercase tracking-wider">{emp.first_name} <span className="text-white/60">{emp.last_name}</span></h3>
                                            <p className="font-mono text-sm text-emerald-400 mt-1">${emp.hourly_rate}/hr</p>
                                        </div>
                                        <button
                                            onClick={() => handleToggleActive(emp.id, emp.is_active)}
                                            className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${emp.is_active ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-emerald-500/10 hover:text-emerald-500 hover:border-emerald-500/20'}`}
                                            title={emp.is_active ? "Mark Inactive" : "Mark Active"}
                                        >
                                            {emp.is_active ? 'Active' : 'Archived'}
                                        </button>
                                    </div>
                                    <div className="flex justify-end pt-4 border-t border-white/5">
                                        <button
                                            onClick={() => {
                                                setEmpForm({ first_name: emp.first_name, last_name: emp.last_name, hourly_rate: emp.hourly_rate.toString() });
                                                setEditingEmpId(emp.id);
                                            }}
                                            className="text-xs font-mono uppercase tracking-widest text-concrete/50 hover:text-white flex items-center gap-1"
                                        >
                                            <Edit2 className="w-3 h-3" /> Edit
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- PAYROLL VIEW --- */}
                {view === "payroll" && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="font-heading font-bold text-xl text-white">Weekly Payroll Stub</h2>
                                <p className="font-mono text-xs text-concrete/50 flex flex-col mt-1">
                                    <span className="text-emerald-400">Current Week</span>
                                    <span>{format(currWeekStart, "MMM d")} - {format(currWeekEnd, "MMM d, yyyy")}</span>
                                </p>
                            </div>
                            <div className="text-right">
                                <div className="text-xs uppercase font-mono text-white/40 tracking-widest">Total Liability (This Week)</div>
                                <div className="font-bebas text-4xl text-emerald-400">${payrollList.reduce((acc: number, p: any) => acc + p.totalPay, 0).toFixed(2)}</div>
                            </div>
                        </div>

                        <div className="flex justify-end mb-4">
                            <button
                                onClick={handleExport1099}
                                className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg flex items-center gap-2 font-mono text-xs uppercase tracking-widest transition-colors font-bold shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                            >
                                <Download className="w-4 h-4" /> 1099 Export YTD ({format(now, "yyyy")})
                            </button>
                        </div>

                        <div className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-white/5">
                                    <tr className="font-mono text-[10px] uppercase text-concrete/50 tracking-widest">
                                        <th className="py-3 px-4">Employee</th>
                                        <th className="py-3 px-4 text-right">Rate</th>
                                        <th className="py-3 px-4 text-right">Weekly Hrs</th>
                                        <th className="py-3 px-4 text-right text-emerald-400">Gross Pay</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {payrollList.map((p: any) => {
                                        const isExpanded = expandedEids.includes(p.id);
                                        return (
                                            <React.Fragment key={p.id}>
                                                <tr
                                                    onClick={() => togglePayrollExpand(p.id)}
                                                    className="border-b border-white/5 hover:bg-white/[0.04] transition-colors cursor-pointer group"
                                                >
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-6 flex justify-center text-white/30 group-hover:text-white/60 transition-colors">
                                                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-white uppercase">{p.first_name} {p.last_name}</div>
                                                                {!p.is_active && <span className="text-[10px] bg-red-500/20 text-red-400 px-1 rounded block w-max mt-1">Inactive</span>}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4 text-right font-mono text-sm text-concrete/60">${p.hourly_rate.toFixed(2)}/hr</td>
                                                    <td className="py-4 px-4 text-right font-mono text-sm font-bold text-white">{p.totalHours.toFixed(2)}</td>
                                                    <td className="py-4 px-4 text-right font-mono text-lg font-bold text-emerald-400">${p.totalPay.toFixed(2)}</td>
                                                </tr>
                                                {isExpanded && p.weeklyShifts.length > 0 && (
                                                    <tr className="bg-black/40 border-b border-white/5">
                                                        <td colSpan={4} className="p-0">
                                                            <div className="pl-14 pr-4 py-4 space-y-2">
                                                                {p.weeklyShifts.map((shift: any) => (
                                                                    <div key={shift.id} className="flex justify-between items-center text-xs font-mono py-1 border-b border-white/[0.02] last:border-0">
                                                                        <div className="flex items-center gap-4 text-concrete/70 w-2/3">
                                                                            <span className="w-24 font-sans font-bold text-concrete">{format(new Date(shift.clock_in), "EEE, MMM  d")}</span>
                                                                            <span>{format(new Date(shift.clock_in), "h:mm a")}</span>
                                                                            <span className="text-white/20">→</span>
                                                                            <span>{format(new Date(shift.clock_out), "h:mm a")}</span>
                                                                        </div>
                                                                        <div className="text-right flex gap-4 pr-1">
                                                                            <span className="text-safety-amber w-12">{shift.calculatedHours.toFixed(2)} hr</span>
                                                                            <span className="text-emerald-400 w-16 font-bold">${(shift.calculatedHours * p.hourly_rate).toFixed(2)}</span>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                    {payrollList.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="py-12 text-center text-white/30 font-mono text-xs uppercase tracking-widest">No clocked hours this week</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
