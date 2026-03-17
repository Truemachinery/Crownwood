"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  getInvoices, createInvoice, updateInvoice, deleteInvoice, markInvoicePaid,
  getCustomers, type Invoice, type Customer
} from "@/app/actions/accounting";
import LineItemsEditor, { type LineItemRow } from "@/components/accounting/LineItemsEditor";
import StatusBadge from "@/components/accounting/StatusBadge";
import {
  Receipt, Plus, ArrowLeft, Loader2, Trash2, X, Send, Printer, CheckCircle, Save, ChevronDown, ChevronUp, Eye
} from "lucide-react";

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

const EMPTY_FORM = {
  customer_id: null as string | null,
  customer_name: "",
  customer_email: "",
  date: new Date().toISOString().split("T")[0],
  due_date: "",
  tax_rate: 0,
  notes: "",
};

export default function InvoicesPage() {
  const router = useRouter();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "draft" | "sent" | "paid" | "overdue">("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [lineItems, setLineItems] = useState<LineItemRow[]>([{ description: "", quantity: 1, rate: 0 }]);
  const [saving, setSaving] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [payingId, setPayingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [inv, c] = await Promise.all([getInvoices(), getCustomers()]);
      setInvoices(inv);
      setCustomers(c);
    } catch {}
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openNew = () => {
    setForm(EMPTY_FORM);
    setLineItems([{ description: "", quantity: 1, rate: 0 }]);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (inv: Invoice) => {
    setForm({
      customer_id: inv.customer_id,
      customer_name: inv.customer_name,
      customer_email: inv.customer_email,
      date: inv.date,
      due_date: inv.due_date || "",
      tax_rate: inv.tax_rate,
      notes: inv.notes || "",
    });
    setLineItems(
      (inv.line_items || []).map(li => ({ description: li.description, quantity: li.quantity, rate: li.rate }))
    );
    setEditingId(inv.id);
    setShowForm(true);
  };

  const handleCustomerSelect = (customerId: string) => {
    const c = customers.find(cu => cu.id === customerId);
    if (c) setForm(f => ({ ...f, customer_id: c.id, customer_name: c.name, customer_email: c.email }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const validItems = lineItems.filter(i => i.description.trim());
      if (editingId) {
        await updateInvoice(editingId, form, validItems.map((i, idx) => ({ ...i, amount: i.quantity * i.rate, sort_order: idx })));
      } else {
        await createInvoice(form, validItems.map((i, idx) => ({ ...i, amount: i.quantity * i.rate, sort_order: idx })));
      }
      setShowForm(false);
      await load();
    } catch {}
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this invoice?")) return;
    try { await deleteInvoice(id); await load(); } catch {}
  };

  const handleSend = async (inv: Invoice) => {
    const email = inv.customer_email || prompt("Enter recipient email:");
    if (!email) return;
    setSendingId(inv.id);
    try {
      const res = await fetch("/api/accounting/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "invoice", id: inv.id, recipientEmail: email }),
      });
      if (res.ok) await load();
      else { const err = await res.json(); alert("Failed: " + (err.error || "Error")); }
    } catch {}
    setSendingId(null);
  };

  const handleMarkPaid = async (inv: Invoice) => {
    if (!confirm("Mark this invoice as paid?")) return;
    setPayingId(inv.id);
    try { await markInvoicePaid(inv.id); await load(); } catch {}
    setPayingId(null);
  };

  const filtered = filter === "all" ? invoices : invoices.filter(i => i.status === filter);
  const counts = {
    all: invoices.length,
    draft: invoices.filter(i => i.status === "draft").length,
    sent: invoices.filter(i => i.status === "sent").length,
    paid: invoices.filter(i => i.status === "paid").length,
    overdue: invoices.filter(i => i.status === "overdue").length,
  };

  const totalOutstanding = invoices.filter(i => i.status === "sent" || i.status === "overdue").reduce((s, i) => s + i.total, 0);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-concrete">
      <div className="border-b border-white/10 bg-[#111]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button onClick={() => router.push("/admin")} className="flex items-center gap-2 text-concrete/50 hover:text-safety-amber transition-colors text-sm"><ArrowLeft className="w-4 h-4" /> Back</button>
              <div className="h-6 w-px bg-white/10" />
              <h1 className="font-heading font-bold text-2xl uppercase tracking-tight flex items-center gap-3">
                <Receipt className="w-6 h-6 text-safety-amber" /> Invoices
              </h1>
            </div>
            <button onClick={openNew} className="flex items-center gap-2 bg-safety-amber text-black px-5 py-3 rounded-xl font-heading font-bold text-sm uppercase tracking-wider hover:bg-safety-amber/90 transition-colors">
              <Plus className="w-4 h-4" /> New Invoice
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["all", "draft", "sent", "paid", "overdue"] as const).map(tab => (
            <button key={tab} onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-colors border ${filter === tab ? "bg-safety-amber/10 border-safety-amber/30 text-safety-amber" : "bg-white/5 border-white/10 text-concrete/60 hover:bg-white/10"}`}
            >{tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}<span className="ml-2 opacity-60">({counts[tab]})</span></button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="font-mono text-xs text-concrete/40 uppercase tracking-widest mb-1">Total</p>
            <p className="font-heading font-bold text-3xl">{counts.all}</p>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-5">
            <p className="font-mono text-xs text-amber-400/60 uppercase tracking-widest mb-1">Outstanding</p>
            <p className="font-heading font-bold text-2xl text-amber-400">{fmt(totalOutstanding)}</p>
          </div>
          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5">
            <p className="font-mono text-xs text-emerald-400/60 uppercase tracking-widest mb-1">Paid</p>
            <p className="font-heading font-bold text-3xl text-emerald-400">{counts.paid}</p>
          </div>
          <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-5">
            <p className="font-mono text-xs text-red-400/60 uppercase tracking-widest mb-1">Overdue</p>
            <p className="font-heading font-bold text-3xl text-red-400">{counts.overdue}</p>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-safety-amber" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <Receipt className="w-16 h-16 text-concrete/20 mx-auto mb-4" />
            <p className="font-heading text-xl text-concrete/40">No invoices yet</p>
            <button onClick={openNew} className="mt-4 text-safety-amber text-sm font-heading font-bold uppercase tracking-wider hover:underline">Create your first invoice</button>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(inv => {
              const expanded = expandedId === inv.id;
              return (
                <div key={inv.id} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden">
                  <button onClick={() => setExpandedId(expanded ? null : inv.id)} className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors">
                    <StatusBadge status={inv.status} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-safety-amber font-bold">{inv.invoice_number}</span>
                        <span className="font-heading font-bold text-concrete truncate">{inv.customer_name}</span>
                      </div>
                      <p className="font-mono text-xs text-concrete/40 mt-0.5">{inv.date}{inv.due_date ? ` · Due ${inv.due_date}` : ""}{inv.from_quote_id ? " · From Quote" : ""}</p>
                    </div>
                    <span className="font-heading font-bold text-lg text-concrete shrink-0">{fmt(inv.total)}</span>
                    {expanded ? <ChevronUp className="w-4 h-4 text-concrete/30" /> : <ChevronDown className="w-4 h-4 text-concrete/30" />}
                  </button>

                  {expanded && (
                    <div className="px-5 pb-5 border-t border-white/5">
                      {inv.line_items && inv.line_items.length > 0 && (
                        <div className="mt-4 mb-4">
                          <table className="w-full text-sm">
                            <thead><tr className="border-b border-white/10">
                              <th className="text-left py-2 font-mono text-[10px] text-concrete/40 uppercase tracking-widest">Item</th>
                              <th className="text-center py-2 font-mono text-[10px] text-concrete/40 uppercase tracking-widest w-16">Qty</th>
                              <th className="text-right py-2 font-mono text-[10px] text-concrete/40 uppercase tracking-widest w-20">Rate</th>
                              <th className="text-right py-2 font-mono text-[10px] text-concrete/40 uppercase tracking-widest w-24">Amount</th>
                            </tr></thead>
                            <tbody>
                              {inv.line_items.map((li, i) => (
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
                            <div className="text-sm text-concrete/50">Subtotal: {fmt(inv.subtotal)}</div>
                            {inv.tax_rate > 0 && <div className="text-sm text-concrete/50">Tax ({inv.tax_rate}%): {fmt(inv.tax_amount)}</div>}
                            <div className="text-lg font-bold text-safety-amber">Total: {fmt(inv.total)}</div>
                          </div></div>
                        </div>
                      )}
                      {inv.notes && <p className="text-sm text-concrete/50 mb-4 italic">&ldquo;{inv.notes}&rdquo;</p>}
                      <div className="flex items-center gap-2 flex-wrap">
                        <button onClick={() => openEdit(inv)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-heading font-bold uppercase tracking-wider text-concrete/70 hover:bg-white/10 transition-colors"><Eye className="w-3.5 h-3.5" /> Edit</button>
                        <button onClick={() => handleSend(inv)} disabled={sendingId === inv.id} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-sm font-heading font-bold uppercase tracking-wider text-blue-400 hover:bg-blue-500/20 transition-colors disabled:opacity-50">
                          {sendingId === inv.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />} Send Invoice
                        </button>
                        <button onClick={() => window.open(`/admin/print?type=invoice&id=${inv.id}`, "_blank")} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-heading font-bold uppercase tracking-wider text-concrete/70 hover:bg-white/10 transition-colors"><Printer className="w-3.5 h-3.5" /> PDF</button>
                        {inv.status !== "paid" && (
                          <button onClick={() => handleMarkPaid(inv)} disabled={payingId === inv.id} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-sm font-heading font-bold uppercase tracking-wider text-emerald-400 hover:bg-emerald-500/20 transition-colors disabled:opacity-50">
                            {payingId === inv.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />} Mark Paid
                          </button>
                        )}
                        {inv.status === "paid" && <span className="px-4 py-2 text-xs font-mono text-emerald-400/60">✓ Paid {inv.paid_date}</span>}
                        <button onClick={() => handleDelete(inv.id)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/5 border border-red-500/20 text-sm font-heading font-bold uppercase tracking-wider text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-colors ml-auto"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Create/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowForm(false)}>
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-heading font-bold text-xl uppercase tracking-tight">{editingId ? "Edit Invoice" : "New Invoice"}</h2>
              <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-white/10 text-concrete/40"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block font-mono text-[10px] text-concrete/40 uppercase tracking-widest mb-1.5">Select Customer</label>
                <select value={form.customer_id || ""} onChange={e => { if (e.target.value) handleCustomerSelect(e.target.value); }} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete focus:outline-none focus:border-safety-amber/40 transition-colors">
                  <option value="">— Manual entry —</option>
                  {customers.filter(c => c.type !== "vendor").map(c => (<option key={c.id} value={c.id}>{c.name} ({c.email})</option>))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block font-mono text-[10px] text-concrete/40 uppercase tracking-widest mb-1.5">Customer Name *</label><input value={form.customer_name} onChange={e => setForm(f => ({ ...f, customer_name: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete focus:outline-none focus:border-safety-amber/40 transition-colors" /></div>
                <div><label className="block font-mono text-[10px] text-concrete/40 uppercase tracking-widest mb-1.5">Customer Email *</label><input value={form.customer_email} onChange={e => setForm(f => ({ ...f, customer_email: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete focus:outline-none focus:border-safety-amber/40 transition-colors" /></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="block font-mono text-[10px] text-concrete/40 uppercase tracking-widest mb-1.5">Date</label><input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete focus:outline-none focus:border-safety-amber/40 transition-colors" /></div>
                <div><label className="block font-mono text-[10px] text-concrete/40 uppercase tracking-widest mb-1.5">Due Date</label><input type="date" value={form.due_date} onChange={e => setForm(f => ({ ...f, due_date: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete focus:outline-none focus:border-safety-amber/40 transition-colors" /></div>
                <div><label className="block font-mono text-[10px] text-concrete/40 uppercase tracking-widest mb-1.5">Tax Rate (%)</label><input type="number" value={form.tax_rate} onChange={e => setForm(f => ({ ...f, tax_rate: parseFloat(e.target.value) || 0 }))} min="0" step="0.01" className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete focus:outline-none focus:border-safety-amber/40 transition-colors" /></div>
              </div>
              <div><label className="block font-mono text-[10px] text-concrete/40 uppercase tracking-widest mb-3">Line Items</label><LineItemsEditor items={lineItems} onChange={setLineItems} /></div>
              {form.tax_rate > 0 && (
                <div className="flex justify-end text-sm space-x-6">
                  <span className="text-concrete/50">Tax ({form.tax_rate}%): {fmt(lineItems.reduce((s, i) => s + i.quantity * i.rate, 0) * (form.tax_rate / 100))}</span>
                  <span className="font-bold text-safety-amber">Total: {fmt(lineItems.reduce((s, i) => s + i.quantity * i.rate, 0) * (1 + form.tax_rate / 100))}</span>
                </div>
              )}
              <div><label className="block font-mono text-[10px] text-concrete/40 uppercase tracking-widest mb-1.5">Notes</label><textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete focus:outline-none focus:border-safety-amber/40 transition-colors resize-none" /></div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-white/10">
              <button onClick={() => setShowForm(false)} className="px-5 py-2.5 rounded-xl border border-white/10 text-concrete/60 font-heading font-bold text-sm uppercase tracking-wider hover:bg-white/5 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={!form.customer_name || saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-safety-amber text-black font-heading font-bold text-sm uppercase tracking-wider hover:bg-safety-amber/90 transition-colors disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} {editingId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
