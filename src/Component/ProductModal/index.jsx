import { IoMdHeartEmpty } from "react-icons/io";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Qtybox from "../../Component/Qtybox";
import { useContext, useEffect, useState } from "react";
import { CiShare1 } from "react-icons/ci";
import { fetchData } from "../../utils/api";
import { myContext } from "../../App";

export default function ProductModal(props) {
  const [selectedTabSize, setSelectedTabSize] = useState(null);
  const [selectedTabWeight, setSelectedTabWeight] = useState(null);
  const [selectedTabRam, setSelectedTabRam] = useState(null);
  const [activeTabs, setactiveTabs] = useState(null);
  const context = useContext(myContext);
  const [quantity, setQuantity] = useState(1);

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

  const [ReviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    fetchData(`/api/user/Reviews?productId=${props.item?._id}`)
      .then((res) => {
        if (res?.success) {
          setReviewsCount(res?.data?.length || 0);
        } else {
          setReviewsCount(0);
        }
      })
      .catch(() => {
        setReviewsCount(0);
      });
  }, [props.item?._id]);
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
      context.handleClose();
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
    <div className="content w-full md:w-[100%] px-4 md:px-8 lg:px-12">
      {/* Product Title */}
      <h1 className="text-2xl md:text-3xl !space-nowrap font-semibold no-wrap mb-4 text-gray-900 tracking-tight">
        {props.item?.name}
      </h1>

      {/* Rating and Brand */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
          <Rating
            name="product-rating"
            value={props.item?.rating || 0}
            precision={0.5}
            size="small"
            readOnly
            className="!text-yellow-500"
          />
          <span className="text-xs text-gray-600 ml-1">
            ({ReviewsCount || `No reviews`})Reviews
          </span>
        </div>
        <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          Brand:{" "}
          <span className="font-medium text-gray-800">
            {props.item?.brand || "Unknown"}
          </span>
        </div>
      </div>

      {/* Price Section */}
      <div className="mb-6">
        <div className="flex items-baseline gap-3 mb-1">
          {props.item?.oldprice && (
            <span className="line-through text-gray-400 text-lg font-medium">
              ${props.item?.oldprice.toFixed(2)}
            </span>
          )}
          <span className="text-primary text-2xl font-bold">
            ${props.item?.price?.toFixed(2) || "N/A"}
          </span>
          {props.item?.discount && (
            <span className="ml-2 bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
              {props.item?.discount}% OFF
            </span>
          )}
        </div>
        <div className="text-sm text-gray-600">
          <span
            className={
              props.item?.countInStock > 0 ? "text-green-600" : "text-red-600"
            }
          >
            {props.item?.countInStock > 0
              ? `In Stock (${props.item?.countInStock} available)`
              : "Out of Stock"}
          </span>
          {props.item?.countInStock > 0 && (
            <span className="ml-2 text-gray-500 italic">
              Free shipping (2-3 business days)
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          {props.item?.description || "No description available."}
        </p>
      </div>

      {/* Size Selection */}

      {props.item?.size?.length > 0 && (
        <div className="flex items-center mb-5">
          <span className="text-base font-medium">Size:</span>
          <div className="flex items-center gap-2 pl-4">
            {props.item?.size?.map((size, index) => (
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
      {props.item?.productRam?.length > 0 && (
        <div className="flex items-center mb-5">
          <span className="text-base font-medium">Ram:</span>
          <div className="flex items-center gap-2 pl-4">
            {props.item?.productRam?.map((ram, index) => (
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
      {props.item?.productweight?.length > 0 && (
        <div className="flex items-center mb-5">
          <span className="text-base font-medium">Weight:</span>
          <div className="flex items-center gap-2 pl-4">
            {props.item?.productweight?.map((weight, index) => (
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
      {/* <div className="flex items-center mb-5">
        <span className="text-base font-medium">Size:</span>
        <div className="flex items-center gap-2 pl-4">
          {props.item?.size?.map((size, index) => (
            <Button
              key={index}
              variant="outlined"
              size="small"
              className={`!rounded-full !px-4 !py-1 ${
                buttonindex === index
                  ? "!bg-primary !text-white"
                  : "!text-gray-700"
              }`}
              onClick={() => handleclick(index)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex items-center mb-5">
        <span className="text-base font-medium">Ram:</span>
        <div className="flex items-center gap-2 pl-4">
          {props.item?.productRam?.map((ram, index) => (
            <Button
              key={index}
              variant="outlined"
              size="small"
              className={`!rounded-full !px-4 !py-1 ${
                buttonindex1 === index
                  ? "!bg-primary !text-white"
                  : "!text-gray-700"
              }`}
              onClick={() => handleclickram(index)}
            >
              {ram}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex items-center mb-5">
        <span className="text-base font-medium">Weight:</span>
        <div className="flex items-center gap-2 pl-4">
          {props.item?.productweight?.map((weight, index) => (
            <Button
              key={index}
              variant="outlined"
              size="small"
              className={`!rounded-full !px-4 !py-1 ${
                buttonindex2 === index
                  ? "!bg-primary !text-white"
                  : "!text-gray-700"
              }`}
              onClick={() => handleclickweight(index)}
            >
              {weight}
            </Button>
          ))}
        </div>
      </div> */}

      {/* Quantity & Add to Cart */}
      <div className="flex items-center mb-5">
        <div className="flex items-center gap-2 w-[80px]">
          <Qtybox handleSelectQty={handleSelectQty} />
        </div>
        <Button
          variant="contained"
          onClick={() => Addtocart(props.item, context.userData?._id, quantity)}
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
  );
}
