"use client"

import { useState } from "react"
import { Send, User, Bot, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI Career Mentor. How can I help you navigate your professional journey today?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      const data = await response.json()

      if (response.ok) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.content,
        }
        setMessages((prev) => [...prev, aiMessage])
      } else {
        throw new Error(data.error || "Failed to get AI response")
      }
    } catch (err) {
      console.error("Chat error:", err)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] max-w-4xl mx-auto">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex gap-4 items-start",
              m.role === "assistant" ? "justify-start" : "justify-end flex-row-reverse"
            )}
          >
            <div
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                m.role === "assistant" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
              )}
            >
              {m.role === "assistant" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
            </div>
            <div
              className={cn(
                "rounded-2xl px-4 py-2 max-w-[80%] text-sm",
                m.role === "assistant" ? "bg-card border" : "bg-primary text-primary-foreground"
              )}
            >
              {m.content}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your career..."
            className="flex-1 rounded-md border bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          AI Career Mentor can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  )
}
