"use client"

import { useRef, useState } from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import {
  LightningBoltIcon,
  TargetIcon,
  CheckCircledIcon,
  ClockIcon,
  PersonIcon,
  CheckIcon,
} from "@radix-ui/react-icons"
import DotPattern from "@/components/ui/dot-pattern"

const benefits = [
  {
    icon: LightningBoltIcon,
    title: "Resposta imediata",
    description: "Seus leads sao contatados em minutos, nao em dias. Velocidade e conversao.",
    accent: "from-yellow-300/[0.18] via-orange-300/[0.1] to-transparent",
  },
  {
    icon: TargetIcon,
    title: "Foco em conversao",
    description: "Nao somos agencia de branding. Entramos para bater meta e vender.",
    accent: "from-sky-300/[0.18] via-blue-300/[0.1] to-transparent",
  },
  {
    icon: CheckCircledIcon,
    title: "Zero risco",
    description: "Voce so paga por resultado real. So ganhamos quando voce ganha.",
    accent: "from-emerald-300/[0.18] via-teal-300/[0.1] to-transparent",
  },
  {
    icon: ClockIcon,
    title: "Processo 24/7",
    description: "Automacao e processos que nao param. Sua empresa vendendo enquanto voce dorme.",
    accent: "from-fuchsia-300/[0.18] via-pink-300/[0.1] to-transparent",
  },
  {
    icon: PersonIcon,
    title: "Time dedicado",
    description: "Especialistas treinados no seu produto focados em fechamento constante.",
    accent: "from-rose-300/[0.18] via-red-300/[0.1] to-transparent",
  },
  {
    icon: CheckIcon,
    title: "Transparencia",
    description: "Acompanhe tudo em tempo real. Cada lead, cada tentativa e cada venda feita.",
    accent: "from-cyan-300/[0.18] via-blue-300/[0.1] to-transparent",
  },
]

const transition = {
  duration: 0.42,
  ease: [0.22, 1, 0.36, 1] as const,
}

export function Benefits() {
  const containerRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [showStats, setShowStats] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const safeProgress = Math.min(Math.max(latest, 0), 0.999999)
    const totalStages = benefits.length + 1
    const nextStage = Math.min(totalStages - 1, Math.floor(safeProgress * totalStages))

    if (nextStage !== stageRef.current) {
      stageRef.current = nextStage
      setShowStats(nextStage === benefits.length)
      setActiveIndex(Math.min(nextStage, benefits.length - 1))
    }
  })

  const activeBenefit = benefits[activeIndex]

  return (
    <div ref={containerRef} className="relative h-[520vh] w-full bg-transparent">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden px-4 py-10">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 md:gap-10">
          <div className="text-center">
            <p className="mb-4 text-sm font-sans font-bold uppercase tracking-[0.35em] text-gray-500">
              Por que escolher a AJAX
            </p>
            <h2 className="text-4xl font-sans font-bold tracking-tighter text-white md:text-7xl">
              O que voce ganha
            </h2>
          </div>

          <div className="mx-auto grid w-full max-w-4xl grid-cols-3 gap-2 rounded-[28px] border border-white/10 bg-white/[0.04] p-2 backdrop-blur-sm md:grid-cols-6">
            {benefits.map((benefit, index) => {
              const isActive = index === activeIndex && !showStats

              return (
                <div
                  key={benefit.title}
                  className={`flex items-center justify-center rounded-[18px] px-3 py-3 text-center transition-all duration-300 ${
                    isActive ? "bg-white text-[#09132f] shadow-[0_8px_28px_rgba(255,255,255,0.18)]" : "text-white/60"
                  }`}
                >
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.24em] md:text-[11px]">
                    {benefit.title}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="relative mx-auto flex min-h-[360px] w-full max-w-4xl items-center md:min-h-[430px]">
            <AnimatePresence mode="wait" initial={false}>
              {showStats ? (
                <motion.div
                  key="benefits-stats"
                  initial={{ opacity: 0, y: 28, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -18, scale: 0.98 }}
                  transition={transition}
                  className="w-full"
                >
                  <div className="relative overflow-hidden rounded-[34px] border border-white/12 bg-[linear-gradient(180deg,rgba(11,18,48,0.96),rgba(7,11,31,0.95))] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-12">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_36%)]" />
                    <DotPattern width={8} height={8} className="opacity-[0.05]" />

                    <div className="relative z-10">
                      <p className="mb-4 text-center text-sm font-sans font-bold uppercase tracking-[0.32em] text-white/60">
                        Resultado da operacao
                      </p>
                      <div className="grid gap-4 md:grid-cols-3">
                        <StatItem value="+R$2.4M" label="Recuperados" />
                        <StatItem value="47%" label="Conversao" />
                        <StatItem value="24/7" label="Operacao" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key={activeBenefit.title}
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -22, scale: 0.98 }}
                  transition={transition}
                  className="w-full"
                >
                  <div className="relative overflow-hidden rounded-[34px] border border-white/12 bg-[linear-gradient(180deg,rgba(11,18,48,0.96),rgba(7,11,31,0.95))] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-12">
                    <div className={`absolute inset-0 bg-gradient-to-br ${activeBenefit.accent}`} />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_38%,transparent)]" />
                    <DotPattern width={8} height={8} className="opacity-[0.05]" />

                    <div className="absolute right-6 top-5 text-[72px] font-sans font-bold leading-none text-white/[0.06] md:right-8 md:top-6 md:text-[128px]">
                      {String(activeIndex + 1).padStart(2, "0")}
                    </div>

                    <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.08] shadow-[inset_0_0_24px_rgba(255,255,255,0.08)] md:h-20 md:w-20">
                        <activeBenefit.icon className="h-9 w-9 text-white md:h-11 md:w-11" />
                      </div>

                      <div className="max-w-2xl">
                        <div className="mb-4 inline-flex items-center rounded-full border border-white/14 bg-white/[0.05] px-4 py-2 text-[11px] font-sans font-bold uppercase tracking-[0.32em] text-white/70">
                          Beneficio {String(activeIndex + 1).padStart(2, "0")}
                        </div>

                        <h3 className="mb-4 text-3xl font-sans font-bold tracking-tight text-white md:text-5xl">
                          {activeBenefit.title}
                        </h3>

                        <p className="text-base leading-relaxed text-gray-200/90 md:text-xl">
                          {activeBenefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-8 text-center backdrop-blur-sm">
      <p className="mb-2 text-4xl font-sans font-bold text-white md:text-6xl">{value}</p>
      <p className="text-xs font-sans font-bold uppercase tracking-[0.24em] text-gray-400 md:text-sm">{label}</p>
    </div>
  )
}
