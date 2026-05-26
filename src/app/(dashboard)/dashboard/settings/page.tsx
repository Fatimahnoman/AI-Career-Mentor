"use client"

import { useState, useEffect } from "react"
import { User, Palette, Shield, ChevronRight, Moon, Sun, Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { data: session, update } = useSession()
  const [mounted, setMounted] = useState(false)
  
  const [name, setName] = useState(session?.user?.name || "")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)
  
  // Toast state
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const updateProfile = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/user/update-profile", {
        method: "POST",
        body: JSON.stringify({ name }),
      })
      if (res.ok) {
        showToast("Profile updated successfully!", "success")
        await update({ name }) // Refresh session
      } else {
        showToast("Failed to update profile", "error")
      }
    } catch {
      showToast("Error occurred", "error")
    }
    setLoading(false)
  }

  const updatePassword = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      if (res.ok) {
        showToast("Password updated successfully!", "success")
        setCurrentPassword("")
        setNewPassword("")
      } else {
        const data = await res.json()
        showToast(data.error || "Failed to update password", "error")
      }
    } catch {
      showToast("Error occurred", "error")
    }
    setLoading(false)
  }

  if (!mounted) return null

  return (
    <div className="max-w-4xl space-y-10">
      {/* Toast Notification */}
      {toast && (
        <div className={cn(
          "fixed top-20 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border animate-in slide-in-from-top-4 duration-300",
          toast.type === "success" ? "bg-background border-green-500/20 text-green-600" : "bg-background border-red-500/20 text-red-600"
        )}>
          {toast.type === "success" ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <p className="font-bold text-sm">{toast.message}</p>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-black tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Customize your account and application preferences.</p>
      </div>

      {/* Account Section */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Account Settings
        </h2>
        <div className="glass rounded-3xl p-6 border border-white/20 space-y-6">
          <div className="space-y-2">
            <p className="font-bold">Display Name</p>
            <div className="flex gap-4">
              <input 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-muted/50 border-none rounded-xl py-3 px-4 text-sm font-bold"
              />
              <button 
                onClick={updateProfile}
                disabled={loading}
                className="bg-primary text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin h-4 w-4" /> : <Save className="h-4 w-4" />}
                Save
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Appearance Section */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          Appearance
        </h2>
        <div className="glass rounded-3xl p-6 border border-white/20 flex items-center justify-between">
          <div>
            <p className="font-bold">Interface Theme</p>
            <p className="text-sm text-muted-foreground">Switch between light and dark modes.</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setTheme("light")}
              className={cn("p-3 rounded-xl transition-all", theme === "light" ? "bg-primary text-white" : "glass")}
            >
              <Sun className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setTheme("dark")}
              className={cn("p-3 rounded-xl transition-all", theme === "dark" ? "bg-primary text-white" : "glass")}
            >
              <Moon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Security
        </h2>
        <div className="glass rounded-3xl p-6 border border-white/20 space-y-4">
          <input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full bg-muted/50 border-none rounded-xl py-3 px-4 text-sm font-bold" />
          <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full bg-muted/50 border-none rounded-xl py-3 px-4 text-sm font-bold" />
          <button 
            onClick={updatePassword}
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Update Password"}
          </button>
        </div>
      </section>
    </div>
  )
}
