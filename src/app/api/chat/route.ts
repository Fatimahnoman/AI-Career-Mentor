import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || "",
  baseURL: "https://openrouter.ai/api/v1",
})

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    const model = process.env.AI_MODEL || "openai/gpt-oss-120b:free"

    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content: "You are an AI Career Mentor. Help users navigate their professional journey with strategic advice.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    })

    const aiMessage = response.choices[0].message.content

    return NextResponse.json({
      role: "assistant",
      content: aiMessage,
    })
  } catch (error: any) {
    console.error("Chat error:", error)
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    )
  }
}
