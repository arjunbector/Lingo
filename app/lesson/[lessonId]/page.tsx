import { redirect } from "next/navigation";
import Quiz from "../Quiz";
import { getLesson, getUserProgress } from "@/app/(main)/courses/queries";
type Props = {
  params: {
    lessonId: string;
  };
};
const Page = async ({ params }: Props) => {
  const lessonData = getLesson(params.lessonId);
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
