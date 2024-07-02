import connectToDB from "@/db/db";
import { isAdmin } from "@/lib/admin";
import { Challenge } from "@/models/challenge.model";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { challengeId: string } }) => {
    if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });
    await connectToDB();
    const challenge = await Challenge.findById(params.challengeId);
    return NextResponse.json({ ...challenge, id: challenge._id })
}

export const PUT = async (req: Request, { params }: { params: { challengeId: string } }) => {
    if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });
    await connectToDB();
    const body = await req.json();
    const challenge = await Challenge.findByIdAndUpdate(params.challengeId, { ...body }, { new: true });
    return NextResponse.json({ ...challenge, id: challenge._id })
}

export const DELETE = async (req: Request, { params }: { params: { challengeId: string } }) => {
    if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });
    await connectToDB();
    const challenge = await Challenge.findByIdAndDelete(params.challengeId);
    return NextResponse.json({ ...challenge, id: challenge._id })
}