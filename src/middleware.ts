import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("admin_token")?.value;
    const correct = process.env.ADMIN_PASSWORD;

    if (!token || token !== correct) {
        // Redirect to login page
        const loginUrl = new URL("/admin/login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin"],
};
