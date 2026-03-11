import { mockCartData } from "./mockData";
import { CartData } from "./types";

// shared data-fetching layer — used by Server Components directly
// skips HTTP when running on the server, avoids self-fetch issues on Vercel
export async function getCartData(): Promise<CartData> {
  // simulate async delay like a real DB/API call would have
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockCartData;
}
