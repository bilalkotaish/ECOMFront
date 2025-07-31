import { NavLink, useNavigate } from "react-router";
import Button from "@mui/material/Button";
import { MdCloudUpload } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { BsBagCheck } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useContext, useEffect, useState } from "react";
import { myContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchData, uploadImage } from "../../utils/api";
import { LiaMapMarkedSolid } from "react-icons/lia";

export default function Accountsidebar() {
  const [preview, setpreview] = useState([]);
  const [upload, setupload] = useState(false);
  const context = useContext(myContext);

  useEffect(() => {
    const userAvatar = [];
    if (
      context?.userData?.Avatar !== "" &&
      context?.userData?.Avatar !== undefined
    ) {
      userAvatar.push(context?.userData?.Avatar);
      setpreview(userAvatar);
    }
  }, [context?.userData]);

  const onchangefile = async (e, apiEndPoint) => {
    try {
      setpreview([]);
      const files = e.target.files;
      setupload(true);
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        if (
          files[i] &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            files[i].type
          )
        ) {
          formData.append("Avatar", files[i]);

          const res = await uploadImage("/api/user/user-avatar", formData);

          console.log("Response data:", res);

          if (res?.Avatar) {
            setupload(false);
            setpreview([res.Avatar]); // ✅ Set as array
            context.Alertbox("success", "Image Uploaded Successfully");
          }
        } else {
          context.Alertbox("error", "Please select only image file");
          setupload(false);
          return;
        }
      }
    } catch (error) {
      console.log(error);
      setupload(false);
    }
  };
  const navigate = useNavigate();

const logout = () => {
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
      navigate("/");
    } else {
      context.setislogin(true);
    }
  });
};

  return (
    <div className="card bg-white shadow-md rounded-md ">
      <div className="w-full p-3 p-5 flex items-center justify-center flex-col">
        <div className="w-[100px] h-[100px] rounded-full overflow-hidden flex items-center justify-center mb-4 relative group">
          {upload ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              {preview.length > 0 ? (
                preview.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ))
              ) : (
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSktcnWbHej5LP9gi_MAZXL1HvYlEpb9MLLsA&s" // Replace with your default image path
                  className="w-full h-full object-cover"
                />
              )}
            </>
          )}

          <div
            className="overlay w-full h-full absolute top-0 left-0 z-50 bg-[rgba(0,0,0,0.6)] flex
                          items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100"
          >
            <MdCloudUpload className="text-white text-[25px]" />
            <input
              type="file"
              className="top-0 left-0 absolute w-full h-full opacity-0"
              accept="image/*"
              onChange={(e) => {
                onchangefile(e, "/api/user/user-avatar");
              }}
              name="Avatar"
            />
          </div>
        </div>

        <h3> {context?.userData?.name}</h3>
        <h6 className="text-[14px] font-[500]"> {context?.userData?.email}</h6>
      </div>

      <ul className="list-none pb-4 myaccounttabs">
        <li className="w-full">
          <NavLink to="/myaccount" activeClassName="isActive">
            <Button className="w-full !rounded-none flex !py-2 !text-left !px-5 !justify-start  items-center pt-1 !capitalize !text-[rgba(0,0,0,0.7)] gap-2">
              <FaRegUser className="text-[15px]" /> My Profile
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/address" activeClassName="isActive">
            <Button className="w-full !rounded-none flex !py-2 !text-left !px-5 !justify-start  items-center pt-1 !capitalize !text-[rgba(0,0,0,0.7)] gap-2">
              <LiaMapMarkedSolid className="text-[18px]" /> My Address
            </Button>
          </NavLink>
        </li>

        <li className="w-full">
          <NavLink to="/mylist" exact={true} activeClassName="isActive">
            <Button className="w-full !rounded-none flex !text-left !py-2 !px-5 !justify-start  items-center pt-1 !capitalize !text-[rgba(0,0,0,0.7)] gap-2">
              <GoChecklist className="text-[18px]" /> My List
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink to="/myorders" exact={true} activeClassName="isActive">
            <Button className="w-full !rounded-none flex !text-left !px-5  !py-2 !justify-start  items-center pt-1 !capitalize !text-[rgba(0,0,0,0.7)] gap-2">
              <BsBagCheck className="text-[18px]" /> My Orders
            </Button>
          </NavLink>
        </li>
        <li className="w-full">
          <NavLink onClick={logout}  exact={true} activeClassName="isActive">
            <Button onClick={logout} className="w-full !rounded-none flex !text-left !px-5 !justify-start !py-2 items-center pt-1 !capitalize !text-[rgba(0,0,0,0.7)] gap-2">
              <RiLogoutBoxLine className="text-[18px]" /> Logout
            </Button>
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
