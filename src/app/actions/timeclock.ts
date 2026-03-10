"use server";

import { cookies } from "next/headers";
import { getServiceClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// IMPORTANT: We use the service_role key here to bypass RLS entirely,
// because these server actions act as the trusted backend. 
// The client never talks to Supabase directly for this feature.

// --- AUTH ACTIONS ---

export async function loginTimeclock(password: string) {
    if (password === "2026") {
        (await cookies()).set("timeclock_auth", "true", { path: "/timeclock", httpOnly: true, secure: process.env.NODE_ENV === "production" });
        return { success: true };
    }
    return { success: false, error: "Invalid password" };
}

export async function loginTimeclockAdmin(password: string) {
    if (password === "5958") {
        (await cookies()).set("timeclock_admin_auth", "true", { path: "/timeclock/admin", httpOnly: true, secure: process.env.NODE_ENV === "production" });
        return { success: true };
    }
    return { success: false, error: "Invalid admin password" };
}

export async function logoutTimeclock() {
    (await cookies()).delete("timeclock_auth");
    revalidatePath("/timeclock");
}

export async function logoutTimeclockAdmin() {
    (await cookies()).delete("timeclock_admin_auth");
    revalidatePath("/timeclock/admin");
}

// --- EMPLOYEE ACTIONS ---

export async function getEmployees() {
    const { data, error } = await getServiceClient()
        .from("employees")
        .select("*")
        .eq("is_active", true)
        .order("first_name");

    if (error) throw new Error(error.message);
    return data;
}

export async function getAllEmployeesAdmin() {
    const { data, error } = await getServiceClient()
        .from("employees")
        .select("*")
        .order("is_active", { ascending: false })
        .order("first_name");

    if (error) throw new Error(error.message);
    return data;
}

export async function createEmployee(first_name: string, last_name: string, hourly_rate: number) {
    const { data, error } = await getServiceClient()
        .from("employees")
        .insert([{ first_name, last_name, hourly_rate }])
        .select()
        .single();

    if (error) throw new Error(error.message);
    revalidatePath("/timeclock");
    revalidatePath("/timeclock/admin");
    return data;
}

export async function updateEmployee(id: string, updates: { first_name?: string, last_name?: string, hourly_rate?: number, is_active?: boolean }) {
    const { data, error } = await getServiceClient()
        .from("employees")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    revalidatePath("/timeclock");
    revalidatePath("/timeclock/admin");
    return data;
}

// --- TIME ENTRY ACTIONS ---

export async function getCurrentShift(employee_id: string) {
    const { data, error } = await getServiceClient()
        .from("time_entries")
        .select("*")
        .eq("employee_id", employee_id)
        .is("clock_out", null)
        .order("clock_in", { ascending: false })
        .limit(1)
        .maybeSingle();

    if (error) throw new Error(error.message);
    return data; // returns the active shift, or null if not clocked in
}

export async function clockIn(employee_id: string) {
    // Quick double check they aren't already clocked in
    const active = await getCurrentShift(employee_id);
    if (active) throw new Error("Already clocked in");

    const { data, error } = await getServiceClient()
        .from("time_entries")
        .insert([{ employee_id, clock_in: new Date().toISOString() }])
        .select()
        .single();

    if (error) throw new Error(error.message);
    revalidatePath("/timeclock");
    revalidatePath("/timeclock/admin");
    return data;
}

export async function clockOut(time_entry_id: string, notes?: string) {
    const { data, error } = await getServiceClient()
        .from("time_entries")
        .update({ clock_out: new Date().toISOString(), notes: notes || null })
        .eq("id", time_entry_id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    revalidatePath("/timeclock");
    revalidatePath("/timeclock/admin");
    return data;
}

export async function getRecentTimesheets(employee_id: string, limit = 50) {
    const { data, error } = await getServiceClient()
        .from("time_entries")
        .select("*")
        .eq("employee_id", employee_id)
        .not("clock_out", "is", null) // only complete shifts
        .order("clock_in", { ascending: false })
        .limit(limit);

    if (error) throw new Error(error.message);
    return data;
}

export async function getAllTimeEntriesAdmin(limit = 200) {
    const { data, error } = await getServiceClient()
        .from("time_entries")
        .select("*, employees(first_name, last_name, hourly_rate)")
        .order("clock_in", { ascending: false })
        .limit(limit);

    if (error) throw new Error(error.message);
    return data;
}

export async function updateTimeEntryAdmin(id: string, clock_in: string, clock_out: string | null, notes: string | null) {
    const updates: any = { clock_in };
    if (clock_out !== undefined) updates.clock_out = clock_out;
    if (notes !== undefined) updates.notes = notes;

    const { data, error } = await getServiceClient()
        .from("time_entries")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

    if (error) throw new Error(error.message);
    revalidatePath("/timeclock");
    revalidatePath("/timeclock/admin");
    return data;
}

export async function deleteTimeEntryAdmin(id: string) {
    const { error } = await getServiceClient()
        .from("time_entries")
        .delete()
        .eq("id", id);

    if (error) throw new Error(error.message);
    revalidatePath("/timeclock/admin");
}
