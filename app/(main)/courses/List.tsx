"use client";

import { ICourse } from "@/models/course.model";
import Card from "./Card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

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
