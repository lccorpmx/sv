import type { CSSProperties, ReactNode } from "react"

interface RoadSignProps {
  children: ReactNode
  href?: string
  icon?: ReactNode
  iconwall?: ReactNode
  honey?: boolean
}

export function RoadSign({ children, href, icon, iconwall, honey }: RoadSignProps) {
  const sign = (
    <div
      className={`group relative flex items-center justify-center gap-3
              bg-[#2d8a4e] text-white font-[var(--font-bangers)]
              tracking-wider px-8 py-4 rounded-lg
              outline outline-2 outline-white outline-offset-[-6px]
              shadow-lg w-full max-w-xs min-h-[56px]
              ${href ? "hover:bg-[#236b3c] active:bg-[#1a5230] hover:shadow-xl transition-all duration-200 ease-out hover:scale-105 active:scale-95" : ""}`}
    >
      <span className="drop-shadow-md text-xl md:text-2xl">{children}</span>
      {iconwall && <span className="opacity-75">{iconwall}</span>}
      {icon && <span>{icon}</span>}
      {honey && (
        <span aria-hidden="true" className="honey-drips">
          <span className="honey-drip" style={{ left: "16%", "--d": "6.4s", "--delay": "0s" } as CSSProperties} />
          <span className="honey-drip" style={{ left: "48%", width: "9px", "--d": "5.3s", "--delay": "1.8s" } as CSSProperties} />
          <span className="honey-drip" style={{ left: "78%", "--d": "7.1s", "--delay": "3.4s" } as CSSProperties} />
        </span>
      )}
    </div>
  )

  if (!href) {
    return sign
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      {sign}
    </a>
  )
}
