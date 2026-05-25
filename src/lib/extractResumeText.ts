import mammoth from "mammoth"
import { extractText } from "unpdf"

export async function extractResumeText(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  let extractedText = ""

  if (file.type === "application/pdf") {
    // unpdf strictly requires a Uint8Array
    const uint8Array = new Uint8Array(arrayBuffer)
    const { text } = await extractText(uint8Array)
    extractedText = Array.isArray(text) ? text.join("\n") : text
  } else if (file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    // mammoth requires a Buffer
    const buffer = Buffer.from(arrayBuffer)
    const result = await mammoth.extractRawText({ buffer })
    extractedText = result.value
  } else {
    throw new Error("Unsupported file type. Please upload a PDF or DOCX file.")
  }

  if (!extractedText || extractedText.trim().length < 50) {
    throw new Error("Could not extract enough text from the resume. The file might be empty or scanned as an image.")
  }

  return extractedText.trim()
}
