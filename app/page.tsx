import Image from "next/image"
import { MapPin, ShoppingCart } from "lucide-react"

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function GalleryIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {/* Marco de foto */}
      <rect x="2" y="3" width="20" height="16" rx="2" />
      {/* Sol / círculo */}
      <circle cx="8.5" cy="8.5" r="1.5" />
      {/* Montaña / paisaje */}
      <polyline points="21 15 16 10 11 15" />
      <polyline points="13 15 9 11 5 15" />
    </svg>
  )
}
import { RoadSign } from "@/components/road-sign"
import { SocialSign } from "@/components/social-sign"
import { EmailForm } from "@/components/email-form"
import { ArrowBigUp, CornerUpRight } from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Sky Video Background */}
      <div className="fixed inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="nubes.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-sky-200/30" />
      </div>

      <div className="flex flex-col items-center w-full max-w-md mx-auto px-4 py-8 relative">
        {/* VW Van Front View — outer div fades in, inner div floats */}
        <div
          className="animate-fade-in-up relative z-10"
          style={{ animationDelay: '0ms' }}
        >
          <div className="relative w-44 h-32 sm:w-56 sm:h-44 md:w-72 md:h-64 z-10 animate-float">
            <Image
              src="/combie.png"
              alt="Volkswagen Kombi - Sigueme el Viaje"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Road Section Top */}
        <div
          className="relative w-16 -mt-4 z-0 animate-fade-in-up"
          style={{ animationDelay: '120ms' }}
        >
          <div className="w-full h-20 bg-[#3a3a3a] relative overflow-hidden">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 flex flex-col items-center justify-around py-2">
              <span className="block w-1 h-4 bg-[#f5c542] rounded-full animate-dash-blink" style={{ animationDelay: '0ms' }} />
              <span className="block w-1 h-4 bg-[#f5c542] rounded-full animate-dash-blink" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>

        {/* Ubicacion Button */}
        <div
          className="z-10 -mt-1 animate-fade-in-up"
          style={{ animationDelay: '220ms' }}
        >
          <RoadSign href="https://maps.app.goo.gl/1ijkJzDbaH4HCD137?g_st=ic" icon={<MapPin className="w-6 h-6 text-red-400" />} iconwall={<ArrowBigUp className="w-5 h-5" />}>
            {"UBICACIÓN"}
          </RoadSign>
        </div>

        {/* Road Section Mid */}
        <div
          className="relative w-16 z-0 animate-fade-in-up"
          style={{ animationDelay: '320ms' }}
        >
          <div className="w-full h-12 bg-[#3a3a3a] relative overflow-hidden">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 flex flex-col items-center justify-around py-1">
              <span className="block w-1 h-3 bg-[#f5c542] rounded-full animate-dash-blink" style={{ animationDelay: '600ms' }} />
            </div>
          </div>
        </div>

        {/* Compra Aqui Button */}
        <div
          className="z-10 -mt-1 animate-fade-in-up"
          style={{ animationDelay: '400ms' }}
        >
          <RoadSign href="https://siguemeelviaje.mx/" icon={<ShoppingCart className="w-6 h-6 text-red-400" />} iconwall={<CornerUpRight className="w-5 h-5" />}>
            {"COMPRA AQUÍ"}
          </RoadSign>
        </div>

        {/* Road Section with Social Signs — flex row, sin overflow */}
        <div
          className="flex items-start justify-center gap-6 z-0 animate-fade-in-up"
          style={{ animationDelay: '480ms' }}
        >
          {/* Instagram Sign - Left */}
          <div
            className="pt-4 animate-fade-in-up"
            style={{ animationDelay: '560ms' }}
          >
            <SocialSign
              href="https://www.instagram.com/galeria_sev420?igsh=MXc3enltdWtzdG9sMA%3D%3D&utm_source=qr"
              icon={<InstagramIcon className="w-6 h-6" />}
              label="Instagram"
              side="left"
            />
          </div>
          {/* Road strip */}
          <div className="w-16 h-32 bg-[#3a3a3a] relative overflow-hidden flex-shrink-0">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 flex flex-col items-center justify-around py-2">
              <span className="block w-1 h-4 bg-[#f5c542] rounded-full animate-dash-blink" style={{ animationDelay: '0ms' }} />
              <span className="block w-1 h-4 bg-[#f5c542] rounded-full animate-dash-blink" style={{ animationDelay: '300ms' }} />
              <span className="block w-1 h-4 bg-[#f5c542] rounded-full animate-dash-blink" style={{ animationDelay: '600ms' }} />
            </div>
          </div>

          {/* Gallery Sign - Right */}
          <div
            className="pt-4 animate-fade-in-up"
            style={{ animationDelay: '620ms' }}
          >
            <SocialSign
              href="/galery"
              icon={<GalleryIcon className="w-6 h-6" />}
              label="Galería"
              side="right"
            />
          </div>
        </div>

        {/* VW Van Side View */}
        <div
          className="relative w-56 h-36 sm:w-64 sm:h-40 md:w-80 md:h-48 -mt-2 z-10 animate-fade-in-up"
          style={{ animationDelay: '700ms' }}
        >
          <Image
            src="/logosv.png"
            alt="Volkswagen Kombi lateral"
            fill
            className="object-contain"
          />
        </div>

        {/* Email Form */}
        <div
          className="w-full animate-fade-in-up"
          style={{ animationDelay: '820ms' }}
        >
          <EmailForm />
        </div>

        {/* Footer */}
        <p
          className="text-[#3a3a3a]/60 text-xs mt-8 font-[var(--font-bangers)] tracking-wider animate-fade-in-up"
          style={{ animationDelay: '940ms' }}
        >
          {"Powered by F()under"}
        </p>


      </div>
    </main>
  )
}
