// import { notFound } from "next/navigation"
// import { createSupabaseServerClient } from "@/lib/supabase/server"
// import InsightCard from "./insight-card"

// export default async function JournalDetailPage({
//   params,
// }: {
//   params: { id: string }
// }) {
//   const supabase = await createSupabaseServerClient()

//   const { data: journal } = await supabase
//     .from("journals")
//     .select("*")
//     .eq("id", params.id)
//     .single()

//   if (!journal) notFound()

//   const { data: insight } = await supabase
//     .from("ai_insights")
//     .select("*")
//     .eq("journal_id", journal.id)
//     .single()

//   return (
//     <div className="min-h-screen bg-background px-4 py-6 max-w-2xl mx-auto space-y-8">
//       <header className="space-y-2">
//         <div className="flex items-center gap-3">
//           <span className="text-3xl">{journal.mood}</span>
//           <span className="text-sm text-muted-foreground">
//             {new Date(journal.created_at).toLocaleDateString("id-ID", {
//               weekday: "long",
//               day: "numeric",
//               month: "long",
//               year: "numeric",
//             })}
//           </span>
//         </div>

//         {journal.title && (
//           <h1 className="text-2xl font-bold">{journal.title}</h1>
//         )}
//       </header>

//       <article className="text-base leading-relaxed whitespace-pre-wrap">
//         {journal.content}
//       </article>

//       <InsightCard journal={journal} insight={insight} />
//     </div>
//   )
// }