import { NextResponse } from "next/server"
import OpenAI from "openai"
import { extractResumeText } from "@/lib/extractResumeText"

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY || "",
  baseURL: "https://openrouter.ai/api/v1",
})

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // STEP 1: Resume Text Extraction
    let extractedText = ""
    try {
      extractedText = await extractResumeText(file)
    } catch (err: any) {
      console.error("Extraction error:", err)
      return NextResponse.json({ error: err.message }, { status: 400 })
    }

    // STEP 2 & 3: AI Processing with OpenRouter
    const model = process.env.AI_MODEL || "openai/gpt-oss-120b:free"

    const prompt = `
      You are an expert career advisor. Analyze the resume below and return JSON only.

      IMPORTANT LAYOUT PRESERVATION RULES:
      1. For any improvement suggestion (strengths, careerSuggestions), ensure the suggested text is approximately the same length (in characters and visual footprint) as the original section content. 
      2. Do not significantly increase or decrease the length of content. 
      3. Focus on quality, impact, and grammar, not on changing the length.

      {
        "skills": [],
        "strengths": [],
        "weaknesses": [],
        "missingSkills": [],
        "careerSuggestions": [],
        "recommendedRoles": []
      }

      Resume:
      ${extractedText}
      
      IMPORTANT: Return ONLY valid JSON. No markdown formatting.
    `

    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    })

    const responseText = response.choices[0].message.content

    if (!responseText) {
      throw new Error("Empty response from AI service")
    }
    
    // Parse response safely
    const cleanJson = responseText.replace(/```json|```/g, "").trim()
    const analysis = JSON.parse(cleanJson)

    return NextResponse.json({
      success: true,
      analysis,
      fileName: file.name,
      originalText: extractedText
    })
  } catch (error: any) {
    console.error("AI Analysis error:", error)
    return NextResponse.json({ 
      error: "Failed to process resume analysis. Please try again.",
      details: error.message 
    }, { status: 500 })
  }
}
