import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import List from "./List";
import { getCourses, getUserProgress } from "./queries";

const Page = async () => {
  const userProgressData = getUserProgress();
  const coursesData = getCourses();
  const [userProgress, courses] = await Promise.all([
    userProgressData,
    coursesData,
  ]);

  return (
    <main className="mx-auto h-full max-w-[912px] px-3">
      <h1 className="my-4 text-2xl font-bold text-neutral-700">
        Language Courses
      </h1>
      <List
        courses={JSON.parse(JSON.stringify(courses))}
        activeCourseId={
          JSON.parse(JSON.stringify(userProgress))?.activeCourseId
        }
      />
    </main>
  );
};

export default Page;
