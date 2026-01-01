import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface JournalCardProps {
  mood: number;
  title: string;
  date: string;
  content: string;
  className?: string;
  onClick?: () => void;
}

const moodMap: Record<number, string> = {
  1: "😫",
  2: "😟",
  3: "😐",
  4: "🙂",
  5: "😁",
};

export function JournalCard({
  mood,
  title,
  date,
  content,
  className,
  onClick
}: JournalCardProps) {
  const moodEmoji = moodMap[mood] || "😐";
  return (
    <Card
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden cursor-pointer shadow-none bg-card",
        "transition-all duration-300 hover:shadow-sm hover:-translate-y-1 hover:border hover:border-primary/70",
        "rounded-2xl",
        className
      )}
    >
      <CardHeader className="flex flex-row items-start gap-4 pb-3 pt-5 px-5 space-y-0">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl transition-colors group-hover:bg-primary/20">
          {moodEmoji}
        </div>

        <div className="flex flex-col space-y-1">
          <CardTitle className="text-base font-semibold leading-tight text-foreground group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <span className="text-xs font-medium text-muted-foreground">
            {date}
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-5">
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-4">
          {content}
        </p>
      </CardContent>
    </Card>
  );
}