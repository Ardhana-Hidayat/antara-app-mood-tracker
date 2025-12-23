import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  const supabase = await createSupabaseServerClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  const journals = [
    { id: 1, date: "Hari Ini, 10:30", mood: "😁", title: "Hari yang produktif!", preview: "Akhirnya selesai mengerjakan proyek besar...", tags: ["Kerja"] },
    { id: 2, date: "Kemarin", mood: "😟", title: "Agak lelah", preview: "Seharian cuma di kasur karena flu berat...", tags: ["Kesehatan"] },
    { id: 3, date: "17 Nov", mood: "🙂", title: "Makan malam enak", preview: "Pergi ke restoran baru sama teman-teman...", tags: ["Sosial"] },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <main className="p-4 space-y-4 max-w-2xl mx-auto">
        {journals.map((j) => (
          <Card key={j.id} className="cursor-pointer hover:shadow-md transition border-l-4 border-l-primary">
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-2">
                <span className="text-2xl bg-slate-100 p-2 rounded-full">{j.mood}</span>
                <div>
                  <CardTitle className="text-base">{j.title}</CardTitle>
                  <span className="text-xs text-muted-foreground">{j.date}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 line-clamp-2">{j.preview}</p>
              <div className="mt-3 flex gap-2">
                {j.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs font-normal">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}