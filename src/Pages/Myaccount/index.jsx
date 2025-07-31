import { MdCloudUpload } from "react-icons/md";
import Button from "@mui/material/Button";
import { FaRegUser } from "react-icons/fa";
import { BsBagCheck } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import { RiLogoutBoxLine } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import { Collapse } from "react-collapse";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Accountsidebar from "../../Component/AccountSidebar";
import CircularProgress from "@mui/material/CircularProgress";

import { useContext, useEffect, useState } from "react";
import { myContext } from "../../App";
import { editData } from "../../utils/api";
import { postData } from "../../utils/api";
export default function Myaccount() {
  const [isLoading, setisLoading] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [isclick, setisclick] = useState(false);
  const [phone, setPhone] = useState("");
  const [userId, setuserId] = useState("");
  const [formfield, setformfield] = useState({
    name: "",
    email: "",
    Mobile: "",
  });
  const [changePassword, setchangePassword] = useState({
    email: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });

  const context = useContext(myContext);
  const history = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token === null) {
      history("/");
    }
  }, [context?.islogin]);
  const validValue = Object.values(formfield).every((el) => el);
  const validValue2 = Object.values(changePassword).every((el) => el);

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setuserId(context?.userData?._id);
      setformfield({
        name: context?.userData?.name,
        email: context?.userData?.email,
        Mobile: context?.userData?.Mobile,
      });
      const ph = `"${context?.userData?.Mobile}"`;
      setPhone(ph);
      setchangePassword({
        email: context?.userData?.email,
      });
    }
  }, [context?.userData]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setformfield(() => {
      return {
        ...formfield,
        [name]: value,
      };
    });

    setchangePassword(() => {
      return {
        ...changePassword,
        [name]: value,
      };
    });
  };
  const handlesubmit = (e) => {
    setisLoading(true);
    e.preventDefault();

    if (formfield.email === "") {
      context.Alertbox("error", "Please Provide Your Email");
      return false;
    }
    if (formfield.name === "") {
      context.Alertbox("error", "Please Provide Your Password");
      return false;
    }
    if (formfield.Mobile === "") {
      context.Alertbox("error", "Please Provide Your Mobile Number");
      return false;
    }

    editData(`/api/user/${userId}`, formfield, { withCredentials: true }).then(
      (res) => {
        if (res.error !== true) {
          setisLoading(false);
          context.Alertbox("success", res.message);
          console.log(res);
        } else {
          context.Alertbox("error", res.message);
          setisLoading(false);
        }
      }
    );
  };

  const handlesubmitChange = (e) => {
    setisLoading(true);
    e.preventDefault();

    if (changePassword.oldPassword === "") {
      context.Alertbox("error", "Please Provide Your Old Password");
      return false;
    }
    if (changePassword.password === "") {
      context.Alertbox("error", "Please Provide Your New Password");
      return false;
    }
    if (changePassword.confirmPassword === "") {
      context.Alertbox("error", "Please Confirm Your Password");
      return false;
    }
    if (changePassword.confirmPassword !== changePassword.password) {
      context.Alertbox("error", "Password Does Not Match");
      return false;
    }

    postData(`/api/user/reset-password`, changePassword, {
      withCredentials: true,
    }).then((res) => {
      console.log("Response:", res);
      if (res.error !== true) {
        setisLoading(false);
        context.Alertbox("success", res.message);
        console.log(res);
      } else {
        context.Alertbox("error", res.message);
        setisLoading(false);
      }
    });
  };

  return (
    <>

      <section className=" w-full py-10 ">
        <div className="container flex flex-col lg:flex-row gap-5">
          <div className=" w-full lg:w-[20%]">
            <Accountsidebar />
          </div>

          <div className="w-full md:w-[70%] lg:w-[50%]">
      <div className="bg-white shadow-md rounded-md p-5 mb-5">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <h2 className="pb-2 text-xl font-semibold">My Profile</h2>
          <Button className="!mt-2 md:!mt-0" onClick={() => setisclick(!isclick)}>
            Change Password
          </Button>
        </div>
        <hr className="my-3" />

        <form className="space-y-4" onSubmit={handlesubmit}>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="w-full md:w-1/2">
              <TextField
                label="Full Name"
                variant="outlined"
                disabled={isLoading}
                value={formfield.name}
                size="small"
                className="w-full"
                name="name"
                onChange={onChangeInput}
              />
            </div>
            <div className="w-full md:w-1/2">
              <TextField
                type="email"
                label="Email"
                disabled
                variant="outlined"
                size="small"
                className="w-full"
                value={formfield.email}
                name="email"
              />
            </div>
          </div>

          <div className="w-full">
            <PhoneInput
              type="text"
              disabled={isLoading}
              defaultCountry="lb"
              className="!w-full !h-[56px]"
              value={phone}
              name="Mobile"
              inputStyle={{ width: "100%" }}
              containerStyle={{
                width: "100%",
                borderRadius: "6px",
              }}
              onChange={(phone) => {
                setPhone(phone);
                setformfield((prev) => ({ ...prev, Mobile: phone }));
              }}
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              disabled={!validValue}
              className="btn-org w-full sm:w-[140px]"
            >
              Save
              {isLoading && <CircularProgress size={18} className="ml-2" />}
            </Button>
          </div>
        </form>
      </div>

      {/* Change Password Form */}
      <Collapse isOpened={isclick}>
        <div className="bg-white shadow-md rounded-md p-5 mt-5">
          <h2 className="pb-3 text-lg font-semibold">Change Password</h2>

          <form className="space-y-4" onSubmit={handlesubmitChange}>
            <div className="flex flex-col md:flex-row gap-5">
              {context.userData?.SignUpGoogle === false && (
                <div className="w-full md:w-1/2">
                  <TextField
                    label="Old Password"
                    type="password"
                    variant="outlined"
                    disabled={isLoading2}
                    value={changePassword.oldPassword}
                    size="small"
                    className="w-full"
                    name="oldPassword"
                    onChange={onChangeInput}
                  />
                </div>
              )}
              <div className="w-full md:w-1/2">
                <TextField
                  label="New Password"
                  type="password"
                  variant="outlined"
                  disabled={isLoading2}
                  value={changePassword.password}
                  size="small"
                  className="w-full"
                  name="password"
                  onChange={onChangeInput}
                />
              </div>
            </div>

            <div className="w-full">
              <TextField
                label="Confirm Password"
                type="password"
                variant="outlined"
                disabled={isLoading2}
                value={changePassword.confirmPassword}
                size="small"
                name="confirmPassword"
                className="w-full"
                onChange={onChangeInput}
              />
            </div>

            <div className="pt-2">
              <Button type="submit" className="btn-org w-full sm:w-[200px]">
                Change Password
                {isLoading2 && <CircularProgress size={18} className="ml-2" />}
              </Button>
            </div>
          </form>
        </div>
      </Collapse>
    </div>
        </div>
      </section>
    </>
  );
}
