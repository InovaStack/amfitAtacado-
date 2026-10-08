"use client";

import React from "react";
import Image from "next/image";
import { Instagram, Heart, MessageCircle, ExternalLink } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const INSTAGRAM_POSTS = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80",
    likes: 542,
    comments: 38,
    caption: "Dia de treino pesado com nosso Conjunto Fit Power Magenta Glow! 🔥 Zero transparência!",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?auto=format&fit=crop&w=600&q=80",
    likes: 891,
    comments: 64,
    caption: "A modelagem que abraça suas curvas. Legging Efeito Empina Bumbum disponível no atacado e varejo ✨",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=600&q=80",
    likes: 412,
    comments: 29,
    caption: "Detalhe das costas do Top Cruzado. Sustentação de verdade para o seu treino render mais!",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=600&q=80",
    likes: 673,
    comments: 52,
    caption: "Quem mais ama shorts duplo com bolso para celular? Praticidade total! ⚡",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=600&q=80",
    likes: 789,
    comments: 41,
    caption: "Pronta em 1 minuto! O Macacão Sculptor é a peça mais elegante da coleção. 💖",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
    likes: 934,
    comments: 77,
    caption: "Linha Seamless canelada. Toque aveludado que você nunca sentiu antes!",
  },
];

export const InstagramFeed: React.FC = () => {
  const { storeConfig } = useAdmin();
  const instagramUrl = storeConfig.social?.instagramUrl || "https://instagram.com/amfit.oficial";
  const instagramHandle = storeConfig.social?.instagram || "@amfit.oficial";
  const isInstagramActive = storeConfig.channelsStatus?.instagramActive !== false;

  if (!isInstagramActive) return null;

  return (
    <section className="py-16 bg-white border-t border-am-gray-200">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-am-magenta font-extrabold text-xs tracking-widest uppercase mb-2">
            <Instagram size={16} />
            Redes Sociais
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-am-black tracking-tight uppercase">
            SIGA <span className="text-am-magenta">{instagramHandle.toUpperCase()}</span> NO INSTAGRAM
          </h2>
          <p className="text-sm text-zinc-500 mt-2">
            Marque <strong>#AMFitBrasil</strong> nas suas fotos e faça parte da nossa comunidade fitness!
          </p>
          <div className="mt-4">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-am-black hover:bg-am-magenta text-white rounded-full text-xs font-bold tracking-wider transition-colors shadow-sm"
            >
              <Instagram size={14} />
              <span>Seguir no Instagram</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 shadow-xs block"
            >
              <Image
                src={post.image}
                alt="AM FIT Instagram Post"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
              />

              {/* Hover overlay with likes and comments */}
              <div className="absolute inset-0 bg-am-black/65 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-white text-center">
                <Instagram size={20} className="text-am-magenta mb-2" />
                <div className="flex items-center gap-3 text-xs font-bold mb-2">
                  <span className="flex items-center gap-1">
                    <Heart size={14} className="fill-am-magenta text-am-magenta" />
                    {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={14} />
                    {post.comments}
                  </span>
                </div>
                <p className="text-[10px] text-zinc-300 line-clamp-2 leading-tight">
                  {post.caption}
                </p>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};
