import type { ReactNode } from "react"
import { ArrowBigUp, CornerUpRight } from "lucide-react"

interface RoadSignProps {
  children: ReactNode
  href?: string
  icon?: ReactNode
  iconwall?: ReactNode
}

export function RoadSign({ children, href = "#", icon, iconwall }: RoadSignProps) {
  return (
    <div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div
          className="group relative flex items-center justify-center gap-3 
                bg-[#2d8a4e] hover:bg-[#236b3c]
                text-white font-[var(--font-bangers)] text-2xl md:text-3xl
                tracking-wider px-8 py-3 rounded-lg
                outline outline-2 outline-white outline-offset-[-6px]
                shadow-lg transition-all hover:scale-105
                w-full max-w-xs">
          <span className="drop-shadow-md text-lg">{children}</span>
          {iconwall && <div>{iconwall}</div>}
          {icon && <span className="text-2xl">{icon}</span>}
        </div>
      </a>
    </div>
  )
}
