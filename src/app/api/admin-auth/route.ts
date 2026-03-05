import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { password } = await req.json();
    const correct = process.env.ADMIN_PASSWORD;

    if (!correct || password !== correct) {
        return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_token", correct, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
}

export async function DELETE() {
    const res = NextResponse.json({ success: true });
    res.cookies.delete("admin_token");
    return res;
}
