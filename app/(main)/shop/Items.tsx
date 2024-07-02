"use client";

import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";
import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL_HEARTS } from "@/constants/constants";
import { Heart, Zap } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
  const [pending, startTransition] = useTransition();
  const onRefillHearts = () => {
    if (pending || hearts === 5 || points < POINTS_TO_REFILL_HEARTS) return;
    startTransition(() => {
      refillHearts().catch(() => {
        toast.error("Something went wrong");
      });
    });
  };
  const onUpgrade = () => {
    startTransition(() => {
      createStripeUrl()
        .then((res) => {
          if (res.data) {
            window.location.href = res.data;
          }
        })
        .catch(() => {
          toast.error("Something went wrong. Please try again later.");
        });
    });
  };
  return (
    <ul className="w-full">
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4">
        <Heart className="h-10 w-10 fill-rose-400 stroke-rose-500" />
        <div className="flex-1">
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Refill Hearts
          </p>
        </div>
        <Button
          onClick={onRefillHearts}
          disabled={pending || hearts === 5 || points < POINTS_TO_REFILL_HEARTS}
        >
          {hearts === 5 ? (
            "Full"
          ) : (
            <div className="flex items-center">
              <Zap className="mr-1 h-6 w-6 fill-orange-400 stroke-orange-500" />
              <p>{POINTS_TO_REFILL_HEARTS}</p>
            </div>
          )}
        </Button>
      </div>
      <div className="flex w-full items-center gap-x-4 border-t-2 p-4 pt-8">
        <Image src="/unlimited.svg" alt="unlimited" height={40} width={40} />
        <div className="flex-1">
          {" "}
          <p className="text-base font-bold text-neutral-700 lg:text-xl">
            Unlimited Hearts
          </p>
        </div>
        <Button disabled={pending} onClick={onUpgrade}>
          {hasActiveSubscription ? "Settings" : "Upgrade"}
        </Button>
      </div>
    </ul>
  );
};

export default Items;
