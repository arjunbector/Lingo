import { Heart, InfinityIcon, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

type Props = {
  activeCourse: {
    title: string;
    imageSrc: string;
  }; //TODO: Replace with DB types
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};
const UserProgress = ({
  activeCourse,
  hearts,
  points,
  hasActiveSubscription,
}: Props) => {
  console.log(activeCourse.imageSrc);
  return (
    <div className="flex w-full items-center justify-between gap-x-2">
      <Link href="/courses">
        <Button variant="ghost">
          <Image
            src={`/flags/${activeCourse.imageSrc}`}
            alt={activeCourse.title}
            className="roundemd border"
            width={32}
            height={32}
          />
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-orange-500 flex items-center gap-1">
          <Zap className="fill-orange-400" />
          {points}
        </Button>
      </Link>
      <Link href="/shop">
        <Button variant="ghost" className="text-rose-500">
          {hasActiveSubscription ? (
            <InfinityIcon className="h-4 w-4 stroke-[3]" />
          ) : (
            <div className="flex items-center gap-1">
              <Heart className="h-4 w-4 stroke-[3] fill-rose-400" />
              {hearts}
            </div>
          )}
        </Button>
      </Link>
    </div>
  );
};

export default UserProgress;
