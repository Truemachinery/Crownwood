"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".manifesto-text", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 75%",
            },
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out"
        });

        gsap.from(".manifesto-heading", {
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
            },
            y: 80,
            opacity: 0,
            rotationX: -10,
            duration: 1.5,
            ease: "power4.out"
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-40 px-6 md:px-12 lg:px-24 bg-asphalt flex flex-col items-center justify-center text-center relative pointer-events-none perspective-[1200px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,149,0,0.03)_0%,transparent_70%)]" />
            <div className="max-w-6xl relative z-10">
                <p className="manifesto-text font-sans text-concrete/70 text-xl md:text-3xl mb-12 tracking-wide font-medium max-w-4xl mx-auto leading-relaxed">
                    Most contractors rely on toxic, outdated chemicals and endless water waste.
                </p>
                <h2 className="manifesto-heading font-drama italic text-5xl md:text-8xl lg:text-[7.5rem] text-safety-amber leading-[1.05] tracking-tight drop-shadow-2xl">
                    We engineer permanent, eco-friendly stabilization and unrivaled construction precision.
                </h2>
            </div>
        </section>
    );
}
