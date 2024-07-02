import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getUserProgress, getUserSubscription } from "../courses/queries";
import { Zap, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const QUESTS = [
  {
    title: "Earn 20 XP",
    value: 20,
  },
  {
    title: "Earn 50 XP",
    value: 50,
  },
  {
    title: "Earn 100 XP",
    value: 100,
  },
  {
    title: "Earn 500 XP",
    value: 500,
  },
  {
    title: "Earn 1000 XP",
    value: 1000,
  },
];
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
      </StickyWrapper>
      <FeedWrapper>
        <div className="mt-6 flex w-full flex-col items-center">
          <Image src="quests.svg" alt="shop" height={90} width={90} />
          <h1 className="my-6 text-center text-2xl font-bold uppercase text-neutral-800">
            Quests
          </h1>
          <p className="mb-6 max-w-prose text-center text-lg text-muted-foreground">
            Complete quests by earning points.
          </p>
          <ul className="w-full">
            {QUESTS.map((quest) => {
              const progress = (userProgress.points / quest.value) * 100;
              return (
                <div
                  key={quest.title}
                  className="flex w-full items-center gap-x-4 border-t-2 p-4"
                >
                  <Zap className="h-6 w-6 shrink-0 fill-orange-400 stroke-orange-500 stroke-[2]" />
                  <div className="flex w-full flex-col gap-y-2">
                    <p className="text-xl font-bold text-neutral-700">
                      {quest.title}
                    </p>
                    <div className="flex items-center">
                      <Progress value={progress} className="h-3" />
                      {progress >= 100 && (
                        <Check className="inline stroke-green-500 mx-2 stroke-[3]" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
      </FeedWrapper>
    </main>
  );
};

export default Page;
