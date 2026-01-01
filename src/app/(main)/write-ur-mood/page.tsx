"use client"

import Link from "next/link"
import { useFormStatus } from "react-dom"
import { useActionState, useEffect, useState } from "react"
import { createJournal, JournalState } from "@/lib/actions/journal"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { X, Image as Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const initialState: JournalState = { errors: {} }

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button size="sm" type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Menyimpan...
        </>
      ) : (
        "Simpan"
      )}
    </Button>
  )
}

export default function WritePage() {
  const [state, formAction] = useActionState(createJournal, initialState)
  const [mood, setMood] = useState<number | "">("") 
  const router = useRouter()

  const moods = [
    { value: 1, icon: "😫", label: "Buruk" },
    { value: 2, icon: "😟", label: "Kurang" },
    { value: 3, icon: "😐", label: "Biasa" },
    { value: 4, icon: "🙂", label: "Baik" },
    { value: 5, icon: "😁", label: "Senang" },
  ]

  useEffect(() => {
    if (state.success) {
      toast.success("Berhasil Disimpan", {
        description: "Cerita barumu telah ditambahkan ke jurnal."
      })
      router.push("/dashboard") 
    } 
    
    else if (state.errors && Object.keys(state.errors).length > 0) {
      const msg = state.errors._form?.[0] || "Mohon lengkapi data yang diperlukan."
      
      toast.error("Gagal Menyimpan", {
        description: msg
      })
    }
  }, [state, router])

  return (
    <form action={formAction} className="min-h-screen bg-background flex flex-col font-sans">
      <input type="hidden" name="mood" value={mood} />

      <header className="sticky top-0 z-10 flex justify-between items-center p-4 border-b bg-background/80 backdrop-blur-md">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" type="button">
            <X className="h-6 w-6 text-muted-foreground" />
          </Button>
        </Link>

        <span className="font-semibold text-sm text-muted-foreground">
          {new Date().toLocaleDateString("id-ID", { weekday: 'long', day: 'numeric', month: 'long' })}
        </span>

        <SubmitButton />
      </header>

      <main className="flex-1 p-6 space-y-8 max-w-2xl mx-auto w-full">
        <section>
          <h2 className="text-center mb-6 font-medium text-muted-foreground text-sm tracking-wide uppercase">
            Bagaimana perasaanmu?
          </h2>

          <div className="flex justify-between gap-2 sm:gap-4">
            {moods.map((m) => (
              <button
                type="button"
                key={m.icon}
                onClick={() => setMood(m.value)}
                className={cn(
                  "flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-200 flex-1",
                  mood === m.value 
                    ? "bg-primary/10 ring-2 ring-primary scale-105" 
                    : "hover:bg-muted/50 grayscale hover:grayscale-0"
                )}
              >
                <span className="text-3xl sm:text-4xl filter drop-shadow-sm">{m.icon}</span>
                <span className={cn(
                  "text-[10px] font-medium transition-colors",
                  mood === m.value ? "text-primary" : "text-muted-foreground"
                )}>
                  {m.label}
                </span>
              </button>
            ))}
          </div>

          {state.errors?.mood && (
            <p className="text-xs text-destructive mt-3 text-center font-medium animate-pulse">
              * {state.errors.mood[0]}
            </p>
          )}
        </section>

        <section className="space-y-4">
          <div className="space-y-1">
            <Input
              name="title"
              placeholder="Judul (Opsional)"
              className="text-2xl font-bold border-none px-0 shadow-none focus-visible:ring-0 placeholder:text-muted-foreground/50 bg-transparent"
            />
            {state.errors?.title && (
              <p className="text-xs text-destructive">{state.errors.title[0]}</p>
            )}
          </div>

          <div className="space-y-1">
            <Textarea
              name="content"
              placeholder="Ceritakan harimu di sini..."
              className="min-h-100 resize-none border-none px-0 shadow-none focus-visible:ring-0 text-base leading-relaxed placeholder:text-muted-foreground/50 bg-transparent"
            />
            {state.errors?.content && (
              <p className="text-xs text-destructive">{state.errors.content[0]}</p>
            )}
          </div>
        </section>
      </main>

      {state.errors?._form && (
        <div className="fixed bottom-4 right-4 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg shadow-lg text-sm">
          {state.errors._form[0]}
        </div>
      )}
    </form>
  )
}