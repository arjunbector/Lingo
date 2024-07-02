import connectToDB from "@/db/db";
import { isAdmin } from "@/lib/admin";
import { Lesson } from "@/models/lesson.model";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { lessonId: string } }) => {
    if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });
    await connectToDB();
    const lesson = await Lesson.findById(params.lessonId);
    return NextResponse.json({ ...lesson, id: lesson._id })
}

export const PUT = async (req: Request, { params }: { params: { lessonId: string } }) => {
    if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });
    await connectToDB();
    const body = await req.json();
    const lesson = await Lesson.findByIdAndUpdate(params.lessonId, {...body}, { new: true });
    return NextResponse.json({ ...lesson, id: lesson._id })
}

export const DELETE = async (req: Request, { params }: { params: { lessonId: string } }) => {
    if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });
    await connectToDB();
    const lesson = await Lesson.findByIdAndDelete(params.lessonId);
    return NextResponse.json({ ...lesson, id: lesson._id })
}