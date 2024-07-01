"use server";

import connectToDB from "@/db/db";
import { Challenge } from "@/models/challenge.model";
import { challengeProgress } from "@/models/challengeProgress.model";
import { Course } from "@/models/course.model";
import { Lesson } from "@/models/lesson.model";
import { Unit } from "@/models/unit.model";
import { UserProgress } from "@/models/userProgress.model";
import { auth } from "@clerk/nextjs/server";
import { cache } from "react";

export const getUserProgress = cache(async () => {
    const { userId } = await auth();
    if (!userId) return null;
    await connectToDB();
    const data = await UserProgress.findOne({ userId: userId });
    if (data) {
        const course = await Course.findById(data.activeCourseId).select("title imageSrc");
        data.activeCourse = course;
    }
    return data;
})

export const getCourses = cache(
    async () => {
        await connectToDB();
        const data = await Course.find();
        return data;
    }
)

export const getCourseById = cache(async (courseId: string) => {
    await connectToDB();
    const data = await Course.findById(courseId);
    return data;
})

export const getUnits = cache(async () => {
    const { userId } = await auth();
    const userProgress = await getUserProgress();
    if (!userId || !userProgress?.activeCourseId) return [];
    await connectToDB();
    let data = await Unit.find({ courseId: userProgress.activeCourseId });
    let lessons = await Lesson.find({ unitId: { $in: data.map(unit => unit._id) } });
    // Fetch all challenges
    let challenges = await Challenge.find();
    // Fetch all challengeProgress entries for the specific userId
    let challengeProgresses = await challengeProgress.find({ userId: userId });
    // Add challenges to their corresponding lessons with challenge progress
    lessons = lessons.map(lesson => ({
        ...lesson.toObject(),
        challenges: challenges.filter(challenge => challenge.lessonId.toString() === lesson._id.toString()).map(challenge => {
            // Find corresponding challengeProgress
            const challengeProgress = challengeProgresses.find(cp => cp.challengeId.toString() === challenge._id.toString());
            return {
                ...challenge.toObject(),
                challengeProgress: challengeProgress ? challengeProgress.toObject() : null
            };
        })
    }));
    // Map units to include updated lessons
    data = data.map(unit => ({
        ...unit.toObject(),
        lessons: lessons.filter(lesson => lesson.unitId.toString() === unit._id.toString())
    }));
    const normalizedData = data.map(unit => {
        const lessonsWithCompletedStatus = unit.lessons.map((lesson: any) => {
            const allCompletedChallenges = lesson.challenges.every((challenge: any) => {
                return (challenge.challengeProgress && challenge.challengeProgress.completed);
            })
            return {
                ...lesson, completed: allCompletedChallenges
            }
        })
        return { ...unit, lessons: lessonsWithCompletedStatus }
    })
    console.log(normalizedData[0]);
    return normalizedData;
});