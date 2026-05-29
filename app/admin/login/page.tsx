import { LoginForm } from "@/components/admin/login-form"
import { Sky } from "@/components/sky"

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <Sky />

      <div className="relative z-10 w-full max-w-sm">
        {/* Brand header */}
        <div className="mb-8 text-center">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-lg"
            style={{ background: "linear-gradient(135deg, #2d8a4e 0%, #1a5230 100%)" }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <p className="text-xs font-semibold tracking-widest uppercase text-gray-500 mb-1">
            Panel de administración
          </p>
          <h1 className="text-2xl font-bold text-gray-900">Galería · Admin</h1>
        </div>

        {/* Glass card */}
        <div
          className="rounded-3xl border border-white/60 p-7 shadow-xl"
          style={{ background: "rgba(255,255,255,0.72)", backdropFilter: "blur(24px)" }}
        >
          <LoginForm />
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Sigueme el Viaje · Admin
        </p>
      </div>
    </div>
  )
}
