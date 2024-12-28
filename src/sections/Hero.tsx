import Banner from "../components/Banner";
import heroImg from "/heroimg.png";

function Hero() {
  return (
    <section className="bg-black/90 w-full  ">
      {/* Navbar */}

      <hr className="  hidden lg:block text-[#374151] w-full h-[1px]" />

      <div className="flex items-center flex-col gap-4 justify-center mt-6 px-4 lg:px-0">
        <div className="text-[#f1f5f9] capitalize border-l-[1px] border-r-[1px] border-[#cbd5e1] px-8 py-3 rounded-3xl  text-lg  md:text-2xl leading-7  ">
          Top co-working space for {new Date().getFullYear()}
        </div>
        {/* text */}
        <div>
          <h1 className="text-[40px] sm:text-[50px] lg:text-[70px] text-white font-semibold capitalize indent-1 text-center">
            the Ultimate Hub for{" "}
            <span className="block text-primary-100 italic">
              Creatives & Entrepreneurs
            </span>{" "}
          </h1>
        </div>
      </div>

      {/* Hero image and statistics */}
      <div className="flex flex-col gap-4 items-center px-4 lg:px-16">
        <img src={heroImg} className="w-full h-auto bg-cover" />
        <div className="bg-[#4b5563] w-full h-auto lg:h-[100px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-[30px] py-3 rounded-2xl mb-10">
          {/* Card 1 */}
          <div className="flex flex-col gap-2 sm:gap-4 border-b sm:border-b-0 sm:border-r border-gray-300 pr-6">
            <h4 className="text-primary-100 font-semibold text-2xl">25+</h4>
            <p className="text-xl text-[#f1f5f9]">Years of services</p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col gap-2 sm:gap-4 border-b sm:border-b-0 sm:border-r border-gray-300 pr-6">
            <h4 className="text-primary-100 font-semibold text-2xl">10+</h4>
            <p className="text-xl text-[#f1f5f9]">Locations</p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col gap-2 sm:gap-4 border-b sm:border-b-0 sm:border-r border-gray-300 pr-6">
            <h4 className="text-primary-100 font-semibold text-2xl">24</h4>
            <p className="text-xl text-[#f1f5f9]">Hour Open</p>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col gap-2 sm:gap-4">
            <h4 className="text-primary-100 font-semibold text-2xl">25k+</h4>
            <p className="text-xl text-[#f1f5f9]">Happy Customers</p>
          </div>
        </div>
      </div>

      {/* banner */}
      <Banner />
    </section>
  );
}

export default Hero;
