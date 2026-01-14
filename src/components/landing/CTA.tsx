"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-background to-background -z-10" />
      
      {/* Glow Effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/40 blur-[100px] rounded-full -z-10 opacity-50" />

      <div ref={contentRef} className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight leading-tight">
          今すぐディスコードサーバーに<br className="md:hidden" />
          GAMERSを入れてみて下さい！
        </h2>
        
        <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
          数千のコミュニティが愛用するツールを、今すぐ体験しましょう。
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group relative px-12 py-6 bg-white text-black font-black text-xl md:text-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_60px_rgba(124,58,237,0.6)] ring-4 ring-transparent hover:ring-primary/20">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <span className="relative flex items-center gap-3">
                    無料で始める <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
            </button>
        </div>
        
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span>クレジットカード登録不要</span>
        </div>

      </div>
    </section>
  );
}
