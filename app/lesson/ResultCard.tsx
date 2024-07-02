import { cn } from "@/lib/utils";
import { Heart, Zap } from "lucide-react";

type Props = {
  value: number;
  variant: "points" | "hearts";
};
const ResultCard = ({ value, variant }: Props) => {
  return (
    <div
      className={cn(
        "w-full rounded-2xl border-2",
        { "border-orange-400 bg-orange-400": variant === "points" },
        { "border-rose-500 bg-rose-500": variant === "hearts" },
      )}
    >
      <div
        className={cn(
          "rounded-t-xl p-1.5 text-center text-xs font-bold uppercase text-white",
          { "bg-orange-400": variant === "points" },
          { "bg-rose-500": variant === "hearts" },
        )}
      >
        {variant === "hearts" ? "Hearts Left" : "Total XP"}
      </div>
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl bg-white p-6 text-lg font-bold",
          { "text-rose-500": variant === "hearts" },
          { "text-orange-400": variant === "points" },
        )}
      >
        {variant === "hearts" ? (
          <Heart className="h-6 w-6 stroke-[1] fill-rose-400 mr-1.5" />
        ) : (
          <Zap className="h-6 w-6 stroke-[1] fill-orange-300 mr-1.5" />
        )}
        {value}
      </div>
    </div>
  );
};

export default ResultCard;
