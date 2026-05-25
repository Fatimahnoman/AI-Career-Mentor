import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format").regex(/@gmail\.com$/, "Only Gmail addresses are allowed"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const result = registerSchema.safeParse(body)
    
    if (!result.success) {
      // Robustly get the first error message
      const errorMessage = result.error.issues[0]?.message || "Invalid input data"
      return NextResponse.json({ error: errorMessage }, { status: 400 })
    }

    const { name, email, password } = result.data
    const lowerEmail = email.toLowerCase().trim()

    // Blacklist check
    const blacklistedWords = ["test", "bnb", "fake", "user", "admin", "dummy", "bot"]
    const emailName = lowerEmail.split("@")[0]
    if (blacklistedWords.some(word => emailName.includes(word))) {
      return NextResponse.json({ error: "Invalid Gmail: Fake or test accounts are not allowed." }, { status: 400 })
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: lowerEmail },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Account already exists with this email." },
        { status: 400 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email: lowerEmail,
        password: hashedPassword,
      },
    })

    return NextResponse.json(
      { message: "Account created successfully!", user: { email: user.email, name: user.name } },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
