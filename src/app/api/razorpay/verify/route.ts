import { NextResponse } from "next/server";
import { verifyRazorpaySignature } from "@/lib/verifySignature";

export async function POST(req: Request) {
  const body = await req.json();
  const isValid = verifyRazorpaySignature(body);

  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Optionally: Mark order as paid in your DB

  return NextResponse.json({ success: true });
}
