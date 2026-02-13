"use client"

import React from "react"
import { sendEmail } from "@/actions/sendEmail"
import { useState } from "react"
import { ArrowRight } from "lucide-react"

export function EmailForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    const response = await sendEmail(email)

    if (response?.success) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
      setEmail("")
    }
  }


  return (
    <div className="w-full max-w-sm mx-auto text-center px-4">
      <p className="text-[#3a3a3a] font-[var(--font-bangers)] text-lg md:text-xl tracking-wide mb-2 mt-6">
        {"Obtén un 10% de Descuento"}
      </p>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="email"
          placeholder="Correo Electronico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-6 py-3 rounded-full bg-[#f5c542] text-[#3a3a3a] placeholder-[#7a6a2a] font-[var(--font-bangers)] text-lg tracking-wide border-2 border-[#d4a832] focus:outline-none focus:ring-2 focus:ring-[#2d8a4e] focus:border-[#2d8a4e] transition-all pr-14"
        />
        <button
          type="submit"
          aria-label="Enviar correo"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#d4a832] hover:bg-[#c49a28] flex items-center justify-center transition-colors text-[#3a3a3a]"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>
      {submitted && (
        <p className="text-[#2d8a4e] font-semibold mt-2 text-sm animate-in fade-in">
          {"Gracias por suscribirte!"}
        </p>
      )}
    </div>
  )
}
