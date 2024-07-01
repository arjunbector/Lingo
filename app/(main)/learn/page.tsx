import FeedWrapper from "@/components/FeedWrapper";
import StickyWrapper from "@/components/StickyWrapper";
import Header from "./Header";
import UserProgress from "@/components/UserProgress";
import { getUnits, getUserProgress } from "../courses/queries";
import { redirect } from "next/navigation";
import Unit from "./Unit";

const Page = async () => {
  const userProgressData = getUserProgress();
  const unitsData = getUnits();
  const [userProgress, units] = await Promise.all([
    userProgressData,
    unitsData,
  ]);

  if (!userProgress || !userProgress.activeCourseId) {
    redirect("/courses");
  }

  return (
    <main className="flex gap-[48px] px-6">
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />
        {units.map((unit) => (
          <div key={unit._id} className="mb-10">
            {
              <Unit 
                id={unit._id}
                order={unit.order}
                description={unit.description}
                title={unit.title}
                lessons={unit.lessons}
                activeLesson={null}
                activeLessonPercentage={0}
              />
            }
          </div>
        ))}
      </FeedWrapper>
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hasActiveSubscription={false}
          hearts={userProgress.hearts}
          points={userProgress.points}
        />
      </StickyWrapper>
    </main>
  );
};

export default Page;
