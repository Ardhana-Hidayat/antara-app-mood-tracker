import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { content, mood } = await req.json();

  if (!content) {
    return NextResponse.json(
      { error: "konten jurnal kosong" },
      { status: 400 }
    );
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const prompt = `
kamu adalah asisten refleksi emosional yang empatik, tidak menghakimi, dan singkat.

kembalikan dalam format json valid:
{
  "summary": string,
  "insight": string,
  "suggestion": string
}

mood pengguna: ${mood}

isi jurnal:
${content}
`;

  const result = await model.generateContent(prompt);
  const raw = result.response.text();
  const json = raw.substring(raw.indexOf("{"), raw.lastIndexOf("}") + 1);

  return NextResponse.json({
    insight: JSON.parse(json),
  });
}
