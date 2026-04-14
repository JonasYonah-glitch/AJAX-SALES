"use client"

import { useEffect, useState } from "react"
import { LiquidMetal } from "@paper-design/shaders-react"
import { motion, useScroll, useTransform } from "framer-motion"

export function LiquidMetalBackground() {
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()

  // Efeito Parallax vinculado ao Scroll Vertical usando Framer Motion
  // Movemos o líquido verticalmente em -15vh enquanto a página rola do topo (0) ao fim (1)
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0vh", "-15vh"])

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      // Normaliza o mouse para a escala de -1 a 1 para o efeito parallax
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = (e.clientY / window.innerHeight) * 2 - 1
      setMousePos({ x, y })
    }

    if (window.matchMedia("(hover: hover)").matches) {
      window.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  if (!mounted) {
    return <div className="fixed inset-0 z-0 bg-[#00042e]" />
  }

  // O offset baseado no mouse cria profundidade (mouse interaction)
  const mouseX = mousePos.x * 2 
  const mouseY = mousePos.y * 2 

  return (
    <motion.div 
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        width: "120vw",
        height: "120vh",
        left: "-10vw",
        top: "-10vh",
        y: yParallax, // Framer Motion lida com o scroll vertical nativamente e perfeitamente
      }}
    >
      <div 
        className="w-full h-full"
        style={{
          transform: `translate(${mouseX}vw, ${mouseY}vh)`,
          transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <LiquidMetal
          width="100%"
          height="100%"
          colorBack="#00042e"
          colorTint="#5b4dc7"
          repetition={4}
          softness={0.7} // Mais suave para as cores misturarem melhor
          shiftRed={-0.5}
          shiftBlue={-1}
          distortion={0.15}
          contour={1}
          shape="none"
          speed={0.12} // Diminuída significativamente de 0.4 para 0.12 para movimento menos agressivo
          scale={2.2}
        />
      </div>
    </motion.div>
  )
}
