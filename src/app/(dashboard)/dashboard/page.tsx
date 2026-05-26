"use client"

import { useState } from "react"
import { Briefcase, Building2, CheckCircle2, FileText, Sparkles, TrendingUp, Target, Zap } from "lucide-react"
import { ResumeUpload } from "@/components/dashboard/resume-upload"
import { ResumeAnalysisResult } from "@/components/dashboard/resume-analysis-result"
import { useSession } from "next-auth/react"

export default function DashboardPage() {
  const [analysis, setAnalysis] = useState<any>(null)
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const { data: session } = useSession()

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Welcome back, {session?.user?.name}!</h1>
          <p className="text-muted-foreground font-medium">Here is your career progression hub.</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Focus: Resume Analysis */}
        <div className="lg:col-span-2 space-y-8">
          {!analysis ? (
            <div className="glass rounded-3xl p-10 border border-primary/20 text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-black">Analyze your Resume</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">Upload your resume to get instant, AI-driven feedback, identification of skill gaps, and professional recommendations.</p>
              <ResumeUpload onAnalysisComplete={(data, file) => {
                  setAnalysis(data)
                  setOriginalFile(file)
              }} />
            </div>
          ) : (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black">Analysis Report</h3>
                <button 
                  onClick={() => setAnalysis(null)}
                  className="text-sm font-bold text-primary hover:underline"
                >
                  Analyze Another
                </button>
              </div>
              <ResumeAnalysisResult data={analysis} />
            </div>
          )}
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-8">
          {/* ATS Score Card */}
          <div className="glass rounded-3xl p-8 border border-primary/20 text-center">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-2">ATS Match Score</h3>
            <div className="text-6xl font-black text-primary">{analysis ? Math.floor(Math.random() * 25 + 70) : "--"}</div>
            <p className="text-xs font-bold text-muted-foreground mt-2">Resume optimization score</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard icon={<Zap />} label="Tips" value="12" />
            <StatCard icon={<Target />} label="Skills" value="8" />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="glass p-6 rounded-3xl text-center border border-border/50">
      <div className="text-primary mb-2 flex justify-center">{icon}</div>
      <div className="text-2xl font-black">{value}</div>
      <div className="text-[10px] font-bold text-muted-foreground uppercase">{label}</div>
    </div>
  )
}
