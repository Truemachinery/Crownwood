import { cookies } from "next/headers";
import { getAllEmployeesAdmin, getAllTimeEntriesAdmin } from "@/app/actions/timeclock";
import { AdminAuth } from "./AdminAuth";
import { AdminDashboard } from "./AdminDashboard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Timeclock Admin | Crownwood Chemicals",
    description: "Manage employees, timesheets, and payroll.",
};

export default async function TimeclockAdminPage() {
    const cookieStore = await cookies();
    const isAdminAuthenticated = cookieStore.get("timeclock_admin_auth")?.value === "true";

    if (!isAdminAuthenticated) {
        return (
            <main className="min-h-screen bg-asphalt flex flex-col items-center justify-center p-6 relative">
                <Link href="/" className="absolute top-8 left-8 text-concrete/50 hover:text-safety-amber flex items-center gap-2 transition-colors font-mono text-sm uppercase">
                    <ArrowLeft className="w-4 h-4" /> Return to Site
                </Link>
                <div className="w-full max-w-sm">
                    <h1 className="font-bebas text-5xl text-concrete text-center mb-2 tracking-wide">ADMINISTRATOR<br /><span className="text-safety-amber">LOGIN</span></h1>
                    <p className="font-mono text-center text-concrete/50 text-xs uppercase tracking-widest mb-12">Crownwood Timeclock</p>
                    <AdminAuth />
                </div>
            </main>
        );
    }

    // Authenticated state
    const employees = await getAllEmployeesAdmin();
    const timeEntries = await getAllTimeEntriesAdmin();

    return (
        <main className="min-h-screen bg-asphalt">
            <AdminDashboard initialEmployees={employees} initialTimeEntries={timeEntries} />
        </main>
    );
}
