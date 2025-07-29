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
      <section className="py-10">
        <div className="container flex gap-5">
          <div className="col1 w-[20%]">
            <Accountsidebar />
          </div>

          <div className="col-2 w-[50%]">
            <div className="card bg-white shadow-md rounded-md p-5 mb-5">
              <div className="flex items-center">
                <h2 className="pb-3 font-[500] justify-between"> My Profile</h2>
                <Button
                  className="!ml-auto"
                  onClick={() => {
                    setisclick(!isclick);
                  }}
                >
                  Change Password
                </Button>
              </div>
              <hr />
              <form className="mt-8 " onSubmit={handlesubmit}>
                <div className="flex items-center  gap-5 ">
                  <div className="w-[50%]">
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
                  <div className="w-[50%] h-auto">
                    <TextField
                      id="EmailId*"
                      type="email"
                      value={formfield.email}
                      disabled={true}
                      label="Email"
                      variant="outlined"
                      size="small"
                      className="w-full "
                      autoComplete="email"
                      name="email"
                      onChange={onChangeInput}
                    />
                  </div>
                </div>
                <div className="flex items-center mt-3 gap-5 ">
                  <div className="w-[49%]">
                    <PhoneInput
                      type="text"
                      disabled={isLoading}
                      defaultCountry="lb"
                      className="!w-full !h-[56px]"
                      value={phone}
                      name="Mobile"
                      inputStyle={{
                        width: "100%",

                        border: "!3px !solid !rgba(0,0,0,0.7)",
                      }}
                      containerStyle={{
                        width: "100%",

                        border: "!3px !solid !rgba(0,0,0,0.7)",
                        borderRadius: "6px",
                      }}
                      onChange={(phone) => {
                        setPhone(phone);
                        setformfield((prev) => ({ ...prev, Mobile: phone }));
                      }}
                    />
                  </div>
                </div>

                <br />

                <div className="flex items-center gap-5">
                  <Button
                    type="submit"
                    disabled={!validValue}
                    className="btn-org w-[100px]"
                  >
                    {" "}
                    Save
                    {isLoading === true ? (
                      <CircularProgress color="inherit" />
                    ) : (
                      ""
                    )}
                  </Button>
                </div>
              </form>
            </div>

            <Collapse isOpened={isclick}>
              <div className="card bg-white shadow-md rounded-md p-5 mt-5">
                <div className="flex items-center">
                  <h2 className="pb-3 font-[500] justify-between">
                    {" "}
                    Change Password
                  </h2>
                </div>
                <form className="mt-8 " onSubmit={handlesubmitChange}>
                  <div className="flex items-center  gap-5 ">
                    {context.userData?.SignUpGoogle === false && (
                      <div className="col">
                        <TextField
                          label="oldPassword"
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
                    <div className="col h-auto">
                      <TextField
                        disabled={isLoading2}
                        value={changePassword.password}
                        label="password"
                        type="password"
                        variant="outlined"
                        size="small"
                        className="w-full"
                        name="password"
                        onChange={onChangeInput}
                      />
                    </div>
                  </div>
                  <div className="flex items-center mt-3 gap-5 ">
                    <div className="col">
                      <TextField
                        label="confirmPassword"
                        variant="outlined"
                        type="password"
                        disabled={isLoading2}
                        value={changePassword.confirmPassword}
                        size="small"
                        name="confirmPassword"
                        className="w-full"
                        onChange={onChangeInput}
                      />
                    </div>
                  </div>

                  <br />

                  <div className="flex items-center gap-5">
                    <Button type="submit" className="btn-org w-[200px] h-auto">
                      {" "}
                      Change Password
                      {isLoading === true ? (
                        <CircularProgress color="inherit" />
                      ) : (
                        ""
                      )}
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
