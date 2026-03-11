import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-[#E8E4DC] sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          {/* Leaf icon */}
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 text-[#2D6A4F] transition-transform duration-300 group-hover:rotate-12"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20c4 0 8.71-3.13 9-7.5.13-1.94-.46-3.25-1-4.5z" />
            <path d="M20.5 3.5S17 2 13 2C9 2 5 3.5 5 3.5s2 3 6 3c2.5 0 5-1.5 7-3l2.5 1z" opacity="0.5" />
          </svg>
          <span className="text-xl sm:text-2xl font-bold text-[#1B4332] tracking-tight">
            Ecoyaan
          </span>
        </Link>

        <div className="flex items-center gap-2 text-sm text-[#6B4F3A]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
          <span className="hidden sm:inline">Secure Checkout</span>
        </div>
      </div>
    </nav>
  );
}
