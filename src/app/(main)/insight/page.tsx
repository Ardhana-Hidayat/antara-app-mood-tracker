import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

export default function InsightPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      <main className="p-4 space-y-4 max-w-2xl mx-auto">
        <Card className="bg-indigo-50 border-indigo-100">
          <CardHeader>
            <CardTitle className="text-primary text-sm font-bold uppercase tracking-wide">Ringkasan Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 italic">
              Minggu ini kamu cenderung merasa positif, terutama di akhir pekan. Kamu sering menyebut tentang pekerjaan saat merasa stres di hari Selasa dan Rabu.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Grafik Emosi</CardTitle>
            <TrendingUp className="text-muted-foreground w-4 h-4" />
          </CardHeader>
          <CardContent>
            <div className="h-32 flex items-end justify-between gap-2 px-2">
                {[40, 30, 60, 20, 80, 90, 85].map((h, i) => (
                    <div key={i} className="w-full bg-indigo-200 hover:bg-primary rounded-t-sm transition-all relative group" style={{ height: `${h}%` }}>
                       <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition">{h}%</div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground px-1">
                <span>S</span><span>S</span><span>R</span><span>K</span><span>J</span><span>S</span><span>M</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Topik Sering Muncul</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20">#Pekerjaan (5)</Badge>
            <Badge variant="outline">#Keluarga (3)</Badge>
            <Badge variant="outline">#Olahraga (2)</Badge>
            <Badge variant="outline">#Kopi (2)</Badge>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}