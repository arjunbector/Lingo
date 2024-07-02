"use server";

import { getUserProgress } from "@/app/(main)/courses/queries";
import { Challenge } from "@/models/challenge.model";
import { ChallengeProgress } from "@/models/challengeProgress.model";
import { UserProgress } from "@/models/userProgress.model";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const upsertChallengeProgress = async (challegeId: string) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const currentUserProgress = await getUserProgress();
    if (!currentUserProgress) throw new Error("User progress not found");

    const challenge = await Challenge.findById(challegeId);
    if (!challenge) throw new Error("Challenge not found");

    const lessonId = challenge.lessonId;
    const existingChallengeProgress = await ChallengeProgress.findOne({ userId: userId, challengeId: challegeId });

    const isPratice = !!existingChallengeProgress

    if (currentUserProgress.hearts === 0 && !isPratice) {
        return { error: "hearts" }
    }
    if (isPratice) {
        await ChallengeProgress.findByIdAndUpdate(existingChallengeProgress._id, { completed: true });
        const userProgress = await UserProgress.findOne({ userId: userId });
        if (userProgress) {
            const updatedValues = {
                $inc: { points: 10, hearts: 0 }
            };
            if (userProgress.hearts < 5) {
                updatedValues.$inc.hearts = 1; 
            }
            await UserProgress.updateOne({ userId: userId }, updatedValues);
        }
        revalidatePath("/learn")
        revalidatePath("/lesson")
        revalidatePath("/quests")
        revalidatePath("/leaderboard")
        revalidatePath(`/lesson/${lessonId}`)
        return;
    }
    await ChallengeProgress.create({ challengeId: challegeId, userId: userId, completed: true });
    await UserProgress.updateOne({ userId: userId }, { $inc: { points: 10 } });
    revalidatePath("/learn")
    revalidatePath("/lesson")
    revalidatePath("/quests")
    revalidatePath("/leaderboard")
    revalidatePath(`/lesson/${lessonId}`)
}