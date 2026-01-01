import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; 

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <main className="p-4 space-y-4 max-w-2xl mx-auto">
        
        <div className="mb-6 space-y-2">
           <Skeleton className="h-8 w-48 rounded-lg" /> 
           <Skeleton className="h-4 w-64 rounded-lg" />
        </div>

        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-none bg-card shadow-sm rounded-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-start gap-4 pb-3 pt-5 px-5 space-y-0">
              <Skeleton className="h-12 w-12 rounded-2xl" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-3/4 rounded-md" />
                <Skeleton className="h-3 w-1/4 rounded-md" />
              </div>
            </CardHeader>

            <CardContent className="px-5 pb-5 space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded-md" />
                <Skeleton className="h-4 w-5/6 rounded-md" />
              </div>

              <div className="flex gap-2 pt-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}