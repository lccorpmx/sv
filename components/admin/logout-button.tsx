"use client"

import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const router = useRouter()

  return (
    <Button
      variant="ghost"
      size="sm"
      className="gap-1.5 text-gray-500 hover:text-gray-900"
      onClick={async () => {
        await authClient.signOut()
        router.push("/admin/login")
      }}
    >
      <LogOut size={14} />
      Salir
    </Button>
  )
}
