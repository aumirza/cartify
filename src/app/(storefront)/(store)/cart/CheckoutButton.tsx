"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

function loadScript(src: string) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export function CheckoutButton({ total }: { total: number }) {
  const [loading, setLoading] = useState(false);
  const { clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const scr = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!scr) {
        alert("Razorpay SDK failed to load...");
        return;
      }

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
        name: "Cartify",
        description: "Order",
        order_id: order.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        handler: async function (response: any) {
          try {
            const verifyRes = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            const verifyJson = await verifyRes.json();

            if (verifyJson.success) {
              console.log(verifyJson);
              clearCart();
              router.push("/orders/confirmed");
              toast.success("Payment verified successfully!");
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (err) {
            console.log(err);
            toast.error("Error verifying payment.");
          }
        },
        prefill: {
          name: "Tes",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: { color: "#6366f1" }, // Indigo
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rzp = new (window as any).Razorpay(razorpayOptions);
      rzp.open();
    } catch (error) {
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
