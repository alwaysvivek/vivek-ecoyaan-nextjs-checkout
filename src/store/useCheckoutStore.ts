"use client";

import { create } from "zustand";
import { ShippingAddress } from "@/lib/types";

interface CheckoutState {
  shippingAddress: ShippingAddress | null;
  setShippingAddress: (address: ShippingAddress) => void;
  orderPlaced: boolean;
  setOrderPlaced: (val: boolean) => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set) => ({
  shippingAddress: null,
  setShippingAddress: (address) => set({ shippingAddress: address }),
  orderPlaced: false,
  setOrderPlaced: (val) => set({ orderPlaced: val }),
  reset: () => set({ shippingAddress: null, orderPlaced: false }),
}));
