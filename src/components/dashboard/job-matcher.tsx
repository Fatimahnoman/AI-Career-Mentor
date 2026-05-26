"use client"

import { Building2, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Job = {
  id: number
  title: string
  company: string
  location: string
  role: string
  tags: string[]
}

const allJobs: Job[] = [
  { id: 1, title: "Senior Frontend Engineer", company: "Vercel", location: "Remote", role: "Frontend", tags: ["React", "TypeScript", "Next.js"] },
  { id: 2, title: "AI/ML Engineer", company: "Google", location: "Remote", role: "AI", tags: ["Python", "TensorFlow", "ML"] },
  { id: 3, title: "Prompt Engineer", company: "OpenAI", location: "Remote", role: "AI", tags: ["Prompt Engineering", "LLMs"] },
  { id: 4, title: "Full Stack Developer", company: "Shopify", location: "Hybrid", role: "Full Stack", tags: ["React", "Node.js", "AI"] },
  { id: 5, title: "Cloud Solutions Architect", company: "AWS", location: "Hybrid", role: "Cloud", tags: ["AWS", "Terraform"] },
  { id: 6, title: "Automation Engineer", company: "UiPath", location: "Hybrid", role: "DevOps", tags: ["RPA", "Python", "AI"] },
  { id: 7, title: "UX Designer", company: "Figma", location: "Remote", role: "Designer", tags: ["Figma", "UI/UX"] },
  { id: 8, title: "Backend Specialist", company: "Netflix", location: "Remote", role: "Backend", tags: ["Python", "Go"] },
]

export function JobMatcher({ recommendedRoles }: { recommendedRoles: string[] }) {
  
  // Super-flexible Matching
  const eligibleJobs = allJobs.filter(job => 
    recommendedRoles.some(aiRole => {
      const aiWords = aiRole.toLowerCase().split(/\s+/);
      const jobWords = (job.title + " " + job.role + " " + job.tags.join(" ")).toLowerCase().split(/\s+/);
      
      // Check if any word from AI role exists in job details
      return aiWords.some(word => jobWords.includes(word) || jobWords.some(jWord => jWord.includes(word)));
    })
  )

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-black tracking-tight text-foreground flex items-center gap-3">
        <CheckCircle2 className="h-6 w-6 text-primary" />
        Jobs You're Eligible For
      </h3>
      
      {eligibleJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {eligibleJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="glass p-8 rounded-3xl border border-border">
          <p className="text-sm font-bold text-muted-foreground text-center">
            Based on your AI analysis ({recommendedRoles.join(", ")}), we are refining your job matches. 
            <br/>Try applying to some of our <span className="text-primary font-black">Trending Opportunities</span> below.
          </p>
        </div>
      )}
    </div>
  )
}

function JobCard({ job }: { job: Job }) {
  return (
    <div className="glass p-6 rounded-3xl border border-border/50 hover:border-primary/50 transition-all group">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-primary/10 rounded-xl text-primary">
          <Building2 className="h-6 w-6" />
        </div>
        <button className="text-xs font-bold bg-primary text-white px-3 py-1.5 rounded-lg hover:scale-105 transition-transform">
          Apply
        </button>
      </div>
      <h4 className="font-black text-lg leading-tight mb-1 text-foreground">{job.title}</h4>
      <p className="text-xs font-bold text-muted-foreground mb-4">{job.company} • {job.location}</p>
      
      <div className="flex flex-wrap gap-2">
        {job.tags.map(tag => (
          <span key={tag} className="px-3 py-1 rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
