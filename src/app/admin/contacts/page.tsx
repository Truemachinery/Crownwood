"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import { Users, Building2, MapPin, ChevronRight, Mail, Phone, Globe, ShieldCheck, MailWarning, Loader2, ArrowLeft, Building, Users2, Database } from "lucide-react";

interface State {
    id: number;
    name: string;
    abbreviation: string;
}

interface EntityData {
    entity_name: string;
    entity_type: "county" | "city";
    contact_count: number;
}

interface Contact {
    id: string;
    created_at: string;
    entity_name: string;
    entity_type: string;
    department: string | null;
    contact_name: string | null;
    title: string | null;
    email: string;
    phone: string | null;
    website_url: string | null;
    verified: boolean;
    confidence: string | null;
    dept_relevance: number | null;
    campaign_status: string;
}

export default function ContactsExplorerPage() {
    const router = useRouter();

    const [states, setStates] = useState<State[]>([]);
    const [selectedState, setSelectedState] = useState<State | null>(null);

    const [entities, setEntities] = useState<EntityData[]>([]);
    const [selectedEntityType, setSelectedEntityType] = useState<"county" | "city">("county");
    const [selectedEntityName, setSelectedEntityName] = useState<string | null>(null);

    const [contacts, setContacts] = useState<Contact[]>([]);

    const [loadingStates, setLoadingStates] = useState(true);
    const [loadingEntities, setLoadingEntities] = useState(false);
    const [loadingContacts, setLoadingContacts] = useState(false);

    // 1. Fetch States
    useEffect(() => {
        const fetchStates = async () => {
            setLoadingStates(true);
            const supabase = getSupabase();
            const { data, error } = await supabase
                .from("states")
                .select("id, name, abbreviation")
                .order("name");

            if (!error && data) {
                setStates(data);
                if (data.length > 0) {
                    // Try to default to Texas if available
                    const tx = data.find(s => s.abbreviation === "TX");
                    setSelectedState(tx || data[0]);
                }
            }
            setLoadingStates(false);
        };
        fetchStates();
    }, []);

    // 2. Fetch Entities when State changes
    useEffect(() => {
        if (!selectedState) return;

        const fetchEntities = async () => {
            setLoadingEntities(true);
            setSelectedEntityName(null);
            setContacts([]);

            const supabase = getSupabase();
            // We use RPC if available, but a fast way is to query municipal_contacts directly
            // Note: Since Supabase select doesn't natively support DISTINCT on standard query easily without PostgREST hacks,
            // we'll fetch the entities associated with the state, or via a view if we had one.
            // Using a workaround: fetch contact counts grouped by entity
            // Using rpc if we had it, but without it:

            // To group by purely in client from a large table could be heavy, 
            // but let's query the table for all entity_name and entity_type in the state 
            // and reduce client-side for simplicity. 
            // In a million-row table, this requires an RPC or View.

            // Temporary simple fetch (limit 10000)
            const { data, error } = await supabase
                .from("municipal_contacts")
                .select("entity_name, entity_type")
                .eq("state_id", selectedState.id)
                .limit(20000);

            if (!error && data) {
                const grouped = data.reduce((acc, curr) => {
                    const key = `${curr.entity_type}-${curr.entity_name}`;
                    if (!acc[key]) {
                        acc[key] = {
                            entity_name: curr.entity_name,
                            entity_type: curr.entity_type as "county" | "city",
                            contact_count: 0
                        };
                    }
                    acc[key].contact_count++;
                    return acc;
                }, {} as Record<string, EntityData>);

                const entitiesList = Object.values(grouped).sort((a, b) => a.entity_name.localeCompare(b.entity_name));
                setEntities(entitiesList);
            }
            setLoadingEntities(false);
        };
        fetchEntities();
    }, [selectedState]);

    // 3. Fetch Contacts when Entity changes
    useEffect(() => {
        if (!selectedState || !selectedEntityName) return;

        const fetchContacts = async () => {
            setLoadingContacts(true);
            const supabase = getSupabase();
            const { data, error } = await supabase
                .from("municipal_contacts")
                .select("*")
                .eq("state_id", selectedState.id)
                .eq("entity_type", selectedEntityType)
                .eq("entity_name", selectedEntityName)
                .order("dept_relevance", { ascending: false, nullsFirst: false });

            if (!error && data) {
                setContacts(data);
            }
            setLoadingContacts(false);
        };
        fetchContacts();
    }, [selectedState, selectedEntityName, selectedEntityType]);

    const filteredEntities = entities.filter(e => e.entity_type === selectedEntityType);

    const getConfidenceColor = (conf: string | null) => {
        switch (conf) {
            case "high": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            case "medium": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
            case "low": return "bg-red-500/10 text-red-400 border-red-500/20";
            default: return "bg-white/5 text-concrete/50 border-white/10";
        }
    };

    return (
        <main className="min-h-screen bg-[#0A0A0A] text-concrete flex flex-col">
            {/* Header */}
            <div className="border-b border-white/10 bg-[#111] shrink-0">
                <div className="max-w-screen-2xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => router.push("/admin")}
                                className="flex items-center gap-2 text-concrete/50 hover:text-safety-amber transition-colors font-sans text-sm"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Inquiries
                            </button>
                            <div className="h-6 w-px bg-white/10" />
                            <h1 className="font-heading font-bold text-xl uppercase tracking-tight flex items-center gap-3">
                                <Database className="w-6 h-6 text-safety-amber" />
                                Municipal Contacts Explorer
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-screen-2xl mx-auto w-full flex flex-col md:flex-row gap-6 p-6 min-h-0 overflow-hidden">
                {/* Left Column: State & Entity Selection */}
                <div className="w-full md:w-80 flex flex-col gap-6 shrink-0 h-full">
                    {/* States Select */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 shrink-0">
                        <p className="font-mono text-xs text-concrete/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <MapPin className="w-3 h-3" /> State Selection
                        </p>
                        {loadingStates ? (
                            <div className="flex items-center gap-2 text-concrete/50 text-sm">
                                <Loader2 className="w-4 h-4 animate-spin" /> Loading states...
                            </div>
                        ) : (
                            <select
                                className="w-full bg-black border border-white/20 rounded-lg p-2.5 text-sm font-sans focus:outline-none focus:border-safety-amber transition-colors"
                                value={selectedState?.id || ""}
                                onChange={(e) => {
                                    const s = states.find(st => st.id === parseInt(e.target.value));
                                    if (s) setSelectedState(s);
                                }}
                            >
                                {states.map(s => (
                                    <option key={s.id} value={s.id}>{s.name} ({s.abbreviation})</option>
                                ))}
                            </select>
                        )}
                    </div>

                    {/* Entities List */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl flex flex-col flex-1 min-h-0">
                        <div className="p-4 border-b border-white/10 shrink-0">
                            <p className="font-mono text-xs text-concrete/40 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Building className="w-3 h-3" /> Target Entities
                            </p>
                            <div className="flex bg-black/50 p-1 rounded-lg">
                                <button
                                    onClick={() => { setSelectedEntityType("county"); setSelectedEntityName(null); }}
                                    className={`flex-1 py-1.5 text-sm rounded-md transition-colors ${selectedEntityType === "county" ? "bg-white/10 font-bold" : "text-concrete/50 hover:text-concrete"}`}
                                >
                                    Counties
                                </button>
                                <button
                                    onClick={() => { setSelectedEntityType("city"); setSelectedEntityName(null); }}
                                    className={`flex-1 py-1.5 text-sm rounded-md transition-colors ${selectedEntityType === "city" ? "bg-white/10 font-bold" : "text-concrete/50 hover:text-concrete"}`}
                                >
                                    Cities
                                </button>
                            </div>
                        </div>

                        <div className="overflow-y-auto flex-1 p-2 custom-scrollbar">
                            {loadingEntities ? (
                                <div className="flex items-center justify-center py-10 text-concrete/50">
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                </div>
                            ) : filteredEntities.length === 0 ? (
                                <p className="text-center text-sm text-concrete/40 py-10">No {selectedEntityType} data</p>
                            ) : (
                                <div className="space-y-1">
                                    {filteredEntities.map(eng => (
                                        <button
                                            key={eng.entity_name}
                                            onClick={() => setSelectedEntityName(eng.entity_name)}
                                            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all text-left ${selectedEntityName === eng.entity_name ? "bg-safety-amber/10 border border-safety-amber/20" : "hover:bg-white/5 border border-transparent"}`}
                                        >
                                            <span className={`text-sm truncate pr-2 ${selectedEntityName === eng.entity_name ? "font-bold text-safety-amber" : "text-concrete/80"}`}>
                                                {eng.entity_name}
                                            </span>
                                            <span className="shrink-0 bg-black/50 text-concrete/60 font-mono text-xs px-2 py-0.5 rounded-full border border-white/5">
                                                {eng.contact_count}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Contacts Data Table */}
                <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl flex flex-col min-h-0">
                    <div className="p-6 border-b border-white/10 shrink-0">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="font-heading font-bold text-2xl">
                                    {selectedEntityName ? `${selectedEntityName} Contacts` : "Select an Entity"}
                                </h2>
                                <p className="font-sans text-sm text-concrete/50 mt-1">
                                    {selectedEntityName
                                        ? `Showing ${contacts.length} discovered personnel contacts`
                                        : "Select a county or city to view available targets."}
                                </p>
                            </div>
                            {selectedEntityName && (
                                <div className="flex items-center gap-2">
                                    <div className="bg-black/50 border border-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
                                        <Users2 className="w-4 h-4 text-safety-amber" />
                                        <span className="font-mono text-sm">{contacts.length} Total</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 overflow-auto custom-scrollbar">
                        {loadingContacts ? (
                            <div className="flex flex-col items-center justify-center h-full text-concrete/40 gap-3">
                                <Loader2 className="w-8 h-8 animate-spin text-safety-amber" />
                                <p className="font-sans text-sm">Loading contacts...</p>
                            </div>
                        ) : !selectedEntityName ? (
                            <div className="flex flex-col items-center justify-center h-full text-concrete/20 gap-4">
                                <Building2 className="w-16 h-16" />
                                <p className="font-heading text-lg">Select an entity to explore mapped contacts</p>
                            </div>
                        ) : contacts.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-concrete/40">
                                No contacts found for {selectedEntityName}.
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead className="bg-[#111] sticky top-0 z-10">
                                    <tr>
                                        <th className="p-4 font-mono text-xs text-concrete/40 uppercase tracking-widest font-normal border-b border-white/10">Contact details</th>
                                        <th className="p-4 font-mono text-xs text-concrete/40 uppercase tracking-widest font-normal border-b border-white/10">Department & Title</th>
                                        <th className="p-4 font-mono text-xs text-concrete/40 uppercase tracking-widest font-normal border-b border-white/10">Rel</th>
                                        <th className="p-4 font-mono text-xs text-concrete/40 uppercase tracking-widest font-normal border-b border-white/10">Conf</th>
                                        <th className="p-4 font-mono text-xs text-concrete/40 uppercase tracking-widest font-normal border-b border-white/10 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.05]">
                                    {contacts.map(c => (
                                        <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="p-4">
                                                <div className="flex items-start flex-col gap-1">
                                                    <span className="font-bold text-concrete">{c.contact_name || "Unknown Name"}</span>
                                                    <a href={`mailto:${c.email}`} className="text-sm font-sans text-safety-amber hover:underline flex items-center gap-1.5">
                                                        <Mail className="w-3 h-3" /> {c.email}
                                                    </a>
                                                    {c.phone && <span className="text-xs text-concrete/50 flex items-center gap-1"><Phone className="w-3 h-3" /> {c.phone}</span>}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="font-medium text-sm text-concrete/80 flex items-center gap-1.5">
                                                        {c.department && <Building2 className="w-3 h-3 text-concrete/40" />}
                                                        {c.department || "General"}
                                                    </span>
                                                    {c.title && <span className="text-xs text-concrete/50 flex items-center gap-1"><Users className="w-3 h-3" /> {c.title}</span>}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono ${c.dept_relevance && c.dept_relevance >= 8 ? 'bg-safety-amber/20 text-safety-amber border border-safety-amber/50' : 'bg-white/5 text-concrete/50'}`}>
                                                    {c.dept_relevance || 0}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-mono uppercase tracking-wider border flex items-center gap-1 inline-flex ${getConfidenceColor(c.confidence)}`}>
                                                    {c.confidence === "high" && <ShieldCheck className="w-3 h-3" />}
                                                    {c.confidence || "Unknown"}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <span className={`px-3 py-1 rounded-md text-xs font-mono tracking-wider border ${c.campaign_status === 'sent' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-white/5 border-white/10 text-concrete/40'}`}>
                                                    {c.campaign_status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
            `}} />
        </main>
    );
}

