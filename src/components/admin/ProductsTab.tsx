"use client";

import React, { useState } from "react";
import { Plus, Search, Edit2, Trash2, X } from "lucide-react";
import { useAdmin, AdminProduct } from "@/context/AdminContext";

export const ProductsTab: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useAdmin();

  // Filter & Search
  const [productSearch, setProductSearch] = useState("");
  const [productCategoryFilter, setProductCategoryFilter] = useState("all");

  // Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [productForm, setProductForm] = useState({
    name: "",
    category: "Leggings",
    priceRetail: 129.9,
    priceWholesale: 64.9,
    minWholesaleQty: 6,
    stock: 50,
    images: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
    sizes: "P, M, G, GG",
    colors: "Preto, Vinho, Azul",
    description: "Tecido de alta compressão, zero transparência e costura reforçada.",
    rating: 5.0,
    badge: "Novo",
  });

  const openNewProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: "",
      category: "Leggings",
      priceRetail: 129.9,
      priceWholesale: 64.9,
      minWholesaleQty: 6,
      stock: 50,
      images: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
      sizes: "P, M, G, GG",
      colors: "Preto, Vinho, Azul",
      description: "Tecido de alta compressão, zero transparência e costura reforçada.",
      rating: 5.0,
      badge: "Novo",
    });
    setProductModalOpen(true);
  };

  const openEditProductModal = (prod: AdminProduct) => {
    setEditingProduct(prod);
    setProductForm({
      name: prod.name,
      category: prod.category,
      priceRetail: prod.priceRetail,
      priceWholesale: prod.priceWholesale,
      minWholesaleQty: prod.minWholesaleQty,
      stock: prod.stock,
      images: prod.images.join(", "),
      sizes: prod.sizes.join(", "),
      colors: prod.colors.map((c: any) => (typeof c === "string" ? c : c.name)).join(", "),
      description: prod.description,
      rating: prod.rating,
      badge: prod.badge || "",
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const imgs = productForm.images
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const szs = productForm.sizes
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const cls = productForm.colors
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: productForm.name,
        category: productForm.category,
        priceRetail: Number(productForm.priceRetail),
        priceWholesale: Number(productForm.priceWholesale),
        minWholesaleQty: Number(productForm.minWholesaleQty),
        stock: Number(productForm.stock),
        images: imgs.length ? imgs : [editingProduct.images[0]],
        sizes: szs.length ? szs : ["P", "M", "G"],
        colors: cls.length ? cls : ["Preto"],
        description: productForm.description,
        badge: productForm.badge || undefined,
      });
    } else {
      addProduct({
        name: productForm.name,
        category: productForm.category,
        priceRetail: Number(productForm.priceRetail),
        priceWholesale: Number(productForm.priceWholesale),
        minWholesaleQty: Number(productForm.minWholesaleQty),
        stock: Number(productForm.stock),
        images: imgs.length
          ? imgs
          : ["https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80"],
        sizes: szs.length ? szs : ["P", "M", "G"],
        colors: cls.length ? cls : ["Preto"],
        description: productForm.description,
        rating: 5.0,
        badge: productForm.badge || "Novo",
      });
    }
    setProductModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header with Search and Create Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-[family-name:var(--font-heading)]">
            Catálogo de Produtos ({products.length})
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Cadastre novos modelos, ajuste preços de atacado/varejo, cores, tamanhos e estoque.
          </p>
        </div>
        <button
          onClick={openNewProductModal}
          className="px-5 py-2.5 bg-am-magenta hover:bg-pink-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-am-magenta/20 transition-all"
        >
          <Plus size={16} /> Cadastrar Novo Produto
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar produto por nome..."
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-hidden focus:border-am-magenta"
          />
        </div>
        <select
          value={productCategoryFilter}
          onChange={(e) => setProductCategoryFilter(e.target.value)}
          className="px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-am-magenta"
        >
          <option value="all">Todas as Categorias</option>
          <option value="Leggings">Leggings</option>
          <option value="Tops">Tops</option>
          <option value="Conjuntos">Conjuntos</option>
          <option value="Shorts">Shorts</option>
          <option value="Macacões">Macacões</option>
          <option value="Linha Sem Costura">Linha Sem Costura</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/60 text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Produto</th>
                <th className="py-3.5 px-4 font-semibold">Categoria</th>
                <th className="py-3.5 px-4 font-semibold">Preço Varejo</th>
                <th className="py-3.5 px-4 font-semibold">Preço Atacado</th>
                <th className="py-3.5 px-4 font-semibold">Mín. Atacado</th>
                <th className="py-3.5 px-4 font-semibold">Estoque</th>
                <th className="py-3.5 px-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {products
                .filter((p) =>
                  p.name.toLowerCase().includes(productSearch.toLowerCase())
                )
                .filter((p) =>
                  productCategoryFilter === "all"
                    ? true
                    : p.category.toLowerCase() === productCategoryFilter.toLowerCase()
                )
                .map((prod) => (
                  <tr key={prod.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-12 h-12 rounded-lg object-cover bg-zinc-800 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-white text-sm">{prod.name}</p>
                          <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-zinc-500">
                            <span>Tam: {prod.sizes.join(", ")}</span>
                            <span>•</span>
                            <span>Cores: {prod.colors.length}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-zinc-800 text-zinc-300 font-medium">
                        {prod.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      {prod.priceRetail.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="py-3.5 px-4 font-extrabold text-emerald-400">
                      {prod.priceWholesale.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-300 font-semibold">
                      {prod.minWholesaleQty} peças
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[11px] ${
                          prod.stock > 20
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : prod.stock > 0
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                            : "bg-red-500/10 text-red-400 border border-red-500/20"
                        }`}
                      >
                        {prod.stock} un
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditProductModal(prod)}
                          className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition-colors"
                          title="Editar Produto"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Deseja realmente excluir "${prod.name}"?`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                          title="Excluir Produto"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Novo / Editar Produto */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
              <h2 className="text-xl font-black text-white uppercase font-[family-name:var(--font-heading)]">
                {editingProduct ? "Editar Produto" : "Novo Produto"}
              </h2>
              <button
                onClick={() => setProductModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Nome do Produto *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-am-magenta"
                  placeholder="Ex: Legging Empina Bumbum Alta Compressão"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Categoria *
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-am-magenta"
                  >
                    <option value="Leggings">Leggings</option>
                    <option value="Tops">Tops</option>
                    <option value="Conjuntos">Conjuntos</option>
                    <option value="Shorts">Shorts</option>
                    <option value="Macacões">Macacões</option>
                    <option value="Linha Sem Costura">Linha Sem Costura</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Tag / Destaque
                  </label>
                  <input
                    type="text"
                    value={productForm.badge}
                    onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-am-magenta"
                    placeholder="Ex: Mais Vendido, Lançamento"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Preço Varejo (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.priceRetail}
                    onChange={(e) =>
                      setProductForm({ ...productForm, priceRetail: parseFloat(e.target.value) || 0 })
                    }
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-am-magenta font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                    Preço Atacado (R$) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={productForm.priceWholesale}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        priceWholesale: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-emerald-400 focus:outline-hidden focus:border-emerald-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Mínimo Atacado (peças)
                  </label>
                  <input
                    type="number"
                    value={productForm.minWholesaleQty}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        minWholesaleQty: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-am-magenta"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Estoque Geral
                  </label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) =>
                      setProductForm({ ...productForm, stock: parseInt(e.target.value) || 0 })
                    }
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-am-magenta"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Tamanhos (separar por vírgula)
                  </label>
                  <input
                    type="text"
                    value={productForm.sizes}
                    onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-am-magenta"
                    placeholder="P, M, G, GG"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Cores (separar por vírgula)
                  </label>
                  <input
                    type="text"
                    value={productForm.colors}
                    onChange={(e) => setProductForm({ ...productForm, colors: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-am-magenta"
                    placeholder="Preto, Vinho, Azul"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Fotos (URLs separadas por vírgula)
                </label>
                <input
                  type="text"
                  value={productForm.images}
                  onChange={(e) => setProductForm({ ...productForm, images: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-am-magenta font-mono text-[11px]"
                  placeholder="https://imagem1.jpg, https://imagem2.jpg"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Descrição Técnica do Produto
                </label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-am-magenta"
                  placeholder="Composição do tecido, elasticidade, compressão..."
                />
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-am-magenta hover:bg-pink-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-am-magenta/25"
                >
                  Salvar Produto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
