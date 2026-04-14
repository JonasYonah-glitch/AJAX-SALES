"use client"

import { InteractiveNeuralVortexBackground } from "@/components/ui/interactive-neural-vortex-background"
import { FloatingNavbar } from "@/components/floating-navbar"
import { ShinyButton } from "@/components/ui/shiny-button"
import { HowItWorks } from "@/components/ui/how-it-works"
import { PainPointsStack } from "@/components/ui/pain-points"
import { Benefits } from "@/components/ui/benefits"
import { FAQ } from "@/components/ui/faq"
import { ContactCard } from "@/components/ui/contact-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Phone } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")

  // Atualiza o dot nav lateral baseado na sessão visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.4 } // Aciona quando 40% da seção estiver visível
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Suavizar scroll para links internos (dots)
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth"
    return () => { document.documentElement.style.scrollBehavior = "auto" }
  }, [])

  return (
    <main className="relative min-h-screen">
      <InteractiveNeuralVortexBackground />

      <div className="fixed inset-0 z-[-11] bg-black/50 pointer-events-none" />

      <FloatingNavbar />

      {/* Section Indicators */}
      <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {["home", "problema", "como-funciona", "beneficios", "faq", "contato"].map((id) => (
          <a
            key={id}
            href={`#${id}`}
            className="w-8 h-8 flex items-center justify-center group"
            aria-label={`Ir para a seção ${id}`}
          >
            <div
              className={cn(
                "rounded-full transition-all duration-500",
                activeSection === id
                  ? "w-3 h-3 bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                  : "w-2 h-2 bg-white/30 group-hover:bg-white/60 group-hover:scale-125"
              )}
            />
          </a>
        ))}
      </div>

      <div className="relative z-10 flex flex-col w-full">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl"
          >
            <div className="text-center px-0 leading-5">
              <p className="mb-4 text-sm uppercase tracking-widest text-gray-400 font-sans font-medium">
                Operacao de Recuperacao de Vendas
              </p>
              
              <h1 className="mb-8 text-balance text-4xl tracking-tight text-white [text-shadow:_0_4px_25px_rgb(0_0_0_/_80%)] md:text-5xl lg:text-7xl font-sans font-bold">
                Eu recupero suas vendas perdidas.{" "}
                <span className="font-serif italic text-gray-300 font-normal">
                  Se nao entrar dinheiro, voce nao me paga.
                </span>
              </h1>

              <p className="mb-8 mx-auto max-w-2xl text-pretty leading-relaxed text-gray-300 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-sans font-light tracking-wide text-lg md:text-xl">
                O problema nao e falta de lead. O problema e dinheiro parado na base.
                Nos entramos para vender o que voce ja perdeu.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ShinyButton className="px-8 py-3 text-base">
                  Quero recuperar minhas vendas
                </ShinyButton>
                <Button
                  variant="outline"
                  className="bg-transparent border-white/30 text-white hover:bg-white/10 px-8 py-3"
                >
                  Ver como funciona
                </Button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Pain Point Section */}
        <section id="problema" className="w-full relative z-20">
          <PainPointsStack />
        </section>

        {/* How It Works Section */}
        <section id="como-funciona" className="min-h-screen flex items-center justify-center px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-6xl w-full"
          >
            <HowItWorks isActive={activeSection === "como-funciona"} />
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section id="beneficios" className="w-full relative z-20">
          <Benefits />
        </section>

        {/* FAQ Section */}
        <section id="faq" className="min-h-screen flex items-center justify-center px-4 py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl w-full"
          >
            <FAQ isActive={activeSection === "faq"} />
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contato" className="relative min-h-screen flex items-center justify-center px-4 py-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 size-full pointer-events-none bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:12px_12px] opacity-30"
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 mx-auto w-full max-w-5xl"
          >
            <div className="text-center mb-10">
              <h2 className="text-4xl md:text-6xl font-sans font-bold text-white [text-shadow:_0_4px_25px_rgb(0_0_0_/_80%)] mb-4 tracking-tight">
                Pronto para recuperar suas vendas?
              </h2>
              <p className="text-gray-300 text-lg md:text-xl font-sans font-normal max-w-2xl mx-auto">
                Agende uma conversa e descubra quanto dinheiro voce esta deixando na mesa.
              </p>
            </div>

            <ContactCard
              title="Fale comigo"
              description="Preencha o formulario ou entre em contato diretamente. Respondemos em ate 24 horas."
              contactInfo={[
                {
                  icon: MessageCircle,
                  label: "WhatsApp",
                  value: "(48) 99190-0150",
                },
              ]}
            >
              <form action="" className="w-full space-y-4">
                <div className="flex flex-col gap-2">
                  <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">
                    Nome
                  </Label>
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">
                    WhatsApp
                  </Label>
                  <Input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-open-sans-custom">
                    Mensagem
                  </Label>
                  <Textarea
                    placeholder="Conte um pouco sobre sua operacao..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <Button
                  className="w-full bg-white text-black hover:bg-gray-100 font-sans font-bold py-6 text-lg"
                  type="button"
                >
                  Quero uma avaliacao gratuita
                </Button>
              </form>
            </ContactCard>
          </motion.div>
        </section>
      </div>
    </main>
  )
}
