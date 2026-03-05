"use client";

import { useState, useRef } from "react";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface ContactFormProps {
    /** The service/product page this form lives on (e.g. "Permabase Black™") */
    service: string;
    /** The URL path slug for reference (e.g. "/chemicals/permabase-black") */
    servicePath: string;
    /** Optional accent color class, defaults to safety-amber */
    accentClass?: string;
    /** Dark mode variant for dark background sections */
    darkMode?: boolean;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm({ service, servicePath, accentClass = "safety-amber", darkMode = false }: ContactFormProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<FormStatus>("idle");
    const [errorMsg, setErrorMsg] = useState("");
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMsg("");

        try {
            const res = await fetch("/api/inquiries", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    service,
                    service_path: servicePath,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Something went wrong");
            }

            setStatus("success");
            setFormData({ name: "", email: "", phone: "", company: "", message: "" });
        } catch (err: any) {
            setStatus("error");
            setErrorMsg(err.message || "Failed to submit. Please try again.");
        }
    };

    const textColor = darkMode ? "text-concrete" : "text-industrial";
    const subtextColor = darkMode ? "text-concrete/60" : "text-industrial/50";
    const inputBg = darkMode ? "bg-white/5 border-white/10 text-concrete placeholder:text-concrete/30" : "bg-white border-black/10 text-industrial placeholder:text-industrial/30";
    const inputFocus = darkMode ? "focus:border-safety-amber/50 focus:ring-safety-amber/20" : "focus:border-safety-amber focus:ring-safety-amber/20";

    if (status === "success") {
        return (
            <div className={`rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5'} p-12 text-center`}>
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-6" />
                <h3 className={`font-heading font-bold text-2xl ${textColor} uppercase tracking-tight mb-3`}>
                    Inquiry Received
                </h3>
                <p className={`font-sans text-lg ${subtextColor} mb-2`}>
                    Thank you for your interest in <strong className={textColor}>{service}</strong>.
                </p>
                <p className={`font-sans ${subtextColor}`}>
                    Our team will review your request and get back to you shortly.
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    className={`mt-8 font-mono text-sm text-${accentClass} uppercase tracking-widest hover:underline`}
                >
                    Submit Another Inquiry
                </button>
            </div>
        );
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className={`rounded-3xl border ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-black/5 shadow-xl'} p-8 md:p-10`}>
            {/* Service badge — shows which page they're on */}
            <div className="flex items-center gap-3 mb-8">
                <div className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-widest border ${darkMode ? 'bg-safety-amber/10 border-safety-amber/20 text-safety-amber' : 'bg-industrial/5 border-industrial/10 text-industrial/70'}`}>
                    Inquiring About: <strong className={darkMode ? 'text-safety-amber' : 'text-industrial'}>{service}</strong>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                    <label className={`block font-heading font-bold text-xs uppercase tracking-widest ${subtextColor} mb-2`}>
                        Full Name *
                    </label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Smith"
                        className={`w-full px-5 py-4 rounded-xl border ${inputBg} ${inputFocus} focus:ring-2 focus:outline-none transition-colors font-sans`}
                    />
                </div>
                <div>
                    <label className={`block font-heading font-bold text-xs uppercase tracking-widest ${subtextColor} mb-2`}>
                        Email Address *
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={`w-full px-5 py-4 rounded-xl border ${inputBg} ${inputFocus} focus:ring-2 focus:outline-none transition-colors font-sans`}
                    />
                </div>
                <div>
                    <label className={`block font-heading font-bold text-xs uppercase tracking-widest ${subtextColor} mb-2`}>
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(210) 555-0123"
                        className={`w-full px-5 py-4 rounded-xl border ${inputBg} ${inputFocus} focus:ring-2 focus:outline-none transition-colors font-sans`}
                    />
                </div>
                <div>
                    <label className={`block font-heading font-bold text-xs uppercase tracking-widest ${subtextColor} mb-2`}>
                        Company / Organization
                    </label>
                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="ABC Construction"
                        className={`w-full px-5 py-4 rounded-xl border ${inputBg} ${inputFocus} focus:ring-2 focus:outline-none transition-colors font-sans`}
                    />
                </div>
            </div>

            <div className="mb-6">
                <label className={`block font-heading font-bold text-xs uppercase tracking-widest ${subtextColor} mb-2`}>
                    Message / Project Details *
                </label>
                <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={`Tell us about your project — location, scope, timeline, or any questions about ${service}...`}
                    className={`w-full px-5 py-4 rounded-xl border ${inputBg} ${inputFocus} focus:ring-2 focus:outline-none transition-colors font-sans resize-none`}
                />
            </div>

            {status === "error" && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-5 py-3 mb-6 font-sans text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    {errorMsg}
                </div>
            )}

            <button
                type="submit"
                disabled={status === "submitting"}
                className={`w-full flex items-center justify-center gap-3 bg-safety-amber text-asphalt px-8 py-4 rounded-full font-heading font-bold text-lg uppercase tracking-wider hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-[0_0_30px_rgba(245,158,11,0.2)] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100`}
            >
                {status === "submitting" ? (
                    <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    <>
                        <Send className="w-5 h-5" />
                        Request Quote for {service}
                    </>
                )}
            </button>

            <p className={`text-center font-mono text-[11px] ${subtextColor} mt-4 tracking-wide`}>
                We typically respond within 24 hours.
            </p>
        </form>
    );
}
