import Card from "./Card";

const Heading = () => {
  return (
    <Card className="font-serrat text-white bg-gradient-to-r from-purple-500 to-indigo-600 p-6 rounded-lg shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-xl md:text-2xl font-extrabold">
          Philippine Tax Calculator App
        </h2>
        <p className="text-xs md:text-sm text-right md:text-left max-w-md">
          Discover exactly how much you'll take home! Our Philippines Salary
          Calculator instantly computes your net pay, tax deductions, and
          mandatory contributions (SSS, PhilHealth, Pag-IBIG) – so you know what
          to expect in your paycheck.
        </p>
      </div>
    </Card>
  );
};

export default Heading;
