// lib/mail.ts
import { Resend } from "resend";
import "server-only";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailVerification = async (email: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "SV <hi@sev420.com>",
      to: [email],
      subject: "🚐 FELIZ 710 — 25% de descuento solo por hoy",
      html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Bangers&display=swap');
  </style>
</head>
<body style="margin:0; padding:0; font-family:'Fredoka', Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0"
    style="background:linear-gradient(180deg,#2d82c8 0%,#4a9fdf 10%,#6ab6ed 22%,#8ecdf5 36%,#aeddf9 52%,#caeafb 66%,#e0f3fd 80%,#f2f9ff 100%);">
    <tr>
      <td align="center" style="padding:48px 20px;">

        <table width="540" cellpadding="0" cellspacing="0" border="0" style="max-width:540px; width:100%;">

          <!-- Marca -->
          <tr>
            <td align="center" style="padding-bottom:8px;">
              <span style="font-family:'Fredoka', Arial, sans-serif; font-size:20px; font-weight:600; letter-spacing:4px; color:#ffffff; text-transform:uppercase; text-shadow:0 2px 8px rgba(0,0,0,0.2);">
                Sígueme el Viaje
              </span>
            </td>
          </tr>

          <!-- Kombi -->
          <tr>
            <td align="center" style="padding-bottom:12px;">
              <span style="font-size:48px; line-height:1;">🚐</span>
            </td>
          </tr>

          <!-- Camino hacia la card -->
          <tr>
            <td align="center" style="padding-bottom:0;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="background:#3a3a3a; width:56px; padding:8px 0;">
                    <div style="width:4px; height:14px; background:#f5c542; border-radius:2px; margin:0 auto 8px;"></div>
                    <div style="width:4px; height:14px; background:#f5c542; border-radius:2px; margin:0 auto;"></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Card principal -->
          <tr>
            <td style="background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 12px 40px rgba(0,0,0,0.15);">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">

                <!-- Letrero verde estilo carretera -->
                <tr>
                  <td align="center" style="background-color:#2d8a4e; padding:24px 32px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="border:2px solid #ffffff; border-radius:10px; padding:24px 16px;">
                          <h1 style="margin:0; font-family:'Bangers','Fredoka', Arial, sans-serif; font-size:46px; font-weight:400; letter-spacing:3px; color:#ffffff; line-height:1.1; text-shadow:0 2px 4px rgba(0,0,0,0.25);">
                            ¡FELIZ 710! 🍯
                          </h1>
                          <p style="margin:10px 0 0; font-family:'Fredoka', Arial, sans-serif; font-size:16px; font-weight:500; color:rgba(255,255,255,0.9);">
                            Tu cupón exclusivo te espera
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Badge descuento -->
                <tr>
                  <td align="center" style="padding:40px 32px 24px;">
                    <p style="margin:0 0 20px; font-family:'Fredoka', Arial, sans-serif; font-size:15px; font-weight:500; color:#555;">
                      Solo por hoy tienes un descuento de:
                    </p>
                    <table cellpadding="0" cellspacing="0" border="0" align="center">
                      <tr>
                        <td align="center" style="background:#f5c542; border:4px solid #d4a832; border-radius:14px; padding:20px 52px;">
                          <div style="font-family:'Bangers','Fredoka', Arial, sans-serif; font-size:76px; font-weight:400; color:#2d2d2d; line-height:1; letter-spacing:2px;">
                            25%
                          </div>
                          <div style="font-family:'Fredoka', Arial, sans-serif; font-size:18px; font-weight:600; color:#3a3a3a; letter-spacing:2px; margin-top:2px;">
                            DE DESCUENTO
                          </div>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:20px 0 0; font-family:'Fredoka', Arial, sans-serif; font-size:14px; font-weight:600; color:#2d8a4e;">
                      ⏰ Uso exclusivo HOY · 10 de julio de 2026
                    </p>
                    <p style="margin:8px 0 0; font-family:'Fredoka', Arial, sans-serif; font-size:13px; color:#888;">
                      El descuento se aplica automáticamente al entrar al enlace
                    </p>
                  </td>
                </tr>

                <!-- Carretera divisoria -->
                <tr>
                  <td style="padding:0 32px 8px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background:#3a3a3a; height:24px; border-radius:6px;" align="center" valign="middle">
                          <table cellpadding="0" cellspacing="0" border="0" align="center">
                            <tr>
                              <td style="width:30px; height:4px; background:#f5c542; border-radius:2px; margin:0 5px;"></td>
                              <td style="width:10px;"></td>
                              <td style="width:30px; height:4px; background:#f5c542; border-radius:2px;"></td>
                              <td style="width:10px;"></td>
                              <td style="width:30px; height:4px; background:#f5c542; border-radius:2px;"></td>
                              <td style="width:10px;"></td>
                              <td style="width:30px; height:4px; background:#f5c542; border-radius:2px;"></td>
                              <td style="width:10px;"></td>
                              <td style="width:30px; height:4px; background:#f5c542; border-radius:2px;"></td>
                              <td style="width:10px;"></td>
                              <td style="width:30px; height:4px; background:#f5c542; border-radius:2px;"></td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Botón CTA estilo letrero -->
                <tr>
                  <td align="center" style="padding:32px 32px 44px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" bgcolor="#2d8a4e" style="border-radius:10px; mso-padding-alt:0;">
                          <a href="https://siguemeelviaje.mx/discount/happy710"
                            style="display:block; padding:6px; text-decoration:none; border-radius:10px;">
                            <span style="display:block; border:2px solid #ffffff; border-radius:7px; padding:12px 38px; font-family:'Bangers','Fredoka', Arial, sans-serif; font-size:22px; font-weight:400; color:#ffffff; letter-spacing:2px;">
                              RECLAMAR MI 25% →
                            </span>
                          </a>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:14px 0 0; font-family:'Fredoka', Arial, sans-serif; font-size:12px; color:#aaa;">
                      Válido únicamente el 10 de julio de 2026
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:28px 20px 0;">
              <p style="margin:0 0 4px; font-family:'Fredoka', Arial, sans-serif; font-size:12px; color:#5a8fbf;">
                © 2026 Sígueme el Viaje — Todos los derechos reservados
              </p>
              <p style="margin:0; font-family:'Fredoka', Arial, sans-serif; font-size:11px; color:#7aade0;">
                Si no solicitaste este correo, puedes ignorarlo.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
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
