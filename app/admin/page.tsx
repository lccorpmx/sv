import { getAllProducts } from "@/actions/products"
import { AdminClient } from "@/components/admin/admin-client"
import { LogoutButton } from "@/components/admin/logout-button"
import { Sky } from "@/components/sky"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const products = await getAllProducts()

  return (
    <div className="relative min-h-screen">
      <Sky />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">
        {/* Top bar */}
        <div
          className="flex items-center justify-between mb-8 rounded-2xl px-6 py-4 border border-white/60 shadow-sm"
          style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex items-center gap-4">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-xl shadow"
              style={{ background: "linear-gradient(135deg, #2d8a4e 0%, #1a5230 100%)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 leading-none mb-0.5">
                Panel de administración
              </p>
              <h1 className="text-xl font-bold text-gray-900 leading-none">Galería · Admin</h1>
            </div>
          </div>
          <LogoutButton />
        </div>

        {/* Content glass card */}
        <div
          className="rounded-2xl border border-white/60 shadow-sm p-6"
          style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(20px)" }}
        >
          <AdminClient initialProducts={products} />
        </div>
      </div>
    </div>
  )
}
