"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import DotPattern from "@/components/ui/dot-pattern"

export function BusinessModel() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Entrada: Fade e Move up
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0])

  return (
    <section ref={containerRef} className="relative h-[200vh] w-full bg-transparent">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center px-4 overflow-hidden">
        <motion.div 
          style={{ scale, opacity, y }}
          className="relative p-10 md:p-16 rounded-[40px] bg-white/5 border border-white/20 backdrop-blur-3xl shadow-[0_30px_70px_rgba(0,0,0,0.5)] max-w-[95vw] md:max-w-4xl text-center overflow-hidden"
        >
          <DotPattern width={10} height={10} className="opacity-10" />
          
          <div className="relative z-10">
            <p className="text-white font-sans">
              <span className="text-gray-500 block mb-6 text-sm md:text-xl uppercase tracking-[0.3em] font-bold">Modelo de Negocio:</span>{" "}
              <span className="font-serif italic font-bold text-4xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-white leading-tight">
                Cobrança por Resultado
              </span>
            </p>
            <p className="text-gray-300 text-lg md:text-3xl mt-12 font-sans font-normal max-w-3xl mx-auto leading-relaxed">
              Só recebemos quando o dinheiro estiver na sua conta. <br className="hidden md:block" />
              <strong className="text-white font-bold underline decoration-indigo-500/50 underline-offset-[12px] text-2xl md:text-5xl">Risco Zero.</strong>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
