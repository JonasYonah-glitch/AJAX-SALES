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
    // Ampliamos a div pai para 400vh. Isso obriga o scroll a atravessar esse túnel.
    <div ref={containerRef} className="relative h-[400vh] w-full bg-transparent">
      
      {/* O container interno fica "colado" na tela enquanto rolamos o pai */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-24 md:pt-32 px-4 overflow-hidden">
        
        <div className="text-center mb-8 md:mb-16 relative z-50">
          <p className="text-sm uppercase tracking-widest text-gray-400 font-sans font-medium mb-3">
            Simples e direto
          </p>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-sans font-bold text-white [text-shadow:_0_4px_25px_rgb(0_0_0_/_80%)] tracking-tight">
            Como funciona
          </h2>
        </div>

        <div className="relative w-full max-w-3xl h-[400px]">
          {steps.map((step, index) => {
            // Dividimos o scroll total em fatias para cada card
            const stepSize = 1 / total
            const cardStart = index * stepSize
            const cardEnd = (index + 1) * stepSize

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
            const nextStepStart = cardEnd
            const nextStepArrival = cardEnd + stepSize * 0.2

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const scale = useTransform(
              scrollYProgress,
              [nextStepStart, nextStepArrival],
              [1, 0.9],
              { clamp: true }
            )

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const opacity = useTransform(
              scrollYProgress,
              [nextStepStart, nextStepArrival],
              [1, 0],
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
                className="absolute left-0 right-0 w-full origin-top"
              >
                <div className="relative p-8 md:p-12 min-h-[220px] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden transition-all">
                  <DotPattern width={8} height={8} className="opacity-10" />
                  
                  {/* Marcação D'água Gigante */}
                  <div className="absolute -top-4 -right-2 text-8xl md:text-[140px] font-black text-white/[0.03] font-sans leading-none select-none">
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

        {/* Quadro de Garantia Final - Centralizado após todos os cards subirem */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-50 w-full px-4 text-center pointer-events-none"
          // eslint-disable-next-line react-hooks/rules-of-hooks
          style={{
            opacity: useTransform(scrollYProgress, [0.93, 0.98], [0, 1], { clamp: true }),
            scale: useTransform(scrollYProgress, [0.93, 0.98], [0.8, 1], { clamp: true }),
            y: useTransform(scrollYProgress, [0.93, 0.98], [50, 0], { clamp: true })
          }}
        >
          <div className="inline-block p-10 md:p-16 rounded-[40px] bg-white/5 border border-white/20 backdrop-blur-3xl shadow-[0_30px_70px_rgba(0,0,0,0.5)] max-w-[90vw] md:max-w-3xl">
            <p className="text-white font-sans">
              <span className="text-gray-400 block mb-4 text-sm md:text-xl uppercase tracking-[0.2em] font-medium">Modelo de Negocio:</span>{" "}
              <span className="font-serif italic font-black text-4xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-white leading-tight">
                Cobrança por Resultado
              </span>
            </p>
            <p className="text-gray-300 text-xl md:text-3xl mt-10 font-sans font-light max-w-2xl mx-auto leading-relaxed">
              Só recebemos quando o dinheiro estiver na sua conta. <br className="hidden md:block" />
              <strong className="text-white font-bold underline decoration-indigo-500/50 underline-offset-8">Risco Zero.</strong>
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
