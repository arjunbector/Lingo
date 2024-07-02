import StickyWrapper from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import { redirect } from "next/navigation";
import { getUserProgress, getUserSubscription } from "../courses/queries";
import FeedWrapper from "@/components/FeedWrapper";
import Image from "next/image";
import Items from "./Items";
import { ArrowLeft, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Quests from "@/components/Quests";

const Page = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const [userProgress, userSubscription] = await Promise.all([
    userProgressData,
    userSubscriptionData,
  ]);
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  const isPro = !!userSubscription?.isActive;
  return (
    <main className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress?.activeCourse}
          hearts={userProgress?.hearts}
          points={userProgress?.points}
          hasActiveSubscription={isPro}
        />
        <Quests points={userProgress?.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="mt-6 flex w-full flex-col items-center">
          <Image src="shop.svg" alt="shop" height={90} width={90} />
          <h1 className="my-6 text-center text-2xl font-bold text-neutral-800">
            SHOP
          </h1>
          <p className="mb-6 text-center text-lg text-muted-foreground">
            Spend your points on cool stuff.
          </p>
          <Items
            points={userProgress.points}
            hearts={userProgress.hearts}
            hasActiveSubscription={isPro}
          />
          <div className="flex w-full items-center gap-x-3 rounded-lg border-2 p-2 text-gray-400 mt-10">
            <Info className="h-5 w-5 shrink-0" />
            <div>
              <p>
                Payments are not made from actual cards. You can use{" "}
                <span className="font-bold">4242 4242 4242 4242</span> as the
                card number. Enter any future date and any CVC code to complete
                the payment.
              </p>
            </div>
          </div>
        </div>
      </FeedWrapper>
    </main>
  );
};

export default Page;
