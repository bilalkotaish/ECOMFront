import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Productzoom from "../ProductZoom";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import TextField from "@mui/material/TextField";
import ProductSlider from "../ProductSlider";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoGitCompareOutline } from "react-icons/io5";
import ProductModal from "../ProductModal";
import { fetchData } from "../../utils/api";
import { useParams } from "react-router-dom";
import InnerImageZoom from "react-inner-image-zoom";
import Reviews from "./reviews";
import { useContext } from "react";
import { myContext } from "../../App";

import Qtybox from "../Qtybox";
export default function ProductDetails() {
  const { id } = useParams();
  const [buttonindex, setbuttonindex] = useState(null);
  const [product, setproduct] = useState({});
  const [ActiveTab, setActiveTab] = useState(0);
  const [slideindex, setslideindex] = useState(0);
  const [buttonindex1, setbuttonindex1] = useState(null);
  const [buttonindex2, setbuttonindex2] = useState(null);
  const [reviewsCount, setReviewsCount] = useState(0);
  const [relatedProducts, setrelatedProducts] = useState([]);
  const context = useContext(myContext);
  const [quantity, setQuantity] = useState(1);
  const [selectedTabSize, setSelectedTabSize] = useState(null);
  const [selectedTabWeight, setSelectedTabWeight] = useState(null);
  const [selectedTabRam, setSelectedTabRam] = useState(null);
  const [activeTabs, setactiveTabs] = useState(null);

  const handleSelectQty = (qty) => {
    setQuantity(qty);
  };

  const handleclick = (index, size) => {
    setactiveTabs(index);
    setSelectedTabSize(size);
  };
  const handleclickram = (index, ram) => {
    setactiveTabs(index);
    setSelectedTabRam(ram);
  };
  const handleclickweight = (index, weight) => {
    setactiveTabs(index);
    setSelectedTabWeight(weight);
  };
  const reviewsRef = useRef();
  const usezoom1 = useRef();
  const usezoom2 = useRef();
  const Goto = (index) => {
    setslideindex(index);
    usezoom1.current.swiper.slideTo(index);
    usezoom2.current.swiper.slideTo(index);
  };
  useEffect(() => {
    fetchData(`/api/product/${id}`).then((res) => {
      if (res?.error === false) {
        setproduct(res?.data);
        fetchData(`/api/product/productSub/${res?.data?.subcatId}`).then(
          (res) => {
            if (res?.error === false) {
              const filtered = res?.data?.filter((item) => item._id !== id);
              setrelatedProducts(filtered);
            } else {
              console.log("Error fetching related products");
            }
          }
        );
      } else {
        console.log("Error fetching product details");
      }
    });

    window.scrollTo(0, 0);
  }, []);

  const scrollToReviews = () => {
    window.scrollTo({
      top: reviewsRef.current.offsetTop + 300,
      behavior: "smooth",
    });
    setActiveTab(1);
  };
  const Addtocart = (product, userId, quantity) => {
    const productItems = {
      ...product,
      size: selectedTabSize,
      weight: selectedTabWeight,
      productRam: selectedTabRam,
    };
    if (activeTabs !== null) {
      context?.AddtoCart(productItems, userId, quantity);
      setactiveTabs(null);
    } else {
      if (productItems.size?.length !== 0) {
        context.Alertbox("error", "Please select a Size to add to cart");
      } else if (productItems.weight?.length !== 0) {
        context.Alertbox("error", "Please select a Weight to add to cart");
      } else if (productItems.productRam?.length !== 0) {
        context.Alertbox("error", "Please select a Ram to add to cart");
      }
    }
  };
  return (
    <>
      <div className="py-5">
        <div className="container">
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="inherit" to={"/"} className="link">
                Home
              </Link>
              <Link
                underline="hover"
                color="inherit"
                // to={`/products?catId=${item._id}`}
                className="link"
              >
                {product?.category?.name}
              </Link>
              <Link
                underline="hover"
                color="inherit"
                // to={`/products?catId=${item._id}`}
                className="link"
              >
                {product?.name}
              </Link>
            </Breadcrumbs>
          </div>
        </div>
      </div>

      <section className="!bg-white py-5">
        {product?.images?.length > 0 && (
          <div className=" container flex gap-8 items-center">
            <div className="productzoom w-[40%] h-[500px] overflow-hidden">
              <div className="flex gap-3 ">
                <div className="slider w-[15%]">
                  <Swiper
                    ref={usezoom1}
                    direction={"vertical"}
                    slidesPerView={4} // Number of slides visible at a time
                    spaceBetween={5} // Space between slides
                    navigation={false} // Enable navigation buttons (next/prev)
                    modules={[Navigation]} // Import navigation module
                    className="zoomthumbs h-[500px]"
                  >
                    {product?.images?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div
                          className={`item  rounded-md !overflow-hidden cursor-pointer group ${
                            slideindex === index ? "opacity-1" : "opacity-30"
                          }`}
                          onClick={() => {
                            Goto(index);
                          }}
                        >
                          <img
                            src={item.url}
                            alt={`Product ${index}`}
                            className=" w-full transition-full rounded-lg group-hover:scale-105"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
                {
                  <div className="zoomcontainer w-[85%] h-[500px] overflow-hidden rounded-md">
                    <Swiper
                      slidesPerView={1}
                      ref={usezoom2}
                      spaceBetween={0}
                      navigation={false}
                    >
                      {product?.images?.map((item, index) => (
                        <SwiperSlide key={index}>
                          <InnerImageZoom
                            src={item.url}
                            zoomType="hover"
                            zoomScale={1}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                }
              </div>
            </div>
            <div className="content w-full md:w-[100%] px-4 md:px-8 lg:px-12">
              {/* Product Title */}
              <h1 className="text-2xl md:text-3xl !space-nowrap font-semibold no-wrap mb-4 text-gray-900 tracking-tight">
                {product?.name}
              </h1>

              {/* Rating and Brand */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <Rating
                    name="product-rating"
                    value={product?.rating || 0}
                    precision={0.5}
                    size="small"
                    readOnly
                    className="!text-yellow-500"
                  />
                  <span
                    className="text-xs text-gray-600 ml-1"
                    onClick={scrollToReviews}
                    ref={reviewsRef}
                  >
                    ({reviewsCount || 0} reviews)
                  </span>
                </div>
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  Brand:{" "}
                  <span className="font-medium text-gray-800">
                    {product?.brand || "Unknown"}
                  </span>
                </div>
              </div>

              {/* Price Section */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-1">
                  {product?.oldprice && (
                    <span className="line-through text-gray-400 text-lg font-medium">
                      ${product.oldprice.toFixed(2)}
                    </span>
                  )}
                  <span className="text-primary text-2xl font-bold">
                    ${product?.price?.toFixed(2) || "N/A"}
                  </span>
                  {product.item?.discount && (
                    <span className="ml-2 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                      {product?.discount}% OFF
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600">
                  <span
                    className={
                      product?.countInStock > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {product?.countInStock > 0
                      ? `In Stock (${product?.countInStock} available)`
                      : "Out of Stock"}
                  </span>
                  {product?.countInStock > 0 && (
                    <span className="ml-2 text-gray-500 italic">
                      Free shipping (2-3 business days)
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {product?.description || "No description available."}
                </p>
              </div>
              {/* Size Selection */}
              {product?.size.length > 0 && (
                <div className="flex items-center mb-5">
                  <span className="text-base font-medium">Size:</span>
                  <div className="flex items-center gap-2 pl-4">
                    {product?.size?.map((size, index) => (
                      <Button
                        key={index}
                        variant="outlined"
                        size="small"
                        className={`!rounded-full !px-4 !py-1 ${
                          activeTabs === index
                            ? "!bg-primary !text-white"
                            : "!text-gray-700"
                        }`}
                        onClick={() => handleclick(index, size)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              {product?.productRam.length > 0 && (
                <div className="flex items-center mb-5">
                  <span className="text-base font-medium">Ram:</span>
                  <div className="flex items-center gap-2 pl-4">
                    {product?.productRam?.map((ram, index) => (
                      <Button
                        key={index}
                        variant="outlined"
                        size="small"
                        className={`!rounded-full !px-4 !py-1 ${
                          activeTabs === index
                            ? "!bg-primary !text-white"
                            : "!text-gray-700"
                        }`}
                        onClick={() => handleclickram(index, ram)}
                      >
                        {ram}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              {product?.productweight.length > 0 && (
                <div className="flex items-center mb-5">
                  <span className="text-base font-medium">Weight:</span>
                  <div className="flex items-center gap-2 pl-4">
                    {product?.productweight?.map((weight, index) => (
                      <Button
                        key={index}
                        variant="outlined"
                        size="small"
                        className={`!rounded-full !px-4 !py-1 ${
                          activeTabs === index
                            ? "!bg-primary !text-white"
                            : "!text-gray-700"
                        }`}
                        onClick={() => handleclickweight(index, weight)}
                      >
                        {weight}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center mb-5">
                <div className="flex items-center gap-2 w-[80px]">
                  <Qtybox handleSelectQty={handleSelectQty} />
                </div>
                <Button
                  variant="contained"
                  onClick={() =>
                    Addtocart(product, context.userData?._id, quantity)
                  }
                  className="!bg-primary !text-white flex items-center gap-2 !ml-4 !px-4 !py-2 hover:!bg-primary-dark whitespace-nowrap"
                >
                  <MdOutlineAddShoppingCart className="text-sm" />
                  Add To Cart
                </Button>
              </div>

              {/* Wishlist & Compare */}
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-primary transition text-sm">
                  <IoMdHeartEmpty className="text-lg" />
                  Add To Wishlist
                </span>
                <span className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-primary transition text-sm">
                  <IoGitCompareOutline className="text-lg" />
                  Add To Compare
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="container !mt-10">
          <div className="flex items-center gap-8 mb-5">
            <span
              className={`text-[18px] link cursor-pointer ${
                ActiveTab === 0 ? "text-primary" : ""
              }`}
              onClick={() => {
                setActiveTab(0);
              }}
            >
              Description
            </span>

            <span
              className={`text-[18px] link cursor-pointer ${
                ActiveTab === 1 ? "text-primary" : ""
              }`}
              onClick={() => {
                setActiveTab(1);
              }}
            >
              Reviews({reviewsCount})
            </span>
          </div>

          {ActiveTab === 0 && (
            <div className="shadow-md w-full p-5 rounded-md">
              {product?.description || "No description available."}
            </div>
          )}

          {ActiveTab === 1 && (
            <Reviews
              setReviewsCount={setReviewsCount}
              reviewCount={reviewsCount}
              scrollToReviews={scrollToReviews}
              productId={product?._id}
            />
          )}
        </div>

        <div className="flex items-center pt-10  ">
          <div className="leftsec ml-6">
            <h2 className="text-[25px] font-[600] mb-2 ">Related Products</h2>
          </div>{" "}
        </div>
        {relatedProducts?.length > 0 && (
          <div className="ml-6 mr-6">
            <ProductSlider data={relatedProducts} />
          </div>
        )}
      </section>
    </>
  );
}
