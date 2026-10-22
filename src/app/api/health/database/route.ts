import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const headers = {
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex, nofollow",
};

export async function GET() {
    try {
        // Exercise the same database used by the inquiry form without returning
        // customer data, counting the table, or creating any records.
        const { error } = await getServiceClient()
            .from("inquiries")
            .select("id", { head: true })
            .limit(1)
            .abortSignal(AbortSignal.timeout(8_000));

        if (error) {
            throw error;
        }

        return NextResponse.json({ status: "ok" }, { headers });
    } catch {
        console.error("Database health check failed.");
        return NextResponse.json(
            { status: "unavailable" },
            { status: 503, headers },
        );
    }
}
