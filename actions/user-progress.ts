"use server"

import { getCourseById, getUserProgress } from "@/app/(main)/courses/queries";
import connectToDB from "@/db/db";
import { UserProgress } from "@/models/userProgress.model";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress = async (courseId: string) => {
    await connectToDB();
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId || !user) {
        throw new Error("Unauthorized");
    }
    console.log("UserID:", userId); // Debugging log to confirm userId value

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
        console.log("Creating new user progress for userId:", userId); // Additional log for debugging
        const userProgress = new UserProgress({
            userId: userId, // Confirm this matches the model's expectation
            activeCourseId: courseId,
            userName: user.firstName || "Guest User",
            userImageSrc: user.imageUrl || "/mascot.svg",
        });
        await userProgress.save();
        console.log("User progress saved:", userProgress);
        revalidatePath("/courses")
        revalidatePath("/learn")
        redirect("/learn")
    }
}
