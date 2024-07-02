"use client";

import { upsertUserProgress } from "@/actions/user-progress";
import { ICourse } from "@/models/course.model";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import Card from "./Card";

type Props = {
  courses: ICourse[];
  activeCourseId: string;
};

const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const onClick = (id: string) => {
    if (pending) return;
    if (id === activeCourseId) return router.push("/learn");
    startTransition(() => {
      upsertUserProgress(id).catch(() => {
        router.push("/")
        toast.error("Something went wrong.");
      });
    });
  };
  return (
    <div className="lt-6 grid grid-cols-2 gap-4 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
      {courses.map((course) => (
        <Card
          key={course._id}
          id={course._id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={course._id === activeCourseId}
        />
      ))}
    </div>
  );
};

export default List;
