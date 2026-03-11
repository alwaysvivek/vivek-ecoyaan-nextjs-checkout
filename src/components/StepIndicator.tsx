interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: "Cart" },
  { number: 2, label: "Shipping" },
  { number: 3, label: "Payment" },
];

export default function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8 sm:mb-10">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          {/* Step circle + label */}
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                step.number <= currentStep
                  ? "bg-[#2D6A4F] text-white shadow-md shadow-[#2D6A4F]/30"
                  : "bg-[#E8E4DC] text-[#6B4F3A]"
              }`}
            >
              {step.number < currentStep ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                step.number
              )}
            </div>
            <span
              className={`text-xs mt-1.5 font-medium transition-colors duration-300 ${
                step.number <= currentStep ? "text-[#1B4332]" : "text-[#6B4F3A]/60"
              }`}
            >
              {step.label}
            </span>
          </div>

          {/* Connector line */}
          {index < steps.length - 1 && (
            <div
              className={`w-12 sm:w-20 h-0.5 mx-2 sm:mx-3 mb-5 transition-colors duration-300 ${
                step.number < currentStep ? "bg-[#2D6A4F]" : "bg-[#E8E4DC]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
