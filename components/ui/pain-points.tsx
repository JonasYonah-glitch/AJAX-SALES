"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion"

const painPoints = [
  "Leads chegam, mas ninguem responde rapido o suficiente",
  "Seu time esquece de fazer follow-up",
  "Clientes que demonstraram interesse somem sem comprar",
  "Voce sabe que tem dinheiro na base, mas nao consegue recuperar",
  "Ja investiu em trafego, mas a conversao e baixa",
  "Falta processo comercial estruturado"
]

export function PainPointsStack() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Controla o índice atual da frase de dor
  const [activeIndex, setActiveIndex] = useState(0)

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Pico da chama ocorre em múltiplos impares de 0.1 (0.1, 0.3, 0.5, 0.7, 0.9)
    // Usamos gatilhos ligeiramente recuados para trocar MENTRE o fogo cobre tudo
    if (latest < 0.1) setActiveIndex(0)
    else if (latest < 0.3) setActiveIndex(1)
    else if (latest < 0.5) setActiveIndex(2)
    else if (latest < 0.7) setActiveIndex(3)
    else if (latest < 0.9) setActiveIndex(4)
    else setActiveIndex(5)
  })

  // Mensagem final só aparece intensamente quando toda a sequência de ciclo termina
  const finalOpacity = useTransform(
    scrollYProgress,
    [0.93, 1],
    [0, 1]
  )
  const finalY = useTransform(
    scrollYProgress,
    [0.93, 1],
    [30, 0]
  )

  return (
    // Transformamos em 500vh para uma experiência confortável de 6 trocas
    <div ref={containerRef} className="relative h-[500vh] w-full bg-transparent">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden">
        
        <div className="text-center mb-16 relative z-50">
          <h2 className="text-3xl md:text-6xl lg:text-7xl font-sans font-bold text-white [text-shadow:_0_4px_25px_rgb(0_0_0_/_80%)] mb-6 tracking-tight">
            Você se identifica?
          </h2>
        </div>

        {/* Card Pai - Componente Dinâmico Fixo sem fogo */}
        <div className="relative w-full max-w-3xl min-h-[180px] p-8 md:p-12 rounded-2xl backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-white/10 flex items-center justify-start overflow-hidden text-balance">
          
          <div className="flex items-center gap-6 z-10 w-full relative">
            <div className="w-3 h-3 rounded-full bg-red-400 flex-shrink-0 animate-pulse shadow-[0_0_10px_rgba(255,0,0,0.8)]" />
            <motion.p
              // Trocando a chave o framer motion injeta a pápide animação extra na cor, se desejado
              key={activeIndex}
              initial={{ opacity: 0.5, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-white font-sans font-medium text-2xl md:text-4xl leading-relaxed tracking-wide [text-shadow:_0_2px_4px_rgba(0,0,0,0.8)]"
            >
              {painPoints[activeIndex]}
            </motion.p>
          </div>
        </div>

      </div>
    </div>
  )
}
