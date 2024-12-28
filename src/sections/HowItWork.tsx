import HowItWorkCard from "../components/ui/HowItWork";

const data = [
  {
    number: 1,
    title: "Book a tour",
    description:
      "Schedule a visit to our coworking space and experience the environment first-hand.",
  },
  {
    number: 2,
    title: "Choose a plan",
    description: "Select a membership plan that suits your needs and budget.",
  },
  {
    number: 3,
    title: "Start working",
    description:
      "Join our coworking space and start working in a professional environment.",
  },
];
function HowItWork() {
  return (
    <section className="bg-white w-full  px-6 sm:px-12 lg:px-24 py-16 ">
      <div className="flex flex-col gap-8 items-center ">
        <h2 className="title mb-6">How it Works</h2>
        <h2 className="text-4xl font-semibold text-gray-800">
          your step-by-step Guide to{" "}
          <span className="text-primary-100">join our coworking space</span>{" "}
        </h2>

        <div className="grid   grid-cols-1    md:grid-cols-3 gap-8 mt-10 ">
          {data.map((item) => (
            <HowItWorkCard
              key={item.number}
              number={item.number}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWork;
