import connectToDB from "@/db/db";
import { isAdmin } from "@/lib/admin";
import { ChallengeOptions } from "@/models/challengeOptions.model";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: { challengeOptionsId: string } }) => {
    if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });
    await connectToDB();
    const challengeOption = await ChallengeOptions.findById(params.challengeOptionsId);
    return NextResponse.json({ ...challengeOption, id: challengeOption._id })
}

export const PUT = async (req: Request, { params }: { params: { challengeOptionsId: string } }) => {
    if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });
    await connectToDB();
    const body = await req.json();
    const challengeOption = await ChallengeOptions.findByIdAndUpdate(params.challengeOptionsId, { ...body }, { new: true });
    return NextResponse.json({ ...challengeOption, id: challengeOption._id })
}

export const DELETE = async (req: Request, { params }: { params: { challengeOptionsId: string } }) => {
    if (!isAdmin()) return new NextResponse("Unauthorized", { status: 401 });
    await connectToDB();
    const challengeOption = await ChallengeOptions.findByIdAndDelete(params.chalwlengeOptionsId);
    return NextResponse.json({ ...challengeOption, id: challengeOption._id })
}