"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { CartData } from "@/lib/types";
import Image from "next/image";

interface ConfirmationClientProps {
  cartData: CartData;
  grandTotal: number;
}

export default function ConfirmationClient({
  cartData,
  grandTotal,
}: ConfirmationClientProps) {
  const router = useRouter();
  const shippingAddress = useCheckoutStore((s) => s.shippingAddress);
  const setOrderPlaced = useCheckoutStore((s) => s.setOrderPlaced);
  const [processing, setProcessing] = useState(false);

  // no address yet? send them back
  useEffect(() => {
    if (!shippingAddress) {
      router.replace("/checkout");
    }
  }, [shippingAddress, router]);

  if (!shippingAddress) {
    return (
      <div className="text-center py-12 text-[#6B4F3A]">
        Redirecting to shipping...
      </div>
    );
  }

  const handlePay = async () => {
    setProcessing(true);
    // fake payment delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setOrderPlaced(true);
    router.push("/success");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      {/* Order items */}
      <div className="space-y-5">
        <div className="bg-white border border-[#E8E4DC] rounded-2xl p-5 sm:p-6">
          <h3 className="font-bold text-[#1B4332] text-lg mb-4">
            Order Items
          </h3>
          <div className="space-y-3">
            {cartData.cartItems.map((item) => (
              <div key={item.product_id} className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#F0EDE5]">
                  <Image
                    src={item.image}
                    alt={item.product_name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1B4332] truncate">
                    {item.product_name}
                  </p>
                  <p className="text-xs text-[#6B4F3A]">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-semibold text-[#1B4332]">
                  ₹{(item.product_price * item.quantity).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E8E4DC] mt-4 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-[#6B4F3A]">
              <span>Shipping</span>
              <span>₹{cartData.shipping_fee}</span>
            </div>
            <div className="flex justify-between font-bold text-[#1B4332] text-base">
              <span>Total</span>
              <span>₹{grandTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping + Payment */}
      <div className="space-y-5">
        {/* Address card */}
        <div className="bg-white border border-[#E8E4DC] rounded-2xl p-5 sm:p-6">
          <h3 className="font-bold text-[#1B4332] text-lg mb-3">
            Shipping To
          </h3>
          <div className="text-sm text-[#6B4F3A] space-y-1">
            <p className="font-medium text-[#1B4332]">
              {shippingAddress.fullName}
            </p>
            <p>{shippingAddress.email}</p>
            <p>{shippingAddress.phone}</p>
            <p>
              {shippingAddress.city}, {shippingAddress.state} —{" "}
              {shippingAddress.pinCode}
            </p>
          </div>
        </div>

        {/* Pay button */}
        <button
          onClick={handlePay}
          disabled={processing}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-300 cursor-pointer ${
            processing
              ? "bg-[#6B4F3A]/50 cursor-wait"
              : "bg-[#2D6A4F] hover:bg-[#52B788] hover:shadow-lg hover:shadow-[#2D6A4F]/20 active:scale-[0.98]"
          }`}
        >
          {processing ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            `🔒 Pay Securely ₹${grandTotal.toLocaleString("en-IN")}`
          )}
        </button>

        <p className="text-center text-xs text-[#6B4F3A]/60">
          This is a simulated payment for demonstration purposes.
        </p>
      </div>
    </div>
  );
}
