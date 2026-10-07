"use client";

import React from "react";
import Image from "next/image";
import { CreditCard, QrCode, RotateCcw, Truck, Sparkles, Heart, ShoppingBag, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export const RetailCTA: React.FC = () => {
  const { setMode } = useCart();
  const { openAuthModal, isAuthenticated } = useAuth();

  return (
    <section id="varejo" className="py-20 bg-am-gray-50 border-b border-am-gray-200">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        <div className="bg-white rounded-3xl border border-am-gray-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Image Column */}
            <div className="lg:col-span-5 relative h-80 sm:h-96 lg:h-full min-h-[420px] bg-zinc-100 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1000&q=85"
                alt="Moda Fitness Varejo AM FIT"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-am-magenta text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                  Linha Exclusiva
                </span>
                <h3 className="text-xl sm:text-2xl font-black leading-tight">
                  Eleve seus treinos com conforto e sofisticação
                </h3>
              </div>
            </div>

            {/* Details & Varejo Benefits Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:pl-4 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-am-gray-100 border border-am-gray-300 text-zinc-800 font-bold text-xs uppercase tracking-wider mb-2">
                  <Heart size={14} className="text-am-magenta fill-am-magenta" />
                  Experiência de Compra no Varejo
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-am-black tracking-tight leading-tight uppercase">
                  COMPRE PARA VOCÊ: SEM PEDIDO MÍNIMO
                </h2>
                <p className="text-sm sm:text-base text-zinc-600 mt-2 leading-relaxed">
                  Quer apenas uma legging perfeita ou um conjunto impecável para treinar amanhã? 
                  No varejo AM FIT você compra a partir de 1 peça com facilidades imperdíveis e entrega rápida na sua porta.
                </p>
              </div>

              {/* Grid of Retail Advantages */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-am-gray-50 border border-am-gray-200">
                  <div className="w-10 h-10 rounded-xl bg-white text-am-magenta flex items-center justify-center shadow-xs flex-shrink-0">
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-am-black">Até 6x Sem Juros</h4>
                    <p className="text-xs text-zinc-500">Parcele suas compras no cartão de crédito</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-am-gray-50 border border-am-gray-200">
                  <div className="w-10 h-10 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-xs flex-shrink-0">
                    <QrCode size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-am-black">5% OFF no PIX</h4>
                    <p className="text-xs text-zinc-500">Desconto imediato e aprovação instantânea</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-am-gray-50 border border-am-gray-200">
                  <div className="w-10 h-10 rounded-xl bg-white text-am-magenta flex items-center justify-center shadow-xs flex-shrink-0">
                    <RotateCcw size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-am-black">1ª Troca Grátis</h4>
                    <p className="text-xs text-zinc-500">Não serviu? Trocamos sem complicações</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-am-gray-50 border border-am-gray-200">
                  <div className="w-10 h-10 rounded-xl bg-white text-am-black flex items-center justify-center shadow-xs flex-shrink-0">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-am-black">Frete Rápido Brasil</h4>
                    <p className="text-xs text-zinc-500">Envio com rastreio no mesmo dia útil</p>
                  </div>
                </div>

              </div>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                {!isAuthenticated && (
                  <button
                    type="button"
                    onClick={() => openAuthModal("varejo", "register")}
                    className="px-7 py-3.5 bg-am-magenta hover:bg-pink-600 text-white rounded-full font-black text-xs uppercase tracking-wider transition-all transform hover:scale-105 shadow-magenta-sm flex items-center gap-2"
                  >
                    <User size={16} />
                    <span>Cadastrar Conta Varejo</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setMode("varejo");
                    const el = document.getElementById("destaques");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-7 py-3.5 bg-am-black hover:bg-zinc-800 text-white rounded-full font-black text-xs uppercase tracking-wider transition-all transform hover:scale-105 shadow-sm flex items-center gap-2"
                >
                  <ShoppingBag size={16} />
                  <span>Explorar Coleção Varejo</span>
                </button>

                <a
                  href="#destaques"
                  className="px-6 py-3.5 bg-am-gray-100 hover:bg-am-gray-200 text-zinc-800 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
                >
                  Ver Modelos Disponíveis
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
