import { NextRequest, NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const body = await req.json();
        const { name, email, phone, company, message, service, service_path } = body;

        // Validate required fields
        if (!name || !email || !message || !service) {
            return NextResponse.json(
                { error: "Name, email, message, and service are required." },
                { status: 400 }
            );
        }

        // Insert into Supabase
        const supabase = getServiceClient();
        const { data, error } = await supabase
            .from("inquiries")
            .insert({
                name,
                email,
                phone: phone || null,
                company: company || null,
                message,
                service,
                service_path: service_path || null,
                status: "new",
            })
            .select()
            .single();

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json(
                { error: "Failed to save inquiry." },
                { status: 500 }
            );
        }

        // Send email notification via Resend
        try {
            await resend.emails.send({
                from: "Crownwood Chemicals <onboarding@resend.dev>",
                to: ["admin@crownwoodchemicals.com"],
                subject: `New Inquiry: ${service} — ${name}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px;">
                        <h2 style="color: #1a1a1a; border-bottom: 3px solid #FFB300; padding-bottom: 8px;">
                            New Inquiry — ${service}
                        </h2>
                        <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                            <tr>
                                <td style="padding: 8px 12px; font-weight: bold; color: #666; width: 140px;">Name</td>
                                <td style="padding: 8px 12px;">${name}</td>
                            </tr>
                            <tr style="background: #f9f9f9;">
                                <td style="padding: 8px 12px; font-weight: bold; color: #666;">Email</td>
                                <td style="padding: 8px 12px;"><a href="mailto:${email}">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 12px; font-weight: bold; color: #666;">Phone</td>
                                <td style="padding: 8px 12px;">${phone || "—"}</td>
                            </tr>
                            <tr style="background: #f9f9f9;">
                                <td style="padding: 8px 12px; font-weight: bold; color: #666;">Company</td>
                                <td style="padding: 8px 12px;">${company || "—"}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 12px; font-weight: bold; color: #666;">Service</td>
                                <td style="padding: 8px 12px;"><strong>${service}</strong></td>
                            </tr>
                            <tr style="background: #f9f9f9;">
                                <td style="padding: 8px 12px; font-weight: bold; color: #666;">Page</td>
                                <td style="padding: 8px 12px;">${service_path || "—"}</td>
                            </tr>
                        </table>
                        <div style="background: #f4f4f4; padding: 16px; border-radius: 8px; margin-top: 16px;">
                            <p style="font-weight: bold; color: #666; margin: 0 0 8px 0;">Message:</p>
                            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
                        </div>
                        <p style="color: #999; font-size: 12px; margin-top: 24px;">
                            This inquiry was submitted from crownwoodchemicals.com
                        </p>
                    </div>
                `,
            });
        } catch (emailErr) {
            // Don't fail the request if email fails — the inquiry is already saved
            console.error("Resend email error:", emailErr);
        }

        return NextResponse.json({ success: true, id: data.id });
    } catch (err) {
        console.error("API error:", err);
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
}
