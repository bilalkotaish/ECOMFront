import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { CiShare1 } from "react-icons/ci";
import { IoExpandOutline } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { myContext } from "../../App";
import { deleteData, editData } from "../../utils/api";
import { IoCloseSharp } from "react-icons/io5";

export default function ProductItem(props) {
  const context = useContext(myContext);
  const { item } = props;
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [ActiveTab, setActiveTab] = useState(null);

  const [isShow, setIsShow] = useState(false);

  const [selectedTabSize, setSelectedTabSize] = useState(null);
  const [selectedTabWeight, setSelectedTabWeight] = useState(null);
  const [selectedTabRam, setSelectedTabRam] = useState(null);

  const primaryImage = item?.images?.[0]?.url;
  const secondaryImage = item?.images?.[1]?.url;

  const categoryName =
    typeof item?.category === "object" ? item?.category?.name : item?.category;

  const Addtocart = (product, userId, quantity) => {
    const productItems = {
      ...product,
      size: selectedTabSize,
      weight: selectedTabWeight,
      productRam: selectedTabRam,
    };

    if (
      item.size?.length !== 0 ||
      item.weight?.length !== 0 ||
      item.ram?.length !== 0
    ) {
      setIsShow(true);
    } else {
      context?.AddtoCart(productItems, userId, quantity);
      setIsAdded(true);
      setQuantity(1);
      setIsShow(false);
    }

    if (ActiveTab !== null) {
      context?.AddtoCart(productItems, userId, quantity);
      setIsAdded(true);
      setQuantity(1);
      setIsShow(false);
    }
  };

  useEffect(() => {
    if (!item?._id || !context?.cartData) return;
    console.log("cartData example:", context.cartData[0]);

    const items = context?.cartData?.filter(
      (item2) =>
        item2.productId?.toString() === item._id?.toString() ||
        item2.productId?._id?.toString() === item._id?.toString()
    );

    if (items.length !== 0) {
      setCartItems(items);
      console.log("AddedItem:", items);
      setIsAdded(true);
      setQuantity(items[0]?.quantity);
    } else {
      setIsAdded(false);
    }
  }, [context?.cartData, item?._id]);
  const handleDecrement = () => {
    if (quantity !== 1 && quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else {
      setQuantity(1);
    }
    if (quantity === 1) {
      deleteData(`/api/cart/deletecart/${cartItems[0]?._id}`).then((res) => {
        if (res.error) {
          context.Alertbox("error", res.error);
          return;
        } else {
          context.Alertbox("success", res.message);
          setIsAdded(false);
          setIsShow(false);
          setActiveTab(null);
          context.getCart();
        }
      });
    } else {
      const obj = {
        _id: cartItems[0]?._id,
        qty: quantity - 1,
        subTotal: cartItems[0]?.price * (quantity - 1),
        // countInStock: cartItems[0]?.countInStock - quantity + 1,
      };

      editData(`/api/cart/updateCart`, obj).then((res) => {
        console.log(res);
        if (res.error) {
          context.Alertbox("error", res.error);
          return;
        } else {
          context.Alertbox("success", res.message);
        }
      });
    }
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
    const obj = {
      _id: cartItems[0]?._id,
      qty: quantity + 1,
      subTotal: cartItems[0]?.price * (quantity + 1),
      // countInStock: cartItems[0]?.countInStock - (quantity + 1),
    };

    editData(`/api/cart/updateCart`, obj).then((res) => {
      console.log(res);
      if (res.error) {
        context.Alertox("error", res.error);
        return;
      } else {
        context.Alertbox("success", res.message);
      }
    });
  };

  const handleActiveTab = (index, name, type) => {
    setActiveTab(index);

    if (type === "size") {
      setSelectedTabSize(name);
    } else if (type === "weight") {
      setSelectedTabWeight(name);
    } else if (type === "ram") {
      setSelectedTabRam(name);
    }
  };

  const handleWishlist = (item) => {
    context.handleWishlist(item);
    context.getList();
  };

  return (
    <div className="productitem bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Image Wrapper */}
      <div className="imagewrapper group relative w-full bg-white border-b border-gray-100">
        <Link to={`/productdetails/${item?.id || item?._id}`}>
          <div className="img h-[250px] relative overflow-hidden">
            {primaryImage && (
              <img
                src={primaryImage}
                alt={item?.name || "Product image"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
            {secondaryImage && (
              <img
                src={secondaryImage}
                alt={item?.name || "Product secondary image"}
                className="w-full h-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 object-cover"
              />
            )}
          </div>
        </Link>

        {isShow === true && (
          <div className="flex items-center gap-2 justify-center absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.4)] opacity-100 transition-opacity duration-300 z-[60] backdrop-blur-sm">
            <IoCloseSharp
              className="text-2xl text-white absolute top-2 right-2 cursor-pointer"
              onClick={() => setIsShow(false)}
            />
            {item?.size?.map((size, index) => (
              <span
                key={index}
                onClick={() => handleActiveTab(index, size, "size")}
                className={`flex items-center justify-center w-15 min-w-[35px] h-10 text-sm font-semibold text-gray-800 bg-white/80 rounded-md shadow-md cursor-pointer hover:bg-white hover:text-black hover:scale-105 transition-all duration-200 ease-in-out z-[60] ${
                  ActiveTab === index ? "!bg-primary text-white" : ""
                }`}
              >
                {size}
              </span>
            ))}

            {item.productRam?.length > 0 &&
              item.productRam?.map((ram, index) => (
                <span
                  key={index}
                  onClick={() => handleActiveTab(index, ram, "ram")}
                  className={`flex items-center justify-center w-15 min-w-[35px] h-10 text-sm font-semibold text-gray-800 bg-white/80 rounded-md shadow-md cursor-pointer hover:bg-white hover:text-black hover:scale-105 transition-all duration-200 ease-in-out z-[60] ${
                    ActiveTab === index ? "!bg-primary text-white" : ""
                  }`}
                >
                  {ram}
                </span>
              ))}

            {item.productweight?.length > 0 &&
              item.productweight?.map((weight, index) => (
                <span
                  key={index}
                  onClick={() => handleActiveTab(index, weight, "weight")}
                  className={`flex items-center justify-center w-15 min-w-[35px] h-10 text-sm font-semibold text-gray-800 bg-white/80 rounded-md shadow-md cursor-pointer hover:bg-white hover:text-black hover:scale-105 transition-all duration-200 ease-in-out z-[60] ${
                    ActiveTab === index ? "!bg-primary text-white" : ""
                  }`}
                >
                  {weight}
                </span>
              ))}
          </div>
        )}

        {item?.discount && (
          <span className="absolute top-2 left-2 bg-white text-orange-500 text-xs font-semibold px-2 py-0.5 rounded-md shadow-sm">
            {item.discount}%
          </span>
        )}

        <div className="absolute top-3 right-3 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <Tooltip title="Add to wishlist">
            <Button
              onClick={() => handleWishlist(item)}
              className="!p-2 !rounded-full w-[35px] h-[35px] !bg-white text-gray-600 hover:!bg-red-300 hover:text-white transition-all duration-300"
            >
              {context.isInWishlist(item._id) ? (
                <IoMdHeart className="text-red-500 drop-shadow-md" size={20} />
              ) : (
                <IoMdHeartEmpty
                  className="text-gray-400 hover:text-red-500"
                  size={20}
                />
              )}
            </Button>
          </Tooltip>
            {
              context.windowWidth>992 &&
            
          <Tooltip title="Quick view">
            <Button
              className="!p-2 !rounded-full w-[35px] h-[35px] !bg-white text-gray-600 hover:!bg-red-300 hover:text-white transition-all duration-300"
              onClick={() => context.handleOpen(true, item)}
            >
              <IoExpandOutline
                size={18}
                className="text-gray-400 hover:text-red-500"
              />
            </Button>
          </Tooltip>
}
          {/* <Tooltip title="Compare">
            <Button className="!p-2 !rounded-full w-[35px] h-[35px] !bg-white text-gray-600 hover:!bg-primary hover:text-white transition-all duration-300">
              <IoGitCompareOutline size={18} />
            </Button>
          </Tooltip> */}
        </div>
      </div>

      {/* Info Section */}
      <div className="info p-4 pt-5 relative">
        <h6 className="text-xs text-gray-500 font-medium">
          <Link to={`/products?catId=${item._id}`}>{item.brand}</Link>
        </h6>

        <h3 className="text-sm font-semibold text-black mt-1 leading-5">
          <Link to={`/productdetails/${item?.id || item?._id}`}>
            {(item?.name?.substring(0, 30) || "Product Name") + "..."}
          </Link>
        </h3>

        <div className="flex items-center gap-2 mt-2">
          {item?.oldprice && (
            <span className="text-sm text-gray-400 line-through font-medium">
              ${item.oldprice}
            </span>
          )}
          <span className="text-base font-bold text-primary">
            ${item?.price || "N/A"}
          </span>
        </div>

        {item?.rating !== undefined && (
          <Rating
            name="size-small"
            value={item.rating}
            size="small"
            readOnly
            precision={0.5}
            className="mt-1"
          />
        )}

        {isAdded === false ? (
          <div className="mt-2">
            <Button
              fullWidth
              disabled={quantity < 1 || quantity > item.countInStock}
              onClick={() => Addtocart(item, context.userData?._id, quantity)}
              className="btn-org btn-border addtocartbtn !normal-case !pt-2  rounded-lg transition duration-300"
              startIcon={<MdOutlineAddShoppingCart />}
            >
              Add to Cart
            </Button>
          </div>
        ) : (
          <div className="flex items-center mt-3 justify-between rounded-full border border-gray-300 overflow-hidden w-full shadow-sm bg-white">
            <Button
              onClick={handleDecrement}
              className="px-3 py-2 !text-primary !w-[30%] flex justify-center hover:bg-gray-100 transition"
            >
              <FaMinus />
            </Button>
            <span className="text-sm font-medium w-[40%] text-center">
              {quantity}
            </span>
            <Button
              onClick={handleIncrement}
              className="px-3 py-2 !text-primary !w-[30%] flex justify-center hover:bg-gray-100 transition"
            >
              <FaPlus />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
