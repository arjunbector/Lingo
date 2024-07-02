import StickyWrapper from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import { redirect } from "next/navigation";
import { getUserProgress } from "../courses/queries";
import FeedWrapper from "@/components/FeedWrapper";
import Image from "next/image";
import Items from "./Items";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = async () => {
  const userProgressData = getUserProgress();
  const [userProgress] = await Promise.all([userProgressData]);
  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }
  return (
    <main className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress?.activeCourse}
          hearts={userProgress?.hearts}
          points={userProgress?.points}
          hasActiveSubscription={false}
        />
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
            hasActiveSubscription={false}
          />
        </div>
      </FeedWrapper>
    </main>
  );
};

export default Page;
