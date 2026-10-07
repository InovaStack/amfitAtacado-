"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

export const AdminLogin: React.FC = () => {
  const { adminLogin } = useAdmin();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const success = adminLogin(loginEmail, loginPassword);
    if (!success) {
      setLoginError("E-mail ou senha incorretos. Use admin@amfit.com.br / admin123");
    }
  };

  const handleQuickLogin = () => {
    setLoginEmail("admin@amfit.com.br");
    setLoginPassword("admin123");
    adminLogin("admin@amfit.com.br", "admin123");
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-pink-100/60 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Logo & Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-zinc-200 shadow-sm mb-4 text-am-magenta">
            <Lock size={26} />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-zinc-950 uppercase font-[family-name:var(--font-heading)]">
            Painel Administrativo
          </h1>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mt-1 font-bold">
            AM FIT &bull; Gestão da Fábrica & E-commerce
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-xl space-y-5">
          <div className="pb-4 border-b border-zinc-100 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-am-magenta border border-pink-200">
              <ShieldCheck size={14} /> Acesso Restrito
            </span>
            <span className="text-[11px] text-zinc-400">Proprietário</span>
          </div>

          {loginError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 font-semibold flex items-center gap-2">
              <AlertCircle className="shrink-0" size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                E-mail do Administrador
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@amfit.com.br"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-1.5">
                Senha Master
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-zinc-50 border border-zinc-300 rounded-xl text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/20 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-zinc-950 hover:bg-am-magenta text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Acessar Painel Master</span>
              <ArrowRight size={15} />
            </button>
          </form>

          {/* Quick Demo Login */}
          <div className="pt-4 border-t border-zinc-100">
            <div className="bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-zinc-800">Acesso Rápido de Teste:</p>
                <p className="text-[11px] text-zinc-500 font-mono">admin@amfit.com.br / admin123</p>
              </div>
              <button
                type="button"
                onClick={handleQuickLogin}
                className="px-3 py-1.5 text-xs font-black uppercase bg-white hover:bg-pink-50 text-am-magenta rounded-xl border border-pink-200 transition-colors shadow-2xs"
              >
                Entrar Direto
              </button>
            </div>
          </div>

          <div className="text-center pt-1">
            <Link
              href="/"
              className="text-xs text-zinc-500 hover:text-am-magenta font-semibold transition-colors"
            >
              &larr; Voltar para a Loja Virtual
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
