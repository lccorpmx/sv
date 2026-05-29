/**
 * Crea el usuario administrador en la base de datos.
 * Úsalo UNA sola vez: bun scripts/create-admin.ts
 *
 * Cambia EMAIL y PASSWORD antes de ejecutar.
 */
import { auth } from "@/lib/auth"

const EMAIL = "admin@admin.com"
const PASSWORD = "adminsv420"
const NAME = "admin"

const result = await auth.api.signUpEmail({
  body: { email: EMAIL, password: PASSWORD, name: NAME },
})

if ("error" in result) {
  console.error("❌ Error:", result.error)
  process.exit(1)
}

console.log("✅ Admin creado correctamente:", result.user?.email)
process.exit(0)
