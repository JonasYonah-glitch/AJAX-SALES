"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function MoneyOnTheTable() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Efeito de escala e opacidade para dar peso à frase
  const scale = useTransform(scrollYProgress, [0.3, 0.5, 1], [0.8, 1, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0])

  return (
    <section 
      ref={containerRef} 
      className="min-h-[70vh] flex items-center justify-center px-4 py-32 overflow-hidden"
    >
      <motion.div 
        style={{ scale, opacity }}
        className="text-center max-w-4xl"
      >
        <p className="text-3xl md:text-5xl lg:text-6xl text-white font-sans font-bold leading-tight [text-shadow:_0_4px_20px_rgb(0_0_0_/_60%)]">
          Se você marcou mais de 2,<br />
          <span className="inline-block mt-4 md:mt-6 font-serif italic text-red-500 font-bold tracking-tight text-3xl md:text-6xl lg:text-7xl [text-shadow:_0_0_30px_rgba(255,0,0,0.4)]">
            tá deixando dinheiro na mesa.
          </span>
        </p>
      </motion.div>
    </section>
  )
}
