import { Sidebar } from "@/components/layout/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserProfile } from "@/components/dashboard/user-profile"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 lg:ml-72">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between bg-background border-b border-border px-6 md:px-10 lg:pl-10 pl-16">
          <div>
            <h2 className="text-xl font-black tracking-tight uppercase text-foreground">Workspace</h2>
          </div>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <UserProfile />
          </div>
        </header>
        <main className="p-6 md:p-10 max-w-7xl mx-auto">{children}</main>
      </div>
    </div>
  )
}
