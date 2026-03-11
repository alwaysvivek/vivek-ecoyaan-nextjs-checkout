export default function Footer() {
  return (
    <footer className="bg-[#1B4332] text-white/80 py-6 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm">
          🌿 Ecoyaan — Making sustainable living accessible, one product at a time.
        </p>
        <p className="text-xs text-white/50 mt-2">
          © {new Date().getFullYear()} Ecoyaan. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
