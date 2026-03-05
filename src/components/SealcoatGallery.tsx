"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
    {
        src: "/images/sealcoat-gallery-1.png",
        alt: "Industrial worker applying jet-black sealcoat to commercial parking lot edge",
        caption: "Precision Edge Work"
    },
    {
        src: "/images/sealcoat-gallery-2.png",
        alt: "Aerial before-and-after shot of a massive sealcoating project",
        caption: "High-Contrast Finish"
    },
    {
        src: "/images/sealcoat-gallery-3.png",
        alt: "Macro texture shot of wet sealcoat filling asphalt voids",
        caption: "Micro-Void Deep Seal"
    },
    {
        src: "/images/sealcoat-gallery-4.png",
        alt: "Line striping machine painting yellow safety lines over fresh sealcoat",
        caption: "Vibrant Safety Striping"
    }
];

export function SealcoatGallery() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const images = gsap.utils.toArray('.gallery-image-container');

        images.forEach((img: any, i) => {
            gsap.from(img, {
                scrollTrigger: {
                    trigger: img,
                    start: "top 85%",
                },
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: (i % 2) * 0.2
            });
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 px-6 md:px-12 lg:px-24 bg-asphalt relative border-t border-white/5">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 text-concrete rounded-full font-mono text-xs uppercase tracking-widest mb-4">
                            <Camera className="w-4 h-4 text-safety-amber" />
                            Visual Verification
                        </div>
                        <h2 className="font-heading font-bold text-4xl md:text-5xl text-concrete uppercase tracking-tight">
                            The Crownwood <span className="text-safety-amber">Finish</span>
                        </h2>
                    </div>
                    <p className="font-sans text-lg text-concrete/70 max-w-xl text-left md:text-right">
                        We don't water down our product. Our jet-black emulsion restores oxidized binders, protects against UV breakdown, and delivers an undeniable visual impact to your commercial asset.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {GALLERY_IMAGES.map((img, idx) => (
                        <div key={idx} className="gallery-image-container group relative rounded-[2rem] overflow-hidden bg-white/5 shadow-2xl border border-white/10 aspect-[4/3]">
                            <img
                                src={img.src}
                                alt={img.alt}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-asphalt to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                            {/* Caption */}
                            <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="font-mono text-xs text-safety-amber uppercase tracking-widest mb-2">Asset Protection</div>
                                <h3 className="font-heading font-bold text-2xl text-concrete uppercase">{img.caption}</h3>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
