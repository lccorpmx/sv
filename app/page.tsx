import Image from "next/image"
import { MapPin, ShoppingCart, Instagram, Facebook } from "lucide-react"
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
        {/* VW Van Front View */}
        <div className="relative w-64 h-48 md:w-72 md:h-64 z-10">
          <Image
            src="/combie.png"
            alt="Volkswagen Kombi - Sigueme el Viaje"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Road Section Top */}
        <div className="relative w-16 -mt-4 z-0">
          <div className="w-full h-20 bg-[#3a3a3a]  relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 flex flex-col items-center justify-around py-2">
              <span className="block w-1 h-4 bg-[#f5c542] rounded-full" />
              <span className="block w-1 h-4 bg-[#f5c542] rounded-full" />
            </div>
          </div>
        </div>

        {/* Ubicacion Button */}
        <div className="z-10 -mt-1">
          <RoadSign href="#" icon={<MapPin className="w-7 h-7 text-red-400" />} iconwall={<ArrowBigUp></ArrowBigUp>}>
            {"UBICACIÓN"}
          </RoadSign>
        </div>

        {/* Road Section Mid */}
        <div className="relative w-16 z-0">
          <div className="w-full h-12 bg-[#3a3a3a] relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 flex flex-col items-center justify-around py-1">
              <span className="block w-1 h-3 bg-[#f5c542] rounded-full" />
            </div>
          </div>
        </div>

        {/* Compra Aqui Button */}
        <div className="z-10 -mt-1">
          <RoadSign href="#" icon={<ShoppingCart className="w-7 h-7 text-red-400" />} iconwall={<CornerUpRight></CornerUpRight>}>
            {"COMPRA AQUÍ"}
          </RoadSign>
        </div>

        {/* Road Section with Social Signs */}
        <div className="relative w-16 z-0">
          <div className="w-full h-32 bg-[#3a3a3a] relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 flex flex-col items-center justify-around py-2">
              <span className="block w-1 h-4 bg-[#f5c542] rounded-full" />
              <span className="block w-1 h-4 bg-[#f5c542] rounded-full" />
              <span className="block w-1 h-4 bg-[#f5c542] rounded-full" />
            </div>
          </div>

          {/* Instagram Sign - Left */}
          <div className="absolute -left-20 top-4">
            <SocialSign
              href="https://instagram.com"
              icon={<Instagram className="w-6 h-6" />}
              label="Instagram"
              side="left"
            />
          </div>

          {/* Facebook Sign - Right */}
          <div className="absolute -right-20 top-4">
            <SocialSign
              href="https://facebook.com"
              icon={<Facebook className="w-6 h-6" />}
              label="Facebook"
              side="right"
            />
          </div>
        </div>

        {/* VW Van Side View */}
        <div className="relative w-72 h-44 md:w-80 md:h-48 -mt-2 z-10">
          <Image
            src="/logosv.png"
            alt="Volkswagen Kombi lateral"
            fill
            className="object-contain"
          />
        </div>

        {/* Email Form */}
        <EmailForm />

        {/* Footer */}
        <p className="text-[#3a3a3a]/60 text-xs mt-8 font-[var(--font-bangers)] tracking-wider">
          {"Powered by F()under"}
        </p>
      </div>
    </main>
  )
}
