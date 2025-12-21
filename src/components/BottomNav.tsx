import Link from "next/link";
import { Home, Plus, BrainCircuit } from "lucide-react";

export function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4 flex justify-around items-center z-50">
      <Link href="/dashboard" className="flex flex-col items-center text-muted-foreground hover:text-primary transition">
        <Home size={24} />
        <span className="text-xs mt-1">Home</span>
      </Link>
      
      <Link href="/write" className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-14 h-14 -mt-8 shadow-lg hover:bg-primary/90 transition">
        <Plus size={32} />
      </Link>
      
      <Link href="/insight" className="flex flex-col items-center text-muted-foreground hover:text-primary transition">
        <BrainCircuit size={24} />
        <span className="text-xs mt-1">Insight</span>
      </Link>
    </div>
  );
}