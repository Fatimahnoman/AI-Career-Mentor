"use client"

import { useState, useRef, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { User, Settings, LogOut, ChevronDown } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function UserProfile() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const name = session?.user?.name || "User"
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 glass p-1.5 pr-4 rounded-2xl border-border hover:bg-muted transition-all"
      >
        <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center font-black text-primary-foreground shadow-lg shadow-primary/30">
          {initials}
        </div>
        <span className="text-sm font-bold hidden sm:block text-foreground">{name}</span>
        <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-14 w-56 bg-card border border-border rounded-2xl p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-50 text-foreground">
          <Link 
            href="/dashboard/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-sm font-bold"
            onClick={() => setIsOpen(false)}
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
          <Link 
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors text-sm font-bold"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <div className="h-px bg-border my-1" />
          <button 
            onClick={() => {
              setIsOpen(false)
              signOut({ callbackUrl: "/" })
            }}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-600 transition-colors text-sm font-bold"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
