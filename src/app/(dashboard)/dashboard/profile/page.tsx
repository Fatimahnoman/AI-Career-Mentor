"use client"

import { useSession } from "next-auth/react"
import { User, Mail, Calendar } from "lucide-react"

export default function ProfilePage() {
  const { data: session } = useSession()

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Your Profile</h1>
        <p className="text-muted-foreground">Manage your personal information.</p>
      </div>

      <div className="glass rounded-3xl p-8 border border-white/20">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-2xl bg-primary flex items-center justify-center font-black text-3xl text-primary-foreground shadow-xl">
            {session?.user?.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U"}
          </div>
          <div>
            <h2 className="text-2xl font-black">{session?.user?.name || "User"}</h2>
            <p className="text-muted-foreground">{session?.user?.email}</p>
          </div>
        </div>

        <div className="grid gap-6 mt-8">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs font-black uppercase text-muted-foreground">Email Address</p>
              <p className="text-sm font-bold">{session?.user?.email}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs font-black uppercase text-muted-foreground">Member Since</p>
              <p className="text-sm font-bold">May 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
