import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import "./responsive.css";
import Header from "./Component/Header";
import Home from "./Pages/Home";
import Productlisting from "./Pages/Productlisting";
import Footer from "./Component/Footer";
import ProductDetails from "./Component/Productdetails";
import { createContext, useEffect } from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Productzoom from "./Component/ProductZoom";
import { RiCloseLine } from "react-icons/ri";
import ProductModal from "./Component/ProductModal";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Drawer from "@mui/material/Drawer";
import { MdClose } from "react-icons/md";
import CartPanel from "./Component/CartPanel";
import Cart from "./Component/Cart";
import Emailverify from "./Pages/verification";
import toast, { Toaster } from "react-hot-toast";
import Forgetpass from "./Component/Forgetpass";
import Checkout from "./Pages/Checkout";
import Myaccount from "./Pages/Myaccount";
import Listitems from "./Component/Mylist/Listitems";
import MyList from "./Component/Mylist";
import Orders from "./Pages/Orders";
import { deleteData, fetchData, postData } from "./utils/api";
import Address from "./Pages/Myaccount/address";
import Successorder from "./Pages/Orders/successorder";
import Failedorder from "./Pages/Orders/failedorder";
import SearchPage from "./Pages/SearchPage";
import HelpCenter from "./Component/Otherpages/Helpcenter";
import ContactUs from "./Component/Otherpages/ContactUs";
import AboutUs from "./Component/Otherpages/Aboutus";
import SecurePayments from "./Component/Otherpages/Securepayment";
import LegalNotice from "./Component/Otherpages/legalnotice";
import TermsAndConditions from "./Component/Otherpages/Termofuse";
import DeliveryInfo from "./Component/Otherpages/Delivery";
import BlogDetailsPage from "./Component/Otherpages/Blogdetails/blog.details";

export const myContext = createContext();

