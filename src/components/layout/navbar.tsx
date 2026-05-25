import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sparkles } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full glass border-b">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary/10 p-2 rounded-xl">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <span className="inline-block font-extrabold text-2xl tracking-tight gradient-text">AI Career Mentor</span>
          </Link>
        </div>
        <nav className="flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm font-semibold transition-colors hover:text-primary"
          >
            Features
          </Link>
          <Link
            href="#about"
            className="text-sm font-semibold transition-colors hover:text-primary"
          >
            About
          </Link>
          <Link
            href="/auth"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95"
          >
            Get Started
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
