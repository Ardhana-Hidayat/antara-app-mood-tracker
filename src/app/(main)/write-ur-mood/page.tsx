import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { X, Image as ImageIcon } from "lucide-react";

export default function WritePage() {
  const moods = [
    { icon: "😫", label: "Buruk" },
    { icon: "😟", label: "Kurang" },
    { icon: "😐", label: "Biasa" },
    { icon: "🙂", label: "Baik" },
    { icon: "😁", label: "Senang" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="flex justify-between items-center p-4 border-b">
        <Link href="/dashboard">
            <Button variant="ghost" size="icon"><X className="h-6 w-6" /></Button>
        </Link>
        <span className="font-semibold text-sm text-muted-foreground">20 Nov 2023</span>
        <Button size="sm" className="bg-primary text-white">Simpan</Button>
      </header>

      <main className="flex-1 p-6 space-y-6 max-w-2xl mx-auto w-full">
        <section>
          <h2 className="text-center mb-4 font-medium text-muted-foreground">Bagaimana perasaanmu?</h2>
          <div className="flex justify-between gap-2">
            {moods.map((m, i) => (
              <button key={i} className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-slate-100 focus:bg-indigo-50 focus:ring-2 focus:ring-primary transition">
                <span className="text-3xl">{m.icon}</span>
                <span className="text-[10px] text-muted-foreground">{m.label}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="space-y-4 h-full">
          <Input 
            placeholder="Judul (Opsional)" 
            className="text-lg font-semibold border-none px-0 shadow-none focus-visible:ring-0" 
          />
          <Textarea 
            placeholder="Tulis ceritamu di sini..." 
            className="min-h-75 resize-none border-none px-0 shadow-none focus-visible:ring-0 text-base leading-relaxed" 
          />
        </section>
      </main>

      <div className="p-4 border-t flex gap-2">
        <Button variant="ghost" size="icon"><ImageIcon className="h-5 w-5 text-muted-foreground" /></Button>
      </div>
    </div>
  );
}