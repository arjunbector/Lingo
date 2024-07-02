import { redirect } from "next/navigation";
import { getLesson, getUserProgress } from "../(main)/courses/queries";
import Quiz from "./Quiz";

const Page = async () => {
  const lessonData = getLesson();
  const userProgressData = getUserProgress();

  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData,
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
      userSubscription={null}
    />
  );
};

export default Page;
