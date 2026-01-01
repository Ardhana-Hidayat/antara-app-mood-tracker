"use server"

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { journalSchema } from "../schemas"
import { revalidatePath } from "next/cache"
import { GoogleGenerativeAI } from "@google/generative-ai"

export type JournalState = {
  errors?: {
    title?: string[]
    content?: string[]
    mood?: string[]
    _form?: string[]
  }
  success?: boolean
}

export async function fetchJournals() {
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("journals")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return []
  }

  return data
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function createJournal(
  state: JournalState,
  formData: FormData
): Promise<JournalState> {

  const parsed = journalSchema.safeParse({
    title: formData.get("title") || undefined,
    content: formData.get("content"),
    mood: formData.get("mood"),
  })

  if (!parsed.success) {
    const fe = parsed.error.flatten().fieldErrors
    return {
      errors: {
        title: fe.title,
        content: fe.content,
        mood: fe.mood,
      }
    }
  }

  const supabase = await createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return {
      errors: {
        _form: ["sesi anda habis, silakan login kembali"]
      }
    }
  }

  const { data: journal, error } = await supabase
    .from("journals")
    .insert({
      ...parsed.data,
      user_id: user.id
    })
    .select()
    .single()

  if (error || !journal) {
    return {
      errors: {
        _form: ["gagal menyimpan jurnal"]
      }
    }
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

    const prompt = `
kamu adalah asisten refleksi emosional yang empatik, hangat, dan tidak menghakimi.

balas hanya dengan json valid:
{
  "summary": string,
  "insight": string,
  "suggestion": string
}

mood: ${parsed.data.mood}
jurnal:
${parsed.data.content}
`
    const result = await model.generateContent(prompt)
    const raw = result.response.text()
    const json = raw.substring(raw.indexOf("{"), raw.lastIndexOf("}") + 1)
    const insight = JSON.parse(json)

    await supabase.from("ai_insights").insert({
      journal_id: journal.id,
      summary: insight.summary,
      insight: insight.insight,
      suggestion: insight.suggestion,
    })
  } catch {}

  revalidatePath("/dashboard")
  // revalidatePath(`/journals/${journal.id}`)

  return { success: true }
}