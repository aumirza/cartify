"use server";
import { razorpay } from "./razorpay";

type CreateOrderOptions = {
  amount: number; // in rupees
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
};

export async function createRazorpayOrder({
  amount,
  currency = "INR",
  receipt = `receipt_${Date.now()}`,
  notes = {},
}: CreateOrderOptions) {
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency,
      receipt,
      notes,
    });

    return order;
  } catch (err: any) {
    throw new Error(`Failed to create Razorpay order: ${err.message}`);
  }
}
