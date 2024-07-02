import { Progress } from "@/components/ui/progress";
import { useExitModel } from "@/store/use-exit-model";
import { Heart, InfinityIcon, X } from "lucide-react";
import Image from "next/image";

type Props = {
  hearts: number;
  percentage: number;
  hasActiveSubscription: boolean;
};
const Header = ({ hearts, percentage, hasActiveSubscription }: Props) => {
  const { open } = useExitModel();
  return (
    <header className="mx-auto flex w-full max-w-[1140px] items-center justify-between gap-x-7 px-10 pt-[20px] lg:pt-[50px]">
      <X
        onClick={() => {
          open();
        }}
        className="cursor-pointer text-slate-500 transition hover:opacity-75 h-6 w-6"
      />
      <Progress value={percentage} />
      <div className="flex items-center font-bold text-rose-500">
        <Heart
          height={28}
          width={28}
          className="mr-2 fill-red-400 stroke-red-500"
        />
        {hasActiveSubscription ? (
          <InfinityIcon className="h-6 w-6 stroke-red-500 stroke-[3]" />
        ) : (
          hearts
        )}
      </div>
    </header>
  );
};

export default Header;
