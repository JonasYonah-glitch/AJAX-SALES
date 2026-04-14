"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { Search, Rocket, BarChart2, ShieldCheck, Repeat } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Diagnostico",
    description: "Analisamos sua base, seus canais e identificamos onde esta o dinheiro parado.",
  },
  {
    icon: Rocket,
    title: "Implementacao",
    description: "Configuramos toda a automacao e o time comercial dedicado em menos de 72h.",
  },
  {
    icon: BarChart2,
    title: "Recuperacao",
    description: "Entramos em acao para converter leads antigos e novos em vendas reais.",
  },
  {
    icon: Repeat,
    title: "Follow-up",
    description: "Processo estruturado de acompanhamento ate o fechamento ou descarte qualificado.",
  },
]

interface StepCardProps {
  step: typeof steps[0]
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}

function StepCard({ step, index, total, scrollYProgress }: StepCardProps) {
  const stepSize = 1 / total
  const cardStart = index * stepSize
  const cardEnd = (index + 1) * stepSize

  // Definimos que o card chega em 40% do seu tempo e trava nos outros 60%
  const arrivalEnd = cardStart + stepSize * 0.4 
  
  const y = useTransform(
    scrollYProgress,
    [cardStart, arrivalEnd],
    [index === 0 ? "0vh" : "120vh", "0vh"],
    { clamp: true }
  )

  // O card começa a sumir apenas quando o PRÓXIMO atingir 20% da sua jornada de chegada
  const nextStepStart = cardEnd
  const nextStepArrival = cardEnd + stepSize * 0.2

  const scale = useTransform(
    scrollYProgress,
    [nextStepStart, nextStepArrival],
    [1, 0.9],
    { clamp: true }
  )

  const opacity = useTransform(
    scrollYProgress,
    [nextStepStart, nextStepArrival],
    [1, 0],
    { clamp: true }
  )

  return (
    <motion.div
      style={{ y, scale, opacity, zIndex: index }}
      className="absolute inset-0 flex items-center justify-center p-4"
    >
      <div className="relative p-8 md:p-12 min-h-[220px] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full max-w-2xl group transition-all duration-500 hover:bg-white/10">
        {/* Step Number Background */}
        <div className="absolute right-6 top-6 text-7xl md:text-9xl font-sans font-black text-white/[0.03] select-none">
          {index + 1 < 10 ? `0${index + 1}` : index + 1}
        </div>
        
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
          <step.icon className="w-8 h-8 md:w-10 md:h-10 text-gray-200" />
        </div>
        
        <div className="relative z-10 text-center md:text-left">
          <h3 className="text-2xl md:text-4xl font-sans font-bold text-white mb-2 md:mb-4 tracking-tight">
            {step.title}
          </h3>
          <p className="text-gray-400 font-sans font-normal text-sm md:text-xl leading-relaxed max-w-sm">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <div ref={containerRef} className="relative h-[400vh] w-full bg-transparent">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-24 md:pt-32 px-4 overflow-hidden">
        
        <div className="text-center mb-8 md:mb-12 relative z-10">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 font-sans font-medium mb-2 md:mb-4">
            Simples e Direto
          </p>
          <h2 className="text-4xl md:text-7xl font-sans font-black text-white tracking-tighter">
            Como funciona
          </h2>
        </div>

        <div className="relative w-full max-w-3xl h-[400px]">
          {steps.map((step, index) => (
            <StepCard 
              key={index} 
              step={step} 
              index={index} 
              total={steps.length} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>

        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-50 w-full px-4 text-center pointer-events-none"
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
