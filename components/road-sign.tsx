import type { ReactNode } from "react"

interface RoadSignProps {
  children: ReactNode
  href?: string
  icon?: ReactNode
  iconwall?: ReactNode
}

export function RoadSign({ children, href = "#", icon, iconwall }: RoadSignProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div
        className="group flex items-center justify-center gap-3
                bg-[#2d8a4e] hover:bg-[#236b3c] active:bg-[#1a5230]
                text-white font-[var(--font-bangers)]
                tracking-wider px-8 py-4 rounded-lg
                outline outline-2 outline-white outline-offset-[-6px]
                shadow-lg hover:shadow-xl
                transition-all duration-200 ease-out hover:scale-105 active:scale-95
                w-full max-w-xs min-h-[56px]"
      >
        <span className="drop-shadow-md text-xl md:text-2xl">{children}</span>
        {iconwall && <span className="opacity-75">{iconwall}</span>}
        {icon && <span>{icon}</span>}
      </div>
    </a>
  )
}
