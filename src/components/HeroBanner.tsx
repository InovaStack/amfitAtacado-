"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Truck, RefreshCw, Zap } from "lucide-react";
import { CAMPAIGNS } from "@/data/products";
import { useAdmin } from "@/context/AdminContext";

export const HeroBanner: React.FC = () => {
  const { banners } = useAdmin();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Active banners from admin or fallback to default campaigns
  const activeBanners = (banners && banners.length > 0)
    ? banners.filter((b) => (b.active ?? b.isActive ?? true))
    : [];

  const slideList = activeBanners.length > 0
    ? activeBanners.map((b) => ({
        id: b.id,
        tag: b.tag || (b.category ? b.category.toUpperCase() : "DESTAQUE"),
        badge: b.badge || "AM FIT Exclusivo",
        title: b.title,
        subtitle: b.subtitle || "",
        image: b.imageUrl || b.image || "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85",
        ctaText: b.ctaText || "VER COLEÇÃO",
        ctaLink: b.ctaLink || "/catalogo",
      }))
    : CAMPAIGNS;

  useEffect(() => {
    if (slideList.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideList.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slideList.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideList.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slideList.length) % slideList.length);

  return (
    <section className="bg-white">
      {/* Banner Container com layout contido e proporções modernas */}
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 pt-3 sm:pt-4">
        <div className="relative w-full h-[240px] sm:h-[310px] md:h-[350px] lg:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden bg-zinc-950 shadow-md">
          {slideList.map((campaign, idx) => (
            <div
              key={campaign.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === currentSlide ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={campaign.image || "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85"}
                  alt={campaign.title}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1440px) 100vw, 1720px"
                  className="object-cover object-center filter brightness-[0.72]"
                  onError={(e) => {
                    (e.currentTarget as any).src = "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85";
                  }}
                />
                {/* Degradê refinado: melhora contraste do texto sem pesar */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
              </div>

              {/* Slide Content */}
              <div className="relative z-20 h-full w-full px-6 sm:px-10 lg:px-14 flex flex-col justify-center items-start">
                <div className="max-w-lg space-y-2.5 sm:space-y-3">
                  {/* Badge sutil */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] sm:text-xs font-bold tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-am-magenta animate-pulse" />
                    <span className="text-am-magenta font-black">{campaign.tag}</span>
                    <span className="text-zinc-300 hidden sm:inline">• {campaign.badge}</span>
                  </div>

                  {/* Título mais proporcional */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight uppercase leading-tight drop-shadow">
                    {campaign.title.split("&").map((part, i) => (
                      <span key={i}>
                        {i > 0 && <span className="text-am-magenta"> & </span>}
                        {part}
                      </span>
                    ))}
                  </h1>

                  {/* Subtítulo curto */}
                  <p className="text-xs sm:text-sm text-zinc-200 line-clamp-2 max-w-md font-medium">
                    {campaign.subtitle}
                  </p>

                  {/* Botão de ação único e objetivo */}
                  <div className="pt-1 sm:pt-2">
                    <a
                      href={campaign.ctaLink}
                      className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 bg-am-magenta hover:bg-am-magenta-dark text-white rounded-xl font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md hover:shadow-magenta transform hover:-translate-y-0.5"
                    >
                      <span>{campaign.ctaText}</span>
                      <ArrowRight size={15} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Setas de navegação compactas */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/30 hover:bg-white text-white hover:text-black backdrop-blur-sm flex items-center justify-center transition-all border border-white/20"
            aria-label="Slide anterior"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/30 hover:bg-white text-white hover:text-black backdrop-blur-sm flex items-center justify-center transition-all border border-white/20"
            aria-label="Próximo slide"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots compactos */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {slideList.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "w-6 bg-am-magenta" : "w-1.5 bg-white/50 hover:bg-white"
                }`}
                aria-label={`Ir para banner ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Barra de Benefícios Oficial da Loja */}
      <div className="border-b border-am-gray-200 py-3.5 sm:py-4 px-4 sm:px-6 lg:px-8 xl:px-10 mt-3 sm:mt-4 bg-zinc-50/70">
        <div className="w-full max-w-[1720px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-zinc-200/80 shadow-xs">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 text-base">
              ✨
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-zinc-900 leading-tight">Lucre 100%</h4>
              <p className="text-[11px] text-zinc-500 leading-tight">Com nossos produtos</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-zinc-200/80 shadow-xs">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-zinc-100 text-zinc-800 flex items-center justify-center flex-shrink-0 text-base">
              📦
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-zinc-900 leading-tight">Atacado</h4>
              <p className="text-[11px] text-zinc-500 leading-tight">Preço de fábrica</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-zinc-200/80 shadow-xs">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0 text-base">
              💼
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-zinc-900 leading-tight">Exclusivo</h4>
              <p className="text-[11px] text-zinc-500 leading-tight">Para revendedores</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-zinc-200/80 shadow-xs">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-pink-50 text-am-magenta flex items-center justify-center flex-shrink-0 text-base">
              🚀
            </div>
            <div>
              <h4 className="font-extrabold text-xs text-zinc-900 leading-tight">Seu Negócio</h4>
              <p className="text-[11px] text-zinc-500 leading-tight">Começa aqui</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
