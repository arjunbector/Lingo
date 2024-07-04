"use server";

import connectToDB from "@/db/db";
import { Challenge } from "@/models/challenge.model";
import { ChallengeOptions } from "@/models/challengeOptions.model";
import { ChallengeProgress } from "@/models/challengeProgress.model";
import { Course } from "@/models/course.model";
import { Lesson } from "@/models/lesson.model";
import { Unit } from "@/models/unit.model";
import { UserProgress } from "@/models/userProgress.model";
import { UserSubscription } from "@/models/userSubscription.model";
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
    let data = await Unit.find({ courseId: userProgress.activeCourseId }).sort({ order: 1 });
    let lessons = await Lesson.find({ unitId: { $in: data.map(unit => unit._id) } }).sort({ order: 1 });
    // Fetch all challenges
    let challenges = await Challenge.find();
    // Fetch all challengeProgress entries for the specific userId
    let challengeProgresses = await ChallengeProgress.find({ userId: userId });
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
            if (lesson.challenges.length === 0) return { ...lesson, completed: false }
            const allCompletedChallenges = lesson.challenges.every((challenge: any) => {
                return (challenge.challengeProgress && challenge.challengeProgress.completed);
            })
            return {
                ...lesson, completed: allCompletedChallenges
            }
        })
        return { ...unit, lessons: lessonsWithCompletedStatus }
    })
    return normalizedData;
});

export const getCourseProgress = cache(async () => {
    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCourseId) return null;
    await connectToDB();
    // Sort units by their 'order' property
    let unitsInActiveCourse = await Unit.find({ courseId: userProgress.activeCourseId }).sort('order');
    let lessons = await Lesson.find({ unitId: { $in: unitsInActiveCourse.map(unit => unit._id) } });
    let challenges = await Challenge.find();
    let challengeProgresses = await ChallengeProgress.find({ userId: userId });

    // Sort challenges for each lesson
    lessons = lessons.map(lesson => ({
        ...lesson.toObject(),
        challenges: challenges.filter(challenge => challenge.lessonId.toString() === lesson._id.toString())
            .map(challenge => {
                const challengeProgress = challengeProgresses.find(cp => cp.challengeId.toString() === challenge._id.toString());
                return {
                    ...challenge.toObject(),
                    challengeProgress: challengeProgress ? challengeProgress.toObject() : null
                };
            })
    }));

    // Sort lessons within each unit by their 'order' property
    unitsInActiveCourse = unitsInActiveCourse.map(unit => ({
        ...unit.toObject(),
        lessons: lessons.filter(lesson => lesson.unitId.toString() === unit._id.toString())
            .sort((a, b) => a.order - b.order) // Assuming 'order' is a numeric property
    }));

    unitsInActiveCourse.sort((a, b) => a.order - b.order);
    const firstUncompletedLesson = unitsInActiveCourse.flatMap(unit => unit.lessons).find(lesson => {
        return lesson.challenges.some((challenge: any) => {
            return !challenge.challengeProgress || !challenge.challengeProgress.completed;
        })
    })
    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?._id
    }

});

export const getLesson = cache(async (id?: string) => {
    const { userId } = await auth();
    if (!userId) return null;
    const courseProgress = await getCourseProgress();

    const lessonId = id || courseProgress?.activeLessonId;
    if (!lessonId) {
        return null;
    }
    await connectToDB();
    const lessonData = await Lesson.findById(lessonId);

    // Fetch and sort challenges by their 'order' property
    const challenges = await Challenge.find({ lessonId: lessonId }).sort('order');

    // For each challenge, fetch challenge options and progress
    const challengesWithDetails = await Promise.all(challenges.map(async (challenge) => {
        const challengeOptions = await ChallengeOptions.find({ challengeId: challenge._id });
        const challengeProgress = await ChallengeProgress.findOne({ challengeId: challenge._id, userId: userId });

        return {
            ...challenge.toObject(),
            challengeOptions: challengeOptions.map((option): any => option.toObject()),
            challengeProgress: challengeProgress ? challengeProgress.toObject() : null,
        };
    }));

    // Attach the detailed challenges to the lesson data
    const data = {
        ...lessonData.toObject(),
        challenges: challengesWithDetails,
    };
    if (!data || !data.challenges) return null;
    const normalizedData = data.challenges.map((challenge: any) => {
        const completed = challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every((progress: any) => progress.completed);
        return { ...challenge, completed }
    })
    return { ...data, challenges: normalizedData }
});

export const getLessonPercentage = cache(async () => {
    const courseProgress = await getCourseProgress();
    if (!courseProgress || !courseProgress.activeLessonId) return 0;
    const lesson = await getLesson(courseProgress.activeLessonId);
    if (!lesson) return 0;
    const completedChallenges = lesson.challenges.filter((challenge: any) => challenge?.challengeProgress?.completed);
    const percentage = Math.round(
        (completedChallenges.length / lesson.challenges.length) * 100
    )
    return percentage;
})

const DAY_IN_MS = 86_400_000;
export const getUserSubscription = cache(async () => {
    const { userId } = await auth();
    if (!userId) return null;
    const data = await UserSubscription.findOne({ userId: userId })
    if (!data) return null;
    const isActive = data.stripePriceId && data.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();
    return {
        ...data.toObject(), isActive: !!isActive
    }
})

export const getTopTenUsers = cache(async () => {
    const { userId } = await auth();
    if (!userId) return [];
    const data = await UserProgress.find().sort({ points: -1 });
    const topTen = data.slice(0, 10);
    console.log("Top ten: ", topTen);
    return topTen;
})

export const getUserRank = cache(async () => {
    const { userId } = await auth();
    if (!userId) return -1;
    const allUsers = await UserProgress.find().sort({ points: -1 });
    console.log(allUsers);
    const userRank = allUsers.findIndex(user => user.userId === userId);
    return userRank + 1
})