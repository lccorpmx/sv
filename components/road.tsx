export function Road({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-16 mx-auto ${className}`}>
      <div className="w-full h-full bg-[#3a3a3a] relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 flex flex-col items-center justify-around py-2">
          <span className="block w-1 h-6 bg-[#f5c542] rounded-full" />
          <span className="block w-1 h-6 bg-[#f5c542] rounded-full" />
          <span className="block w-1 h-6 bg-[#f5c542] rounded-full" />
          <span className="block w-1 h-6 bg-[#f5c542] rounded-full" />
          <span className="block w-1 h-6 bg-[#f5c542] rounded-full" />
        </div>
      </div>
    </div>
  )
}
