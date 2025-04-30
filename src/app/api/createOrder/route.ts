// app/api/razorpay/route.ts
import { NextResponse } from "next/server";
import { createRazorpayOrder } from "@/lib/createRazorpayOrder";

export async function POST(req: Request) {
  try {
    // for testing purpose
    const body = await req.json();
    const { amount } = body;

    // sync cart
    // calculate amount

    const order = await createRazorpayOrder({ amount });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
