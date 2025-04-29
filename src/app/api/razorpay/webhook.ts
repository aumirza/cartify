// pages/api/razorpay/webhook.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { verifyWebhookSignature } from "@/lib/verifyWebhookSignature";

export const config = {
  api: {
    bodyParser: false, // important!
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const chunks: Buffer[] = [];

  for await (const chunk of req) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");
  const razorpaySignature = req.headers["x-razorpay-signature"] as string;

  const isValid = verifyWebhookSignature({
    payload: rawBody,
    signature: razorpaySignature,
    secret: process.env.RAZORPAY_WEBHOOK_SECRET!,
  });

  if (!isValid) {
    return res.status(400).json({ error: "Invalid webhook signature" });
  }

  const data = JSON.parse(rawBody);

  // ✅ Handle Razorpay events
  if (data.event === "payment.captured") {
    // update order/payment status in your DB
    console.log("✅ Payment Captured:", data.payload.payment.entity);
  }

  res.status(200).json({ success: true });
}
