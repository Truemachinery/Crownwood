"use client";

import { useState } from "react";
import { loginTimeclock } from "@/app/actions/timeclock";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

export function TimeclockAuth() {
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handlePress = (num: string) => {
        if (pin.length < 4) {
            setPin((prev) => prev + num);
            setError("");
        }
    };

    const handleBackspace = () => {
        setPin((prev) => prev.slice(0, -1));
        setError("");
    };

    const handleSubmit = async () => {
        if (pin.length !== 4) {
            setError("PIN must be 4 digits");
            return;
        }
        setLoading(true);
        const res = await loginTimeclock(pin);
        if (res.success) {
            router.refresh(); // Tells NextJS App Router to re-run the server component layout
        } else {
            setError(res.error || "Access Denied");
            setPin("");
            setLoading(false);
        }
    };

    return (
        <div className="bg-industrial border border-white/10 rounded-3xl p-8 shadow-2xl">
            {/* PIN Display */}
            <div className="flex justify-center gap-4 mb-8">
                {[0, 1, 2, 3].map((i) => (
                    <div
                        key={i}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${pin.length > i ? "bg-high-vis-yellow scale-110 shadow-[0_0_15px_rgba(230,255,0,0.5)]" : "bg-white/10"}`}
                    />
                ))}
            </div>

            {error && <p className="text-red-500 font-mono text-center text-xs uppercase tracking-widest mb-6 animate-pulse">{error}</p>}

            {/* Numpad */}
            <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                        key={num}
                        onClick={() => handlePress(num.toString())}
                        disabled={loading}
                        className="h-16 bg-white/5 hover:bg-white/10 active:bg-white/20 rounded-2xl font-bebas text-3xl text-concrete transition-colors flex items-center justify-center"
                    >
                        {num}
                    </button>
                ))}
                <button
                    onClick={handleBackspace}
                    disabled={loading}
                    className="h-16 bg-white/5 hover:bg-white/10 active:bg-white/20 rounded-2xl font-mono text-xs uppercase tracking-widest text-concrete/50 transition-colors flex items-center justify-center"
                >
                    DEL
                </button>
                <button
                    onClick={() => handlePress("0")}
                    disabled={loading}
                    className="h-16 bg-white/5 hover:bg-white/10 active:bg-white/20 rounded-2xl font-bebas text-3xl text-concrete transition-colors flex items-center justify-center"
                >
                    0
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={loading || pin.length < 4}
                    className="h-16 bg-safety-amber hover:bg-high-vis-yellow disabled:bg-white/10 disabled:text-white/30 text-asphalt rounded-2xl font-mono text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "ENTER"}
                </button>
            </div>

            <div className="mt-8 flex justify-center">
                <Lock className="w-4 h-4 text-white/20" />
            </div>
        </div>
    );
}
