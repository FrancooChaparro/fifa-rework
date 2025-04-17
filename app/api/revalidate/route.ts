import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export default async function GET() {
    revalidatePath("/market")
    return NextResponse.json({ success: true });
}