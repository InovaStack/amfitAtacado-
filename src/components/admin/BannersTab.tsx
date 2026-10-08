"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { useAdmin, AdminBanner } from "@/context/AdminContext";

export const BannersTab: React.FC = () => {
  const { banners, addBanner, updateBanner, deleteBanner, toggleBannerActive } = useAdmin();

  const [bannerModalOpen, setBannerModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<AdminBanner | null>(null);
  const [bannerForm, setBannerForm] = useState({
    title: "",
    subtitle: "",
    category: "principal" as AdminBanner["category"],
    ctaText: "Ver Mais",
    ctaLink: "/catalogo",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
    active: true,
  });

  const openNewBannerModal = () => {
    setEditingBanner(null);
    setBannerForm({
      title: "",
      subtitle: "",
      category: "principal",
      ctaText: "Ver Mais",
      ctaLink: "/catalogo",
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80",
      active: true,
    });
    setBannerModalOpen(true);
  };

  const openEditBannerModal = (banner: AdminBanner) => {
    setEditingBanner(banner);
    setBannerForm({
      title: banner.title,
      subtitle: banner.subtitle || "",
      category: banner.category || banner.type || "principal",
      ctaText: banner.ctaText || "Ver Mais",
      ctaLink: banner.ctaLink || "/catalogo",
      imageUrl: banner.imageUrl || banner.image || "",
      active: banner.active ?? banner.isActive ?? true,
    });
    setBannerModalOpen(true);
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanner) {
      updateBanner(editingBanner.id, bannerForm);
    } else {
      addBanner(bannerForm);
    }
    setBannerModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight font-[family-name:var(--font-heading)]">
            Gerenciamento de Banners ({banners.length})
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Configure o Banner Principal da Home, Campanhas Sazonais, Promoções e Lançamentos.
          </p>
        </div>
        <button
          onClick={openNewBannerModal}
          className="px-5 py-2.5 bg-am-magenta hover:bg-pink-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all"
        >
          <Plus size={16} /> Adicionar Banner
        </button>
      </div>

      {/* Banners Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {banners.map((b) => (
          <div
            key={b.id}
            className="bg-white border border-zinc-200 rounded-2xl overflow-hidden flex flex-col shadow-xs group hover:border-zinc-300 transition-all"
          >
            <div className="relative h-44 w-full bg-zinc-100 overflow-hidden">
              <img
                src={b.imageUrl || b.image || "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&q=80"}
                alt={b.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/70 backdrop-blur-md text-white border border-white/10">
                  {b.category || b.type || "principal"}
                </span>
                <button
                  onClick={() => toggleBannerActive(b.id)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold shadow-xs ${
                    (b.active ?? b.isActive ?? true)
                      ? "bg-emerald-500 text-white"
                      : "bg-white/90 text-zinc-600 border border-zinc-200"
                  }`}
                >
                  {(b.active ?? b.isActive ?? true) ? "Ativo" : "Inativo"}
                </button>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-extrabold text-zinc-900 text-base leading-tight mb-1">
                  {b.title}
                </h3>
                {b.subtitle && (
                  <p className="text-xs text-zinc-500 line-clamp-2">{b.subtitle}</p>
                )}
                <div className="mt-3 text-[11px] text-zinc-400 font-mono">
                  Link: {b.ctaLink}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between">
                <button
                  onClick={() => openEditBannerModal(b)}
                  className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors border border-zinc-200"
                >
                  <Edit2 size={13} /> Editar
                </button>
                <button
                  onClick={() => {
                    if (confirm("Excluir este banner permanentemente?")) {
                      deleteBanner(b.id);
                    }
                  }}
                  className="p-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Banner (Novo / Editar) */}
      {bannerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-zinc-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-fadeIn">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200 mb-6">
              <h2 className="text-xl font-black text-zinc-900 uppercase font-[family-name:var(--font-heading)]">
                {editingBanner ? "Editar Banner" : "Novo Banner"}
              </h2>
              <button
                onClick={() => setBannerModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Título Principal *
                </label>
                <input
                  type="text"
                  required
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-am-magenta"
                  placeholder="Ex: NOVA COLEÇÃO COMPRESSÃO PRO"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Subtítulo / Descrição
                </label>
                <input
                  type="text"
                  value={bannerForm.subtitle}
                  onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-am-magenta"
                  placeholder="Ex: Peças com acabamento premium e margens de até 120%"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Categoria do Banner
                  </label>
                  <select
                    value={bannerForm.category}
                    onChange={(e) =>
                      setBannerForm({
                        ...bannerForm,
                        category: e.target.value as AdminBanner["category"],
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-am-magenta"
                  >
                    <option value="principal">Banner Principal (Hero)</option>
                    <option value="campanha">Campanha Sazonal</option>
                    <option value="promocao">Promoção</option>
                    <option value="lancamento">Lançamento</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                    Texto do Botão
                  </label>
                  <input
                    type="text"
                    value={bannerForm.ctaText}
                    onChange={(e) => setBannerForm({ ...bannerForm, ctaText: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-am-magenta"
                    placeholder="Ex: Conferir Ofertas"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  Link de Redirecionamento
                </label>
                <input
                  type="text"
                  value={bannerForm.ctaLink}
                  onChange={(e) => setBannerForm({ ...bannerForm, ctaLink: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-am-magenta font-mono"
                  placeholder="/categoria/lancamentos"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1">
                  URL da Imagem de Fundo *
                </label>
                <input
                  type="text"
                  required
                  value={bannerForm.imageUrl}
                  onChange={(e) => setBannerForm({ ...bannerForm, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-xs text-zinc-900 focus:outline-none focus:border-am-magenta font-mono text-[11px]"
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="bannerActive"
                  checked={bannerForm.active}
                  onChange={(e) => setBannerForm({ ...bannerForm, active: e.target.checked })}
                  className="rounded text-am-magenta focus:ring-am-magenta"
                />
                <label htmlFor="bannerActive" className="text-xs text-zinc-700 font-semibold cursor-pointer">
                  Banner ativo no site
                </label>
              </div>

              <div className="pt-4 border-t border-zinc-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBannerModalOpen(false)}
                  className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-xl text-xs font-bold border border-zinc-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-am-magenta hover:bg-pink-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs"
                >
                  Salvar Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
