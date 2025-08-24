// In your component file
export default function ShinyButton() {
  return (
    <button className="relative px-6 py-2 rounded-full font-bold bg-white text-blue-600 overflow-hidden border-none">
      <span className="relative z-10 flex items-center gap-2">
        <span role="img" aria-label="sparkle">✨</span>
        Now with enhanced components
      </span>
      <span className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400 animate-spin-slow" style={{
        zIndex: 0,
        maskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskImage: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        WebkitMaskComposite: "xor"
      }}></span>
    </button>
  );
}