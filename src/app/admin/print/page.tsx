"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

interface LineItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export default function PrintPage() {
  return (
    <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#fff", fontFamily: "sans-serif" }}><p>Loading...</p></div>}>
      <PrintContent />
    </Suspense>
  );
}

function PrintContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [doc, setDoc] = useState<any>(null);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!type || !id) return;
    const fetchDoc = async () => {
      const sb = getSupabase();
      let table = "";
      if (type === "quote") table = "quotes";
      else if (type === "invoice") table = "invoices";
      else if (type === "purchase_order") table = "purchase_orders";
      else if (type === "bill") table = "bills";

      if (!table) return;

      const { data } = await sb.from(table).select("*").eq("id", id).single();
      setDoc(data);

      const { data: items } = await sb
        .from("line_items")
        .select("*")
        .eq("parent_type", type)
        .eq("parent_id", id)
        .order("sort_order");
      setLineItems((items || []) as LineItem[]);
      setLoading(false);

      // Auto-trigger print after a short delay
      setTimeout(() => window.print(), 500);
    };
    fetchDoc();
  }, [type, id]);

  if (loading || !doc) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#fff", fontFamily: "sans-serif" }}>
        <p>Loading document...</p>
      </div>
    );
  }

  const docType = type === "quote" ? "Quote" : type === "invoice" ? "Invoice" : type === "purchase_order" ? "Purchase Order" : "Bill";
  const docNumber = (doc.quote_number || doc.invoice_number || doc.po_number || doc.bill_number) as string;
  const customerName = (doc.customer_name || doc.vendor_name) as string;
  const dateLabel = type === "quote" ? "Valid Until" : type === "invoice" ? "Due Date" : type === "purchase_order" ? "Expected" : "Due Date";
  const secondaryDate = (doc.expiry_date || doc.due_date || doc.expected_date) as string | null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { margin: 0; padding: 0; }
          .no-print { display: none !important; }
          .print-page { padding: 0 !important; }
        }
        body { margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif; color: #111; background: #fff; }
      `}} />
      <div className="print-page" style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 32px" }}>
        {/* Print button */}
        <div className="no-print" style={{ textAlign: "right", marginBottom: "20px" }}>
          <button
            onClick={() => window.print()}
            style={{ background: "#FF9500", color: "#000", padding: "10px 24px", borderRadius: "8px", border: "none", fontWeight: 700, cursor: "pointer", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}
          >
            Download / Print PDF
          </button>
        </div>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "2px solid #111", paddingBottom: "24px", marginBottom: "32px" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: "28px", fontWeight: 800, letterSpacing: "-0.5px" }}>CROWNWOOD CHEMICALS</h1>
            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#666" }}>San Antonio, TX</p>
            <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#666" }}>nate@crownwoodchemicals.com</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ display: "inline-block", background: "#FF9500", color: "#000", padding: "6px 20px", borderRadius: "6px", fontSize: "14px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>
              {docType}
            </div>
            <p style={{ margin: "8px 0 0", fontSize: "20px", fontWeight: 700 }}>{docNumber}</p>
          </div>
        </div>

        {/* Bill To + Dates */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "32px" }}>
          <div>
            <p style={{ margin: "0 0 4px", fontSize: "11px", color: "#999", textTransform: "uppercase", letterSpacing: "1px" }}>{type === "purchase_order" || type === "bill" ? "Vendor" : "Bill To"}</p>
            <p style={{ margin: 0, fontSize: "16px", fontWeight: 600 }}>{customerName}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ margin: "0 0 4px", fontSize: "11px", color: "#999", textTransform: "uppercase", letterSpacing: "1px" }}>Date</p>
            <p style={{ margin: "0 0 12px", fontSize: "14px" }}>{doc.date as string}</p>
            {secondaryDate && (
              <>
                <p style={{ margin: "0 0 4px", fontSize: "11px", color: "#999", textTransform: "uppercase", letterSpacing: "1px" }}>{dateLabel}</p>
                <p style={{ margin: 0, fontSize: "14px" }}>{secondaryDate}</p>
              </>
            )}
          </div>
        </div>

        {/* Line Items Table */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "24px" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #111" }}>
              <th style={{ textAlign: "left", padding: "10px 8px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "#666" }}>Description</th>
              <th style={{ textAlign: "center", padding: "10px 8px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "#666", width: "80px" }}>Qty</th>
              <th style={{ textAlign: "right", padding: "10px 8px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "#666", width: "100px" }}>Rate</th>
              <th style={{ textAlign: "right", padding: "10px 8px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "1px", color: "#666", width: "100px" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((li, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px 8px", fontSize: "14px" }}>{li.description}</td>
                <td style={{ padding: "10px 8px", fontSize: "14px", textAlign: "center" }}>{li.quantity}</td>
                <td style={{ padding: "10px 8px", fontSize: "14px", textAlign: "right" }}>{formatCurrency(li.rate)}</td>
                <td style={{ padding: "10px 8px", fontSize: "14px", textAlign: "right" }}>{formatCurrency(li.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: "250px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: "14px" }}>
              <span style={{ color: "#666" }}>Subtotal</span>
              <span>{formatCurrency(doc.subtotal as number)}</span>
            </div>
            {(doc.tax_rate as number) > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: "14px" }}>
                <span style={{ color: "#666" }}>Tax ({doc.tax_rate as number}%)</span>
                <span>{formatCurrency(doc.tax_amount as number)}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0 6px", borderTop: "2px solid #111", fontSize: "18px", fontWeight: 700 }}>
              <span>Total</span>
              <span>{formatCurrency(doc.total as number)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {doc.notes && (
          <div style={{ marginTop: "32px", paddingTop: "16px", borderTop: "1px solid #eee" }}>
            <p style={{ margin: "0 0 6px", fontSize: "11px", color: "#999", textTransform: "uppercase", letterSpacing: "1px" }}>Notes</p>
            <p style={{ margin: 0, fontSize: "14px", color: "#444", lineHeight: 1.5 }}>{doc.notes as string}</p>
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: "48px", textAlign: "center", fontSize: "12px", color: "#999" }}>
          <p style={{ margin: 0 }}>Crownwood Chemicals · San Antonio, TX · nate@crownwoodchemicals.com</p>
        </div>
      </div>
    </>
  );
}
