"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LucideActivity, LucideMessageSquare, LucideClipboardList } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export function MainNav() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
      icon: <LucideActivity className="h-5 w-5 mr-2" />,
      showAlways: true,
    },
    {
      href: "/survey",
      label: "Nutrition Survey",
      active: pathname === "/survey",
      icon: <LucideClipboardList className="h-5 w-5 mr-2" />,
      showAlways: false,
    },
    {
      href: "/chat",
      label: "AI Nutrition Coach",
      active: pathname === "/chat",
      icon: <LucideMessageSquare className="h-5 w-5 mr-2" />,
      showAlways: false,
    },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      {routes.map(
        (route) =>
          (route.showAlways || user) && (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-primary border-b-2 border-primary py-2" : "text-muted-foreground",
              )}
            >
              {route.icon}
              {route.label}
            </Link>
          ),
      )}
    </nav>
  )
}

