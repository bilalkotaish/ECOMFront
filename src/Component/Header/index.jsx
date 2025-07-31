import { Link, useNavigate } from "react-router-dom";
import logo from "./../../assets/logo.png";
import Search from "../Search";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart } from "react-icons/md";
import { LuGitCompareArrows } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa";
import { Tooltip } from "@mui/material";
import Navigation from "./Navigation";
import { useContext, useEffect } from "react";
import { myContext } from "../../App";
import { FaRegUser } from "react-icons/fa";
import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { BsBagCheck } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useState } from "react";
import { fetchData, postData } from "../../utils/api";
import { IoMenu } from "react-icons/io5";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Header() {
  const context = useContext(myContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userData, setuserData] = useState(null);
  const [isOpenCatPanel, setisOpenCatPanel] = useState(false);

  const history = useNavigate();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openCategoryPanel = () => {
    setisOpenCatPanel(true);
  };

  const logout = () => {
    setAnchorEl(null);
    fetchData(`/api/user/Logout?token=${localStorage.getItem("accesstoken")}`, {
      withCredentials: true,
    }).then((res) => {
      console.log(res);
      if (res.error === false) {
        context.setislogin(false);
        localStorage.removeItem("accesstoken");
        localStorage.removeItem("refreshtoken");
        context.setCatData([]);
        context.setCartData([]);
        context.setListData([]);
        history("/");
      } else {
        context.setislogin(true);
      }
    });
  };
  return (
    <div>
      <header className="bg-white sticky top-0 z-50">
        <div className="top-strip py-2 border-t-[1px] border-gray-250 border-b-[1px]">
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="col-1 w-[50] hidden lg:block">
                <p className="text-[12px] font-[500]">
                  {" "}
                  Get the items 50% off with free delivery on the first order
                </p>
              </div>
              <div className="flex item-center justify-between w-full lg:w-[50%] lg:justify-end">
                <ul className=" flex item-center gap-3 w-full justify-between lg:w-[200px]">
                  <li className="list-none ">
                    <Link
                      to="helpcenter"
                      className="text-[12px] link transition font-[500]"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li className="list-none">
                    <Link
                      to="/myorders"
                      className="text-[12px] link transition font-[500]"
                    >
                      Order Tracking
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="header  py-1 lg:py-3 border-gray-250 border-b-[1px]">
          <div className="container flex items-center justify-between grid-cols-2 place-items-center">
            {
              context.windowWidth<992 &&
              <Button onClick={()=>openCategoryPanel(true)}
              className="!w-[35px] !min-w-[35px] h-[35px] !rounded-full !text-gray-600">
               <IoMenu size={20}/>
               </Button>

            }
            <div className="col1 w-[40%] ml-16 lg:ml-0  lg:w-[25%]">
              <Link to={"/"}>
                <img src={logo} className="w-[140px] h-auto"></img>
              </Link>
            </div>
            <div className={`col2 lg:w-[40%] pt-2 fixed top-0 left-0 w-full h-full lg:static p-2 lg:p-1 
               lg:block ${context.OpenSearch===true?'block':'hidden'} `}>
              <Search />
            </div>

            <div className="col3 w-[35%] flex items-center pl-7">
              <ul className="flex items-center lg:gap-3 gap-0 w-full justify-end">
                {context.islogin === false ? (
                  <li className="list-none">
                    <Link
                      to="/Login"
                      className="transition-text-[14px] link font-[500]"
                    >
                      login
                    </Link>{" "}
                    /
                    <Link
                      to="/register"
                      className="transition-text-[14px] link  font-[500]"
                    >
                      register
                    </Link>
                  </li>
                ) : (
                  <>
                                      {context?.windowWidth > 992 &&

                    <Button
                      className="myaccountwrapper flex items-center !rounded-full gap-3"
                      onClick={handleClick}
                    >
                      <div className="!w-[40px] !h-[40px] !text-[20px] !text-gray-600 !rounded-full flex items-center justify-center">
                        <FaRegUser />
                      </div>
                      {context?.windowWidth > 992 &&
                      <div className="info flex flex-col">
                        <h4 className="text-[15px] leading-3 mb-0 !text-[rgba(0,0,0,0.7)] font-[500] capitalize text-left justify-start">
                          {context.userData?.name}
                        </h4>
                        <span className="text-[15px] mb-0 !text-[rgba(0,0,0,0.7)] font-[500] lowercase text-left justify-start">
                          {context?.userData?.email}
                        </span>
                      </div>}
                    </Button>

                      }
                    <Menu
                      anchorEl={anchorEl}
                      id="account-menu"
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      slotProps={{
                        paper: {
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&::before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: "left", vertical: "top" }}
                      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                    >
                      <Link to="/myaccount" className="w-full block">
                        <MenuItem
                          onClick={handleClose}
                          className="flex gap-2 !py-2"
                        >
                          <FaRegUser className="text-[14px]" />{" "}
                          <span className="text-[14px]">My account</span>
                        </MenuItem>
                      </Link>

                      <Link to="/myorders" className="w-full block">
                        <MenuItem
                          onClick={handleClose}
                          className="flex gap-2 !py-2"
                        >
                          <BsBagCheck className="text-[14px]" />{" "}
                          <span className="text-[14px]">Orders</span>
                        </MenuItem>
                      </Link>

                      <Link to="/myList" className="w-full block">
                        <MenuItem
                          onClick={handleClose}
                          className="flex gap-2 !py-2"
                        >
                          <GoChecklist className="text-[14px]" />{" "}
                          <span className="text-[14px]">My List </span>
                        </MenuItem>
                      </Link>

                      <MenuItem onClick={logout} className="flex gap-2 !py-2">
                        <RiLogoutBoxLine className="text-[14px]" />{" "}
                        <span className="text-[14px]"> Logout</span>
                      </MenuItem>
                    </Menu>
                
                  </>
                )}

                <li>
                  <Tooltip title="cart">
                    <IconButton
                      aria-label="cart"
                      onClick={() => {
                        context.setopenCartPanel(true);
                      }}
                    >
                      <StyledBadge
                        badgeContent={context?.cartData?.length}
                        color="secondary"
                      >
                        <MdOutlineShoppingCart />
                      </StyledBadge>
                    </IconButton>
                  </Tooltip>
                </li>
                {context?.windowWidth > 992 &&
                
                <li>
                  <Link to="/myList" className="w-full block">
                    <Tooltip title="wishlist">
                      <IconButton aria-label="cart">
                        <StyledBadge
                          badgeContent={context?.listData?.length}
                          color="secondary"
                        >
                          <FaRegHeart />
                        </StyledBadge>
                      </IconButton>
                    </Tooltip>
                  </Link>
                </li>}
              </ul>
            </div>
          </div>
        </div>
        <Navigation isOpenCatPanel={isOpenCatPanel} setisOpenCatPanel={setisOpenCatPanel}/>
      </header>
    </div>
  );
}
