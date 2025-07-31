import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Rating from "@mui/material/Rating";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { fetchData } from "../../utils/api";
import { myContext } from "../../App";
import Qtybox from "../../Component/Qtybox";

export default function ProductModal({ item }) {
  const [selectedTabSize, setSelectedTabSize] = useState(null);
  const [selectedTabRam, setSelectedTabRam] = useState(null);
  const [selectedTabWeight, setSelectedTabWeight] = useState(null);
  const [sizeIndex, setSizeIndex] = useState(null);
  const [ramIndex, setRamIndex] = useState(null);
  const [weightIndex, setWeightIndex] = useState(null);
  const [ReviewsCount, setReviewsCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const context = useContext(myContext);

  useEffect(() => {
    fetchData(`/api/user/Reviews?productId=${item?._id}`)
      .then((res) => {
        setReviewsCount(res?.success ? res.data.length : 0);
      })
      .catch(() => setReviewsCount(0));
  }, [item?._id]);

  const handleAddToCart = () => {
    const productItems = {
      ...item,
      size: selectedTabSize,
      weight: selectedTabWeight,
      productRam: selectedTabRam,
    };

    if (item.size?.length > 0 && !selectedTabSize)
      return context.Alertbox("error", "Please select a Size to add to cart");

    if (item.productRam?.length > 0 && !selectedTabRam)
      return context.Alertbox("error", "Please select a Ram to add to cart");

    if (item.productweight?.length > 0 && !selectedTabWeight)
      return context.Alertbox("error", "Please select a Weight to add to cart");

    context?.AddtoCart(productItems, context.userData?._id, quantity);
    setSizeIndex(null);
    setRamIndex(null);
    setWeightIndex(null);
    context.handleClose();
  };

  return (
    <div className="w-full p-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
      {/* Title */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-gray-900">
        {item?.name}
      </h1>

      {/* Ratings and Brand */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
          <Rating
            value={item?.rating || 0}
            precision={0.5}
            size="small"
            readOnly
            className="!text-yellow-500"
          />
          <span className="text-xs text-gray-600 ml-1">
            ({ReviewsCount || "No reviews"}) Reviews
          </span>
        </div>
        <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          Brand: <span className="font-medium text-gray-800">{item?.brand || "Unknown"}</span>
        </div>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex flex-wrap items-baseline gap-3 mb-1">
          {item?.oldprice && (
            <span className="line-through text-gray-400 text-lg font-medium">
              ${item?.oldprice.toFixed(2)}
            </span>
          )}
          <span className="text-primary text-2xl font-bold">
            ${item?.price?.toFixed(2) || "N/A"}
          </span>
          {item?.discount && (
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
              {item.discount}% OFF
            </span>
          )}
        </div>
        <div className="text-sm text-gray-600 mt-1">
          <span className={item?.countInStock > 0 ? "text-green-600" : "text-red-600"}>
            {item?.countInStock > 0
              ? `In Stock (${item?.countInStock})`
              : "Out of Stock"}
          </span>
          {item?.countInStock > 0 && (
            <span className="ml-2 text-gray-500 italic">
              Free shipping (2-3 days)
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Description</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          {item?.description || "No description available."}
        </p>
      </div>

      {/* Options (Size, Ram, Weight) */}
      {item?.size?.length > 0 && (
        <div className="mb-4">
          <span className="block text-base font-medium mb-1">Size:</span>
          <div className="flex flex-wrap gap-2">
            {item.size.map((size, index) => (
              <Button
                key={index}
                variant="outlined"
                size="small"
                onClick={() => {
                  setSelectedTabSize(size);
                  setSizeIndex(index);
                }}
                className={`!rounded-full !px-4 !py-1 ${
                  sizeIndex === index ? "!bg-primary !text-white" : "!text-gray-700"
                }`}
              >
                {size}
              </Button>
            ))}
          </div>
        </div>
      )}

      {item?.productRam?.length > 0 && (
        <div className="mb-4">
          <span className="block text-base font-medium mb-1">Ram:</span>
          <div className="flex flex-wrap gap-2">
            {item.productRam.map((ram, index) => (
              <Button
                key={index}
                variant="outlined"
                size="small"
                onClick={() => {
                  setSelectedTabRam(ram);
                  setRamIndex(index);
                }}
                className={`!rounded-full !px-4 !py-1 ${
                  ramIndex === index ? "!bg-primary !text-white" : "!text-gray-700"
                }`}
              >
                {ram}
              </Button>
            ))}
          </div>
        </div>
      )}

      {item?.productweight?.length > 0 && (
        <div className="mb-4">
          <span className="block text-base font-medium mb-1">Weight:</span>
          <div className="flex flex-wrap gap-2">
            {item.productweight.map((weight, index) => (
              <Button
                key={index}
                variant="outlined"
                size="small"
                onClick={() => {
                  setSelectedTabWeight(weight);
                  setWeightIndex(index);
                }}
                className={`!rounded-full !px-4 !py-1 ${
                  weightIndex === index
                    ? "!bg-primary !text-white"
                    : "!text-gray-700"
                }`}
              >
                {weight}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity & Add to Cart */}
      <div className="flex flex-wrap items-center mb-5 gap-4">
        <Qtybox handleSelectQty={setQuantity} />
        <Button
          variant="contained"
          onClick={handleAddToCart}
          className="!bg-primary !text-white flex items-center gap-2 !px-4 !py-2 hover:!bg-primary-dark"
        >
          <MdOutlineAddShoppingCart className="text-lg" />
          Add To Cart
        </Button>
      </div>

      {/* Wishlist */}
      <div className="flex items-center gap-6 text-sm text-gray-600">
        <span className="flex items-center gap-2 cursor-pointer hover:text-primary">
          <IoMdHeartEmpty className="text-lg" /> Add To Wishlist
        </span>
      </div>
    </div>
  );
}
