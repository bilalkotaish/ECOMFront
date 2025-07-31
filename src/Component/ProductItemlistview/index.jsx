import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import {
  IoCloseSharp,
  IoExpandOutline,
  IoGitCompareOutline,
} from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import { myContext } from "../../App";
import { useContext, useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { deleteData, editData } from "../../utils/api";

export default function ProductItemListView(props) {
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

  const handleWishlist = (item) => {
    context.handleWishlist(item);
    context.getList();
  };

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

    const items = context?.cartData?.filter(
      (item2) =>
        item2.productId?.toString() === item._id?.toString() ||
        item2.productId?._id?.toString() === item._id?.toString()
    );

    if (items.length !== 0) {
      setCartItems(items);
      setIsAdded(true);
      setQuantity(items[0]?.quantity);
    } else {
      setIsAdded(false);
    }
  }, [context?.cartData, item?._id]);

  const handleDecrement = () => {
    if (quantity === 1) {
      deleteData(`/api/cart/deletecart/${cartItems[0]?._id}`).then((res) => {
        if (res.error) {
          context.Alertbox("error", res.error);
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
      };

      editData(`/api/cart/updateCart`, obj).then((res) => {
        if (res.error) {
          context.Alertbox("error", res.error);
        } else {
          context.Alertbox("success", res.message);
        }
      });

      setQuantity((prev) => Math.max(1, prev - 1));
    }
  };

  const handleIncrement = () => {
    const obj = {
      _id: cartItems[0]?._id,
      qty: quantity + 1,
      subTotal: cartItems[0]?.price * (quantity + 1),
    };

    editData(`/api/cart/updateCart`, obj).then((res) => {
      if (res.error) {
        context.Alertbox("error", res.error);
      } else {
        context.Alertbox("success", res.message);
      }
    });

    setQuantity((prev) => prev + 1);
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

  return (
    <div className="flex flex-col sm:flex-row bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Image Section */}
      <div className="w-full sm:w-1/4 min-w-[250px] relative group">
        <Link to={`/productdetails/${item?.id || item?._id}`}>
          <div className="h-[250px] sm:h-[300px] overflow-hidden relative">
            <img
              src={primaryImage}
              alt={item?.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {secondaryImage && (
              <img
                src={secondaryImage}
                alt={item?.name}
                className="absolute top-0 left-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            )}
          </div>
        </Link>
        {isShow && (
          <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex flex-wrap gap-2 items-center justify-center p-4">
            <IoCloseSharp
              className="absolute top-2 right-2 text-white text-xl cursor-pointer"
              onClick={() => setIsShow(false)}
            />
            {[...(item?.size || []), ...(item?.productRam || []), ...(item?.productweight || [])].map((variant, idx) => (
              <span
                key={idx}
                onClick={() => handleActiveTab(idx, variant, "custom")}
                className={`min-w-[35px] h-10 flex items-center justify-center px-2 text-sm rounded bg-white text-gray-800 cursor-pointer hover:bg-primary hover:text-white transition-all ${ActiveTab === idx ? "!bg-primary text-white" : ""}`}
              >
                {variant}
              </span>
            ))}
          </div>
        )}
        <div className="absolute top-2 left-2 bg-white text-orange-500 text-xs px-2 py-1 rounded">
          {item?.discount}%
        </div>
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Tooltip title="Wishlist">
            <Button
              onClick={() => handleWishlist(item)}
              className="!p-2 !rounded-full !bg-white"
            >
              {context.isInWishlist(item._id) ? (
                <IoMdHeart className="text-red-500" size={20} />
              ) : (
                <IoMdHeartEmpty className="text-gray-500" size={20} />
              )}
            </Button>
          </Tooltip>
          <Tooltip title="View">
            <Button
              onClick={() => context.handleOpen(true, item)}
              className="!p-2 !rounded-full !bg-white hover:!bg-primary hover:text-white"
            >
              <IoExpandOutline size={20} />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 p-4 sm:p-6 flex flex-col justify-center">
        <Link to="/" className="text-xs sm:text-sm text-gray-500 uppercase hover:text-primary mb-1">
          {categoryName}
        </Link>
        <Link to="/" className="text-base sm:text-lg font-semibold text-black hover:text-primary mb-2">
          {item?.name}
        </Link>
        <p className="text-sm sm:text-base text-gray-600 mb-3 line-clamp-3">
          {item?.description || "No description available"}
        </p>
        <Rating
          name="size-small"
          defaultValue={item?.rating || 0}
          size="small"
          readOnly
          className="mb-3"
        />
        <div className="flex items-center gap-2 mb-3">
          <span className="line-through text-sm text-gray-400">{item?.oldprice}$</span>
          <span className="text-lg text-primary font-semibold">{item?.price}$</span>
        </div>
        {!isAdded ? (
          <Button
            fullWidth
            disabled={quantity < 1 || quantity > item?.countInStock}
            onClick={() => Addtocart(item, context.userData?._id, quantity)}
            className="btn-org btn-border !normal-case py-2 rounded-lg"
            startIcon={<MdOutlineAddShoppingCart />}
          >
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center w-full sm:w-[200px] border border-gray-300 rounded-full overflow-hidden">
            <Button onClick={handleDecrement} className="flex-1 !py-2 !text-primary">
              <FaMinus />
            </Button>
            <div className="flex-1 text-center text-sm font-medium">
              {quantity}
            </div>
            <Button onClick={handleIncrement} className="flex-1 !py-2 !text-primary">
              <FaPlus />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
