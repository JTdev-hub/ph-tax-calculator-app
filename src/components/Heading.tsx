import Card from "./Card";

const Heading = () => {
  return (
    <Card className="relative overflow-hidden font-serrat text-white bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-8 rounded-2xl">
      {/* Gradient shadow effect */}
      <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 opacity-30 blur-2xl -z-10" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-white">
            Philippine Tax Calculator
          </h2>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              2025 Rates
            </span>
            <span className="px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
              BIR Compliant
            </span>
          </div>
        </div>

        <div className="max-w-md">
          <p className="text-sm md:text-base leading-relaxed text-white/90 backdrop-blur-sm">
            Instantly compute your{" "}
            <span className="font-semibold text-white">net pay</span>, tax
            deductions, and mandatory contributions including{" "}
            <span className="font-semibold text-white">SSS</span>,{" "}
            <span className="font-semibold text-white">PhilHealth</span>, and{" "}
            <span className="font-semibold text-white">Pag-IBIG</span>.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Heading;
