import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/react"
import "./globals.css"
import { Suspense } from "react"

import { Open_Sans, Rubik, Instrument_Serif } from 'next/font/google'

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
  display: "swap",
})

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-rubik",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  variable: "--font-instrument",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Recupera Vendas | Recuperacao de Vendas Perdidas",
  description: "Recuperamos suas vendas perdidas. Se nao entrar dinheiro, voce nao paga. Operacao de recuperacao de vendas com cobranca por resultado.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body className={`font-sans ${openSans.variable} ${rubik.variable} ${instrumentSerif.variable}`}>
        <Suspense fallback={null}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
