import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation, Autoplay } from "swiper/modules";
import { useContext } from "react";
import { myContext } from "../../App";

export default function HomeSlider(props) {
  const context=useContext(myContext)
  return (
    <div className="homeslider  pt-2 lg:pt-5 pb-2 lg:pb-5  bg-white">
      <div className="container">
        <Swiper
          navigation={context.windowWidth>992 ?true:false}
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          spaceBetween={30}
          className="sliderhome"
        >
          {props.data.length !== 0 &&
            props.data.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <div className="rounded-[20px] overflow-hidden item">
                    <img
                      src={item.image[0].url}
                      className="w-full"
                      alt="bannerslide"
                    />
                  </div>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
}
