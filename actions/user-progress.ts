"use server"

import { getCourseById, getUserProgress } from "@/app/(main)/courses/queries";
import connectToDB from "@/db/db";
import { ChallengeProgress } from "@/models/challengeProgress.model";
import { UserProgress } from "@/models/userProgress.model";
import { auth, currentUser } from "@clerk/nextjs/server";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress = async (courseId: string) => {
    await connectToDB();
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) {
        throw new Error("Unauthorized");
    }

    const course = await getCourseById(courseId);
    if (!course) {
        throw new Error("Course not found");
    }

    const existingUserProgress = await getUserProgress();
    if (existingUserProgress) {
        await UserProgress.updateOne({ userId }, { activeCourseId: courseId, userName: user.firstName || "Guest User", userImageSrc: user.imageUrl || "/mascot.svg" });
        revalidatePath("/courses")
        revalidatePath("/learn")
        redirect("/learn")
    } else {
        const userProgress = new UserProgress({
            userId: userId, // Confirm this matches the model's expectation
            activeCourseId: courseId,
            userName: user.firstName || "Guest User",
            userImageSrc: user.imageUrl || "/mascot.svg",
        });
        await userProgress.save();
        revalidatePath("/courses")
        revalidatePath("/learn")
        redirect("/learn")
    }
}

export const reduceHearts = async (challengeId: string) => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    const currentUserProgress = await getUserProgress();

    // const challenge = await ChallengeProgress.findOne({ challengeId: challengeId });
    // if (!challenge) {
    //     throw new Error("Challenge not found");
    // }
    // const lessonId = challenge.lessonId;
    const existingChallengeProgress = await ChallengeProgress.findOne({ userId, challengeId });
    const isPractice = !!existingChallengeProgress;
    if (isPractice) return { error: "practice" }
    if (!currentUserProgress) return new Error("No user progress found");

    console.log("current hearts = ", currentUserProgress.hearts)
    if (currentUserProgress.hearts = 0) {
        const res = { error: "hearts" }
        console.log(res);
        return res;
    }

    await UserProgress.updateOne(
        { userId },
        [
            {
                $set: {
                    hearts: {
                        $max: [0, { $subtract: ["$hearts", 1] }]
                    }
                }
            }
        ]
    );
    revalidatePath("/learn");
    revalidatePath("/shop")
    revalidatePath("/quests")
    revalidatePath("/leaderboard")
    // revalidatePath(`/lesson/${lessonId}`)
}
