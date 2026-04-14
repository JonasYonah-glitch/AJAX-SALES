"use client"

import { InteractiveNeuralVortexBackground } from "@/components/ui/interactive-neural-vortex-background"
import { FloatingNavbar } from "@/components/floating-navbar"
import { ShinyButton } from "@/components/ui/shiny-button"
import { HowItWorks } from "@/components/ui/how-it-works"
import { PainPointsStack } from "@/components/ui/pain-points"
import { Benefits } from "@/components/ui/benefits"
import { MoneyOnTheTable } from "@/components/ui/money-on-the-table"
import { BusinessModel } from "@/components/ui/business-model"
import { FAQ } from "@/components/ui/faq"
import { ContactCard } from "@/components/ui/contact-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  
  // Form State
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    mensagem: ""
  })

  const sendWhatsApp = () => {
    const baseText = `Olá, meu nome é ${formData.nome}. Vim pelo site da AJAX Sales e deixei a seguinte mensagem: ${formData.mensagem}`
    const encodedText = encodeURIComponent(baseText)
    window.open(`https://wa.me/5548991900150?text=${encodedText}`, "_blank")
  }

  const defaultMsg = encodeURIComponent("Olá! Vim pelo site da AJAX Sales e gostaria de agendar uma avaliação gratuita para recuperar minhas vendas.")


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

      <div className="fixed inset-0 z-[-1] bg-black/50 pointer-events-none" />

      <FloatingNavbar />

      {/* Premium Progressive Bottom Blur (Multi-layered for silky smooth gradient) */}
      <div className="fixed bottom-0 left-0 right-0 h-[30vh] z-[100] pointer-events-none overflow-hidden footer-blur-mask">
        <div className="absolute inset-0 backdrop-blur-[1px] [mask-image:linear-gradient(to_top,black,transparent)]" />
        <div className="absolute inset-0 backdrop-blur-[2px] [mask-image:linear-gradient(to_top,black,transparent_25%)]" />
        <div className="absolute inset-0 backdrop-blur-[4px] [mask-image:linear-gradient(to_top,black,transparent_50%)]" />
        <div className="absolute inset-0 backdrop-blur-[8px] [mask-image:linear-gradient(to_top,black,transparent_75%)]" />
        <div className="absolute inset-0 backdrop-blur-[16px] [mask-image:linear-gradient(to_top,black,transparent_85%)]" />
        <div className="absolute inset-0 backdrop-blur-[32px] [mask-image:linear-gradient(to_top,black,transparent_95%)]" />
      </div>

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
              
              <h1 className="mb-8 text-balance text-4xl tracking-tight text-white [text-shadow:_0_4px_25px_rgb(0_0_0_/_80%)] md:text-6xl lg:text-7xl font-sans font-bold leading-[1.1]">
                Eu recupero suas vendas perdidas.{" "}
                <br className="hidden md:block" />
                <span className="font-serif italic text-gray-300 font-normal text-3xl md:text-5xl lg:text-6xl">
                  Se nao entrar dinheiro, voce nao me paga.
                </span>
              </h1>

              <p className="mb-8 mx-auto max-w-2xl text-pretty leading-relaxed text-gray-300 [text-shadow:_0_2px_10px_rgb(0_0_0_/_50%)] font-sans font-light tracking-wide text-lg md:text-xl">
                O problema nao e falta de lead. O problema e dinheiro parado na base.
                Nos entramos para vender o que voce ja perdeu.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={`https://wa.me/5548991900150?text=${defaultMsg}`} target="_blank" rel="noopener noreferrer">
                  <ShinyButton className="px-10 py-4 text-lg">
                    Quero recuperar minhas vendas
                  </ShinyButton>
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Pain Point Section */}
        <section id="problema" className="w-full relative z-20">
          <PainPointsStack />
        </section>

        {/* Hook Section - Money on the Table */}
        <MoneyOnTheTable />

        {/* How It Works Section */}
        <section id="como-funciona" className="w-full relative z-20">
          <HowItWorks />
        </section>

        {/* Business Model / Guarantee Section */}
        <BusinessModel />

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
              <h2 className="text-3xl md:text-6xl font-sans font-bold text-white [text-shadow:_0_4px_25px_rgb(0_0_0_/_80%)] mb-4 tracking-tight leading-tight">
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
                  <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-sans font-medium">
                    Nome
                  </Label>
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-sans font-medium">
                    WhatsApp
                  </Label>
                  <Input
                    type="tel"
                    placeholder="(48) 99190-0150"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)] font-sans font-medium">
                    Mensagem
                  </Label>
                  <Textarea
                    placeholder="Conte um pouco sobre sua operacao..."
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
                <Button
                  onClick={sendWhatsApp}
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
