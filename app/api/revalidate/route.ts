import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
    revalidatePath("/market")
    return NextResponse.json({ success: true });
}