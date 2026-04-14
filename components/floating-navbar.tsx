"use client"
import { Button } from "@/components/ui/button"

export function FloatingNavbar() {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" })
    }
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 px-4 py-4">
      <div className="mx-auto max-w-7xl rounded-2xl border-2 border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollToSection("home")} className="cursor-pointer group">
            <div className="flex items-center transition-transform hover:scale-105">
              <img 
                src="/images/ajax sales branca.svg" 
                alt="AJAX SALES" 
                className="h-8 md:h-10 w-auto" 
              />
            </div>
          </button>

          {/* Navigation Links */}
          <div className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="text-sm font-sans font-medium text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection("beneficios")}
              className="text-sm font-sans font-medium text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              Beneficios
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-sm font-sans font-medium text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              Duvidas
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="text-sm font-sans font-medium text-gray-300 transition-colors hover:text-white [text-shadow:_0_2px_6px_rgb(0_0_0_/_40%)]"
            >
              Contato
            </button>
          </div>

          {/* CTA Button */}
          <Button
            size="sm"
            className="bg-white text-black hover:bg-gray-100 font-sans font-bold shadow-sm"
            onClick={() => scrollToSection("contato")}
          >
            Agendar Conversa
          </Button>
        </div>
      </div>
    </nav>
  )
}
