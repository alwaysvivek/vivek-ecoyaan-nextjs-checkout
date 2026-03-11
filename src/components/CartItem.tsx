import { CartItem as CartItemType } from "@/lib/types";
import Image from "next/image";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const lineTotal = item.product_price * item.quantity;

  return (
    <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-5 bg-[#F0EDE5] rounded-2xl transition-shadow hover:shadow-md">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden flex-shrink-0 bg-white">
        <Image
          src={item.image}
          alt={item.product_name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 80px, 96px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[#1B4332] text-sm sm:text-base truncate">
          {item.product_name}
        </h3>
        <p className="text-[#6B4F3A] text-xs sm:text-sm mt-1">
          ₹{item.product_price.toLocaleString("en-IN")} × {item.quantity}
        </p>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="font-bold text-[#1B4332] text-base sm:text-lg">
          ₹{lineTotal.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
}
