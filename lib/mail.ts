// lib/mail.ts
import { Resend } from "resend";
import "server-only";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailVerification = async (email: string) => {
    try {
        const { data, error } = await resend.emails.send({
            from: "NextAuth <onboarding@resend.dev>",
            to: [email],
            subject: "Descuento en Sigueme el viaje",
            html: `
              <div style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td align="center" style="padding:40px 20px;">

          <!-- Contenedor principal -->
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">

            <!-- Header verde tipo señal -->
            <tr>
              <td align="center" style="background-color:#2f7d4c; padding:30px; color:white;">
                <h1 style="margin:0; font-size:28px; letter-spacing:1px;">
                  🎟 ¡Tienes un Cupón Especial!
                </h1>
                <p style="margin-top:10px; font-size:16px; opacity:0.9;">
                  Sigue el viaje y obtén tu descuento
                </p>
              </td>
            </tr>

            <!-- Sección cupón -->
            <tr>
              <td align="center" style="padding:40px 30px;">

                <div style="
                  border:2px dashed #2f7d4c;
                  border-radius:20px;
                  padding:30px;
                  background:linear-gradient(180deg, #f8fff9 0%, #ffffff 100%);
                ">

                  <h2 style="margin:0; font-size:22px; color:#2f7d4c;">
                    10% DE DESCUENTO
                  </h2>

                  <p style="margin:15px 0; font-size:14px; color:#555;">
                    Usa el siguiente código en tu próxima compra:
                  </p>

                  <!-- Código -->
                  <div style="
                    font-size:24px;
                    font-weight:bold;
                    letter-spacing:3px;
                    background:#e6f5ec;
                    padding:15px 20px;
                    border-radius:12px;
                    display:inline-block;
                    color:#1f5f3a;
                  ">
                    VIAJE10
                  </div>

                  <p style="margin-top:20px; font-size:13px; color:#777;">
                    Válido por tiempo limitado.
                  </p>

                </div>

              </td>
            </tr>

            <!-- Botón amarillo -->
            <tr>
              <td align="center" style="padding:0 30px 40px 30px;">
                <a href="https://tutienda.com"
                  style="
                    background-color:#f4c542;
                    color:#2d2d2d;
                    text-decoration:none;
                    padding:16px 28px;
                    border-radius:50px;
                    font-weight:bold;
                    display:inline-block;
                    font-size:16px;
                  ">
                  🛒 Ir a la tienda
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="background:#f8f8f8; padding:20px; font-size:12px; color:#888;">
                © 2026 Colectivo Cannábico – Sígueme el Viaje  
                <br />
                Si no solicitaste este cupón, puedes ignorar este mensaje.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </div>
      `,
        });

        if (error) {
            console.error("Resend error:", error);
            return { success: false, error };
        }

        return { success: true, id: data?.id };
    } catch (error) {
        console.error("Send verification error:", error);
        return { success: false, error };
    }
};