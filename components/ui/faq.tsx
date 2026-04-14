"use client"

import { cn } from "@/lib/utils"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "Quanto custa o servico?",
    answer: "Voce so paga por resultado. Nao cobramos setup, mensalidade ou taxa fixa. Nosso modelo e baseado em comissao sobre vendas recuperadas. Se nao entrar dinheiro, voce nao paga nada.",
  },
  {
    question: "Funciona para qualquer tipo de negocio?",
    answer: "Funciona para negocios que ja geram leads e ja tem contatos em sua base. Se voce vende produtos ou servicos via WhatsApp, telefone ou outros canais de atendimento, podemos ajudar.",
  },
  {
    question: "Voces vao substituir meu time comercial?",
    answer: "Nao necessariamente. Podemos atuar em paralelo ou complementar seu time existente. O foco e recuperar vendas que seu time nao consegue acompanhar por falta de tempo ou processo.",
  },
  {
    question: "Como voces acessam minha base de leads?",
    answer: "Integramos com seu CRM, planilhas ou ferramentas de atendimento. O processo e simples e seguro. Voce mantem total controle e visibilidade sobre os contatos.",
  },
  {
    question: "Em quanto tempo vejo resultados?",
    answer: "Normalmente, as primeiras vendas acontecem nas primeiras 72 horas. O tempo exato depende do tamanho da sua base e do ticket medio do seu produto.",
  },
  {
    question: "E se eu nao gostar do servico?",
    answer: "Voce pode encerrar a qualquer momento, sem multa ou compromisso. Como voce so paga por resultado, nao ha risco financeiro.",
  },
]

interface FAQProps {
  isActive: boolean
}

export function FAQ({ isActive }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <p className="text-sm uppercase tracking-widest text-gray-400 font-open-sans-custom mb-4">
          Duvidas frequentes
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-open-sans-custom text-white [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)]">
          Perguntas e respostas
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={cn(
              "rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden transition-all duration-500",
              isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: `${(index + 1) * 80}ms` }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-5 flex items-center justify-between text-left"
            >
              <span className="text-white font-open-sans-custom pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={cn(
                  "w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300",
                  openIndex === index && "rotate-180"
                )}
              />
            </button>
            
            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                openIndex === index ? "max-h-48" : "max-h-0"
              )}
            >
              <p className="px-5 pb-5 text-gray-400 font-open-sans-custom text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Final CTA */}
      <div
        className={cn(
          "mt-12 text-center transition-all duration-700",
          isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
        style={{ transitionDelay: "600ms" }}
      >
        <p className="text-lg text-gray-300 font-open-sans-custom mb-4">
          Ainda tem duvidas? Vamos conversar.
        </p>
        <p className="text-white font-open-sans-custom text-xl">
          <span className="font-serif italic">Continue para agendar sua avaliacao gratuita</span> →
        </p>
      </div>
    </div>
  )
}
