import { NextResponse } from "next/server";
import { mockCartData } from "@/lib/mockData";

export async function GET() {
  // simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return NextResponse.json(mockCartData);
}
