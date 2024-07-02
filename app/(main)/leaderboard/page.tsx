import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/StickyWrapper";
import UserProgress from "@/components/UserProgress";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { redirect } from "next/navigation";
import {
  getTopTenUsers,
  getUserProgress,
  getUserSubscription,
} from "../courses/queries";

const Page = async () => {
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();
  const leaderboardData = getTopTenUsers();

  const [userProgress, userSubscription, leaderboard] = await Promise.all([
    userProgressData,
    userSubscriptionData,
    leaderboardData,
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
          <Image src="leaderboard.svg" alt="shop" height={90} width={90} />
          <h1 className="my-6 text-center text-2xl font-bold uppercase text-neutral-800">
            Leaderboard
          </h1>
          <p className="mb-6 max-w-prose text-center text-lg text-muted-foreground">
            See where you stand among other learners in the community.
          </p>
          <Separator className="mb-4 h-0.5 rounded-full" />
          {leaderboard.map((userProgress, index) => (
            <div
              key={userProgress.userId}
              className="flex w-full items-center rounded-xl p-2 px-4 hover:bg-gray-200/50"
            >
              <p className="mr-4 font-bold text-lime-700">{index + 1}</p>
              <Avatar className="ml-3 mr-6 h-12 w-12 border bg-green-500">
                <AvatarImage
                  src={userProgress.userImageSrc}
                  className="object-cover"
                />
              </Avatar>
              <p className="flex-1 font-bold text-neutral-800">
                {userProgress.userName}
              </p>
              <p className="text-muted-foreground">{userProgress.points} XP</p>
            </div>
          ))}
        </div>
      </FeedWrapper>
    </main>
  );
};

export default Page;