function App() {
  const [openProduct, setOpenProduct] = useState({
    open: false,
    item: {},
  });
  const [maxWidth, setMaxWidth] = useState("lg");
  const [fullWidth, setFullWidth] = useState(true);
  const [openCartPanel, setopenCartPanel] = useState(false);
  const [openaddressPanel, setopenaddressPanel] = useState(false);
  const [addressmode, setaddressmode] = useState("add");
  const [AddressId, setAddressId] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [islogin, setislogin] = useState(false);
  const [userData, setuserData] = useState(null);
  const [catData, setCatData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [Addedlist, setAddedlist] = useState(false);
  const [listData, setListData] = useState([]);

  const Alertbox = (status, msg) => {
    if (status === "success") {
      toast.success(msg);
    }
    if (status === "error") {
      toast.error(msg);
    }
  };
  const getAllproducts = () => {
    fetchData("/api/product/products").then((res) => {
      setallProductData(res.data || []);
      console.log("Fetched All Product data:", res);
    });
  };
  useEffect(() => {
    if (islogin) {
      getAllproducts();
      getCart();
      getList();
      getuserDetails();
      fetchData("/api/category/getcategory").then((res) => {
        console.log("Fetched category data:", res);
        setCatData(res.categories || []);
      });
    }
  }, [islogin]);
  useEffect(() => {
    fetchData("/api/category/getcategory").then((res) => {
      console.log("Fetched category data:", res);
      setCatData(res.categories || []);
    });
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const toggleCartPanel = (newOpen) => () => {
    setopenCartPanel(newOpen);
  };
  const toggleaddressPanel = (newOpen) => () => {
    if (newOpen === false) {
      setaddressmode("add");
    }
    setopenaddressPanel(newOpen);
  };
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");

    if (token) {
      setislogin(true);
      getuserDetails();
      getCart();
      getList();
    } else {
      setislogin(false);
    }
    getCart();
  }, []);

  const getuserDetails = () => {
    fetchData(`/api/user/userdetails`)
      .then((res) => {
        if (res.error) {
          throw res;
        }
        setuserData(res.data);
      })
      .catch((err) => {
        const message = err?.message || err?.response?.data?.message;

        if (message === "You Are Not Logged In") {
          localStorage.removeItem("accesstoken");
          localStorage.removeItem("refreshToken");
          Alertbox("error", "Your session has expired");
          setislogin(false);
        } else {
          Alertbox("error", "An error occurred while fetching user data");
        }
      });
  };

  const handleClickOpen = () => {
    setOpenProduct(true);
  };

  const handleClose = () => {
    setOpenProduct({
      open: false,
      item: {},
    });
  };
  const handleOpen = (status, item) => {
    setOpenProduct({
      open: status,
      item,
    });
  };

  const AddtoCart = (product, userId, quantity) => {
    if (!userId) {
      Alertbox("error", "Please Login First");
      return;
    }

    console.log("product:", product);
    console.log("userId:", userId);
    console.log("quantity:", quantity);
    console.log("product.price:", product.price);

    const subTotal = Number(product.price) * Number(quantity);
    // const countInStock = product.countInStock - Number(quantity);
    console.log("subTotal:", subTotal);
    const Data = {
      ProductTitle: product.name,
      image: product?.images?.[0]?.url,
      productId: product._id,
      quantity: Number(quantity),
      price: Number(product.price),
      subTotal: subTotal,
      countInStock: product.countInStock,
      rating: product.rating,
      userId: userId,
      cartData,
      size: product.size,
      weight: product.productweight,
      ram: product.productRam,
    };

    console.log("Final data:", Data); // ✅ Check this before sending

    postData("/api/cart/add", Data).then((res) => {
      if (res.error) {
        Alertbox("error", res.message);
      } else {
        Alertbox("success", res.message);
        getCart();
      }
    });
  };
  const getCart = () => {
    fetchData(`/api/cart/getCart`).then((res) => {
      if (res.error) {
        Alertbox("error", res.message);
      } else {
        setCartData(res.data);
      }
    });
  };

  const handleWishlist = (item) => {
    if (!userData) {
      Alertbox("error", "Please Login First");
      return;
    }

    // Check if already in wishlist by searching listData
    const existingItem = listData.find(
      (wishlistItem) => wishlistItem.productId === item._id
    );

    if (existingItem) {
      deleteData(`/api/mylist/delete/${existingItem._id}`).then((res) => {
        if (res.error) {
          Alertbox("error", res.message);
        } else {
          Alertbox("success", "Product removed from wishlist");
          getList(); // Refresh list
        }
      });
    } else {
      // Item is not in wishlist — add it
      const Data = {
        productId: item._id,
        userId: userData._id,
        image: item?.images?.[0]?.url,
        productTitle: item.name,
        price: item.price,
        rating: item.rating,
        oldprice: item.oldprice,
        brand: item.brand,
        discount: item.discount,
      };

      postData("/api/mylist/add", Data).then((res) => {
        if (res.error) {
          Alertbox("error", res.message);
        } else {
          Alertbox("success", "Product added to wishlist");
          getList(); // Refresh list
        }
      });
    }
  };
  const isInWishlist = (productId) => {
    return listData.some((item) => item.productId === productId);
  };
  const getList = () => {
    fetchData(`/api/mylist/getList`).then((res) => {
      if (res.error) {
        Alertbox("error", res.message);
      } else {
        setListData(res.data);

        console.log(res.data); // Use this instead of listData
      }
    });
  };

  useEffect(() => {
    if (userData) {
      getList();
    }
  }, [userData]);

  const values = {
    setOpenProduct,
    setopenCartPanel,
    openCartPanel,
    openaddressPanel,
    setopenaddressPanel,
    toggleaddressPanel,
    toggleCartPanel,
    handleOpen,
    handleClose,
    getuserDetails,
    addressmode,
    setaddressmode,
    AddressId,
    setAddressId,
    Alertbox,
    islogin,
    AddtoCart,
    setislogin,
    setuserData,
    userData,
    catData,
    setCatData,
    cartData,
    setCartData,
    getCart,
    handleWishlist,
    listData,
    setAddedlist,
    isInWishlist,
    Addedlist,
    setListData,
    getList,
    searchData,
    setSearchData,
    windowWidth,
    setWindowWidth,
  };
  return (
    <>
      <BrowserRouter>
        <myContext.Provider value={values}>
          <Header />
          <Routes>
            <Route path="/" exact={true} element={<Home />} />
            <Route path="/products" exact={true} element={<Productlisting />} />
            <Route
              path="/productdetails/:id"
              exact={true}
              element={<ProductDetails />}
            />
            <Route path="/Login" exact={true} element={<Login />} />
            <Route path="/Register" exact={true} element={<Register />} />
            <Route path="/Cart" exact={true} element={<Cart />} />
            <Route path="/verify" exact={true} element={<Emailverify />} />
            <Route
              path="/Resetpassword"
              exact={true}
              element={<Forgetpass />}
            />
            <Route path="/checkout" exact={true} element={<Checkout />} />
            <Route path="/myaccount" exact={true} element={<Myaccount />} />
            <Route path="/mylist" exact={true} element={<MyList />} />
            <Route path="/myorders" exact={true} element={<Orders />} />
            <Route
              path="/orders/success"
              exact={true}
              element={<Successorder />}
            />
            <Route
              path="/orders/failed"
              exact={true}
              element={<Failedorder />}
            />

            <Route path="/address" exact={true} element={<Address />} />
            <Route path="/search" exact={true} element={<SearchPage />} />
            <Route path="/helpcenter" exact={true} element={<HelpCenter />} />
            <Route path="/contactus" exact={true} element={<ContactUs />} />
            <Route path="/Aboutus" exact={true} element={<AboutUs />} />
            <Route
              path="/securepayment"
              exact={true}
              element={<SecurePayments />}
            />
            <Route path="/legalnotice" exact={true} element={<LegalNotice />} />
            <Route
              path="/terms"
              exact={true}
              element={<TermsAndConditions />}
            />
            <Route path="/delivery" exact={true} element={<DeliveryInfo />} />
            <Route
              path="/blog/:id"
              exact={true}
              element={<BlogDetailsPage />}
            />
          </Routes>
          <Footer />

          <Dialog
            open={openProduct.open}
            onClose={handleClose}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="productdetailsmodal"
          >
            <DialogContent>
              <div className="flex items-center w-full productdetailsmodal container relative">
                <Button
                  onClick={handleClose}
                  className="!w-[40px] !h-[40px] !min-w-[40px] !text-[25px] !rounded-full !text-black !absolute top-[15px] right-[0px]"
                >
                  {" "}
                  <RiCloseLine />
                </Button>
                {openProduct.item?.length !== 0 && (
                  <>
                    {" "}
                    <div className="col-1 w-[40%]">
                      <Productzoom images={openProduct.item?.images} />
                    </div>
                    <div className="col-2 w-[60%] py-2 px-6 pr-1">
                      <ProductModal item={openProduct.item} />
                    </div>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </myContext.Provider>
      </BrowserRouter>

      <Toaster />
    </>
  );
}

export default App;
//export { myContext };
