"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import { cn } from "@/lib/utils"
import { LightningBoltIcon, TargetIcon, CheckCircledIcon, ClockIcon, PersonIcon, CheckIcon } from "@radix-ui/react-icons"
import DotPattern from "@/components/ui/dot-pattern"

const benefits = [
  {
    icon: LightningBoltIcon,
    title: "Resposta imediata",
    description: "Seus leads sao contatados em minutos, nao em dias. Velocidade e conversao.",
    color: "from-yellow-400/20 to-orange-500/10",
  },
  {
    icon: TargetIcon,
    title: "Foco em conversao",
    description: "Nao somos agencia de branding. Entramos para bater meta e vender.",
    color: "from-blue-400/20 to-indigo-500/10",
  },
  {
    icon: CheckCircledIcon,
    title: "Zero risco",
    description: "Voce so paga por resultado real. So ganhamos quando voce ganha.",
    color: "from-emerald-400/20 to-teal-500/10",
  },
  {
    icon: ClockIcon,
    title: "Processo 24/7",
    description: "Automacao e processos que nao param. Sua empresa vendendo enquanto voce dorme.",
    color: "from-purple-400/20 to-pink-500/10",
  },
  {
    icon: PersonIcon,
    title: "Time dedicado",
    description: "Especialistas treinados no seu produto focados em fechamento constante.",
    color: "from-rose-400/20 to-red-500/10",
  },
  {
    icon: CheckIcon,
    title: "Transparencia",
    description: "Acompanhe tudo em tempo real. Cada lead, cada tentativa e cada venda feita.",
    color: "from-cyan-400/20 to-blue-500/10",
  },
]

interface BenefitCardProps {
  benefit: typeof benefits[0]
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}

function BenefitCard({ benefit, index, total, scrollYProgress }: BenefitCardProps) {
  const stepSize = 1 / total
  const start = index * stepSize
  const end = (index + 1) * stepSize
  
  const scale = useTransform(
    scrollYProgress,
    [start, start + stepSize * 0.4],
    [0.5, 1],
    { clamp: true }
  )

  const y = useTransform(
    scrollYProgress,
    [start, start + stepSize * 0.4],
    [index % 2 === 0 ? "100vh" : "-100vh", "0vh"],
    { clamp: true }
  )

  const rotate = useTransform(
    scrollYProgress,
    [start, start + stepSize * 0.4],
    [index % 2 === 0 ? 15 : -15, 0],
    { clamp: true }
  )

  const opacity = useTransform(
    scrollYProgress,
    [start, start + stepSize * 0.1, end - stepSize * 0.1, end],
    [0, 1, 1, 0],
    { clamp: true }
  )

  const Icon = benefit.icon

  return (
    <motion.div
      style={{ 
        scale, 
        y, 
        rotate, 
        opacity,
        zIndex: index 
      }}
      className="absolute w-full max-w-xl aspect-[4/3] md:aspect-video flex items-center justify-center p-1"
    >
      <div className="relative w-full h-full p-8 md:p-12 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center text-center overflow-hidden group">
        <DotPattern width={8} height={8} className="opacity-5" />
        <Icon className="absolute -bottom-12 -right-12 w-64 h-64 text-white opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-[3s]" />

        <div className="relative z-10">
          <h3 className="text-3xl md:text-5xl font-sans font-bold text-white mb-6 tracking-tight">
            {benefit.title}
          </h3>
          <p className="text-gray-400 font-sans font-normal text-lg md:text-2xl leading-relaxed max-w-md mx-auto">
            {benefit.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export function Benefits() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <div ref={containerRef} className="relative h-[600vh] w-full bg-transparent">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden px-4">
        
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="absolute top-24 text-center z-10 px-4"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-gray-500 font-sans font-bold mb-4">
            Por que escolher a AJAX
          </p>
          <h2 className="text-4xl md:text-7xl font-sans font-black text-white tracking-tighter shadow-black">
            O que você ganha
          </h2>
        </motion.div>

        <div className="relative w-full max-w-4xl h-[500px] flex items-center justify-center">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={index} 
              benefit={benefit} 
              index={index} 
              total={benefits.length} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>

        <motion.div
           style={{ 
              opacity: useTransform(scrollYProgress, [0.95, 1], [0, 1]),
              y: useTransform(scrollYProgress, [0.95, 1], [50, 0])
           }}
           className="absolute bottom-20 w-full max-w-5xl px-4"
        >
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatItem value="+R$2.4M" label="Recuperados" />
                <StatItem value="47%" label="Conversão" />
                <StatItem value="24/7" label="Operação" />
             </div>
        </motion.div>

      </div>
    </div>
  )
}

function StatItem({ value, label }: { value: string, label: string }) {
    return (
        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl text-center">
            <p className="text-4xl md:text-6xl font-sans font-black text-white mb-1">{value}</p>
            <p className="text-gray-400 text-xs md:text-sm font-sans uppercase tracking-[0.2em] font-bold">{label}</p>
        </div>
    )
}
