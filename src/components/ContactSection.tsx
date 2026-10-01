"use client";

import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  Send, 
  CheckCircle2 
} from "lucide-react";

const FAQS = [
  {
    question: "Como funciona a compra no atacado da AM FIT?",
    answer:
      "Nosso atacado é direto de fábrica com pedido mínimo de apenas R$ 300,00 ou a partir de 6 peças sortidas. Você pode mesclar modelos, cores e tamanhos à sua escolha, garantindo margens de até 120% na revenda.",
  },
  {
    question: "Posso comprar apenas 1 ou 2 peças no varejo?",
    answer:
      "Sim! No varejo não há pedido mínimo. Você pode escolher qualquer peça para o seu próprio treino, com pagamento em até 6x sem juros ou 5% de desconto no PIX e entrega para todo o Brasil.",
  },
  {
    question: "As peças têm garantia de transparência?",
    answer:
      "Absolutamente. Todas as nossas calças e conjuntos são confeccionados em poliamida de alta gramatura (300g a 340g) com tecnologia de trama densa, garantindo zero transparência até mesmo nos agachamentos mais profundos.",
  },
  {
    question: "Como é feito o envio e qual o prazo de entrega?",
    answer:
      "Despachamos via Correios (Sedex e PAC) e transportadoras parceiras (Jadlog, Total Express) em até 24 horas úteis após a confirmação do pagamento. Você recebe o código de rastreamento no WhatsApp e e-mail.",
  },
  {
    question: "Como solicitar a primeira troca grátis?",
    answer:
      "Caso a peça não tenha o tamanho ideal ou você deseje trocar a cor, basta nos chamar no WhatsApp em até 7 dias corridos após o recebimento. Nós enviamos a autorização de postagem gratuita para você.",
  },
];

export const ContactSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    email: "",
    tipoInteresse: "atacado",
    mensagem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({
        nome: "",
        whatsapp: "",
        email: "",
        tipoInteresse: "atacado",
        mensagem: "",
      });
    }, 4000);
  };

  return (
    <section id="contato" className="py-20 bg-am-gray-50 border-t border-am-gray-200">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-am-magenta font-extrabold text-xs tracking-widest uppercase mb-1">
            <MessageSquare size={14} />
            Atendimento Exclusivo
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-am-black tracking-tight uppercase">
            FALE COM A NOSSA EQUIPE
          </h2>
          <p className="text-sm text-zinc-500 mt-2">
            Estamos prontos para atender você seja para tirar dúvidas, receber a tabela de atacado ou rastrear seu pedido.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Info cards and FAQ */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-white p-5 rounded-2xl border border-am-gray-200 shadow-xs flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-am-magenta-light text-am-magenta flex items-center justify-center flex-shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-am-black">WhatsApp / Central</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">Atendimento rápido das 08h às 18h</p>
                  <a
                    href="https://wa.me/5511999999999"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-am-magenta hover:underline mt-1 inline-block"
                  >
                    (11) 99999-9999
                  </a>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-am-gray-200 shadow-xs flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 text-am-black flex items-center justify-center flex-shrink-0">
                  <Mail size={22} className="text-am-magenta" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-am-black">E-mail Comercial</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">Envio de orçamentos e notas</p>
                  <a
                    href="mailto:contato@amfitatacado.com.br"
                    className="text-xs font-bold text-am-black hover:text-am-magenta mt-1 inline-block"
                  >
                    contato@amfitatacado.com.br
                  </a>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-am-gray-200 shadow-xs flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 text-am-black flex items-center justify-center flex-shrink-0">
                  <Clock size={22} className="text-am-magenta" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-am-black">Horário de Atendimento</h4>
                  <p className="text-xs text-zinc-600 mt-0.5">Segunda a Sexta: 08:00 às 18:00</p>
                  <p className="text-xs text-zinc-400">Sábados: 09:00 às 13:00</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-am-gray-200 shadow-xs flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-am-magenta-light text-am-magenta flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-am-black">Fábrica & Showroom</h4>
                  <p className="text-xs text-zinc-600 mt-0.5">Polo Têxtil / Confecção Própria</p>
                  <p className="text-xs text-zinc-500">São Paulo - SP | Envio Brasil</p>
                </div>
              </div>

            </div>

            {/* Interactive FAQ */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-am-gray-200 shadow-xs">
              <h3 className="font-black text-lg text-am-black mb-4 uppercase tracking-wide">
                Dúvidas Frequentes (FAQ)
              </h3>
              
              <div className="space-y-3">
                {FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div 
                      key={index} 
                      className="border border-am-gray-200 rounded-xl overflow-hidden transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="w-full p-4 text-left font-bold text-sm text-am-black flex items-center justify-between hover:bg-am-gray-50 transition-colors"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp size={18} className="text-am-magenta flex-shrink-0" />
                        ) : (
                          <ChevronDown size={18} className="text-zinc-400 flex-shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-am-gray-100 bg-am-gray-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Quick Message Form */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-am-gray-200 shadow-lg">
              <div className="mb-6">
                <span className="text-xs font-black text-am-magenta uppercase tracking-wider">
                  Envie sua Mensagem
                </span>
                <h3 className="text-xl font-black text-am-black mt-1">
                  Atendimento Personalizado
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Preencha seus dados para receber nosso catálogo completo em PDF ou tirar dúvidas.
                </p>
              </div>

              {formSent ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 animate-fadeIn">
                  <CheckCircle2 size={36} className="text-emerald-600 mx-auto" />
                  <h4 className="font-black text-emerald-900 text-sm">Mensagem enviada com sucesso!</h4>
                  <p className="text-xs text-emerald-700">
                    Nossa equipe entrará em contato via WhatsApp nas próximas horas.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Seu Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Ex: Amanda Silva"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-am-gray-300 text-xs sm:text-sm focus:outline-none focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/20 transition-all text-zinc-900"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">
                        WhatsApp com DDD *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="(11) 99999-9999"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-am-gray-300 text-xs sm:text-sm focus:outline-none focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/20 transition-all text-zinc-900"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-700 mb-1">
                        E-mail
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="seu@email.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-am-gray-300 text-xs sm:text-sm focus:outline-none focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/20 transition-all text-zinc-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Interesse Principal
                    </label>
                    <select
                      value={formData.tipoInteresse}
                      onChange={(e) => setFormData({ ...formData, tipoInteresse: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-am-gray-300 text-xs sm:text-sm focus:outline-none focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/20 transition-all text-zinc-900 bg-white"
                    >
                      <option value="atacado">Comprar no Atacado (Revenda)</option>
                      <option value="varejo">Comprar no Varejo (Uso próprio)</option>
                      <option value="duvidas">Dúvidas sobre tecidos ou entrega</option>
                      <option value="pedidos">Acompanhamento de pedido</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-700 mb-1">
                      Mensagem ou Dúvida (opcional)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.mensagem}
                      onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                      placeholder="Diga-nos o que você precisa..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-am-gray-300 text-xs sm:text-sm focus:outline-none focus:border-am-magenta focus:ring-2 focus:ring-am-magenta/20 transition-all text-zinc-900 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-am-black hover:bg-am-magenta text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send size={15} />
                    <span>Enviar Mensagem</span>
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
