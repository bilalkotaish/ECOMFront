import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoIosSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router";


import Button from "@mui/material/Button";

export default function Mobilenav(){
    return(
    
        <div className="mobileNav bg-white px-3 p-1 w-full grid grid-cols-5 !fixed !-bottom-1 !left-0 !z-50 shadow-md place-items-center">
        <NavLink to="/" exact={true} activeClassName="isActive">
        <Button className="flex flex-col items-center justify-center !w-[40px] !min-w-[40px] !capitalize gap-1 text-sm !text-gray-700">
          <IoHomeOutline className="text-xl" />
          <span className="text-[13px]">Home</span>
        </Button>        </NavLink>

        <Button className="flex flex-col items-center justify-center !w-[40px] !min-w-[40px] !capitalize gap-1 text-sm !text-gray-700">
          <IoIosSearch className="text-xl" />
          <span className="text-[13px]">Search</span>
        </Button>
        <NavLink to="/mylist" exact={true} activeClassName="isActive">

        <Button className="flex flex-col items-center justify-center !w-[40px] !min-w-[40px] !capitalize gap-1 text-sm !text-gray-700">
          <FaRegHeart className="text-xl" />
          <span className="text-[13px]">Wishlist</span>
        </Button>
        </NavLink>
        <NavLink to="/myorders" exact={true} activeClassName="isActive">

        <Button className="flex flex-col items-center justify-center !w-[40px] !min-w-[40px] !capitalize gap-1 text-sm !text-gray-700">
          <LiaShoppingBagSolid className="text-xl" />
          <span className="text-[13px]">Orders</span>
        </Button></NavLink>

        <NavLink to="/myaccount" exact={true} activeClassName="isActive">
        <Button className="flex flex-col items-center justify-center !w-[40px] !min-w-[40px] !capitalize gap-1 text-sm !text-gray-700">
          <FaRegUser className="text-xl" />
          <span className="text-[13px]">Account</span>
        </Button>
        </NavLink>
      </div>
      
    )
}
