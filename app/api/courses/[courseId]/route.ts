import connectToDB from "@/db/db";
import { isAdmin } from "@/lib/admin";
import { Course } from "@/models/course.model";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { courseId: string } }) => {
    if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });
    await connectToDB();
    const course = await Course.findById(params.courseId);
    return NextResponse.json({ ...course, id: course._id })
}

export const PUT = async (req: Request, { params }: { params: { courseId: string } }) => {
    if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });
    await connectToDB();
    const body = await req.json();
    const course = await Course.findByIdAndUpdate(params.courseId, { title: body.title, imageSrc: body.imageSrc }, { new: true });
    return NextResponse.json({ ...course, id: course._id })
}

export const DELETE = async (req: Request, { params }: { params: { courseId: string } }) => {
    if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });
    await connectToDB();
    const course = await Course.findByIdAndDelete(params.courseId);
    return NextResponse.json({ ...course, id: course._id })
}