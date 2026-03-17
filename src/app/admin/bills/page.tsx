"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  getBills, markBillPaid,
  type Bill
} from "@/app/actions/accounting";
import StatusBadge from "@/components/accounting/StatusBadge";
import {
  CreditCard, ArrowLeft, Loader2, CheckCircle, ChevronDown, ChevronUp, Printer
} from "lucide-react";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export default function BillsPage() {
  const router = useRouter();
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unpaid" | "paid">("all");
  const [payingId, setPayingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try { setBills(await getBills()); } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleMarkPaid = async (bill: Bill) => {
    if (!confirm("Mark this bill as paid?")) return;
    setPayingId(bill.id);
    try { await markBillPaid(bill.id); await load(); } catch {}
    setPayingId(null);
  };

  const filtered = filter === "all" ? bills : bills.filter(b => b.status === filter);
  const counts = {
    all: bills.length,
    unpaid: bills.filter(b => b.status === "unpaid").length,
    paid: bills.filter(b => b.status === "paid").length,
  };
  const totalUnpaid = bills.filter(b => b.status === "unpaid").reduce((s, b) => s + b.total, 0);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-concrete">
      <div className="border-b border-white/10 bg-[#111]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button onClick={() => router.push("/admin")} className="flex items-center gap-2 text-concrete/50 hover:text-safety-amber transition-colors text-sm"><ArrowLeft className="w-4 h-4" /> Back</button>
              <div className="h-6 w-px bg-white/10" />
              <h1 className="font-heading font-bold text-2xl uppercase tracking-tight flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-safety-amber" /> Bills
              </h1>
            </div>
            <p className="font-mono text-xs text-concrete/40">Bills are created by converting Purchase Orders</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="flex gap-2 mb-6">
          {(["all", "unpaid", "paid"] as const).map(tab => (
            <button key={tab} onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-colors border ${filter === tab ? "bg-safety-amber/10 border-safety-amber/30 text-safety-amber" : "bg-white/5 border-white/10 text-concrete/60 hover:bg-white/10"}`}
            >{tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}<span className="ml-2 opacity-60">({counts[tab]})</span></button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="font-mono text-xs text-concrete/40 uppercase tracking-widest mb-1">Total Bills</p>
            <p className="font-heading font-bold text-3xl">{counts.all}</p>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-5">
            <p className="font-mono text-xs text-amber-400/60 uppercase tracking-widest mb-1">Unpaid Total</p>
            <p className="font-heading font-bold text-2xl text-amber-400">{fmt(totalUnpaid)}</p>
          </div>
          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5">
            <p className="font-mono text-xs text-emerald-400/60 uppercase tracking-widest mb-1">Paid</p>
            <p className="font-heading font-bold text-3xl text-emerald-400">{counts.paid}</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-safety-amber" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <CreditCard className="w-16 h-16 text-concrete/20 mx-auto mb-4" />
            <p className="font-heading text-xl text-concrete/40">No bills yet</p>
            <p className="text-sm text-concrete/30 mt-2">Convert a Purchase Order to create a bill</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(bill => {
              const expanded = expandedId === bill.id;
              return (
                <div key={bill.id} className={`bg-white/[0.03] border rounded-2xl overflow-hidden ${bill.status === "unpaid" ? "border-l-2 border-l-amber-400 border-white/[0.08]" : "border-white/[0.08]"}`}>
                  <button onClick={() => setExpandedId(expanded ? null : bill.id)} className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors">
                    <StatusBadge status={bill.status} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-safety-amber font-bold">{bill.bill_number}</span>
                        <span className="font-heading font-bold text-concrete truncate">{bill.vendor_name}</span>
                      </div>
                      <p className="font-mono text-xs text-concrete/40 mt-0.5">
                        {bill.date}
                        {bill.due_date ? ` · Due ${bill.due_date}` : ""}
                        {bill.from_po_id ? " · From PO" : ""}
                        {bill.paid_date ? ` · Paid ${bill.paid_date}` : ""}
                      </p>
                    </div>
                    <span className={`font-heading font-bold text-lg shrink-0 ${bill.status === "paid" ? "text-emerald-400" : "text-concrete"}`}>{fmt(bill.total)}</span>
                    {expanded ? <ChevronUp className="w-4 h-4 text-concrete/30" /> : <ChevronDown className="w-4 h-4 text-concrete/30" />}
                  </button>

                  {expanded && (
                    <div className="px-5 pb-5 border-t border-white/5">
                      {bill.line_items && bill.line_items.length > 0 && (
                        <div className="mt-4 mb-4">
                          <table className="w-full text-sm">
                            <thead><tr className="border-b border-white/10">
                              <th className="text-left py-2 font-mono text-[10px] text-concrete/40 uppercase tracking-widest">Item</th>
                              <th className="text-center py-2 font-mono text-[10px] text-concrete/40 uppercase tracking-widest w-16">Qty</th>
                              <th className="text-right py-2 font-mono text-[10px] text-concrete/40 uppercase tracking-widest w-20">Rate</th>
                              <th className="text-right py-2 font-mono text-[10px] text-concrete/40 uppercase tracking-widest w-24">Amount</th>
                            </tr></thead>
                            <tbody>
                              {bill.line_items.map((li, i) => (
                                <tr key={i} className="border-b border-white/5">
                                  <td className="py-2 text-concrete/80">{li.description}</td>
                                  <td className="py-2 text-center text-concrete/60">{li.quantity}</td>
                                  <td className="py-2 text-right text-concrete/60">{fmt(li.rate)}</td>
                                  <td className="py-2 text-right font-bold text-concrete">{fmt(li.amount)}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <div className="flex justify-end mt-3"><div className="text-right space-y-1">
                            <div className="text-sm text-concrete/50">Subtotal: {fmt(bill.subtotal)}</div>
                            {bill.tax_rate > 0 && <div className="text-sm text-concrete/50">Tax ({bill.tax_rate}%): {fmt(bill.tax_amount)}</div>}
                            <div className="text-lg font-bold text-safety-amber">Total: {fmt(bill.total)}</div>
                          </div></div>
                        </div>
                      )}
                      {bill.notes && <p className="text-sm text-concrete/50 mb-4 italic">&ldquo;{bill.notes}&rdquo;</p>}
                      <div className="flex items-center gap-2 flex-wrap">
                        <button onClick={() => window.open(`/admin/print?type=bill&id=${bill.id}`, "_blank")} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-heading font-bold uppercase tracking-wider text-concrete/70 hover:bg-white/10 transition-colors"><Printer className="w-3.5 h-3.5" /> PDF</button>
                        {bill.status === "unpaid" && (
                          <button onClick={() => handleMarkPaid(bill)} disabled={payingId === bill.id} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm font-heading font-bold uppercase tracking-wider text-emerald-400 hover:bg-emerald-500/20 transition-colors disabled:opacity-50">
                            {payingId === bill.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />} Mark Paid
                          </button>
                        )}
                        {bill.status === "paid" && <span className="px-4 py-2 text-xs font-mono text-emerald-400/60">✓ Paid {bill.paid_date}</span>}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
