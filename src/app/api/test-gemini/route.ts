import { NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function GET() {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("gemini api key tidak ditemukan")
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-001", 
    })

    const result = await model.generateContent(
      "buat satu kalimat refleksi singkat tentang emosi"
    )

    return NextResponse.json({
      ok: true,
      text: result.response.text(),
    })
  } catch (err) {
    console.error("gemini error:", err)

    return NextResponse.json(
      {
        ok: false,
        error: err instanceof Error ? err.message : "unknown error",
      },
      { status: 500 }
    )
  }
}