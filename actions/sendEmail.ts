"use server"

import { sendEmailVerification } from "@/lib/mail";

export async function sendEmail(email: string) {
    if (!email) return { success: false, error: "Email requerido" }

    try {
        const result = await sendEmailVerification(email)
        
        if (result.success) {
            return { success: true }
        }
        
        return { success: false, error: "Error al enviar el correo" }
    } catch (error) {
        console.error("Error sending email:", error)
        return { success: false, error: "Hubo un problema al procesar tu solicitud" }
    }
}
