import { LiaShippingFastSolid } from "react-icons/lia";
import { LiaGiftsSolid } from "react-icons/lia";
import { BiSupport } from "react-icons/bi";
import { RiSecurePaymentLine } from "react-icons/ri";
import { PiClockCountdown } from "react-icons/pi";
import { Link } from "react-router-dom";
import { IoChatbubblesOutline } from "react-icons/io5";
import { Button } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { useContext } from "react";
import { myContext } from "../../App";
import Drawer from "@mui/material/Drawer";
import CartPanel from "../CartPanel";
import { MdClose } from "react-icons/md";
import AddressPanel from "../../Pages/Myaccount/addressPanel";

export default function Footer() {
  const context = useContext(myContext);

  return (
    <>
      <footer>
        <div className="py-6 bg-white ">
          <div className="container ">
            <div className="flex items-center  justify-center gap-2 py-8 pb-8">
              <div className="col flex items-center justify-center flex-col group w-[15%] ">
                <LiaShippingFastSolid className="text-[60px] group-hover:text-primary group-hover:-translate-y-1" />
                <h3 className="text-[16px] font-[600] mt-3 ">Free Shipping</h3>
                <p className="text-[12px] font-[400] ">
                  {" "}
                  Delivery All Over Lebanon
                </p>
              </div>
              <div className="col flex items-center justify-center flex-col group   w-[15%]">
                <PiClockCountdown className="text-[60px] group-hover:text-primary group-hover:-translate-y-1" />
                <h3 className="text-[16px] font-[600] mt-3 ">
                  30 Days Returns
                </h3>
                <p className="text-[12px] font-[400] ">
                  {" "}
                  For Exchanged Products
                </p>
              </div>
              <div className="col flex items-center justify-center flex-col group   w-[15%]">
                <RiSecurePaymentLine className="text-[60px] group-hover:text-primary group-hover:-translate-y-1" />
                <h3 className="text-[16px] font-[600] mt-3 ">
                  Secured Payments
                </h3>
                <p className="text-[12px] font-[400] ">
                  {" "}
                  Payment Cards Accepted
                </p>
              </div>
              <div className="col flex items-center justify-center flex-col group  w-[15%] ">
                <LiaGiftsSolid className="text-[60px] group-hover:text-primary group-hover:-translate-y-1" />
                <h3 className="text-[16px] font-[600] mt-3 ">Special Gifts</h3>
                <p className="text-[12px] font-[400] ">
                  {" "}
                  For Our First Product Order
                </p>
              </div>
              <div className="col flex items-center justify-center flex-col group  w-[15%] ">
                <BiSupport className="text-[60px] group-hover:text-primary group-hover:-translate-y-1" />
                <h3 className="text-[16px] font-[600] mt-3 ">
                  24hr Online Support
                </h3>
                <p className="text-[12px] font-[400] ">
                  {" "}
                  Feel Free For Contacting Us Anytime
                </p>
              </div>
            </div>
          </div>
          <hr />

          <div className="footer flex  py-8 ">
            <div className="part1 w-[25%] p-5 border-r border-[rgba(0,0,0,0.1)]">
              <h2 className="text-[18px] font-[600] mb-4">Contact Us</h2>
              <p className="text-[16px] font-[400] pb-4">
                {" "}
                Saida - South-Governate-
                <br /> BillyEcommerceStore -Lebanon
              </p>
              <Link className="link " to="mailto:bilalkotaish2000@gmail.com">
                {" "}
                bilalkotaish2000@gmail.com
              </Link>
              <span className="text-[18px] font-[400] block w-full mt-3">
                Phone:0096178994740
              </span>

              <div className="flex items-center gap-2">
                <IoChatbubblesOutline className="text-[40px] text-primary mb-5" />
                <p className="text-[20px] font-[500] pl-5 mt-5 ">
                  Online Chat <br />
                  Get Expert Help
                </p>
              </div>
            </div>

            <div className="part2 w-[40%]  pl-10 flex mt-5 ">
              <div className="part2_col1 w-[50%]">
                <h2 className="text-[18px] font-[600] mb-4">Products</h2>
                <ul className="list">
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      {" "}
                      Prices Drop
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      {" "}
                      New Products
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      {" "}
                      Best Sales
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      {" "}
                      Contact us
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      {" "}
                      Site Map
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/" className="link">
                      {" "}
                      Our Stores
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="part2-col-2 w-[50%]">
                <h2 className="text-[18px] font-[600] mb-4">Our Company</h2>
                <ul className="list">
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/delivery" className="link">
                      {" "}
                      Delivery
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/legalnotice" className="link">
                      {" "}
                      legal Notice
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/terms" className="link">
                      {" "}
                      Terms & Conditions of use
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/contactus" className="link">
                      {" "}
                      Contact us
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/aboutus" className="link">
                      {" "}
                      About Us
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/securepayment" className="link">
                      {" "}
                      Secure Payments
                    </Link>
                  </li>
                  <li className="list-none text-[14px] w-full mb-2">
                    <Link to="/login" className="link">
                      {" "}
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="part3 w-[35%] mt-5 !pr-8 !pl-8 flex flex-col">
              <h2 className="text-[18px] font-[600] mb-4">
                Join Our WhatsApp Group
              </h2>
              <p className="text-[12px]">
                Be the first to know about our latest offers, products,
                <br /> and updates. Join our WhatsApp community!
              </p>

              <div className="mt-5">
                <Button
                  className="btn-org"
                  onClick={() =>
                    window.open(
                      "https://chat.whatsapp.com/your-invite-link",
                      "_blank"
                    )
                  }
                >
                  Join WhatsApp Group
                </Button>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="bottomstrip border-t bg-white py-3 border-[rgba(0,0,0,0.1)]">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Social Media Icons */}
          <ul className="flex items-center gap-2">
            <li>
              <a
                href="https://instagram.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[35px] h-[35px] border border-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-pink-500 group rounded-full"
              >
                <FaInstagram className="text-[15px] group-hover:text-white" />
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[35px] h-[35px] border border-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-blue-500 group rounded-full"
              >
                <FaFacebookF className="text-[15px] group-hover:text-white" />
              </a>
            </li>

            <li>
              <a
                href="https://twitter.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[35px] h-[35px] border border-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-blue-500 group rounded-full"
              >
                <RiTwitterXFill className="text-[15px] group-hover:text-white" />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[35px] h-[35px] border border-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-black group rounded-full"
              >
                <FaGithub className="text-[15px] group-hover:text-white" />
              </a>
            </li>
            <li>
              <a
                href="https://chat.whatsapp.com/your-group-invite"
                target="_blank"
                rel="noopener noreferrer"
                className="w-[35px] h-[35px] border border-[rgba(0,0,0,0.1)] flex items-center justify-center hover:bg-green-500 group rounded-full"
              >
                <FaWhatsapp className="text-[15px] group-hover:text-white" />
              </a>
            </li>
          </ul>

          {/* Copyright */}
          <p className="text-gray-600 text-[12px] text-center">
            &copy; 2025 BillyEcommerceStore. All rights reserved.
          </p>

          {/* Payment Logos */}
          <div className="flex items-center">
            <img src="src\assets\carte_bleue.png" alt="" />
            <img src="src\assets\master_card.png" alt="" />
            <img src="src\assets\paypal.png" alt="" />
            <img src="src\assets\visa.png" alt="" />
          </div>
        </div>
      </div>

      {/* {cart panel} */}
      <Drawer
        open={context.openCartPanel}
        onClose={context.toggleCartPanel(false)}
        anchor="right"
        className=" cartpanel"
      >
        <div className="flex items-center  justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)]">
          <h4 className="text-[16px] font-[600] items-center">
            Your Shopping Cart ({context.cartData?.length})
          </h4>
          <MdClose
            className="text-[20px] cursor-pointer"
            onClick={context.toggleCartPanel(false)}
          />
        </div>

        {context.cartData?.length > 0 ? (
          <div className="scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden py-3 px-4">
            <CartPanel data={context.cartData} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-5">
            <img src="src\assets\emptycart.png" alt="" />
            <h4 className="text-[14px]">Your Cart is Empty</h4>
            <Button
              onClick={context.toggleCartPanel(false)}
              className="mt-4 !bg-blue-400 !text-white hover:!bg-blue-600"
            >
              Continue Shopping
            </Button>{" "}
          </div>
        )}
        {/* <data={context.cartData} /> */}
      </Drawer>

      {/* {Address panel} */}
      <Drawer
        open={context.openaddressPanel}
        onClose={context.toggleaddressPanel(false)}
        anchor="right"
        className="addresspanel"
      >
        <div className="flex items-center  justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)]">
          <h4 className="text-[16px] font-[600] items-center">
            {context.addressmode === "add" ? "Add" : "Update"} Your Shipping
            Address
          </h4>
          <MdClose
            className="text-[20px] cursor-pointer"
            onClick={context.toggleaddressPanel(false)}
          />
        </div>

        <AddressPanel />
      </Drawer>
    </>
  );
}
