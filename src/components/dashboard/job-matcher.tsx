"use client"

import { Briefcase, Building2, MapPin, ExternalLink } from "lucide-react"

export function JobMatcher({ recommendedRoles }: { recommendedRoles: string[] }) {
  // Simulated job database based on AI roles
  const mockJobs = [
    { id: 1, title: "Senior Frontend Engineer", company: "Vercel", location: "Remote", role: "Frontend Developer" },
    { id: 2, title: "Cloud Solutions Architect", company: "AWS", location: "Hybrid", role: "Cloud Architect" },
    { id: 3, title: "React Developer", company: "Stripe", location: "Remote", role: "Frontend Developer" },
    { id: 4, title: "DevOps Engineer", company: "Google", location: "New York", role: "DevOps" },
  ]

  // Filter jobs based on AI recommended roles
  const eligibleJobs = mockJobs.filter(job => 
    recommendedRoles.some(role => job.role.toLowerCase().includes(role.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-black tracking-tight">Jobs You're Eligible For</h3>
      {eligibleJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {eligibleJobs.map((job) => (
            <div key={job.id} className="glass p-5 rounded-2xl border border-border/50 hover:border-primary/50 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  <Building2 className="h-5 w-5" />
                </div>
                <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                  Apply <ExternalLink className="h-3 w-3" />
                </button>
              </div>
              <h4 className="font-bold text-sm">{job.title}</h4>
              <p className="text-xs text-muted-foreground font-bold mt-1">{job.company} • {job.location}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground italic">No direct matches found yet. Keep improving your skills!</p>
      )}
    </div>
  )
}
