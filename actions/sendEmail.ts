"use server"

import { sendEmailVerification } from "@/lib/mail";

export async function sendEmail(email: string) {
    if (!email) return { error: "Email requerido" }

    await sendEmailVerification(email)
}
