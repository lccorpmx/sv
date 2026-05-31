import React from "react"
import type { Metadata, Viewport } from 'next'
import { Fredoka, Bangers } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"


import { Toaster } from "@/components/ui/sonner"
import './globals.css'

const fredoka = Fredoka({ subsets: ['latin'], variable: '--font-fredoka' })
const bangers = Bangers({ weight: '400', subsets: ['latin'], variable: '--font-bangers' })

export const metadata: Metadata = {
  title: 'Sigueme el Viaje - Colectivo Cannabico',
  description: 'Sigueme el Viaje - Tu colectivo cannabico de confianza',
}
export const viewport: Viewport = {
  themeColor: '#5BBFCF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${fredoka.variable} ${bangers.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  )
}
