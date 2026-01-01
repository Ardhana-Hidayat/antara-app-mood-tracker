import { createSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";
import { JournalCard } from "@/components/JournalCard";
import { fetchJournals } from "@/lib/actions/journal";
import { BookX } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const journals = await fetchJournals()

  return (
    <div className="min-h-screen bg-background pb-24">
      <main className="p-4 space-y-4 max-w-2xl mx-auto">

        {journals.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-muted-foreground/20 rounded-2xl bg-card/50">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <BookX className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Belum ada catatan</h3>
            <p className="text-muted-foreground max-w-xs mb-6 text-sm">
              Yuk, mulai tulis apa yang kamu rasakan!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {journals.map((j) => (
              <JournalCard
                key={j.id}
                mood={j.mood}
                title={j.title}
                content={j.content}
                date={j.date}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}