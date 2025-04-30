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
  receipt = `receipt_${Date.now().toString()}`,
  notes = {},
}: CreateOrderOptions) {
  try {
    const amountInPaise = Math.ceil(amount * 100);
    const order = await razorpay.orders.create({
      amount: amountInPaise, // in paise
      currency,
      receipt,
      notes,
    });

    return order;
  } catch (err) {
    console.error("Razorpay Error", err);
    throw new Error(`Failed to create Razorpay order`);
  }
}
