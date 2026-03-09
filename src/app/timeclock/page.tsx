import { cookies } from "next/headers";
import { getEmployees, getCurrentShift } from "@/app/actions/timeclock";
import { TimeclockAuth } from "./TimeclockAuth";
import { TimeclockApp } from "./TimeclockApp";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Employee Timeclock | Crownwood Chemicals",
    description: "Internal employee time and attendance portal.",
};

export default async function TimeclockPage() {
    const cookieStore = await cookies();
    const isAuthenticated = cookieStore.get("timeclock_auth")?.value === "true";

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-asphalt flex flex-col items-center justify-center p-6 relative">
                <Link href="/" className="absolute top-8 left-8 text-concrete/50 hover:text-safety-amber flex items-center gap-2 transition-colors font-mono text-sm uppercase">
                    <ArrowLeft className="w-4 h-4" /> Return to Site
                </Link>
                <div className="w-full max-w-sm">
                    <h1 className="font-bebas text-5xl text-concrete text-center mb-2 tracking-wide">CROWNWOOD<br /><span className="text-safety-amber">TIMECLOCK</span></h1>
                    <p className="font-mono text-center text-concrete/50 text-xs uppercase tracking-widest mb-12">Authorized Personnel Only</p>
                    <TimeclockAuth />
                </div>
            </main>
        );
    }

    // Authenticated state
    const employees = await getEmployees();

    // Fetch current shifts for all active employees to determine their state
    const activeShifts = await Promise.all(
        employees.map(async (emp) => {
            const shift = await getCurrentShift(emp.id);
            return { employeeId: emp.id, shift };
        })
    );

    // Create a map for fast lookup on the client
    const shiftMap = activeShifts.reduce((acc, curr) => {
        acc[curr.employeeId] = curr.shift;
        return acc;
    }, {} as Record<string, any>);

    return (
        <main className="min-h-screen bg-asphalt">
            <TimeclockApp employees={employees} initialShiftMap={shiftMap} />
        </main>
    );
}
