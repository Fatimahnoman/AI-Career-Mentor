"use client"

import { useState } from "react"
import { 
  CheckCircle2, Lightbulb, Target, TrendingUp, AlertTriangle, 
  Briefcase, Star, Download, PlusCircle, Clipboard
} from "lucide-react"
import { JobMatcher } from "./job-matcher"
import { cn } from "@/lib/utils"

type AnalysisData = {
  skills: string[]
  strengths: string[]
  weaknesses: string[]
  missingSkills: string[]
  careerSuggestions: string[]
  recommendedRoles: string[]
  summary?: string
  originalText?: string
}

export function ResumeAnalysisResult({ data }: { data: AnalysisData }) {
  const [editedText, setEditedText] = useState(data.originalText || "")
  const [copied, setCopied] = useState(false)

  const applySuggestion = (suggestion: string) => {
    setEditedText(prev => prev + "

" + suggestion)
  }

  const copyToClipboard = () => {
    const text = `Summary: ${data.summary || ""}

Strengths: ${data.strengths.join(", ")}

Suggestions:
${data.careerSuggestions.join("
")}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Editable Resume Section */}
      <div className="glass rounded-3xl p-8 border border-primary/20">
        <div className="mb-4">
          <h3 className="text-xl font-black">Edit Your Resume</h3>
          <p className="text-xs text-muted-foreground mt-1">Copy the improvements or edit your resume text here.</p>
        </div>
        <textarea 
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full h-64 p-4 rounded-xl bg-muted/30 text-sm font-medium border border-border resize-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Recommended Roles */}
        <div className="md:col-span-2 rounded-3xl glass p-8 border-primary/20 bg-linear-to-br from-primary/5 to-blue-500/5">
          <h3 className="text-2xl font-black mb-6 text-primary flex items-center gap-3">
            <Star className="h-7 w-7 fill-primary" />
            Recommended Career Roles
          </h3>
          <div className="flex flex-wrap gap-3">
            {data.recommendedRoles.map((role, i) => (
              <span key={i} className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground text-sm font-black">{role}</span>
            ))}
          </div>
        </div>

        {/* Career Suggestions with Apply Button */}
        <div className="md:col-span-2 rounded-3xl glass p-8 bg-linear-to-br from-purple-500/5 to-transparent border-purple-500/10">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-black text-purple-600 flex items-center gap-3">
              <TrendingUp className="h-7 w-7" />
              Strategic AI Improvements
            </h3>
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-105 transition-transform"
            >
              <Clipboard className="h-4 w-4" />
              {copied ? "Copied!" : "Copy All Suggestions"}
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.careerSuggestions.map((suggestion, i) => (
              <div key={i} className="flex flex-col gap-4 p-6 rounded-2xl glass bg-white/40 dark:bg-white/5 hover:scale-[1.02] transition-all group">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-purple-500/10 rounded-xl text-purple-600">
                    <Briefcase className="h-5 w-5" />
                  </div>
                  <button 
                    onClick={() => applySuggestion(suggestion)}
                    className="text-xs font-bold bg-purple-100 dark:bg-purple-900/30 text-purple-600 px-3 py-1.5 rounded-lg hover:bg-purple-200 flex items-center gap-1"
                  >
                    <PlusCircle className="h-3 w-3" /> Apply
                  </button>
                </div>
                <p className="text-sm font-bold leading-relaxed text-muted-foreground">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="glass rounded-3xl p-8 border border-primary/20">
        <JobMatcher recommendedRoles={data.recommendedRoles} />
      </div>
    </div>
  )
}
