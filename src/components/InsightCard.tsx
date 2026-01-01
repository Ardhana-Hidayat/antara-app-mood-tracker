// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"

// export default function InsightCard({
//   journal,
//   insight,
// }: {
//   journal: any
//   insight: any
// }) {
//   const [loading, setLoading] = useState(false)
//   const [data, setData] = useState(insight)

//   async function generateInsight() {
//     setLoading(true)

//     const res = await fetch("/api/ai/insight", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         content: journal.content,
//         mood: journal.mood,
//         journalId: journal.id,
//       }),
//     })

//     const json = await res.json()
//     setData(json.insight)
//     setLoading(false)
//   }

//   if (!data) {
//     return (
//       <div className="border rounded-2xl p-6 text-center space-y-3 bg-muted/30">
//         <p className="text-sm text-muted-foreground">
//           ingin tahu refleksi dari ai?
//         </p>
//         <Button onClick={generateInsight} disabled={loading}>
//           {loading ? "merenung..." : "buat insight"}
//         </Button>
//       </div>
//     )
//   }

//   return (
//     <section className="border rounded-2xl p-6 space-y-4 bg-muted/20">
//       <h3 className="text-sm font-semibold text-muted-foreground uppercase">
//         refleksi ai
//       </h3>

//       <p className="font-medium">{data.summary}</p>

//       <p className="text-sm text-muted-foreground">{data.insight}</p>

//       <div className="border-l-2 pl-4 italic text-sm">
//         {data.suggestion}
//       </div>
//     </section>
//   )
// }