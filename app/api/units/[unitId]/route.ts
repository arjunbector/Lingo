import connectToDB from "@/db/db";
import { isAdmin } from "@/lib/admin";
import { Unit } from "@/models/unit.model";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { unitId: string } }) => {
    if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });
    await connectToDB();
    const unit = await Unit.findById(params.unitId);
    return NextResponse.json({ ...unit, id: unit._id })
}

export const PUT = async (req: Request, { params }: { params: { unitId: string } }) => {
    if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });
    await connectToDB();
    const body = await req.json();
    const unit = await Unit.findByIdAndUpdate(params.unitId, {...body}, { new: true });
    return NextResponse.json({ ...unit, id: unit._id })
}

export const DELETE = async (req: Request, { params }: { params: { unitId: string } }) => {
    if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });
    await connectToDB();
    const unit = await Unit.findByIdAndDelete(params.unitId);
    return NextResponse.json({ ...unit, id: unit._id })
}