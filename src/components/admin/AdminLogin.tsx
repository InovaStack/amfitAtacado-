"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Lock, Mail, AlertCircle } from "lucide-react";
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
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-am-magenta/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl mb-4 text-am-magenta text-2xl">
            <Lock />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white uppercase font-[family-name:var(--font-heading)]">
            Painel Administrativo
          </h1>
          <p className="text-xs uppercase tracking-widest text-zinc-400 mt-1 font-semibold">
            AM FIT • Gestão da Fábrica & E-commerce
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl">
          <div className="mb-6 pb-4 border-b border-zinc-800/80">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-am-magenta/10 text-am-magenta border border-am-magenta/20">
              <Lock className="text-xs" size={14} /> Acesso Restrito ao Proprietário
            </span>
            <p className="text-xs text-zinc-400 mt-2">
              Esta é uma conta administrativa separada dos clientes.
            </p>
          </div>

          {loginError && (
            <div className="mb-5 p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 flex items-center gap-2">
              <AlertCircle className="shrink-0 text-base" size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-1.5">
                E-mail do Administrador
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@amfit.com.br"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-am-magenta focus:ring-1 focus:ring-am-magenta transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 uppercase tracking-wider mb-1.5">
                Senha Master
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-am-magenta focus:ring-1 focus:ring-am-magenta transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-am-magenta to-pink-600 hover:from-pink-600 hover:to-am-magenta text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-am-magenta/25 hover:shadow-am-magenta/40 transition-all duration-300 transform active:scale-95"
            >
              Acessar Painel Master
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-zinc-800/80">
            <div className="bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-zinc-300">Acesso Rápido de Teste:</p>
                <p className="text-[11px] text-zinc-500">admin@amfit.com.br / admin123</p>
              </div>
              <button
                type="button"
                onClick={handleQuickLogin}
                className="px-3 py-1.5 text-xs font-bold uppercase bg-zinc-800 hover:bg-zinc-700 text-am-magenta rounded-lg border border-zinc-700 transition-colors"
              >
                Entrar Direto
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors"
            >
              ← Voltar para a Loja Virtual
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
