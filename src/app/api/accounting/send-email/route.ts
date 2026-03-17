import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

function buildEmailHtml(opts: {
  docType: string;
  docNumber: string;
  date: string;
  customerName: string;
  lineItems: LineItem[];
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  total: number;
  notes: string | null;
  dueDate?: string | null;
  expiryDate?: string | null;
}): string {
  const itemRows = opts.lineItems
    .map(
      (li) => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #222;color:#e0e0e0;font-size:14px;">${li.description}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #222;color:#e0e0e0;font-size:14px;text-align:center;">${li.quantity}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #222;color:#e0e0e0;font-size:14px;text-align:right;">${formatCurrency(li.rate)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #222;color:#e0e0e0;font-size:14px;text-align:right;">${formatCurrency(li.amount)}</td>
    </tr>`
    )
    .join("");

  const dateLabel = opts.docType === "Quote" ? "Expires" : opts.docType === "Invoice" ? "Due" : "Expected";
  const secondaryDate = opts.expiryDate || opts.dueDate;

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#0a0a0a;font-family:'Helvetica Neue',Arial,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:40px 20px;">
    <!-- Header -->
    <div style="background:#111;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:32px;margin-bottom:24px;">
      <table width="100%"><tr>
        <td>
          <h1 style="margin:0;color:#FF9500;font-size:28px;font-weight:700;letter-spacing:-0.5px;">CROWNWOOD CHEMICALS</h1>
          <p style="margin:4px 0 0;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:2px;">San Antonio, TX</p>
        </td>
        <td style="text-align:right;">
          <div style="display:inline-block;background:#FF9500;color:#000;padding:6px 16px;border-radius:8px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">${opts.docType}</div>
        </td>
      </tr></table>
    </div>

    <!-- Doc Info -->
    <div style="background:#111;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:24px;margin-bottom:24px;">
      <table width="100%"><tr>
        <td style="vertical-align:top;">
          <p style="margin:0 0 4px;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Bill To</p>
          <p style="margin:0;color:#F5F3EE;font-size:16px;font-weight:600;">${opts.customerName}</p>
        </td>
        <td style="text-align:right;vertical-align:top;">
          <p style="margin:0 0 4px;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:1px;">${opts.docType} #</p>
          <p style="margin:0 0 12px;color:#FF9500;font-size:16px;font-weight:700;">${opts.docNumber}</p>
          <p style="margin:0 0 4px;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Date</p>
          <p style="margin:0;color:#F5F3EE;font-size:14px;">${opts.date}</p>
          ${secondaryDate ? `<p style="margin:8px 0 4px;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:1px;">${dateLabel}</p><p style="margin:0;color:#F5F3EE;font-size:14px;">${secondaryDate}</p>` : ""}
        </td>
      </tr></table>
    </div>

    <!-- Line Items -->
    <div style="background:#111;border:1px solid rgba(255,255,255,0.1);border-radius:16px;overflow:hidden;margin-bottom:24px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <thead>
          <tr style="background:#1a1a1a;">
            <th style="padding:12px;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:1px;text-align:left;border-bottom:1px solid #222;">Description</th>
            <th style="padding:12px;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:1px;text-align:center;border-bottom:1px solid #222;">Qty</th>
            <th style="padding:12px;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:1px;text-align:right;border-bottom:1px solid #222;">Rate</th>
            <th style="padding:12px;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:1px;text-align:right;border-bottom:1px solid #222;">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemRows}
        </tbody>
      </table>
      <!-- Totals -->
      <div style="padding:16px 12px;border-top:1px solid #333;">
        <table width="100%">
          <tr>
            <td style="color:#666;font-size:13px;padding:4px 0;">Subtotal</td>
            <td style="color:#e0e0e0;font-size:13px;text-align:right;padding:4px 0;">${formatCurrency(opts.subtotal)}</td>
          </tr>
          ${opts.taxRate > 0 ? `<tr><td style="color:#666;font-size:13px;padding:4px 0;">Tax (${opts.taxRate}%)</td><td style="color:#e0e0e0;font-size:13px;text-align:right;padding:4px 0;">${formatCurrency(opts.taxAmount)}</td></tr>` : ""}
          <tr>
            <td style="color:#FF9500;font-size:18px;font-weight:700;padding:12px 0 4px;border-top:1px solid #333;">Total</td>
            <td style="color:#FF9500;font-size:18px;font-weight:700;text-align:right;padding:12px 0 4px;border-top:1px solid #333;">${formatCurrency(opts.total)}</td>
          </tr>
        </table>
      </div>
    </div>

    ${opts.notes ? `
    <div style="background:#111;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:24px;margin-bottom:24px;">
      <p style="margin:0 0 8px;color:#666;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Notes</p>
      <p style="margin:0;color:#e0e0e0;font-size:14px;line-height:1.5;">${opts.notes}</p>
    </div>` : ""}

    <!-- Footer -->
    <div style="text-align:center;padding:24px 0;">
      <p style="margin:0;color:#333;font-size:12px;">Crownwood Chemicals · San Antonio, TX</p>
      <p style="margin:4px 0 0;color:#333;font-size:12px;">nate@crownwoodchemicals.com</p>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const { type, id, recipientEmail } = await req.json();

    if (!type || !id || !recipientEmail) {
      return NextResponse.json({ error: "Missing type, id, or recipientEmail" }, { status: 400 });
    }

    const sb = getServiceClient();

    // Fetch document
    let doc: Record<string, unknown> | null = null;
    let docType = "";
    let docNumber = "";
    let table = "";

    if (type === "quote") {
      table = "quotes";
      docType = "Quote";
      const { data } = await sb.from("quotes").select("*").eq("id", id).single();
      doc = data;
      docNumber = doc?.quote_number as string;
    } else if (type === "invoice") {
      table = "invoices";
      docType = "Invoice";
      const { data } = await sb.from("invoices").select("*").eq("id", id).single();
      doc = data;
      docNumber = doc?.invoice_number as string;
    } else if (type === "purchase_order") {
      table = "purchase_orders";
      docType = "Purchase Order";
      const { data } = await sb.from("purchase_orders").select("*").eq("id", id).single();
      doc = data;
      docNumber = doc?.po_number as string;
    } else {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    if (!doc) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    // Fetch line items
    const { data: lineItems } = await sb
      .from("line_items")
      .select("*")
      .eq("parent_type", type)
      .eq("parent_id", id)
      .order("sort_order");

    const html = buildEmailHtml({
      docType,
      docNumber,
      date: doc.date as string,
      customerName: (doc.customer_name || doc.vendor_name) as string,
      lineItems: (lineItems || []) as LineItem[],
      subtotal: doc.subtotal as number,
      taxRate: doc.tax_rate as number,
      taxAmount: doc.tax_amount as number,
      total: doc.total as number,
      notes: doc.notes as string | null,
      dueDate: (doc.due_date as string) || null,
      expiryDate: (doc.expiry_date as string) || null,
    });

    const { error: sendError } = await resend.emails.send({
      from: "Crownwood Chemicals <nate@crownwoodchemicals.com>",
      to: recipientEmail,
      subject: `${docType} ${docNumber} from Crownwood Chemicals`,
      html,
    });

    if (sendError) {
      return NextResponse.json({ error: sendError.message }, { status: 500 });
    }

    // Update status to "sent" if currently draft
    if ((doc.status as string) === "draft") {
      await sb.from(table).update({ status: "sent" }).eq("id", id);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
