"use client"

import { useState } from "react"
import { Briefcase, MessageSquare, Target, Zap, FileText, Sparkles, TrendingUp } from "lucide-react"
import { ResumeUpload } from "@/components/dashboard/resume-upload"
import { ResumeAnalysisResult } from "@/components/dashboard/resume-analysis-result"
import { useSession } from "next-auth/react"

export default function DashboardPage() {
  const [analysis, setAnalysis] = useState<any>(null)
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const { data: session } = useSession()

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {session?.user?.name || "User"}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your career journey today.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold border border-primary/20">
          <Sparkles className="h-4 w-4" />
          Pro Member
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<Zap className="h-5 w-5 text-yellow-500" />}
          label="AI Insights"
          value="12"
          description="New career tips today"
        />
        <StatCard
          icon={<Target className="h-5 w-5 text-blue-500" />}
          label="Skill Level"
          value="78%"
          description="+5% from last month"
        />
        <StatCard
          icon={<Briefcase className="h-5 w-5 text-green-500" />}
          label="Applications"
          value="8"
          description="4 pending review"
        />
        <StatCard
          icon={<MessageSquare className="h-5 w-5 text-purple-500" />}
          label="Chat History"
          value="45"
          description="Total messages exchanged"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-10">
          {!analysis ? (
            <div className="rounded-3xl border bg-card p-8 md:p-12 shadow-sm border-border/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <FileText className="h-32 w-32" />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                <div className="p-4 bg-primary/10 rounded-2xl">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight">AI Resume Analyzer</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Upload your resume to get instant AI-driven feedback, identify skill gaps, and discover your ideal career roadmap.
                  </p>
                </div>
                <ResumeUpload onAnalysisComplete={(data, file) => {
                    setAnalysis(data)
                    setOriginalFile(file)
                }} />
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center justify-between border-b pb-6">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">Your AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">Based on your most recent resume upload.</p>
                </div>
                <button 
                  onClick={() => setAnalysis(null)}
                  className="inline-flex h-9 items-center justify-center rounded-lg border border-input bg-background px-4 text-xs font-bold shadow-sm transition-all hover:bg-accent active:scale-95"
                >
                  Analyze New Resume
                </button>
              </div>
              <ResumeAnalysisResult data={analysis} originalFile={originalFile!} />
            </div>
          )}

          {/* Additional Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                  <Target className="h-5 w-5" />
                </div>
                <h3 className="font-bold">Skill Growth</h3>
              </div>
              <div className="space-y-5">
                {[
                  { name: "System Design", progress: 60 },
                  { name: "Cloud Architecture", progress: 45 },
                  { name: "Advanced React", progress: 85 },
                ].map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground font-bold">{skill.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-1000" 
                        style={{ width: `${skill.progress}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-500/10 rounded-lg text-green-500">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h3 className="font-bold">Active Goals</h3>
              </div>
              <div className="space-y-4">
                {[
                  "Complete Portfolio Refresh",
                  "Earn AWS Certification",
                  "Master Next.js 15 Features",
                ].map((goal, i) => (
                  <div key={i} className="flex items-center gap-3 group">
                    <div className="h-5 w-5 rounded border border-primary/30 flex items-center justify-center group-hover:border-primary transition-colors cursor-pointer">
                      <div className="h-2.5 w-2.5 bg-primary rounded-sm opacity-0 group-hover:opacity-20 transition-opacity" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{goal}</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 text-xs font-bold text-primary hover:underline">
                View All Goals
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Area */}
        <div className="space-y-8">
          <div className="rounded-2xl border bg-gradient-to-br from-primary/10 to-transparent p-6 shadow-sm border-primary/20">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Zap className="h-4 w-4 text-yellow-500" />
              AI Career Tip
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              "Candidates with **Terraform** experience are seeing a **40% higher** interview callback rate in your current region."
            </p>
            <button className="mt-4 text-xs font-bold text-primary hover:underline">
              Learn More
            </button>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="font-bold mb-4">Job Matchings</h3>
            <div className="space-y-4">
              {[
                { company: "Vercel", role: "Senior Frontend Engineer" },
                { company: "Stripe", role: "Product Engineer" },
              ].map((job, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl border bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="h-10 w-10 rounded-lg bg-background border flex items-center justify-center font-bold text-xs">
                    {job.company[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold truncate">{job.role}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{job.company}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 inline-flex h-10 items-center justify-center rounded-xl border border-input bg-background px-4 text-sm font-bold shadow-sm transition-all hover:bg-accent active:scale-95">
              Browse All Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode
  label: string
  value: string
  description: string
}) {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-sm flex flex-col gap-2 hover:shadow-md transition-all border-border/50">
      <div className="flex items-center gap-2 text-muted-foreground uppercase text-[10px] font-bold tracking-widest">
        {icon}
        {label}
      </div>
      <div className="text-3xl font-bold tracking-tight">{value}</div>
      <div className="text-xs text-muted-foreground font-medium">{description}</div>
    </div>
  )
}
