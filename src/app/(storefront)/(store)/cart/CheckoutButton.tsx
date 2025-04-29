"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function CheckoutButton({ total }: { total: number }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }), // in rupees
      });

      if (!res.ok) {
        toast.error("Failed to create order.");
        setLoading(false);
        return;
      }

      const order = await res.json();

      if (!order.id) {
        toast.error("Failed to create order.");
        setLoading(false);
        return;
      }

      const razorpayOptions = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: order.amount,
        currency: order.currency,
        name: "Your App Name",
        description: "Purchase Description",
        order_id: order.id,
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            const verifyJson = await verifyRes.json();

            if (verifyJson.success) {
              toast.success("Payment verified successfully!");
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (err) {
            toast.error("Error verifying payment.");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#6366f1" }, // Indigo
      };

      const rzp = new (window as any).Razorpay(razorpayOptions);
      rzp.open();
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong on server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      className="bg-indigo-600 text-white py-2 px-4 rounded"
      disabled={loading}
    >
      {loading ? "Processing..." : "Proceed to Checkout"}
    </Button>
  );
}
