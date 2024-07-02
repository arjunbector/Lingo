import connectToDB from "@/db/db";
import { isAdmin } from "@/lib/admin";
import { Unit } from "@/models/unit.model";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    if (!isAdmin())
        return new NextResponse("Unauthorized", { status: 401 })
    await connectToDB();
    const data = await Unit.find();
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

    const unit = new Unit({ ...body });
    await unit.save();
    console.log("saved");
    return NextResponse.json({ ...unit, id: unit._id });
}