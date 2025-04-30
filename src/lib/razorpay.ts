import Razorpay from "razorpay";

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID!;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

export const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// async function testRazorpayInstance() {
//   try {
//     const orders = await razorpay.orders.all();
//     console.log("Razorpay instance is working. Orders:", orders);
//   } catch (error: any) {
//     console.error("Razorpay instance failed:", error?.message || error);
//   }
// }

// testRazorpayInstance();
