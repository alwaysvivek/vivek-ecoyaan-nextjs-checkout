import { CartData } from "@/lib/types";
import { getCartData } from "@/lib/cartService";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import StepIndicator from "@/components/StepIndicator";

export default async function CartPage() {
  const cartData = await getCartData();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <StepIndicator currentStep={1} />

      <h1 className="text-2xl sm:text-3xl font-bold text-[#1B4332] mb-2">
        Your Cart
      </h1>
      <p className="text-[#6B4F3A] mb-6 sm:mb-8">
        Review your eco-friendly selections before checkout.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {cartData.cartItems.map((item) => (
            <CartItem key={item.product_id} item={item} />
          ))}

          {/* Eco badge */}
          <div className="flex items-center gap-2 p-3 bg-[#52B788]/10 rounded-xl text-sm text-[#2D6A4F]">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4 0 8.71-3.13 9-7.5.13-1.94-.46-3.25-1-4.5z" />
            </svg>
            <span>
              All products are sustainably sourced and eco-certified 🌍
            </span>
          </div>
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <OrderSummary cartData={cartData} showCheckoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
