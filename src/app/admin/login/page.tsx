"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/admin-auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                router.push("/admin");
            } else {
                setError("Invalid password");
                setPassword("");
            }
        } catch {
            setError("Connection error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-safety-amber/10 border border-safety-amber/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-7 h-7 text-safety-amber" />
                    </div>
                    <h1 className="font-heading font-bold text-2xl text-concrete uppercase tracking-tight">
                        Admin Access
                    </h1>
                    <p className="font-mono text-xs text-concrete/40 mt-1 tracking-wide">
                        Crownwood Chemicals
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            autoFocus
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 font-mono text-concrete placeholder:text-concrete/30 focus:outline-none focus:border-safety-amber/40 focus:ring-1 focus:ring-safety-amber/20 transition-colors"
                        />
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-400 font-mono text-sm px-1">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !password}
                        className="w-full bg-safety-amber/10 border border-safety-amber/30 text-safety-amber font-heading font-bold uppercase tracking-wider py-3.5 rounded-xl hover:bg-safety-amber/20 transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            "Unlock"
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
}
