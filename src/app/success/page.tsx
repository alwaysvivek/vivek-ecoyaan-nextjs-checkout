"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCheckoutStore } from "@/store/useCheckoutStore";

export default function SuccessPage() {
  const router = useRouter();
  const orderPlaced = useCheckoutStore((s) => s.orderPlaced);
  const reset = useCheckoutStore((s) => s.reset);

  // redirect if user hasn't gone through payment
  useEffect(() => {
    if (!orderPlaced) {
      router.replace("/");
    }
  }, [orderPlaced, router]);

  if (!orderPlaced) {
    return (
      <div className="text-center py-12 text-[#6B4F3A]">Redirecting...</div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
      {/* Animated checkmark */}
      <div className="mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#2D6A4F] flex items-center justify-center mb-8 animate-bounce">
        <svg
          className="w-12 h-12 sm:w-14 sm:h-14 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-[#1B4332] mb-3">
        Order Successful! 🎉
      </h1>
      <p className="text-[#6B4F3A] text-base sm:text-lg mb-2">
        Thank you for choosing sustainable products.
      </p>
      <p className="text-[#6B4F3A]/70 text-sm mb-10">
        Your eco-friendly order is being prepared with care. You&apos;ll receive
        a confirmation email shortly.
      </p>

      {/* Eco message */}
      <div className="bg-[#52B788]/10 border border-[#52B788]/20 rounded-2xl p-5 mb-8 text-sm text-[#2D6A4F]">
        <p className="font-medium mb-1">🌱 Your Impact</p>
        <p>
          By choosing Ecoyaan, you&apos;re helping reduce plastic waste and
          supporting sustainable brands. Every small choice makes a big
          difference!
        </p>
      </div>

      <Link href="/">
        <button
          onClick={reset}
          className="bg-[#2D6A4F] hover:bg-[#52B788] text-white font-semibold py-3.5 px-8 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#2D6A4F]/20 active:scale-[0.98]"
        >
          ← Back to Shop
        </button>
      </Link>
    </div>
  );
}
