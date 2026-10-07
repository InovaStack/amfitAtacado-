"use client";

import React, { useState, useEffect } from "react";
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
  EyeOff,
  MapPin,
  HelpCircle,
  Truck
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    setIsAuthModalOpen, 
    authModalTab, 
    authInitialProfile, 
    login, 
    loginAsDemo, 
    register,
    requireWholesaleApproval 
  } = useAuth();

  const { setMode } = useCart();

  const [activeTab, setActiveTab] = useState<"login" | "register">(authModalTab);
  const [selectedProfile, setSelectedProfile] = useState<"varejo" | "atacado">(authInitialProfile);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Login form states
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // Register form states
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regDocument, setRegDocument] = useState(""); // CPF ou CNPJ
  const [regCompanyName, setRegCompanyName] = useState("");
  const [regTradeName, setRegTradeName] = useState("");
  const [regStateReg, setRegStateReg] = useState("");
  const [regResaleType, setRegResaleType] = useState<"loja_fisica" | "loja_online" | "sacoleira" | "iniciante">("loja_fisica");
  const [regPassword, setRegPassword] = useState("");
  const [regPasswordConfirm, setRegPasswordConfirm] = useState("");

  // Address states (optional fast fill)
  const [regCep, setRegCep] = useState("");
  const [regStreet, setRegStreet] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [regNeighborhood, setRegNeighborhood] = useState("");
  const [regCity, setRegCity] = useState("");
  const [regState, setRegState] = useState("SP");
  const [loadingCep, setLoadingCep] = useState(false);

  // Sync modal changes from context
  useEffect(() => {
    setActiveTab(authModalTab);
    setSelectedProfile(authInitialProfile);
    setErrorMsg("");
    setSuccessMsg("");
  }, [authModalTab, authInitialProfile, isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  // Mask Helpers
  const formatPhone = (val: string) => {
    const numbers = val.replace(/\D/g, "").slice(0, 11);
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const formatDocument = (val: string, type: "varejo" | "atacado") => {
    const digits = val.replace(/\D/g, "");
    if (type === "varejo") {
      // CPF: 000.000.000-00
      const c = digits.slice(0, 11);
      return c
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      // CNPJ (ou CPF se até 11 dígitos)
      if (digits.length <= 11) {
        return digits
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d)/, "$1.$2")
          .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      }
      const c = digits.slice(0, 14);
      return c
        .replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
  };

  const handleCepLookup = async (cepValue: string) => {
    const cleanCep = cepValue.replace(/\D/g, "");
    setRegCep(cleanCep.length > 5 ? `${cleanCep.slice(0, 5)}-${cleanCep.slice(5, 8)}` : cleanCep);
    if (cleanCep.length === 8) {
      setLoadingCep(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setRegStreet(data.logradouro || "");
          setRegNeighborhood(data.bairro || "");
          setRegCity(data.localidade || "");
          setRegState(data.uf || "SP");
        }
      } catch {
        // fallback
      } finally {
        setLoadingCep(false);
      }
    }
  };

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
        setErrorMsg(res.message || "Erro ao efetuar login. Verifique os dados.");
      } else {
        setSuccessMsg("Login realizado com sucesso! Redirecionando...");
        setTimeout(() => {
          setIsAuthModalOpen(false);
        }, 600);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!regName.trim() || !regEmail.trim() || !regPhone.trim() || !regDocument.trim()) {
      setErrorMsg("Preencha todos os campos obrigatórios marcados com *.");
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg("A senha deve conter no mínimo 6 caracteres.");
      return;
    }

    if (regPassword !== regPasswordConfirm) {
      setErrorMsg("As senhas não coincidem. Digite novamente.");
      return;
    }

    if (selectedProfile === "atacado" && !regTradeName.trim() && !regCompanyName.trim()) {
      setErrorMsg("Informe o Nome da sua Loja ou Razão Social para o cadastro de atacado.");
      return;
    }

    setLoading(true);
    try {
      const hasAddress = regStreet.trim() && regCity.trim();
      const res = await register({
        name: regName.trim(),
        email: regEmail.trim(),
        phone: regPhone.trim(),
        document: regDocument.trim(),
        accountType: selectedProfile,
        companyName: selectedProfile === "atacado" ? (regCompanyName.trim() || regTradeName.trim()) : undefined,
        tradeName: selectedProfile === "atacado" ? (regTradeName.trim() || regCompanyName.trim()) : undefined,
        stateRegistration: selectedProfile === "atacado" ? regStateReg.trim() : undefined,
        resaleType: selectedProfile === "atacado" ? regResaleType : undefined,
        password: regPassword,
        address: hasAddress ? {
          label: selectedProfile === "atacado" ? "Loja / Empresa" : "Residencial",
          recipientName: regName.trim(),
          street: regStreet.trim(),
          number: regNumber.trim() || "S/N",
          neighborhood: regNeighborhood.trim() || "Centro",
          city: regCity.trim(),
          state: regState.trim(),
          zipCode: regCep.trim() || "01001-000",
          isDefault: true,
        } : undefined,
      });

      if (res.success) {
        // Altera o modo do catálogo de acordo com o perfil
        setMode(selectedProfile);
        setSuccessMsg(
          selectedProfile === "atacado"
            ? (requireWholesaleApproval 
                ? "Cadastro de Atacado recebido com sucesso! Seus dados estão em análise e entraremos em contato."
                : "Conta de Atacado criada com sucesso! Preços de revenda liberados.")
            : "Conta de Varejo criada com sucesso! Boas compras na AM FIT."
        );
        setTimeout(() => {
          setIsAuthModalOpen(false);
        }, 1200);
      } else {
        setErrorMsg(res.message || "Erro ao criar conta. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden flex flex-col max-h-[94vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Dark Theme & Logo Accent */}
        <div className="relative bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-5 sm:p-6 text-white border-b border-zinc-800 shrink-0">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>

          <div className="flex items-center gap-2 text-am-magenta text-xs font-black uppercase tracking-widest mb-1">
            <Sparkles size={14} />
            <span>AM FIT Modas &bull; Autenticação</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            {activeTab === "login" ? "Acessar Minha Conta" : "Cadastre-se na AM FIT"}
          </h2>
          <p className="text-xs text-zinc-300 mt-1">
            {activeTab === "login"
              ? "Entre para gerenciar seus pedidos, cotações e aproveitar preços especiais."
              : "Selecione seu perfil de compra: Varejo pessoal ou Atacado revenda."}
          </p>

          {/* Tab Switcher: Já tenho conta vs Criar nova conta */}
          <div className="flex items-center bg-zinc-800/90 p-1 rounded-xl mt-4 border border-zinc-700/70">
            <button
              type="button"
              onClick={() => {
                setActiveTab("login");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "login"
                  ? "bg-am-magenta text-white shadow-magenta-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Lock size={13} />
              <span>Já tenho conta (Entrar)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("register");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === "register"
                  ? "bg-am-magenta text-white shadow-magenta-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <User size={13} />
              <span>Criar nova conta</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Quick Demo Access Bar for rapid test */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-zinc-600">
              <span className="flex items-center gap-1.5 text-zinc-800">
                <ShieldCheck size={14} className="text-am-magenta" />
                Acesso Rápido de Teste (1 clique):
              </span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Demo</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  loginAsDemo("varejo");
                  setMode("varejo");
                }}
                className="px-2.5 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-xl text-[11px] font-semibold text-zinc-800 text-left transition-all hover:border-am-magenta shadow-2xs flex flex-col group"
              >
                <span className="font-bold text-zinc-950 flex items-center gap-1 group-hover:text-am-magenta transition-colors">
                  <ShoppingBag size={12} className="text-am-magenta" /> Varejo
                </span>
                <span className="text-[10px] text-zinc-500 truncate">Camila (Uso Próprio)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  loginAsDemo("atacado_aprovado");
                  setMode("atacado");
                }}
                className="px-2.5 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-xl text-[11px] font-semibold text-zinc-800 text-left transition-all hover:border-am-magenta shadow-2xs flex flex-col group"
              >
                <span className="font-bold text-zinc-950 flex items-center gap-1 group-hover:text-am-magenta transition-colors">
                  <Building2 size={12} className="text-am-magenta" /> Atacado Liberado
                </span>
                <span className="text-[10px] text-zinc-500 truncate">Fit Store (Preços B2B)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  loginAsDemo("atacado_pendente");
                  setMode("atacado");
                }}
                className="px-2.5 py-1.5 bg-white hover:bg-zinc-100 border border-zinc-200 rounded-xl text-[11px] font-semibold text-zinc-800 text-left transition-all hover:border-amber-500 shadow-2xs flex flex-col group"
              >
                <span className="font-bold text-zinc-950 flex items-center gap-1 group-hover:text-amber-600 transition-colors">
                  <Clock size={12} className="text-amber-500" /> Atacado em Análise
                </span>
                <span className="text-[10px] text-zinc-500 truncate">Mariana Modas (Em Validação)</span>
              </button>
            </div>
          </div>

          {/* Feedback Messages */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ======================================================== */}
          {/* TAB 1: LOGIN FORM */}
          {/* ======================================================== */}
          {activeTab === "login" && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-800 mb-1.5">E-mail Cadastrado</label>
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
                  <label className="text-xs font-bold text-zinc-800">Senha</label>
                  <button
                    type="button"
                    onClick={() => {
                      alert("Para contas de demonstração use a senha '123' ou clique nos botões de Acesso Rápido acima!");
                    }}
                    className="text-[11px] text-am-magenta hover:underline font-semibold"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Sua senha secreta"
                    className="w-full py-2.5 pl-10 pr-10 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/20 transition-all text-zinc-900"
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

              <div className="flex items-center justify-between text-xs text-zinc-600">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-am-magenta focus:ring-am-magenta"
                  />
                  <span>Lembrar meu acesso</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-zinc-950 hover:bg-am-magenta text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2"
              >
                <span>{loading ? "Entrando..." : "Entrar na Minha Conta"}</span>
                <ArrowRight size={15} />
              </button>

              <div className="text-center pt-3 border-t border-zinc-100">
                <span className="text-xs text-zinc-500">Ainda não tem uma conta? </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("register");
                    setErrorMsg("");
                  }}
                  className="text-xs font-black text-am-magenta hover:underline ml-1"
                >
                  Cadastre-se como Varejo ou Atacado
                </button>
              </div>
            </form>
          )}

          {/* ======================================================== */}
          {/* TAB 2: REGISTER FORM WITH PROFILE SELECTION */}
          {/* ======================================================== */}
          {activeTab === "register" && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              
              {/* Profile Selection Header */}
              <div>
                <label className="block text-xs font-black text-zinc-800 mb-2 uppercase tracking-wider flex items-center justify-between">
                  <span>1. Escolha o Tipo de Cadastro:</span>
                  <span className="text-[10px] text-zinc-500 lowercase font-medium">clique para selecionar</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Option Varejo */}
                  <div
                    onClick={() => setSelectedProfile("varejo")}
                    className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedProfile === "varejo"
                        ? "border-am-magenta bg-pink-50/60 shadow-magenta-sm"
                        : "border-zinc-200 hover:border-zinc-300 bg-white"
                    }`}
                  >
                    {selectedProfile === "varejo" && (
                      <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-am-magenta text-white flex items-center justify-center text-[11px] font-bold">
                        ✓
                      </span>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        selectedProfile === "varejo" ? "bg-am-magenta text-white" : "bg-zinc-100 text-zinc-700"
                      }`}>
                        <ShoppingBag size={18} />
                      </div>
                      <div>
                        <h4 className="font-black text-xs text-zinc-950">Cliente Varejo</h4>
                        <span className="text-[10px] font-bold text-zinc-500 uppercase">Uso Pessoal</span>
                      </div>
                    </div>
                    <ul className="text-[11px] text-zinc-600 space-y-1 pt-1 border-t border-zinc-200/60">
                      <li className="flex items-center gap-1.5">
                        <span className="text-am-magenta font-bold">&bull;</span> Sem valor mínimo de compra
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-am-magenta font-bold">&bull;</span> Até 6x sem juros ou 5% no PIX
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-am-magenta font-bold">&bull;</span> Entrega rápida e 1ª troca grátis
                      </li>
                    </ul>
                  </div>

                  {/* Option Atacado */}
                  <div
                    onClick={() => setSelectedProfile("atacado")}
                    className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedProfile === "atacado"
                        ? "border-am-magenta bg-pink-50/60 shadow-magenta-sm"
                        : "border-zinc-200 hover:border-zinc-300 bg-white"
                    }`}
                  >
                    {selectedProfile === "atacado" && (
                      <span className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-am-magenta text-white flex items-center justify-center text-[11px] font-bold">
                        ✓
                      </span>
                    )}
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        selectedProfile === "atacado" ? "bg-am-magenta text-white" : "bg-zinc-100 text-zinc-700"
                      }`}>
                        <Building2 size={18} />
                      </div>
                      <div>
                        <h4 className="font-black text-xs text-zinc-950">Cliente Atacado</h4>
                        <span className="text-[10px] font-bold text-am-magenta uppercase">Revenda & Lojistas</span>
                      </div>
                    </div>
                    <ul className="text-[11px] text-zinc-600 space-y-1 pt-1 border-t border-zinc-200/60">
                      <li className="flex items-center gap-1.5">
                        <span className="text-am-magenta font-bold">&bull;</span> Preço de fábrica (lucre 100%)
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-am-magenta font-bold">&bull;</span> Mínimo de apenas 6 peças
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="text-am-magenta font-bold">&bull;</span> Grade livre & material de apoio
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-black text-zinc-800 uppercase tracking-wider">
                  2. Dados do {selectedProfile === "atacado" ? "Lojista / Revendedor" : "Cliente"}:
                </label>

                {/* Name */}
                <div>
                  <label className="block text-xs font-bold text-zinc-700 mb-1">
                    {selectedProfile === "atacado" ? "Nome do Responsável *" : "Nome Completo *"}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Ex: Fernanda Silva"
                      className="w-full py-2.5 pl-10 pr-4 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                      required
                    />
                    <User size={16} className="absolute left-3 top-3 text-zinc-400" />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">E-mail *</label>
                    <div className="relative">
                      <input
                        type="email"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="seuemail@exemplo.com"
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
                        onChange={(e) => setRegPhone(formatPhone(e.target.value))}
                        placeholder="(11) 99999-9999"
                        className="w-full py-2.5 pl-9 pr-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                        required
                      />
                      <Phone size={15} className="absolute left-3 top-3 text-zinc-400" />
                    </div>
                  </div>
                </div>

                {/* Document (CPF or CNPJ) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-zinc-700">
                      {selectedProfile === "atacado" ? "CNPJ ou CPF do Revendedor *" : "CPF *"}
                    </label>
                    {selectedProfile === "atacado" && (
                      <span className="text-[10px] text-zinc-500">Aceitamos MEI, LTDA ou CPF</span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={regDocument}
                      onChange={(e) => setRegDocument(formatDocument(e.target.value, selectedProfile))}
                      placeholder={selectedProfile === "atacado" ? "00.000.000/0001-00 ou CPF" : "000.000.000-00"}
                      className="w-full py-2.5 pl-10 pr-4 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                      required
                    />
                    <FileText size={16} className="absolute left-3 top-3 text-zinc-400" />
                  </div>
                </div>

                {/* Specific Wholesale Fields */}
                {selectedProfile === "atacado" && (
                  <div className="p-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-3 animate-fadeIn">
                    <div className="flex items-center gap-1.5 text-am-magenta font-black text-xs uppercase tracking-wider">
                      <Store size={14} />
                      <span>Dados do Negócio Fitness</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                          Nome da Loja / Marca *
                        </label>
                        <input
                          type="text"
                          value={regTradeName}
                          onChange={(e) => setRegTradeName(e.target.value)}
                          placeholder="Ex: Bella Fit Boutique"
                          className="w-full py-2 px-3 text-xs bg-white border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                          Canal de Atuação
                        </label>
                        <select
                          value={regResaleType}
                          onChange={(e) => setRegResaleType(e.target.value as any)}
                          className="w-full py-2 px-3 text-xs bg-white border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                        >
                          <option value="loja_fisica">Loja Física / Box / Studio</option>
                          <option value="loja_online">Loja Online / E-commerce / Instagram</option>
                          <option value="sacoleira">Revendedora Autônoma / Porta a Porta</option>
                          <option value="iniciante">Quero Começar a Revender</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                          Razão Social (Opcional)
                        </label>
                        <input
                          type="text"
                          value={regCompanyName}
                          onChange={(e) => setRegCompanyName(e.target.value)}
                          placeholder="Ex: Silva & Silva Moda Ltda"
                          className="w-full py-2 px-3 text-xs bg-white border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-zinc-700 mb-1">
                          Inscrição Estadual (Opcional)
                        </label>
                        <input
                          type="text"
                          value={regStateReg}
                          onChange={(e) => setRegStateReg(e.target.value)}
                          placeholder="Isento ou nº da I.E."
                          className="w-full py-2 px-3 text-xs bg-white border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                        />
                      </div>
                    </div>

                    <div className="p-2.5 bg-pink-50 border border-pink-200 rounded-xl text-[11px] text-zinc-700 flex items-start gap-2">
                      <Sparkles size={15} className="text-am-magenta shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-am-magenta font-bold">Vantagem Exclusiva B2B:</strong> Acesso direto aos catálogos de lançamento, fotos em alta resolução para suas redes e suporte com gerente de conta dedicada.
                      </div>
                    </div>
                  </div>
                )}

                {/* Optional Quick Address Section */}
                <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-2xl space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-bold text-zinc-700">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-am-magenta" />
                      <span>Endereço de Entrega (Opcional):</span>
                    </span>
                    {loadingCep && <span className="text-[10px] text-am-magenta animate-pulse">Buscando CEP...</span>}
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-1">
                      <input
                        type="text"
                        value={regCep}
                        onChange={(e) => handleCepLookup(e.target.value)}
                        placeholder="CEP (00000-000)"
                        maxLength={9}
                        className="w-full py-2 px-2.5 text-xs bg-white border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="text"
                        value={regCity}
                        onChange={(e) => setRegCity(e.target.value)}
                        placeholder="Cidade / UF"
                        className="w-full py-2 px-2.5 text-xs bg-white border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Password & Confirmation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Criar Senha *</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Mínimo 6 caracteres"
                        className="w-full py-2.5 pl-9 pr-9 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                        required
                      />
                      <Lock size={15} className="absolute left-3 top-3 text-zinc-400" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600"
                      >
                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">Confirmar Senha *</label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={regPasswordConfirm}
                        onChange={(e) => setRegPasswordConfirm(e.target.value)}
                        placeholder="Repita sua senha"
                        className="w-full py-2.5 pl-9 pr-3 text-xs bg-zinc-50 border border-zinc-300 rounded-xl focus:outline-none focus:border-am-magenta text-zinc-900"
                        required
                      />
                      <Lock size={15} className="absolute left-3 top-3 text-zinc-400" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-am-magenta hover:bg-am-magenta-hover text-white font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-magenta flex items-center justify-center gap-2 mt-4"
              >
                <span>
                  {loading 
                    ? "Criando Conta..." 
                    : `Finalizar Cadastro como ${selectedProfile === "atacado" ? "Atacado (Revenda)" : "Varejo (Uso Próprio)"}`
                  }
                </span>
                <ArrowRight size={15} />
              </button>

              <div className="text-center pt-2">
                <span className="text-xs text-zinc-500">Já tem cadastro? </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab("login");
                    setErrorMsg("");
                  }}
                  className="text-xs font-black text-am-magenta hover:underline ml-1"
                >
                  Entrar na conta
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
