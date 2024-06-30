import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
  title: string;
  id: string;
  imageSrc: string;
  onClick: (id: string) => void;
  disabled?: boolean;
  active?: boolean;
};
const Card = ({ title, id, imageSrc, onClick, disabled, active }: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "flex h-full min-h-[270px] min-w-[200px] cursor-pointer flex-col items-center justify-between rounded-xl border-2 border-b-4 p-3 pb-6 hover:bg-black/5 active:border-b-2",
        {
          "pointer-events-none opacity-50": disabled,
        },
      )}
    >
      <div className="flex min-h-[24px] w-full items-center justify-end">
        {active && (
          <div className="flex items-center justify-center rounded-md bg-green-600 p-1.5">
            <Check className="h-4 w-4 stroke-[4] text-white" />
          </div>
        )}
      </div>
      <Image
        src={`/flags${imageSrc}`}
        alt={title}
        height={70}
        width={93.33}
        className="rounded-lg border object-cover drop-shadow-md"
      />
      <p className="text-center text-neutral-700 font-bold mt-3">{title}</p>
    </div>
  );
};

export default Card;
