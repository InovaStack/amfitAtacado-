"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Sparkles, ShieldCheck, Truck, RefreshCw, Zap } from "lucide-react";
import { CAMPAIGNS } from "@/data/products";
import { useCart } from "@/context/CartContext";

export const HeroBanner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { setMode } = useCart();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAMPAIGNS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % CAMPAIGNS.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + CAMPAIGNS.length) % CAMPAIGNS.length);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Main Banner Slider */}
      <div className="relative w-full h-[500px] sm:h-[580px] lg:h-[640px] bg-zinc-950">
        {CAMPAIGNS.map((campaign, idx) => (
          <div
            key={campaign.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Background Image with Dark Vignette */}
            <div className="absolute inset-0">
              <Image
                src={campaign.image}
                alt={campaign.title}
                fill
                priority={idx === 0}
                className="object-cover object-center filter brightness-[0.78]"
              />
              {/* Gradient Overlays: crisp white-to-dark contrast & magenta glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
            </div>

            {/* Slide Content */}
            <div className="relative z-20 h-full w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex flex-col justify-center items-start">
              <div className="max-w-xl space-y-4">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-am-magenta animate-ping" />
                  <span className="text-am-magenta font-black">{campaign.tag}</span>
                  <span className="text-zinc-300">• {campaign.badge}</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-none drop-shadow-md">
                  {campaign.title.split("&").map((part, i) => (
                    <span key={i}>
                      {i > 0 && <span className="text-am-magenta"> & </span>}
                      {part}
                    </span>
                  ))}
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed">
                  {campaign.subtitle}
                </p>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                  <a
                    href={campaign.ctaLink}
                    className="px-7 py-3.5 bg-am-magenta hover:bg-am-magenta-dark text-white rounded-full font-extrabold text-sm uppercase tracking-wider transition-all transform hover:scale-105 shadow-magenta flex items-center gap-2"
                  >
                    <span>{campaign.ctaText}</span>
                    <Sparkles size={16} />
                  </a>

                  <button
                    onClick={() => {
                      setMode("atacado");
                      const el = document.getElementById("atacado");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-6 py-3.5 bg-white text-am-black hover:bg-zinc-100 rounded-full font-bold text-sm tracking-wider transition-all transform hover:scale-105 border border-white/30"
                  >
                    TABELA DE ATACADO
                  </button>
                </div>

              </div>
            </div>
          </div>
        ))}

        {/* Carousel Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white text-white hover:text-am-black backdrop-blur-md flex items-center justify-center transition-all border border-white/20"
          aria-label="Slide anterior"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white text-white hover:text-am-black backdrop-blur-md flex items-center justify-center transition-all border border-white/20"
          aria-label="Próximo slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {CAMPAIGNS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-8 bg-am-magenta" : "w-2.5 bg-white/50 hover:bg-white"
              }`}
              aria-label={`Ir para banner ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Trust & Benefits Bar */}
      <div className="bg-white border-b border-am-gray-200 py-6 px-4 sm:px-6 lg:px-8 xl:px-10 shadow-sm">
        <div className="w-full max-w-[1720px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-am-magenta-light text-am-magenta flex items-center justify-center flex-shrink-0">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-am-black">Envio para Todo o Brasil</h4>
              <p className="text-[11px] sm:text-xs text-zinc-500">Frete grátis a partir de R$ 299</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-zinc-100 text-am-black flex items-center justify-center flex-shrink-0">
              <Zap size={24} className="text-am-magenta" />
            </div>
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-am-black">Preço de Fábrica</h4>
              <p className="text-[11px] sm:text-xs text-zinc-500">Lucro de até 120% na revenda</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-am-magenta-light text-am-magenta flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-am-black">Zero Transparência</h4>
              <p className="text-[11px] sm:text-xs text-zinc-500">Tecidos premium de alta gramatura</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-zinc-100 text-am-black flex items-center justify-center flex-shrink-0">
              <RefreshCw size={24} />
            </div>
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-am-black">1ª Troca Grátis</h4>
              <p className="text-[11px] sm:text-xs text-zinc-500">Até 7 dias após o recebimento</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
