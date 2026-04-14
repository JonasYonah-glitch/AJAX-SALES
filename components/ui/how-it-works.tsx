"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"
import DotPattern from "@/components/ui/dot-pattern"
import { Search, MessageSquare, TrendingUp, DollarSign } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"

const steps = [
  {
    icon: Search,
    title: "Diagnostico",
    description: "Analisamos sua base, seus canais e identificamos onde esta o dinheiro parado.",
  },
  {
    icon: MessageSquare,
    title: "Ativacao",
    description: "Entramos em contato com leads que nao converteram, usando abordagem comercial direta.",
  },
  {
    icon: TrendingUp,
    title: "Follow-up",
    description: "Processo estruturado de acompanhamento ate o fechamento ou descarte qualificado.",
  },
  {
    icon: DollarSign,
    title: "Resultado",
    description: "Voce so paga quando a venda e concretizada. Sem resultado, sem custo.",
  },
]

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Rastreio nativo do Viewport para prender a rolagem
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const total = steps.length

  return (
    // Ampliamos a div pai para 350vh. Isso obriga o scroll a atravessar esse túnel.
    <div ref={containerRef} className="relative h-[350vh] w-full bg-transparent">
      
      {/* O container interno fica "colado" na tela enquanto rolamos o pai */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-24 md:pt-32 px-4 overflow-hidden">
        
        <div className="text-center mb-8 md:mb-16 relative z-50">
          <p className="text-sm uppercase tracking-widest text-gray-400 font-sans font-medium mb-3">
            Simples e direto
          </p>
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-sans font-bold text-white [text-shadow:_0_4px_25px_rgb(0_0_0_/_80%)] tracking-tight">
            Como funciona
          </h2>
        </div>

        <div className="relative w-full max-w-3xl h-[450px] md:h-[400px]">
          {steps.map((step, index) => {
            // Dividimos o scroll total em fatias para cada card
            const stepSize = 1 / total
            const cardStart = index * stepSize
            const cardEnd = (index + 1) * stepSize
            const hasNextStep = index < total - 1

            // Definimos que o card chega em 30% do seu tempo e trava nos outros 70%
            const arrivalEnd = cardStart + stepSize * 0.4 
            
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const y = useTransform(
              scrollYProgress,
              [cardStart, arrivalEnd],
              [index === 0 ? "0vh" : "120vh", "0vh"],
              { clamp: true }
            )

            // O card começa a sumir apenas quando o PRÓXIMO atingir 20% da sua jornada de chegada
            const exitStart = hasNextStep ? cardEnd : Math.max(cardStart, 1 - stepSize * 0.2)
            const exitEnd = hasNextStep ? Math.min(cardEnd + stepSize * 0.2, 1) : 1

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const scale = useTransform(
              scrollYProgress,
              [exitStart, exitEnd],
              [1, hasNextStep ? 0.9 : 1],
              { clamp: true }
            )

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(
              scrollYProgress,
              [exitStart, exitEnd],
              [1, hasNextStep ? 0 : 1],
              { clamp: true }
            )

            return (
              <motion.div
                key={index}
                style={{ 
                   y, 
                   scale, 
                   opacity,
                   zIndex: index, // Garante sobreposição exata
                   // Cascata visual para ver a borda dos antigos cards no topo
                   top: `calc(${index * 12}px)`
                }}
                className="absolute left-0 right-0 w-full origin-top px-2 md:px-0"
              >
                <div className="relative p-8 md:p-12 min-h-[220px] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden transition-all">
                  <DotPattern width={8} height={8} className="opacity-10" />
                  
                  {/* Marcação D'água Gigante */}
                  <div className="absolute -top-4 -right-2 text-8xl md:text-[140px] font-sans font-bold text-white/[0.03] leading-none select-none">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center flex-shrink-0 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
                      <step.icon className="w-8 h-8 md:w-10 md:h-10 text-gray-200" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-4xl font-sans font-bold text-white mb-3 tracking-tight [text-shadow:_0_2px_15px_rgb(0_0_0_/_50%)]">
                        {step.title}
                      </h3>
                      
                      <p className="text-gray-400 font-sans font-normal text-base md:text-xl leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </div>
  )
}
