import Adsslider from "../../Component/Adsslider/index.jsx";
import Catslider from "../../Component/Catslider/index.jsx";
import HomeSlider from "../../Component/Homeslider/index.jsx";
import Bannerboxv2 from "../../Component/bannerboxv2/index.jsx";
import Blogitem from "../../Component/Blogitem/index.jsx";
import { Navigation } from "swiper/modules";
import "./../../index.css";
import { FaShippingFast } from "react-icons/fa";
import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import ProductSlider from "../../Component/ProductSlider/index.jsx";

import Homev2 from "../../Component/homesliderv2/index.jsx";
import { fetchData } from "../../utils/api.js";
import { useContext } from "react";
import { myContext } from "../../App.jsx";
import ProductLoader from "../../Component/Productloader/index.jsx";
export default function Home() {
  const [value, setValue] = useState(0);
  const [catData, setCatData] = useState([]);
  const [bannerData, setBannerData] = useState([]);
  const [popproductData, setpopProductData] = useState([]);
  const [allproductData, setallProductData] = useState([]);
  const [bannersv1, setBannersv1] = useState([]);
  const [BlogData, setBlogData] = useState([]);

  const [Featured, setFeatured] = useState([]);
  const context = useContext(myContext);

  useEffect(() => {
    setCatData(context.catData || []);
    fetchData("/api/homebanner/get").then((res) => {
      console.log("Fetched Home Banner data:", res);
      setBannerData(res.banners || []);
      console.log(bannerData);
    });
    fetchData("/api/product/products").then((res) => {
      setallProductData([]);

      console.log("Fetched All Product data:", res);
      setallProductData(res.data || []);
    });
    fetchData("/api/product/isFeatured").then((res) => {
      setFeatured([]);
      console.log("Fetched Featured Product data:", res);
      setFeatured(res.data || []);
    });
    fetchData("/api/bannerv1/get").then((res) => {
      console.log("Banner response:", res);
      setBannersv1(res.data || []);
    });
    fetchData("/api/blog/get").then((res) => {
      console.log("Fetched Blog data:", res);
      setBlogData(res.data || []);
    });
    window.scrollTo(0, 0);
  }, [context.catData]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterByCatId = (id) => {
    setpopProductData([]);
    fetchData(`/api/product/products/${id}`).then((res) => {
      console.log("Fetched Product data:", res);
      setpopProductData(res.data || []);
    });
  };
  return (
    <div className="min-h-[25vh] lg:min-h-[65vh] relative">
      {bannerData.length !== 0 && <HomeSlider data={bannerData} />}
      {context.catData.length !== 0 && <Catslider data={context.catData} />}

      <section className="bg-white py-16">
        <div className="container">
          <div className="flex items-center justify-between flex-col lg:flex-row">
            <div className="lg:leftsec items-center">
              <h2 className=" text-[20px] pl-16 lg:pl-0 items-center lg:text-[25px] font-[600]">Popular Products</h2>
              <p className="text-[12px] text-gray-600 lg:text-black lg:text-[15px] font-[600]">Shop the latest products and get our free delivery</p>
            </div>

            <div className="rightsec w-full lg:w-[60%]">
              <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                {context.catData.length !== 0 &&
                  context.catData.map((item, index) => (
                    <Tab
                      key={index}
                      label={item.name}
                      onClick={() => filterByCatId(item._id)}
                    />
                  ))}
              </Tabs>
            </div>
          </div>
          {popproductData.length === 0 && <ProductLoader />}

          {popproductData.length !== 0 && (
            <ProductSlider items={5} data={popproductData} />
          )}
        </div>
      </section>
      {/* <section className="py-6 bg-white">
  <div className="container flex flex-col lg:flex-row items-center gap-5">
    <div className="part1 !w-full">
      {allproductData.length !== 0 && <Homev2 data={allproductData} />}
    </div> */}

    {/* Optional Banner Column (Uncomment to use) */}
    {/* 
    <div className="part-2 w-[30%] flex items-center gap-5 h-[195px] justify-between flex-col">
      <Bannerboxv2 info="right" image="src/assets/bannerv2.jpg" />
      <Bannerboxv2 info="left" image="src/assets/bannerv2-2.jpg" />
    </div> 
    */}
  {/* </div>
</section> */}


      <section className="bg-white py-4 pt-0 lg:pt-6 lg:py-16">
        <div className="container">
          <div className="freeship w-full md:w-[70%] m-auto p-4 py-2 border border-[red] rounded-md flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex col-1 items-center gap-4">
              <FaShippingFast className="text-[50px]" />
              <span className="text-[15px] lg:text-[20px] uppercase font-[600]">
                Free Shipping
              </span>
            </div>
            <div className="flex col-2 !items-center gap-1">
              <p className=" mb-0 font-[600] text-[12px] lg:text-[16px] text-center">
                Get Free Shipping on all orders over $100
              </p>
            </div>
            <div className="flex col-3 items-center gap-1">
              <p className="text-[15px] lg:text-[20px] mb-0 font-[600]">Shop Now</p>
            </div>
          </div>
          {bannersv1.length !== 0 && <Adsslider data={bannersv1} />}
        </div>
      </section>

      <section className="bg-white py-2 lg:py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="leftsec">
              <h2 className="text-[20px] lg:text-[25px] font-[600]">Latest Products</h2>
            </div>
          </div>
          {allproductData.length === 0 && <ProductLoader />}
          {allproductData.length !== 0 && (
            <ProductSlider items={5} data={allproductData} />
          )}

          {bannersv1.length !== 0 && <Adsslider data={bannersv1} />}
        </div>
      </section>
      <section className="bg-white py-1 lg:py-5">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="leftsec">
              <h2 className="text-[20px] lg:text-[25px] font-[600]">Featured Products</h2>
            </div>
          </div>
          {Featured.length === 0 && <ProductLoader />}
          {Featured.length !== 0 && <ProductSlider items={5} data={Featured} />}

          {/* {bannersv1.length !== 0 && <Adsslider data={bannersv1} />} */}
        </div>
      </section>
      {BlogData.length !== 0 && (
  <section className="bg-white blogsection pb-8 py-5 pt-0">
    <div className="py-5 container">
      <h2 className="text-[20px] lg:text-[25px] pb-2 font-[600]">Latest Blogs</h2>

      <Swiper
          navigation={context.windowWidth>992 ?true:false}
          modules={[Navigation]}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
            spaceBetween: 12,
          },
          480: {
            slidesPerView: 1.5,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 18,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="swiperblog"
      >
        {BlogData.map((item, index) => (
          <SwiperSlide key={index}>
            <Blogitem item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
)}

    </div>
  );
}
