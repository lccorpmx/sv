import type { ReactNode } from "react"

interface SocialSignProps {
  href: string
  icon: ReactNode
  label: string
  side: "left" | "right"
}

export function SocialSign({ href, icon, label, side }: SocialSignProps) {
  return (
    <div className={'flex flex-col items-center ${side === "left" ? "-rotate-8" : "rotate-6"}'}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="w-14 h-14 rotate-45 bg-[#f5c542] rounded-md border-4 border-[#d4a832] flex items-center justify-center shadow-md hover:scale-110 transition-transform text-[#3a3a3a]"
      >
        <span className="-rotate-45">{icon}</span>
      </a>
      <div className="w-2 h-10 bg-[#8b8b8b] rounded-full mt-3" />
    </div>
  )
}