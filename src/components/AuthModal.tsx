"use client";

import React, { useState } from "react";
import { 
  X, 
  User, 
  Building2, 
  ShoppingBag, 
  Lock, 
  Mail, 
  Phone, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Store,
  Clock,
  Eye,
  EyeOff
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalTab, 
    setAuthModalTab, 
    authInitialProfile, 
    login, 
    loginAsDemo, 
    register,
    requireWholesaleApproval 
  } = useAuth();

  const [activeTab, setActiveTab] = useState<"login" | "register">(authModalTab);
  const [selectedProfile, setSelectedProfile] = useState<"varejo" | "atacado">(authInitialProfile);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register form states
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regDocument, setRegDocument] = useState(""); // CPF or CNPJ
  const [regCompanyName, setRegCompanyName] = useState("");
  const [regTradeName, setRegTradeName] = useState("");
  const [regResaleType, setRegResaleType] = useState<"loja_fisica" | "loja_online" | "sacoleira" | "iniciante">("loja_fisica");
  const [regPassword, setRegPassword] = useState("");

  // Sync modal changes from context
  React.useEffect(() => {
    setActiveTab(authModalTab);
    setSelectedProfile(authInitialProfile);
    setErrorMsg("");
    setSuccessMsg("");
  }, [authModalTab, authInitialProfile, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setErrorMsg("Informe seu e-mail para entrar.");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await login(loginEmail, loginPassword);
      if (!res.success) {
        setErrorMsg(res.message || "Erro ao efetuar login.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.trim() || !regPhone.trim() || !regDocument.trim()) {
      setErrorMsg("Preencha todos os campos obrigatórios.");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await register({
        name: regName,
        email: regEmail,
        phone: regPhone,
        document: regDocument,
        accountType: selectedProfile,
        companyName: selectedProfile === "atacado" ? regCompanyName : undefined,
        tradeName: selectedProfile === "atacado" ? regTradeName : undefined,
        resaleType: selectedProfile === "atacado" ? regResaleType : undefined,
        password: regPassword,
      });
      if (res.success) {
        setSuccessMsg(
          selectedProfile === "atacado" && requireWholesaleApproval
            ? "Cadastro enviado com sucesso! Seus dados de lojista foram registrados e estão em análise."
            : "Conta criada com sucesso! Bem-vindo(a) à AM FIT."
        );
      } else {
        setErrorMsg(res.message || "Erro ao criar conta.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient and close button */}
        <div className="relative bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-6 text-white border-b border-zinc-800">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2 text-am-magenta text-xs font-black uppercase tracking-widest mb-1.5">
            <Sparkles size={14} />
            <span>Portal do Cliente AM FIT</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            {activeTab === "login" ? "Acesse sua Conta" : "Crie seu Cadastro Exclusivo"}
          </h2>
          <p className="text-xs text-zinc-300 mt-1">
            {activeTab === "login"
              ? "Acompanhe seus pedidos, orçamentos e condições especiais."
              : "Escolha seu perfil de compra (Varejo ou Atacado direto de fábrica)."}
          </p>

          {/* Tab Switcher */}
          <div className="flex items-center bg-zinc-800/80 p-1 rounded-xl mt-4 border border-zinc-700/60">
            <button
              type="button"
              onClick={() => {
                setActiveTab("login");
                setErrorMsg("");
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "login"
                  ? "bg-am-magenta text-white shadow-magenta-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Já tenho cadastro
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("register");
                setErrorMsg("");
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeTab === "register"
                  ? "bg-am-magenta text-white shadow-magenta-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Criar nova conta
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Quick Demo Access Bar */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-zinc-600">
              <span className="flex items-center gap-1 text-zinc-800">
                <ShieldCheck size={14} className="text-am-magenta" />
                Acesso Rápido para Demonstração:
              </span>
              <span className="text-[10px] text-zinc-400">1 clique</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => loginAsDemo("varejo")}
                className="px-2.5 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-xl text-[11px] font-semibold text-zinc-800 text-left transition-all hover:border-am-magenta shadow-xs flex flex-col"
              >
                <span className="font-bold text-zinc-950 flex items-center gap-1">
                  <User size={11} className="text-am-magenta" /> Varejo
                </span>
                <span className="text-[9px] text-zinc-500 truncate">Camila Oliveira</span>
              </button>

              <button
                type="button"
                onClick={() => loginAsDemo("atacado_aprovado")}
                className="px-2.5 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-xl text-[11px] font-semibold text-zinc-800 text-left transition-all hover:border-am-magenta shadow-xs flex flex-col"
              >
                <span className="font-bold text-zinc-950 flex items-center gap-1">
                  <Building2 size={11} className="text-am-magenta" /> Atacado OK
                </span>
                <span className="text-[9px] text-zinc-500 truncate">Fit Store Ltda</span>
              </button>

              <button
                type="button"
                onClick={() => loginAsDemo("atacado_pendente")}
                className="px-2.5 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-xl text-[11px] font-semibold text-zinc-800 text-left transition-all hover:border-am-magenta shadow-xs flex flex-col"
              >
                <span className="font-bold text-zinc-950 flex items-center gap-1">
                  <Clock size={11} className="text-amber-500" /> Atacado Análise
                </span>
                <span className="text-[9px] text-zinc-500 truncate">Mariana Fitness</span>
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-medium">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* TAB 1: LOGIN FORM */}
          {activeTab === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-1.5">E-mail Cadastrado</label>
                <div className="relative">
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    className="w-full py-2.5 pl-10 pr-4 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/20 transition-all text-zinc-900"
                    required
                  />
                  <Mail size={16} className="absolute left-3 top-3 text-zinc-400" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-zinc-700">Senha</label>
                  <a href="#contato" onClick={() => setIsAuthModalOpen(false)} className="text-[11px] text-am-magenta hover:underline">
                    Esqueceu a senha?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Sua senha secreta"
                    className="w-full py-2.5 pl-10 pr-10 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/20 transition-all text-zinc-900"
                  />
                  <Lock size={16} className="absolute left-3 top-3 text-zinc-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-am-black hover:bg-am-magenta text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2"
              >
                <span>{loading ? "Entrando..." : "Entrar na Conta"}</span>
                <ArrowRight size={15} />
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-zinc-500">Ainda não possui cadastro? </span>
                <button
                  type="button"
                  onClick={() => setActiveTab("register")}
                  className="text-xs font-bold text-am-magenta hover:underline"
                >
                  Criar conta grátis
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: REGISTER FORM WITH PROFILE SELECTION */}
          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              {/* Profile Selector Cards */}
              <div>
                <label className="block text-xs font-bold text-zinc-700 mb-2">
                  Escolha o seu tipo de perfil:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  
                  {/* Varejo Card */}
                  <div
                    onClick={() => setSelectedProfile("varejo")}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedProfile === "varejo"
                        ? "border-am-magenta bg-pink-50/50 shadow-sm"
                        : "border-zinc-200 hover:border-zinc-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800">
                        <ShoppingBag size={16} className={selectedProfile === "varejo" ? "text-am-magenta" : ""} />
                      </div>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        selectedProfile === "varejo" ? "bg-am-magenta text-white" : "bg-zinc-100 text-zinc-500"
                      }`}>
                        Uso Próprio
                      </span>
                    </div>
                    <h4 className="font-extrabold text-xs text-zinc-900">Cliente Varejo</h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5 leading-tight">
                      Sem valor mínimo de compra. Compra descomplicada e entrega rápida.
                    </p>
                  </div>

                  {/* Atacado Card */}
                  <div
                    onClick={() => setSelectedProfile("atacado")}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedProfile === "atacado"
                        ? "border-am-magenta bg-pink-50/50 shadow-sm"
                        : "border-zinc-200 hover:border-zinc-300 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-800">
                        <Building2 size={16} className={selectedProfile === "atacado" ? "text-am-magenta" : ""} />
                      </div>
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        selectedProfile === "atacado" ? "bg-am-magenta text-white" : "bg-zinc-100 text-zinc-500"
                      }`}>
                        Revenda
                      </span>
                    </div>
                    <h4 className="font-extrabold text-xs text-zinc-900">Cliente Atacado</h4>
                    <p className="text-[10px] text-zinc-500 mt-0.5 leading-tight">
                      Preços direto de fábrica com margem de até 120%. Mín. 6 peças.
                    </p>
                  </div>

                </div>
              </div>

              {/* Form Fields according to profile */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    {selectedProfile === "atacado" ? "Nome do Responsável / Contato" : "Nome Completo"} *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Ex: Fernanda Silva"
                      className="w-full py-2.5 pl-10 pr-4 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/20 text-zinc-900"
                      required
                    />
                    <User size={16} className="absolute left-3 top-3 text-zinc-400" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">E-mail *</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="contato@exemplo.com"
                        className="w-full py-2.5 pl-9 pr-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                        required
                      />
                      <Mail size={15} className="absolute left-3 top-3 text-zinc-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">WhatsApp / Telefone *</label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="(11) 99999-9999"
                        className="w-full py-2.5 pl-9 pr-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                        required
                      />
                      <Phone size={15} className="absolute left-3 top-3 text-zinc-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    {selectedProfile === "atacado" ? "CNPJ ou CPF do Revendedor *" : "CPF *"}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={regDocument}
                      onChange={(e) => setRegDocument(e.target.value)}
                      placeholder={selectedProfile === "atacado" ? "00.000.000/0001-00 ou CPF" : "000.000.000-00"}
                      className="w-full py-2.5 pl-10 pr-4 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                      required
                    />
                    <FileText size={16} className="absolute left-3 top-3 text-zinc-400" />
                  </div>
                </div>

                {/* Additional Fields for Atacado Profile */}
                {selectedProfile === "atacado" && (
                  <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-am-magenta flex items-center gap-1">
                      <Store size={12} /> Dados do Negócio / Revenda
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-600 mb-1">Nome Fantasia / Loja</label>
                        <input
                          type="text"
                          value={regTradeName}
                          onChange={(e) => setRegTradeName(e.target.value)}
                          placeholder="Ex: Bella Fit Boutique"
                          className="w-full py-2 px-3 text-xs bg-white border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-600 mb-1">Canal de Vendas</label>
                        <select
                          value={regResaleType}
                          onChange={(e) => setRegResaleType(e.target.value as any)}
                          className="w-full py-2 px-3 text-xs bg-white border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                        >
                          <option value="loja_fisica">Loja Física / Box</option>
                          <option value="loja_online">E-commerce / Instagram</option>
                          <option value="sacoleira">Revendedora Autônoma / Porta a Porta</option>
                          <option value="iniciante">Quero Começar a Revender</option>
                        </select>
                      </div>
                    </div>

                    <p className="text-[10px] text-zinc-500 leading-normal">
                      {requireWholesaleApproval
                        ? "ℹ️ Cadastros de atacado passam por validação cadastral para liberação dos preços exclusivos de fábrica."
                        : "✓ Seu cadastro de atacado terá acesso imediato aos preços de revenda."}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">Criar Senha *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Mínimo de 6 caracteres"
                      className="w-full py-2.5 pl-10 pr-10 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                      required
                    />
                    <Lock size={16} className="absolute left-3 top-3 text-zinc-400" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-am-magenta hover:bg-am-magenta-hover text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-magenta-sm flex items-center justify-center gap-2 mt-4"
              >
                <span>{loading ? "Cadastrando..." : `Concluir Cadastro (${selectedProfile === "atacado" ? "Atacado" : "Varejo"})`}</span>
                <ArrowRight size={15} />
              </button>

              <div className="text-center pt-1">
                <span className="text-xs text-zinc-500">Já possui uma conta? </span>
                <button
                  type="button"
                  onClick={() => setActiveTab("login")}
                  className="text-xs font-bold text-am-magenta hover:underline"
                >
                  Fazer login
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
