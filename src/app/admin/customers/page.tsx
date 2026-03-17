"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getCustomers, createCustomer, updateCustomer, deleteCustomer,
  type Customer
} from "@/app/actions/accounting";
import {
  Users, Plus, ArrowLeft, Loader2, Pencil, Trash2, X, Building2, Mail, Phone, MapPin, Save
} from "lucide-react";

const EMPTY_CUSTOMER: Omit<Customer, "id" | "created_at"> = {
  name: "", email: "", phone: "", company: "", address: "", city: "", state: "", zip: "", notes: "", type: "customer",
};

export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_CUSTOMER);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState<"all" | "customer" | "vendor" | "both">("all");

  const load = async () => {
    setLoading(true);
    try { setCustomers(await getCustomers()); } catch {}
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setForm(EMPTY_CUSTOMER); setEditingId(null); setShowModal(true); };
  const openEdit = (c: Customer) => {
    setForm({ name: c.name, email: c.email, phone: c.phone || "", company: c.company || "", address: c.address || "", city: c.city || "", state: c.state || "", zip: c.zip || "", notes: c.notes || "", type: c.type });
    setEditingId(c.id);
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editingId) {
        await updateCustomer(editingId, form);
      } else {
        await createCustomer(form);
      }
      setShowModal(false);
      await load();
    } catch {}
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this customer?")) return;
    try { await deleteCustomer(id); await load(); } catch {}
  };

  const filtered = filter === "all" ? customers : customers.filter(c => c.type === filter);

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-concrete">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#111]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button onClick={() => router.push("/admin")} className="flex items-center gap-2 text-concrete/50 hover:text-safety-amber transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <div className="h-6 w-px bg-white/10" />
              <h1 className="font-heading font-bold text-2xl uppercase tracking-tight flex items-center gap-3">
                <Users className="w-6 h-6 text-safety-amber" />
                Customers & Vendors
              </h1>
            </div>
            <button onClick={openNew} className="flex items-center gap-2 bg-safety-amber text-black px-5 py-3 rounded-xl font-heading font-bold text-sm uppercase tracking-wider hover:bg-safety-amber/90 transition-colors">
              <Plus className="w-4 h-4" /> Add New
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {(["all", "customer", "vendor", "both"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-lg font-heading font-bold text-xs uppercase tracking-wider transition-colors border ${filter === tab ? "bg-safety-amber/10 border-safety-amber/30 text-safety-amber" : "bg-white/5 border-white/10 text-concrete/60 hover:bg-white/10"}`}
            >
              {tab === "all" ? "All" : tab === "both" ? "Both" : tab.charAt(0).toUpperCase() + tab.slice(1)}s
              <span className="ml-2 opacity-60">({tab === "all" ? customers.length : customers.filter(c => c.type === tab).length})</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 animate-spin text-safety-amber" /></div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <Users className="w-16 h-16 text-concrete/20 mx-auto mb-4" />
            <p className="font-heading text-xl text-concrete/40">No customers yet</p>
            <button onClick={openNew} className="mt-4 text-safety-amber text-sm font-heading font-bold uppercase tracking-wider hover:underline">Add your first customer</button>
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map(c => (
              <div key={c.id} className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 flex items-center gap-4 hover:bg-white/[0.05] transition-colors">
                <div className="w-10 h-10 rounded-full bg-safety-amber/10 flex items-center justify-center text-safety-amber font-bold text-sm shrink-0">
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="font-heading font-bold text-concrete truncate">{c.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${c.type === "vendor" ? "bg-purple-500/10 text-purple-400 border-purple-500/20" : c.type === "both" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"}`}>
                      {c.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-concrete/50">
                    {c.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{c.email}</span>}
                    {c.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{c.phone}</span>}
                    {c.company && <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{c.company}</span>}
                    {c.city && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{c.city}, {c.state}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(c)} className="p-2 rounded-lg hover:bg-white/10 text-concrete/40 hover:text-safety-amber transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-concrete/40 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setShowModal(false)}>
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="font-heading font-bold text-xl uppercase tracking-tight">{editingId ? "Edit" : "New"} Customer</h2>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-lg hover:bg-white/10 text-concrete/40"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block font-mono text-[10px] text-concrete/40 uppercase tracking-widest mb-1.5">Name *</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete focus:outline-none focus:border-safety-amber/40 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-concrete/40 uppercase tracking-widest mb-1.5">Email</label>
                  <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete focus:outline-none focus:border-safety-amber/40 transition-colors" />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-concrete/40 uppercase tracking-widest mb-1.5">Phone</label>
                  <input value={form.phone || ""} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete focus:outline-none focus:border-safety-amber/40 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block font-mono text-[10px] text-concrete/40 uppercase tracking-widest mb-1.5">Company</label>
                <input value={form.company || ""} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete focus:outline-none focus:border-safety-amber/40 transition-colors" />
              </div>
              <div>
                <label className="block font-mono text-[10px] text-concrete/40 uppercase tracking-widest mb-1.5">Address</label>
                <input value={form.address || ""} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete focus:outline-none focus:border-safety-amber/40 transition-colors" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-concrete/40 uppercase tracking-widest mb-1.5">City</label>
                  <input value={form.city || ""} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete focus:outline-none focus:border-safety-amber/40 transition-colors" />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-concrete/40 uppercase tracking-widest mb-1.5">State</label>
                  <input value={form.state || ""} onChange={e => setForm(f => ({ ...f, state: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete focus:outline-none focus:border-safety-amber/40 transition-colors" />
                </div>
                <div>
                  <label className="block font-mono text-[10px] text-concrete/40 uppercase tracking-widest mb-1.5">ZIP</label>
                  <input value={form.zip || ""} onChange={e => setForm(f => ({ ...f, zip: e.target.value }))} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete focus:outline-none focus:border-safety-amber/40 transition-colors" />
                </div>
              </div>
              <div>
                <label className="block font-mono text-[10px] text-concrete/40 uppercase tracking-widest mb-1.5">Type</label>
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as Customer["type"] }))} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete focus:outline-none focus:border-safety-amber/40 transition-colors">
                  <option value="customer">Customer</option>
                  <option value="vendor">Vendor</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div>
                <label className="block font-mono text-[10px] text-concrete/40 uppercase tracking-widest mb-1.5">Notes</label>
                <textarea value={form.notes || ""} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-concrete focus:outline-none focus:border-safety-amber/40 transition-colors resize-none" />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-white/10">
              <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl border border-white/10 text-concrete/60 font-heading font-bold text-sm uppercase tracking-wider hover:bg-white/5 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={!form.name || saving} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-safety-amber text-black font-heading font-bold text-sm uppercase tracking-wider hover:bg-safety-amber/90 transition-colors disabled:opacity-50">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {editingId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
