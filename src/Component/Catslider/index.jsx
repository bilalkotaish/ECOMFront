import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { myContext } from "../../App";
export default function Catslider(props) {
  const context=useContext(myContext)

  return (
    <div className="catslider py-4 pt-4 lg:py-8 bg-white lg:pt-8">
      <div className="container">
        <Swiper
          spaceBetween={20}
          navigation={context?.windowWidth > 992}
          modules={[Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 2.5,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 3.5,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 25,
            },
            1280: {
              slidesPerView: 7,
              spaceBetween: 30,
            },
          }}
          className="mySwiper"
        >
          {props.data.length !== 0 &&
            props.data.map((item) => (
              <SwiperSlide key={item.id}>
                <Link to="/products">
                  <div className="item !p-3 !py-7 !px-3 bg-blue-50 rounded-md text-center items-center flex flex-col justify-center">
                    <img
                      src={item?.images?.[0]?.url}
                      className="w-[40px] lg:w-[80px] transition-all transform duration-300 ease-in-out hover:scale-110"
                      alt={item.name}
                    />
                    <h3 className="text-center font-[300]">{item.name}</h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
