import Card from "./Card";

const Heading = () => {
  return (
    <Card className="relative overflow-hidden font-serrat bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 md:p-12 rounded-3xl shadow-2xl border border-white/10">
      {/* Animated mesh gradient background - reduced blob sizes for mobile */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-48 md:w-72 h-48 md:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 -right-4 w-48 md:w-72 h-48 md:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-48 md:w-72 h-48 md:h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Glassmorphism overlay layer */}
      <div className="absolute inset-0 backdrop-blur-3xl bg-white/5" />

      {/* Grid pattern overlay - smaller on mobile */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(255,255,255,0.05)_1.5px,transparent_1.5px)] bg-[size:32px_32px] md:bg-[size:48px_48px]" />

      {/* Spotlight effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-radial from-white/10 via-transparent to-transparent" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8">
        {/* Left content - Compact on mobile */}
        <div className="flex flex-col gap-3 md:gap-4 flex-1 w-full">
          <h1 className="text-2xl md:text-5xl font-black leading-tight">
            <span className="block text-white drop-shadow-lg">
              Philippine Tax
            </span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-pink-100 drop-shadow-2xl">
              Calculator 2025
            </span>
          </h1>

          {/* Compact badge for mobile */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1.5 text-xs font-bold text-white bg-white/15 backdrop-blur-md rounded-full border border-white/25 shadow-lg">
              ✓ BIR 2025 Rates
            </span>
            <span className="px-3 py-1.5 text-xs font-bold text-white bg-white/15 backdrop-blur-md rounded-full border border-white/25 shadow-lg">
              ⚡ Instant
            </span>
          </div>
        </div>

        {/* Right content - Collapsed on mobile, expanded on desktop */}
        <div className="flex-1 w-full md:max-w-md">
          {/* Mobile: Compact single line */}
          <div className="md:hidden">
            <p className="text-sm text-white/90 leading-relaxed">
              Calculate net pay, taxes, and contributions (SSS, PhilHealth,
              Pag-IBIG)
            </p>
          </div>

          {/* Desktop: Full feature card */}
          <div className="hidden md:block p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl">
            <h3 className="text-sm font-bold text-white/90 uppercase tracking-wide mb-4">
              What You'll Get
            </h3>
            <ul className="space-y-3">
              {[
                { icon: "💰", text: "Net pay calculation" },
                { icon: "🧾", text: "Withholding tax breakdown" },
                { icon: "🏥", text: "SSS, PhilHealth & Pag-IBIG" },
                { icon: "📈", text: "Salary allocation insights" },
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-white/95"
                >
                  <span className="flex-shrink-0 text-xl">{item.icon}</span>
                  <span className="text-sm font-medium leading-relaxed">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
    </Card>
  );
};

export default Heading;
