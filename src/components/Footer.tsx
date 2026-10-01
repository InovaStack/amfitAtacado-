"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Instagram, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Truck, 
  Heart,
  ChevronRight
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-am-black text-white pt-16 pb-8 border-t border-zinc-800">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-44 h-14 bg-black rounded-xl p-1.5 border border-zinc-800 flex items-center justify-center">
                <Image
                  src="/logo.jpg"
                  alt="AM FIT Logo"
                  fill
                  sizes="180px"
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed">
              Confecção própria especializada em moda fitness feminina premium para atacado e revenda, além de atendimento exclusivo no varejo. 
              Tecnologia, conforto e alta rentabilidade.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-am-magenta text-zinc-300 hover:text-white flex items-center justify-center transition-colors border border-zinc-800"
                aria-label="Instagram AM FIT"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-emerald-600 text-zinc-300 hover:text-white flex items-center justify-center transition-colors border border-zinc-800"
                aria-label="WhatsApp AM FIT"
              >
                <Phone size={16} />
              </a>
              <a
                href="mailto:contato@amfitatacado.com.br"
                className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-am-magenta text-zinc-300 hover:text-white flex items-center justify-center transition-colors border border-zinc-800"
                aria-label="E-mail AM FIT"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest text-am-magenta">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight size={12} className="text-am-magenta" />
                  Início
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-white transition-colors flex items-center gap-1 font-bold text-white">
                  <ChevronRight size={12} className="text-am-magenta" />
                  Catálogo Completo
                </Link>
              </li>
              <li>
                <Link href="/#categorias" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight size={12} className="text-am-magenta" />
                  Categorias
                </Link>
              </li>
              <li>
                <Link href="/#destaques" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight size={12} className="text-am-magenta" />
                  Destaques da Loja
                </Link>
              </li>
              <li>
                <Link href="/#novidades" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight size={12} className="text-am-magenta" />
                  Novidades
                </Link>
              </li>
              <li>
                <Link href="/#mais-vendidos" className="hover:text-white transition-colors flex items-center gap-1">
                  <ChevronRight size={12} className="text-am-magenta" />
                  Mais Vendidos
                </Link>
              </li>
              <li>
                <Link href="/catalogo?categoria=promocoes" className="hover:text-white transition-colors flex items-center gap-1 text-am-magenta font-bold">
                  <ChevronRight size={12} className="text-am-magenta" />
                  Promoções
                </Link>
              </li>
            </ul>
          </div>

          {/* Wholesale & Retail Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest text-am-magenta">
              Atacado & Varejo
            </h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-medium">
              <li>
                <Link href="/#atacado" className="hover:text-white transition-colors">
                  Como Revender AM FIT
                </Link>
              </li>
              <li>
                <Link href="/catalogo" className="hover:text-white transition-colors">
                  Tabela de Preços Atacado
                </Link>
              </li>
              <li>
                <Link href="/#varejo" className="hover:text-white transition-colors">
                  Condições de Varejo
                </Link>
              </li>
              <li>
                <Link href="/#contato" className="hover:text-white transition-colors">
                  Política de Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link href="/#contato" className="hover:text-white transition-colors">
                  Prazos de Envio e Frete
                </Link>
              </li>
              <li>
                <Link href="/#contato" className="hover:text-white transition-colors">
                  Guia de Medidas & Tecidos
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-bold text-am-magenta hover:border-am-magenta transition-colors"
                >
                  <Lock size={11} /> Painel Administrativo
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-widest text-am-magenta">
              Atendimento
            </h4>
            <div className="space-y-2.5 text-xs text-zinc-400">
              <p className="flex items-start gap-2">
                <MapPin size={15} className="text-am-magenta flex-shrink-0 mt-0.5" />
                <span>Polo Têxtil / Confecção - São Paulo, SP</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={15} className="text-am-magenta flex-shrink-0" />
                <span>(11) 99999-9999</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={15} className="text-am-magenta flex-shrink-0" />
                <span>contato@amfitatacado.com.br</span>
              </p>
              <p className="text-[11px] text-zinc-500 pt-1">
                Seg a Sex: 08h às 18h | Sáb: 09h às 13h
              </p>
            </div>
          </div>

        </div>

        {/* Security & Payment Badges */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-zinc-800/80">
          
          {/* Security */}
          <div className="flex items-center gap-4 text-zinc-400 text-xs">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={18} className="text-am-magenta" />
              <span>Site 100% Seguro</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock size={16} className="text-emerald-500" />
              <span>Certificado SSL 256-Bit</span>
            </div>
          </div>

          {/* Payments list */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-zinc-400 uppercase font-bold mr-2">Formas de Pagamento:</span>
            <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded text-[11px] font-bold text-zinc-300">PIX (-5%)</span>
            <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded text-[11px] font-bold text-zinc-300">Cartão até 6x</span>
            <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded text-[11px] font-bold text-zinc-300">Boleto Bancário</span>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-3">
          <p>
            © {new Date().getFullYear()} AM FIT Atacado & Varejo. Todos os direitos reservados. CNPJ: 00.000.000/0001-00.
          </p>
          <p className="flex items-center gap-1">
            Feito com <Heart size={12} className="text-am-magenta fill-am-magenta" /> para o melhor desempenho do seu treino.
          </p>
        </div>

      </div>
    </footer>
  );
};
