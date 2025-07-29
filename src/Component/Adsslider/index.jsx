import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { myContext } from "../../App";
import Bannerbox from "../BannerBox";
import Bannerboxv2 from "../bannerboxv2";
export default function Adsslider(props) {
  const context=useContext(myContext)

  return (
    <div className="w-full bg-white py-16">
      <Swiper
        spaceBetween={20}
        navigation={context.windowWidth > 992}
        modules={[Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 12,
          },
          640: {
            slidesPerView: 2.5,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2.8,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="smlbtn"
      >
        {props.data?.map((item, index) => (
          <SwiperSlide key={index}>
            <Bannerbox
              item={item}
              info={item.info}
              img
              src={item.image?.[0]?.url}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}  
