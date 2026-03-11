import { getCartData } from "@/lib/cartService";
import StepIndicator from "@/components/StepIndicator";
import ConfirmationClient from "./ConfirmationClient";

export default async function ConfirmationPage() {
  const cartData = await getCartData();

  const subtotal = cartData.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const grandTotal =
    subtotal + cartData.shipping_fee - cartData.discount_applied;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <StepIndicator currentStep={3} />

      <h1 className="text-2xl sm:text-3xl font-bold text-[#1B4332] mb-2">
        Confirm & Pay
      </h1>
      <p className="text-[#6B4F3A] mb-6 sm:mb-8">
        Review your order details and complete your purchase.
      </p>

      <ConfirmationClient cartData={cartData} grandTotal={grandTotal} />
    </div>
  );
}
