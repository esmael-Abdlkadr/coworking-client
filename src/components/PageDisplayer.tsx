import { capitalizeTitle } from "../utils/capitalize";
import Banner from "./Banner";
import { useLocation } from "react-router-dom";

function PageDisplayer() {
  const location = useLocation();
  const routeName = `${location.pathname.split("/")[1]}`;
  return (
    <>
      <div className="w-full  h-[300px] bg-black/90">
        <div className="flex flex-col items-center justify-center  gap-4">
          <h1 className="text-3xl  lg:text-5xl text-white font-semibold  mt-6">
            {capitalizeTitle(routeName)}
          </h1>
          <h4 className="flex items-center gap-3">
            <p className="text-white text-xl font-semibold ">Home</p>
            <p className="text-primary-100 text-xl font-semibold ">
              /{routeName}
            </p>
          </h4>
        </div>
      </div>
      <Banner />
    </>
  );
}

export default PageDisplayer;
