import connectToDB from "@/db/db";
import { isAdmin } from "@/lib/admin";
import { Lesson } from "@/models/lesson.model";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    if (!isAdmin())
        return new NextResponse("Unauthorized", { status: 401 })
    await connectToDB();
    const data = await Lesson.find();
    const modifiedData = data.map(item => ({
        ...item.toObject(), // Convert document to a plain JavaScript object
        id: item._id.toString(), // Add 'id' field
        _id: undefined, // Remove '_id' field
    }));
    return NextResponse.json(modifiedData);
}

export const POST = async (req: Request) => {
    if (!isAdmin())
        return new NextResponse("Unauthorized", { status: 401 })
    const body = await req.json();
    console.log(body);
    await connectToDB();

    const lesson = new Lesson({ ...body });
    await lesson.save();
    console.log("saved");
    return NextResponse.json({ ...lesson, id: lesson._id });
}