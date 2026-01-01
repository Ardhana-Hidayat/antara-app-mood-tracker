"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from "chart.js";
import { Bar } from "react-chartjs-2";
// 1. Import Plugin
import ChartDataLabels from "chartjs-plugin-datalabels";

// 2. Registrasi Plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Masukkan plugin di sini
);

export default function InsightPage() {
  const labels = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  
  const chartData: ChartData<"bar"> = {
    labels,
    datasets: [
      {
        label: "Mood",
        data: [40, 30, 60, 20, 80, 90, 85],
        backgroundColor: "#6155F5",
        hoverBackgroundColor: "#4e44c4",
        borderRadius: 8,
        barThickness: 32, // Sedikit dipertebal agar angka muat
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 25, // Memberi ruang di atas agar angka tidak terpotong
      }
    },
    // 3. Konfigurasi Animasi Bawaan (Built-in)
    animation: {
      duration: 2000, // Durasi 2 detik (lebih lambat & smooth)
      easing: "easeOutQuart", // Efek melambat di akhir
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true, // Tooltip tetap aktif jika user mau detail
        backgroundColor: "#030029",
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
            label: (c) => `Mood: ${c.raw}%`
        }
      },
      // 4. Konfigurasi Label Persentase
      datalabels: {
        display: true,
        color: "#64748b", // Warna text (muted-foreground)
        anchor: "end", // Posisi jangkar di ujung batang
        align: "top", // Posisi teks di atas jangkar
        offset: 4, // Jarak dari batang
        formatter: (value) => `${value}%`, // Format teks
        font: {
          family: "var(--font-jakarta)", // Sesuaikan font aplikasi
          size: 11,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          font: { family: "var(--font-jakarta)" },
          color: "#64748b",
        },
        border: { display: false },
      },
      y: {
        display: false, // Sembunyikan sumbu Y
        min: 0,
        suggestedMax: 110, 
      },
    },
  };

  return (
    <div className="min-h-screen bg-background pb-24 font-sans text-foreground">
      <main className="p-4 pt-6 space-y-6 max-w-2xl mx-auto">
        
        <div>
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" fill="currentColor" fillOpacity={0.2} />
            AI Insight
          </h2>
          <p className="text-muted-foreground text-sm">Analisis mingguan (13 - 19 Nov)</p>
        </div>

        <Card className="border-none shadow-sm bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary text-xs font-bold uppercase tracking-wider">
              ✨ Rangkuman
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed italic text-foreground/80">
              Minggu ini kamu cenderung merasa <span className="font-semibold text-primary">positif</span>. Grafik menunjukkan peningkatan mood yang signifikan saat memasuki akhir pekan.
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Grafik Emosi</CardTitle>
            <CardDescription>Tren mood 7 hari terakhir</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-55 w-full mt-2">
              <Bar options={options} data={chartData} />
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm bg-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Topik Terbanyak</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 shadow-none border-none">#Pekerjaan</Badge>
            <Badge variant="outline" className="border-muted text-muted-foreground">#Keluarga</Badge>
            <Badge variant="outline" className="border-muted text-muted-foreground">#Hobi</Badge>
          </CardContent>
        </Card>

      </main>
    </div>
  );
}