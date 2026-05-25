"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  MessageSquare,
  User,
  Settings,
  Sparkles,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { signOut } from "next-auth/react"

const sidebarItems = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "AI Chat", href: "/dashboard/chat", icon: MessageSquare },
  { title: "Profile", href: "/dashboard/profile", icon: User },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 glass rounded-xl border-border"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar - Theme Aware */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-72 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-full flex-col justify-between p-6">
          <div>
            <Link href="/" className="flex items-center space-x-3 px-2 py-6">
              <div className="bg-primary/20 p-2 rounded-xl">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <span className="font-black text-2xl tracking-tighter text-foreground">AI Mentor</span>
            </Link>
            <nav className="mt-10 space-y-3">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl px-4 py-3.5 text-sm font-bold transition-all hover:bg-muted",
                    pathname === item.href 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", pathname === item.href ? "text-primary-foreground" : "text-primary")} />
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t border-border pt-6">
            <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-sm font-bold text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive active:scale-95"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 lg:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
