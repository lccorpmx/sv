"use client"

import React, { useState } from "react"
import { toast } from "sonner"
import { sendEmail } from "@/actions/sendEmail"
import { ArrowRight } from "lucide-react"

export function EmailForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || loading) return

    setLoading(true)
    try {
      const response = await sendEmail(email)
      setLoading(false)

      if (response?.success) {
        setSubmitted(true)
        setEmail("")
        toast.success("¡Correo enviado con éxito!", {
          description: "Revisa tu bandeja de entrada y tu carpeta de spam para tu descuento.",
        })
        setTimeout(() => {
          window.location.href = "https://siguemeelviaje.mx"
        }, 4000)
      } else {
        toast.error(response?.error || "Error al enviar el correo", {
          description: "Por favor intenta de nuevo más tarde.",
        })
      }
    } catch (error) {
      setLoading(false)
      toast.error("Hubo un problema inesperado", {
        description: "Inténtalo de nuevo en unos momentos.",
      })
    }
  }

  return (
    <div className="w-full max-w-sm mx-auto text-center px-4">
      <p className="text-[#3a3a3a] font-[var(--font-bangers)] text-xl md:text-2xl tracking-wide mb-3 mt-6">
        {"Obtén un 20% de Descuento de bienvenida"}
      </p>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading || submitted}
          className="w-full px-6 py-3.5 rounded-full bg-[#f5c542] text-[#3a3a3a] placeholder-[#7a6a2a] font-[var(--font-bangers)] text-lg tracking-wide border-2 border-[#d4a832] focus:outline-none focus:ring-2 focus:ring-[#2d8a4e] focus:border-[#2d8a4e] transition-all duration-200 pr-14 disabled:opacity-70"
        />
        <button
          type="submit"
          disabled={loading || submitted}
          aria-label="Enviar correo"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#d4a832] hover:bg-[#c49a28] flex items-center justify-center transition-all duration-200 ease-out hover:scale-110 active:scale-90 text-[#3a3a3a] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
        >
          {loading
            ? <span className="w-4 h-4 border-2 border-[#3a3a3a]/30 border-t-[#3a3a3a] rounded-full animate-spin" />
            : <ArrowRight className="w-5 h-5" />
          }
        </button>
      </form>
      {submitted && (
        <p className="text-[#2d8a4e] font-[var(--font-bangers)] text-base tracking-wide mt-3 animate-fade-in-up">
          {"¡Gracias! Revisa tu bandeja de entrada y tu carpeta de spam 📬 Te llevamos a la tienda..."}
        </p>
      )}
    </div>
  )
}
