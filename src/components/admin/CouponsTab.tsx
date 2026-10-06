"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { useAdmin, AdminCoupon } from "@/context/AdminContext";

export const CouponsTab: React.FC = () => {
  const { coupons, addCoupon, updateCoupon, deleteCoupon, toggleCouponActive } = useAdmin();

  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<AdminCoupon | null>(null);
  const [couponForm, setCouponForm] = useState({
    code: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: 10,
    validUntil: "2026-12-31",
    minValue: 150,
    usageLimit: 100,
    active: true,
  });

  const openNewCouponModal = () => {
    setEditingCoupon(null);
    setCouponForm({
      code: "",
      discountType: "percentage",
      discountValue: 10,
      validUntil: "2026-12-31",
      minValue: 150,
      usageLimit: 100,
      active: true,
    });
    setCouponModalOpen(true);
  };

  const openEditCouponModal = (coupon: AdminCoupon) => {
    setEditingCoupon(coupon);
    setCouponForm({
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      validUntil: coupon.validUntil,
      minValue: coupon.minValue ?? coupon.minOrderValue ?? 0,
      usageLimit: coupon.usageLimit ?? coupon.maxUses ?? 100,
      active: coupon.active ?? coupon.isActive ?? true,
    });
    setCouponModalOpen(true);
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCoupon) {
      updateCoupon(editingCoupon.id, {
        ...couponForm,
        code: couponForm.code.toUpperCase().trim(),
        discountValue: Number(couponForm.discountValue),
        minValue: Number(couponForm.minValue),
        usageLimit: Number(couponForm.usageLimit),
      });
    } else {
      addCoupon({
        ...couponForm,
        code: couponForm.code.toUpperCase().trim(),
        discountValue: Number(couponForm.discountValue),
        minValue: Number(couponForm.minValue),
        usageLimit: Number(couponForm.usageLimit),
        usageCount: 0,
      });
    }
    setCouponModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-[family-name:var(--font-heading)]">
            Cupons Promocionais ({coupons.length})
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Crie cupons com desconto percentual ou fixo, valor mínimo, limite de uso e validade.
          </p>
        </div>
        <button
          onClick={openNewCouponModal}
          className="px-5 py-2.5 bg-am-magenta hover:bg-pink-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-am-magenta/20 transition-all"
        >
          <Plus size={16} /> Criar Novo Cupom
        </button>
      </div>

      {/* Coupons Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950/60 text-zinc-400 uppercase tracking-wider border-b border-zinc-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Código</th>
                <th className="py-3.5 px-4 font-semibold">Desconto</th>
                <th className="py-3.5 px-4 font-semibold">Pedido Mínimo</th>
                <th className="py-3.5 px-4 font-semibold">Validade</th>
                <th className="py-3.5 px-4 font-semibold">Uso / Limite</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {coupons.map((c) => (
                <tr key={c.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-black text-white bg-zinc-950 px-2.5 py-1 rounded border border-zinc-700 tracking-wider">
                      {c.code}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-black text-emerald-400 text-sm">
                    {c.discountType === "percentage"
                      ? `${c.discountValue}% OFF`
                      : `R$ ${c.discountValue},00 OFF`}
                  </td>
                  <td className="py-3.5 px-4 text-zinc-300 font-semibold">
                    {c.minValue.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400">{c.validUntil}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">
                        {c.usageCount} / {c.usageLimit}
                      </span>
                      <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-am-magenta rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              (c.usageCount / c.usageLimit) * 100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => toggleCouponActive(c.id)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        c.active
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {c.active ? "Ativo" : "Inativo"}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditCouponModal(c)}
                        className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-lg transition-colors"
                      >
                        <Edit2 size={13} />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Excluir o cupom ${c.code}?`)) {
                            deleteCoupon(c.id);
                          }
                        }}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
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

      {/* Modal: Cupom (Novo / Editar) */}
      {couponModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-6">
              <h2 className="text-xl font-black text-white uppercase font-[family-name:var(--font-heading)]">
                {editingCoupon ? "Editar Cupom" : "Novo Cupom de Desconto"}
              </h2>
              <button
                onClick={() => setCouponModalOpen(false)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCoupon} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Código do Cupom *
                </label>
                <input
                  type="text"
                  required
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-am-magenta font-mono font-bold tracking-widest uppercase"
                  placeholder="Ex: PRIMEIRACOMPRA, ATACADO10"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Tipo de Desconto
                  </label>
                  <select
                    value={couponForm.discountType}
                    onChange={(e) =>
                      setCouponForm({
                        ...couponForm,
                        discountType: e.target.value as "percentage" | "fixed",
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-am-magenta"
                  >
                    <option value="percentage">Porcentagem (%)</option>
                    <option value="fixed">Valor Fixo (R$)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Valor do Desconto *
                  </label>
                  <input
                    type="number"
                    required
                    value={couponForm.discountValue}
                    onChange={(e) =>
                      setCouponForm({
                        ...couponForm,
                        discountValue: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-am-magenta font-mono"
                    placeholder="10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Valor Mínimo do Pedido (R$)
                  </label>
                  <input
                    type="number"
                    value={couponForm.minValue}
                    onChange={(e) =>
                      setCouponForm({
                        ...couponForm,
                        minValue: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-am-magenta font-mono"
                    placeholder="150"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                    Limite de Usos Totais
                  </label>
                  <input
                    type="number"
                    value={couponForm.usageLimit}
                    onChange={(e) =>
                      setCouponForm({
                        ...couponForm,
                        usageLimit: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-am-magenta font-mono"
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-1">
                  Validade até
                </label>
                <input
                  type="date"
                  value={couponForm.validUntil}
                  onChange={(e) => setCouponForm({ ...couponForm, validUntil: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-hidden focus:border-am-magenta"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="couponActive"
                  checked={couponForm.active}
                  onChange={(e) => setCouponForm({ ...couponForm, active: e.target.checked })}
                  className="rounded text-am-magenta focus:ring-am-magenta"
                />
                <label htmlFor="couponActive" className="text-xs text-zinc-300 font-semibold cursor-pointer">
                  Cupom ativo para uso no checkout
                </label>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCouponModalOpen(false)}
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-am-magenta hover:bg-pink-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-am-magenta/25"
                >
                  Salvar Cupom
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
