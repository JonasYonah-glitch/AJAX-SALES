"use client"

import { useRef, useState } from "react"
import DotPattern from "@/components/ui/dot-pattern"
import { Search, MessageSquare, TrendingUp, DollarSign } from "lucide-react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"

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

const cardTransition = {
  duration: 0.45,
  ease: [0.22, 1, 0.36, 1] as const,
}

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const safeProgress = Math.min(Math.max(latest, 0), 0.999999)
    const nextIndex = Math.min(steps.length - 1, Math.floor(safeProgress * steps.length))

    if (nextIndex !== activeIndexRef.current) {
      activeIndexRef.current = nextIndex
      setActiveIndex(nextIndex)
    }
  })

  const activeStep = steps[activeIndex]

  return (
    <div ref={containerRef} className="relative h-[360vh] w-full bg-transparent md:h-[400vh]">
      <div className="sticky top-0 flex h-screen w-full items-start overflow-hidden px-4 pt-24 md:items-center md:pt-0">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 md:gap-10">
          <div className="text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-gray-400 font-sans">
              Simples e direto
            </p>
            <h2 className="text-3xl font-sans font-bold tracking-tight text-white [text-shadow:_0_4px_25px_rgb(0_0_0_/_80%)] md:text-6xl lg:text-7xl">
              Como funciona
            </h2>
          </div>

          <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur-sm md:px-4">
            {steps.map((step, index) => {
              const isActive = index === activeIndex

              return (
                <div
                  key={step.title}
                  className={`flex min-w-0 flex-1 items-center justify-center rounded-full px-2 py-2 text-center transition-all duration-300 ${
                    isActive ? "bg-white text-[#0a1233] shadow-[0_6px_24px_rgba(255,255,255,0.18)]" : "text-white/55"
                  }`}
                >
                  <span className="text-[11px] font-sans font-bold uppercase tracking-[0.28em] md:text-xs">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="relative mx-auto flex min-h-[340px] w-full max-w-4xl items-center md:min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep.title}
                initial={{ opacity: 0, y: 36, scale: 0.97, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -28, scale: 0.98, filter: "blur(8px)" }}
                transition={cardTransition}
                className="w-full"
              >
                <div className="relative overflow-hidden rounded-[32px] border border-white/12 bg-[linear-gradient(180deg,rgba(12,20,57,0.96),rgba(8,13,35,0.94))] p-8 shadow-[0_26px_80px_rgba(0,0,0,0.42)] backdrop-blur-xl md:p-12">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_34%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_40%,transparent)]" />
                  <DotPattern width={8} height={8} className="opacity-[0.05]" />

                  <div className="absolute right-6 top-5 text-[72px] font-sans font-bold leading-none text-white/[0.06] md:right-8 md:top-6 md:text-[128px]">
                    {String(activeIndex + 1).padStart(2, "0")}
                  </div>

                  <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:gap-10">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.08] shadow-[inset_0_0_24px_rgba(255,255,255,0.08)] md:h-20 md:w-20">
                      <activeStep.icon className="h-8 w-8 text-white md:h-10 md:w-10" />
                    </div>

                    <div className="max-w-2xl">
                      <div className="mb-4 inline-flex items-center rounded-full border border-white/14 bg-white/[0.05] px-4 py-2 text-[11px] font-sans font-bold uppercase tracking-[0.32em] text-white/70">
                        Etapa {String(activeIndex + 1).padStart(2, "0")}
                      </div>

                      <h3 className="mb-4 text-3xl font-sans font-bold tracking-tight text-white [text-shadow:_0_2px_18px_rgb(0_0_0_/_40%)] md:text-5xl">
                        {activeStep.title}
                      </h3>

                      <p className="text-base leading-relaxed text-gray-200/90 md:text-xl">
                        {activeStep.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
