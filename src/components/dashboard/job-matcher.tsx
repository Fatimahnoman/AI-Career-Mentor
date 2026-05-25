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
  
  // Intelligent Matching: Check title, role, and tags
  const eligibleJobs = allJobs.filter(job => 
    recommendedRoles.some(aiRole => 
      job.role.toLowerCase().includes(aiRole.toLowerCase()) || 
      aiRole.toLowerCase().includes(job.role.toLowerCase()) ||
      job.title.toLowerCase().includes(aiRole.toLowerCase()) ||
      job.tags.some(tag => aiRole.toLowerCase().includes(tag.toLowerCase()))
    )
  )

  const otherJobs = allJobs.filter(job => !eligibleJobs.includes(job)).slice(0, 3)

  return (
    <div className="space-y-12">
      {/* Eligible Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-black tracking-tight text-primary flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6" />
          Jobs You're Eligible For
        </h3>
        {eligibleJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eligibleJobs.map((job) => (
              <JobCard key={job.id} job={job} badge="Best Match" />
            ))}
          </div>
        ) : (
          <div className="glass p-8 rounded-3xl border border-border">
            <p className="text-sm font-bold text-muted-foreground">
                AI roles bohot specific hain. Aap niche di gayi trending jobs check kar sakte hain:
            </p>
          </div>
        )}
      </div>

      {/* Fallback/Browse Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold tracking-tight">Trending Opportunities</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(eligibleJobs.length > 0 ? otherJobs : allJobs.slice(0, 3)).map((job) => (
            <JobCard key={job.id} job={job} compact badge="Trending" />
          ))}
        </div>
      </div>
    </div>
  )
}

function JobCard({ job, compact = false, badge }: { job: Job, compact?: boolean, badge: string }) {
  return (
    <div className={cn(
      "glass p-6 rounded-3xl border border-border/50 hover:border-primary/50 transition-all group",
      compact ? "p-4" : ""
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-primary/10 rounded-xl text-primary">
          <Building2 className="h-6 w-6" />
        </div>
        <span className={cn("text-[10px] font-black px-2 py-1 rounded-lg uppercase", badge === "Best Match" ? "bg-primary text-white" : "bg-muted text-foreground")}>
            {badge}
        </span>
      </div>
      <h4 className="font-black text-lg leading-tight mb-1 text-foreground">{job.title}</h4>
      <p className="text-xs font-bold text-muted-foreground mb-4">{job.company} • {job.location}</p>
      
      {!compact && (
        <div className="flex flex-wrap gap-2">
          {job.tags.map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
