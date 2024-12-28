import BannerComponent from "./ui/BannerComponent";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const sliderSettings = {
  infinite: true,
  speed: 5000,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 0,
  cssEase: "linear",
  variableWidth: true,
  pauseOnHover: true,
  arrows: false,
  swipeToSlide: true, // Enable swipe on mobile devices
  responsive: [
    {
      // tablets
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768, //  for mobile landscape
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480, // mobile portrait
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

function Banner() {
  return (
    <div className="w-full  [30px] md:h-[80px] bg-primary-100 ">
      <Slider {...sliderSettings}>
        <BannerComponent title={"Private Rooms"} />
        <BannerComponent title={"Dedicated Desk"} />
        <BannerComponent title={"Hot Desks"} />
        <BannerComponent title={"Virtual Rooms"} />
        <BannerComponent title={"Private Rooms"} />
        <BannerComponent title={"Private Rooms"} />
      </Slider>
    </div>
  );
}

export default Banner;
