"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, FileText, X, CheckCircle2, Loader2, AlertCircle, FileSearch, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function ResumeUpload({ onAnalysisComplete }: { onAnalysisComplete?: (data: any, file: File) => void }) {
  const [dragActive, setDragActive] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Progress bar simulation
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) return prev
          return prev + Math.random() * 10
        })
      }, 500)
      return () => clearInterval(interval)
    } else {
      setProgress(0)
    }
  }, [loading])

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const validateFile = (file: File) => {
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ]
    if (!validTypes.includes(file.type)) {
      setStatus("error")
      setMessage("Please upload a PDF or DOCX file.")
      return false
    }
    if (file.size > 5 * 1024 * 1024) {
      setStatus("error")
      setMessage("File size must be less than 5MB.")
      return false
    }
    return true
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0]
      if (validateFile(droppedFile)) {
        setFile(droppedFile)
        setStatus("idle")
        setMessage("")
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (validateFile(selectedFile)) {
        setFile(selectedFile)
        setStatus("idle")
        setMessage("")
      }
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    setStatus("idle")
    setProgress(10)

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/resume", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setProgress(100)
        setTimeout(() => {
          setStatus("success")
          setMessage("Analysis complete!")
          if (onAnalysisComplete) {
            onAnalysisComplete(data.analysis, file)
          }
        }, 500)
      } else {
        setStatus("error")
        setMessage(data.error || "Failed to analyze resume.")
        setLoading(false)
      }
    } catch (err) {
      setStatus("error")
      setMessage("An unexpected error occurred.")
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-12 transition-all flex flex-col items-center justify-center text-center gap-6",
          dragActive ? "border-primary bg-primary/5 scale-[1.01]" : "border-muted-foreground/20 bg-card",
          file && !loading ? "border-primary/50" : "",
          loading ? "border-primary bg-primary/5" : ""
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf,.docx"
          onChange={handleChange}
        />

        {loading ? (
          <div className="flex flex-col items-center gap-6 w-full py-4">
            <div className="relative">
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <FileSearch className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="space-y-2 w-full max-w-xs">
              <p className="font-bold text-lg animate-pulse">Analyzing Resume...</p>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300 ease-out" 
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground">Extracting text and identifying skills</p>
            </div>
          </div>
        ) : file ? (
          <div className="flex flex-col items-center gap-4 w-full animate-in zoom-in-95 duration-300">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <FileText className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-lg truncate max-w-[250px]">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)} MB • Ready for analysis
              </p>
            </div>
            <button
              onClick={() => setFile(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <div className="p-4 bg-muted/50 rounded-2xl mb-4 inline-block">
              <Upload className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-xl tracking-tight">Upload your resume</h4>
              <p className="text-muted-foreground max-w-xs mx-auto text-sm">
                Drag and drop your file here, or click to browse from your computer
              </p>
            </div>
            <button
              onClick={() => inputRef.current?.click()}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-input bg-background px-8 text-sm font-bold shadow-sm transition-all hover:bg-accent hover:text-accent-foreground active:scale-95"
            >
              Choose File
            </button>
            <p className="mt-4 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
              PDF or DOCX • MAX 5MB
            </p>
          </div>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 animate-in slide-in-from-top-2">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}

      {status === "success" && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 animate-in slide-in-from-top-2">
          <Sparkles className="h-5 w-5 shrink-0" />
          <p className="text-sm font-bold">{message}</p>
        </div>
      )}

      {file && !loading && status !== "success" && (
        <button
          onClick={handleUpload}
          className="w-full inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 active:scale-[0.98] group"
        >
          <Sparkles className="mr-2 h-4 w-4 group-hover:animate-pulse" />
          Start AI Analysis
        </button>
      )}
    </div>
  )
}
