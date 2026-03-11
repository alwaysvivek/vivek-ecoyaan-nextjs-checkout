"use client";

import AddressForm from "@/components/AddressForm";
import StepIndicator from "@/components/StepIndicator";

export default function CheckoutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <StepIndicator currentStep={2} />

      <h1 className="text-2xl sm:text-3xl font-bold text-[#1B4332] mb-2">
        Shipping Address
      </h1>
      <p className="text-[#6B4F3A] mb-6 sm:mb-8">
        Where should we deliver your sustainable goodies?
      </p>

      <div className="bg-white border border-[#E8E4DC] rounded-2xl p-5 sm:p-8">
        <AddressForm />
      </div>

      {/* Security note */}
      <div className="flex items-center justify-center gap-2 mt-6 text-xs text-[#6B4F3A]/70">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <span>Your information is safe and encrypted</span>
      </div>
    </div>
  );
}
