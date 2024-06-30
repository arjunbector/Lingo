"use server";

import connectToDB from "@/db/db";
import { Course } from "@/models/course.model";
import { UserProgress } from "@/models/userProgress.model";
import { auth } from "@clerk/nextjs/server";
import { cache } from "react";

export const getUserProgress = cache(async () => {
    const { userId } = await auth();
    if (!userId) return null;
    await connectToDB();
    const data = await UserProgress.findOne({ userId: userId });
    const course = await Course.findById(data.activeCourseId).select("title imageSrc");
    data.activeCourse = course;
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