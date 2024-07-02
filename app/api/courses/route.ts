import connectToDB from "@/db/db";
import { isAdmin } from "@/lib/admin";
import { Course } from "@/models/course.model";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    if (!isAdmin())
        return new NextResponse("Unauthorized", { status: 401 })
    await connectToDB();
    const data = await Course.find();
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

    const course = new Course({ title: body.title, imageSrc: body.imageSrc });
    await course.save();
    console.log("saved");
    return NextResponse.json({...course, id:course._id});
}