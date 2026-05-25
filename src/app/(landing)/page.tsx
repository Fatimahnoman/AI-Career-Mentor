import Link from "next/link"
import { ArrowRight, Briefcase, GraduationCap, LineChart, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export default function LandingPage() {
  return (
    <div className="flex flex-col gap-24 pb-24">
      {/* Hero Section */}
      <section className="container pt-24 md:pt-40 flex flex-col items-center text-center gap-10">
        <div className="inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-6 py-2 text-sm font-bold text-amber-700 dark:text-amber-400 animate-pulse">
          <Sparkles className="h-4 w-4 mr-2" />
          AI-Powered Resume Analysis is here
        </div>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter max-w-5xl leading-tight text-foreground">
          Level Up Your Career with <span className="gradient-text">Next-Gen AI</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl font-medium leading-relaxed">
          The ultimate career companion. Get expert analysis, strategic roadmaps, and real-time guidance tailored just for you.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 mt-4">
          <Link
            href="/auth"
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-primary px-10 text-lg font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95"
          >
            Start Your Journey <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
          <Link
            href="#features"
            className="inline-flex h-14 items-center justify-center rounded-2xl glass px-10 text-lg font-bold shadow-xl transition-all hover:bg-muted active:scale-95"
          >
            Explore Features
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-foreground">Why Choose Us?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Experience the most advanced career mentor platform built with cutting-edge artificial intelligence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <FeatureCard
            icon={<Briefcase className="h-10 w-10 text-amber-600" />}
            title="Strategic Roadmaps"
            description="Our AI maps out every step of your career path, from junior to executive levels."
            gradient="from-amber-500/10 to-muted"
          />
          <FeatureCard
            icon={<GraduationCap className="h-10 w-10 text-amber-600" />}
            title="Smart Gap Analysis"
            description="Identify precisely which skills you lack and get personalized learning resources."
            gradient="from-amber-500/10 to-muted"
          />
          <FeatureCard
            icon={<LineChart className="h-10 w-10 text-amber-600" />}
            title="Real-time Insights"
            description="Stay ahead of market trends with live data-driven career recommendations."
            gradient="from-amber-500/10 to-muted"
          />
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
  gradient
}: {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
}) {
  return (
    <div className={cn(
      "flex flex-col items-center text-center p-10 rounded-3xl glass hover:scale-[1.02] transition-all group border-0",
      `bg-linear-to-br ${gradient}`
    )}>
      <div className="mb-6 rounded-2xl bg-card p-5 shadow-lg group-hover:rotate-6 transition-transform">
        {icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 text-foreground">{title}</h3>
      <p className="text-muted-foreground font-medium leading-relaxed">{description}</p>
    </div>
  )
}
