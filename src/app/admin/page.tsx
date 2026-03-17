"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import { Inbox, Clock, CheckCircle, Mail, Phone, Building2, FileText, ExternalLink, RefreshCw, Loader2, Eye, ChevronDown, ChevronUp, LogOut, Database, Receipt, ShoppingCart, CreditCard, Users } from "lucide-react";

interface Inquiry {
    id: string;
    created_at: string;
    name: string;
    email: string;
    phone: string | null;
    company: string | null;
    message: string;
    service: string;
    service_path: string | null;
    status: "new" | "contacted" | "closed";
}

const STATUS_CONFIG = {
    new: { label: "New", color: "bg-blue-500/10 text-blue-400 border-blue-500/20", icon: Clock },
    contacted: { label: "Contacted", color: "bg-amber-500/10 text-amber-400 border-amber-500/20", icon: Mail },
    closed: { label: "Closed", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", icon: CheckCircle },
};

export default function AdminPage() {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [filter, setFilter] = useState<"all" | "new" | "contacted" | "closed">("all");
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/admin-auth", { method: "DELETE" });
        router.push("/admin/login");
    };

    const fetchInquiries = async () => {
        setLoading(true);
        const supabase = getSupabase();
        const { data, error } = await supabase
            .from("inquiries")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) {
            setInquiries(data as Inquiry[]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const updateStatus = async (id: string, newStatus: Inquiry["status"]) => {
        setUpdatingId(id);
        const supabase = getSupabase();
        const { error } = await supabase
            .from("inquiries")
            .update({ status: newStatus })
            .eq("id", id);

        if (!error) {
            setInquiries(prev => prev.map(inq =>
                inq.id === id ? { ...inq, status: newStatus } : inq
            ));
        }
        setUpdatingId(null);
    };

    const filtered = filter === "all" ? inquiries : inquiries.filter(i => i.status === filter);

    const counts = {
        all: inquiries.length,
        new: inquiries.filter(i => i.status === "new").length,
        contacted: inquiries.filter(i => i.status === "contacted").length,
        closed: inquiries.filter(i => i.status === "closed").length,
    };

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    };

    return (
        <main className="min-h-screen bg-[#0A0A0A] text-concrete">
            {/* Header */}
            <div className="border-b border-white/10 bg-[#111]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="font-heading font-bold text-3xl uppercase tracking-tight flex items-center gap-3">
                                    <Inbox className="w-8 h-8 text-safety-amber" />
                                    Admin Dashboard
                                </h1>
                                <p className="font-mono text-sm text-concrete/50 mt-1 tracking-wide">
                                    Crownwood Chemicals — Management Hub
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={fetchInquiries}
                                    disabled={loading}
                                    className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider hover:bg-white/10 transition-colors disabled:opacity-50"
                                >
                                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                                    Refresh
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-red-500/5 border border-red-500/20 px-3 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition-colors"
                                >
                                    <LogOut className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                        {/* Accounting Nav */}
                        <div className="flex gap-2 flex-wrap">
                            <button onClick={() => router.push("/admin/quotes")} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-concrete/70 hover:bg-white/10 hover:text-safety-amber transition-colors">
                                <FileText className="w-3.5 h-3.5" /> Quotes
                            </button>
                            <button onClick={() => router.push("/admin/invoices")} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-concrete/70 hover:bg-white/10 hover:text-safety-amber transition-colors">
                                <Receipt className="w-3.5 h-3.5" /> Invoices
                            </button>
                            <button onClick={() => router.push("/admin/purchase-orders")} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-concrete/70 hover:bg-white/10 hover:text-safety-amber transition-colors">
                                <ShoppingCart className="w-3.5 h-3.5" /> Purchase Orders
                            </button>
                            <button onClick={() => router.push("/admin/bills")} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-concrete/70 hover:bg-white/10 hover:text-safety-amber transition-colors">
                                <CreditCard className="w-3.5 h-3.5" /> Bills
                            </button>
                            <button onClick={() => router.push("/admin/customers")} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-concrete/70 hover:bg-white/10 hover:text-safety-amber transition-colors">
                                <Users className="w-3.5 h-3.5" /> Customers
                            </button>
                            <div className="w-px h-8 bg-white/10 self-center mx-1" />
                            <button onClick={() => router.push("/admin/contacts")} className="flex items-center gap-2 bg-safety-amber/10 border border-safety-amber/20 px-4 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider text-safety-amber hover:bg-safety-amber/20 transition-colors">
                                <Database className="w-3.5 h-3.5" /> Municipal Contacts
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-8">
                {/* Filter tabs */}
                <div className="flex gap-2 mb-8 flex-wrap">
                    {(["all", "new", "contacted", "closed"] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={`px-5 py-2.5 rounded-xl font-heading font-bold text-sm uppercase tracking-wider transition-colors border ${filter === tab
                                ? 'bg-safety-amber/10 border-safety-amber/30 text-safety-amber'
                                : 'bg-white/5 border-white/10 text-concrete/60 hover:bg-white/10'
                                }`}
                        >
                            {tab === "all" ? "All" : STATUS_CONFIG[tab].label}
                            <span className="ml-2 text-xs opacity-60">({counts[tab]})</span>
                        </button>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <p className="font-mono text-xs text-concrete/40 uppercase tracking-widest mb-1">Total</p>
                        <p className="font-heading font-bold text-3xl">{counts.all}</p>
                    </div>
                    <div className="bg-blue-500/5 border border-blue-500/10 rounded-2xl p-5">
                        <p className="font-mono text-xs text-blue-400/60 uppercase tracking-widest mb-1">New</p>
                        <p className="font-heading font-bold text-3xl text-blue-400">{counts.new}</p>
                    </div>
                    <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-5">
                        <p className="font-mono text-xs text-amber-400/60 uppercase tracking-widest mb-1">Contacted</p>
                        <p className="font-heading font-bold text-3xl text-amber-400">{counts.contacted}</p>
                    </div>
                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-5">
                        <p className="font-mono text-xs text-emerald-400/60 uppercase tracking-widest mb-1">Closed</p>
                        <p className="font-heading font-bold text-3xl text-emerald-400">{counts.closed}</p>
                    </div>
                </div>

                {/* Inquiry list */}
                {loading ? (
                    <div className="flex items-center justify-center py-24">
                        <Loader2 className="w-8 h-8 animate-spin text-safety-amber" />
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-24">
                        <Inbox className="w-16 h-16 text-concrete/20 mx-auto mb-4" />
                        <p className="font-heading text-xl text-concrete/40">No inquiries yet</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filtered.map((inq) => {
                            const expanded = expandedId === inq.id;
                            const statusCfg = STATUS_CONFIG[inq.status];
                            const StatusIcon = statusCfg.icon;

                            return (
                                <div key={inq.id} className={`bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden transition-colors ${inq.status === "new" ? "border-l-2 border-l-blue-400" : ""}`}>
                                    {/* Row header */}
                                    <button
                                        onClick={() => setExpandedId(expanded ? null : inq.id)}
                                        className="w-full flex items-center gap-4 p-5 text-left hover:bg-white/[0.02] transition-colors"
                                    >
                                        <div className={`px-3 py-1.5 rounded-lg border text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shrink-0 ${statusCfg.color}`}>
                                            <StatusIcon className="w-3 h-3" />
                                            {statusCfg.label}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3 flex-wrap">
                                                <span className="font-heading font-bold text-concrete truncate">{inq.name}</span>
                                                <span className="font-mono text-xs text-safety-amber/80 bg-safety-amber/10 px-2 py-0.5 rounded">{inq.service}</span>
                                            </div>
                                            <p className="font-sans text-sm text-concrete/40 truncate mt-0.5">
                                                {inq.message}
                                            </p>
                                        </div>

                                        <span className="font-mono text-xs text-concrete/30 shrink-0 hidden md:block">
                                            {formatDate(inq.created_at)}
                                        </span>

                                        {expanded ? <ChevronUp className="w-4 h-4 text-concrete/30 shrink-0" /> : <ChevronDown className="w-4 h-4 text-concrete/30 shrink-0" />}
                                    </button>

                                    {/* Expanded details */}
                                    {expanded && (
                                        <div className="px-5 pb-5 border-t border-white/5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-5">
                                                <div className="space-y-3">
                                                    <div className="flex items-center gap-3">
                                                        <Mail className="w-4 h-4 text-concrete/30" />
                                                        <a href={`mailto:${inq.email}`} className="font-sans text-safety-amber hover:underline">{inq.email}</a>
                                                    </div>
                                                    {inq.phone && (
                                                        <div className="flex items-center gap-3">
                                                            <Phone className="w-4 h-4 text-concrete/30" />
                                                            <a href={`tel:${inq.phone}`} className="font-sans text-concrete/80 hover:underline">{inq.phone}</a>
                                                        </div>
                                                    )}
                                                    {inq.company && (
                                                        <div className="flex items-center gap-3">
                                                            <Building2 className="w-4 h-4 text-concrete/30" />
                                                            <span className="font-sans text-concrete/80">{inq.company}</span>
                                                        </div>
                                                    )}
                                                    {inq.service_path && (
                                                        <div className="flex items-center gap-3">
                                                            <ExternalLink className="w-4 h-4 text-concrete/30" />
                                                            <span className="font-mono text-xs text-concrete/40">{inq.service_path}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-start gap-3 pt-1">
                                                        <FileText className="w-4 h-4 text-concrete/30 mt-0.5 shrink-0" />
                                                        <p className="font-sans text-concrete/70 text-sm whitespace-pre-wrap">{inq.message}</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col justify-between">
                                                    <div>
                                                        <p className="font-mono text-xs text-concrete/30 uppercase tracking-widest mb-2">Update Status</p>
                                                        <div className="flex gap-2 flex-wrap">
                                                            {(["new", "contacted", "closed"] as const).map(s => (
                                                                <button
                                                                    key={s}
                                                                    onClick={() => updateStatus(inq.id, s)}
                                                                    disabled={inq.status === s || updatingId === inq.id}
                                                                    className={`px-4 py-2 rounded-lg border text-xs font-heading font-bold uppercase tracking-wider transition-colors disabled:opacity-30 ${STATUS_CONFIG[s].color} hover:opacity-80`}
                                                                >
                                                                    {updatingId === inq.id ? <Loader2 className="w-3 h-3 animate-spin" /> : STATUS_CONFIG[s].label}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <p className="font-mono text-xs text-concrete/20 mt-4 md:text-right">
                                                        ID: {inq.id.slice(0, 8)} • {formatDate(inq.created_at)}
                                                    </p>
                                                </div>
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
