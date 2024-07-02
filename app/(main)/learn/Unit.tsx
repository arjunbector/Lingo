import LessonButton from "./LessonButton";
import UnitBanner from "./UnitBanner";

type Props = {
  id: string;
  order: number;
  title: string;
  description: string;
  lessons: any[];
  activeLesson: any;
  activeLessonPercentage: number;
};

const Unit = ({
  id,
  order,
  title,
  description,
  lessons,
  activeLesson,
  activeLessonPercentage,
}: Props) => {
  return (
    <>
      <UnitBanner title={title} description={description} />
      <div className="relative flex flex-col items-center">
        {lessons.map((lesson, index) => {
          const isCurrent = lesson._id.toString() === activeLesson?._id.toString();
          const isLocked = !lesson.completed && !isCurrent;
          return (
            <LessonButton
              key={lesson._id}
              id={lesson._id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
              percentage={activeLessonPercentage}
            />
          );
        })}
      </div>
    </>
  );
};

export default Unit;
