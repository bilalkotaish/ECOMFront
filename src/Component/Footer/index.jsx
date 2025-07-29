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
  <div className="py-6 bg-white">
    <div className="container">
      <div className="grid grid-cols-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 py-8">
        <div className="flex flex-col items-center text-center group">
          <LiaShippingFastSolid className="text-[40px] sm:text-[50px] group-hover:text-primary group-hover:-translate-y-1 transition-transform" />
          <h3 className="text-[16px] font-semibold mt-3">Free Shipping</h3>
          <p className="text-[12px]">Delivery All Over Lebanon</p>
        </div>
        <div className="flex flex-col items-center text-center group">
          <PiClockCountdown className="text-[40px] sm:text-[50px] group-hover:text-primary group-hover:-translate-y-1 transition-transform" />
          <h3 className="text-[16px] font-semibold mt-3">30 Days Returns</h3>
          <p className="text-[12px]">For Exchanged Products</p>
        </div>
        <div className="flex flex-col items-center text-center group">
          <RiSecurePaymentLine className="text-[40px] sm:text-[50px] group-hover:text-primary group-hover:-translate-y-1 transition-transform" />
          <h3 className="text-[16px] font-semibold mt-3">Secured Payments</h3>
          <p className="text-[12px]">Payment Cards Accepted</p>
        </div>
        <div className="flex flex-col items-center text-center group">
          <LiaGiftsSolid className="text-[40px] sm:text-[50px] group-hover:text-primary group-hover:-translate-y-1 transition-transform" />
          <h3 className="text-[16px] font-semibold mt-3">Special Gifts</h3>
          <p className="text-[12px]">For Our First Product Order</p>
        </div>
        <div className="flex flex-col items-center text-center group">
          <BiSupport className="text-[40px] sm:text-[50px] group-hover:text-primary group-hover:-translate-y-1 transition-transform" />
          <h3 className="text-[16px] font-semibold mt-3">24hr Support</h3>
          <p className="text-[12px]">Feel Free To Contact Anytime</p>
        </div>
      </div>
    </div>
    <hr />
    <div className="container grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
      <div>
        <h2 className="text-[18px] font-bold mb-4">Contact Us</h2>
        <p className="text-[14px] mb-2">Saida - South-Governate<br />BillyEcommerceStore - Lebanon</p>
        <Link to="mailto:bilalkotaish2000@gmail.com" className="text-blue-500 block mb-2">bilalkotaish2000@gmail.com</Link>
        <span className="block mb-3">Phone: 0096178994740</span>
        <div className="flex items-center gap-2">
          <IoChatbubblesOutline className="text-[30px] text-primary" />
          <p className="text-[14px]">Online Chat<br />Get Expert Help</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-[18px] font-bold mb-4">Products</h2>
          <ul className="text-[14px] space-y-2">
            <li><Link to="/">Prices Drop</Link></li>
            <li><Link to="/">New Products</Link></li>
            <li><Link to="/">Best Sales</Link></li>
            <li><Link to="/">Contact Us</Link></li>
            <li><Link to="/">Site Map</Link></li>
            <li><Link to="/">Our Stores</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-[18px] font-bold mb-4">Our Company</h2>
          <ul className="text-[14px] space-y-2">
            <li><Link to="/delivery">Delivery</Link></li>
            <li><Link to="/legalnotice">Legal Notice</Link></li>
            <li><Link to="/terms">Terms & Conditions</Link></li>
            <li><Link to="/contactus">Contact Us</Link></li>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/securepayment">Secure Payments</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text-[18px] font-bold mb-4">Join Our WhatsApp Group</h2>
        <p className="text-[12px] mb-4">Be the first to know about our offers and updates. Join our WhatsApp community!</p>
        <Button
          className="btn-org"
          onClick={() => window.open("https://chat.whatsapp.com/your-invite-link", "_blank")}
        >
          Join WhatsApp Group
        </Button>
      </div>
    </div>
  </div>
</footer>
<div className="bg-white border-t border-[rgba(0,0,0,0.1)] py-3">
  <div className="container flex flex-col md:flex-row justify-between items-center gap-3">
    <ul className="flex gap-2">
      <li><a href="https://instagram.com/" target="_blank" className="social-icon hover:bg-pink-500"><FaInstagram /></a></li>
      <li><a href="https://facebook.com/" target="_blank" className="social-icon hover:bg-blue-500"><FaFacebookF /></a></li>
      <li><a href="https://twitter.com/" target="_blank" className="social-icon hover:bg-blue-500"><RiTwitterXFill /></a></li>
      <li><a href="https://github.com/" target="_blank" className="social-icon hover:bg-black"><FaGithub /></a></li>
      <li><a href="https://chat.whatsapp.com/" target="_blank" className="social-icon hover:bg-green-500"><FaWhatsapp /></a></li>
    </ul>
    <p className="text-gray-600 text-[12px]">&copy; 2025 BillyEcommerceStore. All rights reserved.</p>
    <div className="flex gap-2">
      <img src="/assets/carte_bleue.png" alt="Carte Bleue" className="h-6" />
      <img src="/assets/master_card.png" alt="MasterCard" className="h-6" />
      <img src="/assets/paypal.png" alt="PayPal" className="h-6" />
      <img src="/assets/visa.png" alt="Visa" className="h-6" />
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
