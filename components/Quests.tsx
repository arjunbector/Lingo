import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { QUESTS } from "@/constants/constants";
import { Progress } from "./ui/progress";
import { Check, Zap } from "lucide-react";
type Props = {
  points: number;
};
const Quests = ({ points }: Props) => {
  return (
    <div className="space-y-4 rounded-xl border-2 p-4">
      <div className="flex w-full items-center justify-between space-y-2">
        <h3 className="text-lg font-bold">Quests</h3>
        <Link href="/quests">
          <Button variant="primaryOutline">View All</Button>
        </Link>
      </div>
      <ul className="w-full space-y-2">
        {QUESTS.map((quest) => {
          const progress = (points / quest.value) * 100;
          return (
            <div
              key={quest.title}
              className="flex w-full items-center gap-x-3 pb-4"
            >
              <Zap className="h-5 w-5 shrink-0 fill-orange-400 stroke-orange-500 stroke-[2]" />
              <div className="flex w-full flex-col gap-y-2">
                <p className="text-sm font-bold text-neutral-700">
                  {quest.title}
                </p>
                <div className="flex items-center">
                  <Progress value={progress} className="h-2" />
                  {progress >= 100 && (
                    <Check className="mx-1 inline stroke-green-500 stroke-[2]" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Quests;
