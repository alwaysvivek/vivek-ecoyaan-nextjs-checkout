import { CartData } from "@/lib/types";
import Link from "next/link";

interface OrderSummaryProps {
  cartData: CartData;
  showCheckoutButton?: boolean;
}

export default function OrderSummary({
  cartData,
  showCheckoutButton = false,
}: OrderSummaryProps) {
  const subtotal = cartData.cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
  const grandTotal = subtotal + cartData.shipping_fee - cartData.discount_applied;

  return (
    <div className="bg-white border border-[#E8E4DC] rounded-2xl p-5 sm:p-6">
      <h3 className="font-bold text-[#1B4332] text-lg mb-4">Order Summary</h3>

      <div className="space-y-3 text-sm sm:text-base">
        <div className="flex justify-between text-[#6B4F3A]">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString("en-IN")}</span>
        </div>

        <div className="flex justify-between text-[#6B4F3A]">
          <span>Shipping</span>
          <span>₹{cartData.shipping_fee.toLocaleString("en-IN")}</span>
        </div>

        {cartData.discount_applied > 0 && (
          <div className="flex justify-between text-[#52B788]">
            <span>Discount</span>
            <span>-₹{cartData.discount_applied.toLocaleString("en-IN")}</span>
          </div>
        )}

        <div className="border-t border-[#E8E4DC] pt-3 mt-3">
          <div className="flex justify-between font-bold text-[#1B4332] text-base sm:text-lg">
            <span>Grand Total</span>
            <span>₹{grandTotal.toLocaleString("en-IN")}</span>
          </div>
        </div>
      </div>

      {showCheckoutButton && (
        <Link href="/checkout">
          <button className="w-full mt-6 bg-[#2D6A4F] hover:bg-[#52B788] text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-[#2D6A4F]/20 active:scale-[0.98]">
            Proceed to Checkout →
          </button>
        </Link>
      )}
    </div>
  );
}
