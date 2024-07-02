import { redirect } from "next/navigation";
import {
  getLesson,
  getUserProgress,
  getUserSubscription,
} from "../(main)/courses/queries";
import Quiz from "./Quiz";

const Page = async () => {
  const lessonData = getLesson();
  const userProgressData = getUserProgress();
  const userSubscriptionData = getUserSubscription();

  const [lesson, userProgress, userSubscription] = await Promise.all([
    lessonData,
    userProgressData,
    userSubscriptionData,
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter(
      (challenge: any) => challenge?.challengeProgress?.completed,
    ).length /
      lesson.challenges.length) *
    100;
  return (
    <Quiz
      initialLessonId={lesson._id.toString()}
      initialLessonChallenges={JSON.parse(JSON.stringify(lesson.challenges))}
      initialHearts={userProgress.hearts}
      initialPercentage={initialPercentage}
      userSubscription={JSON.parse(JSON.stringify(userSubscription))}
    />
  );
};

export default Page;
