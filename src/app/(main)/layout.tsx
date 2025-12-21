import { BottomNav } from "@/components/BottomNav";
import { HeaderNav } from "@/components/HeaderNav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <HeaderNav />

      <main className="flex-1 pb-24"> 
        {children}
      </main>

      <BottomNav />
    </div>
  );
}