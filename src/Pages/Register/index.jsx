import TextField from "@mui/material/TextField";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { postData } from "../../utils/api";
import { myContext } from "../../App";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseapp } from "../../firebase";
const auth = getAuth(firebaseapp);
const Googleprovider = new GoogleAuthProvider();

export default function Register() {
  const context = useContext(myContext);
  const history = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [ShowPassword, setShowPasword] = useState(false);
  const [formFields, setfromFields] = useState({
    name: "",
    email: "",
    password: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setfromFields(() => {
      return {
        ...formFields,
        [name]: value,
      };
    });
  };
  const validValue = Object.values(formFields).every((el) => el);
  const handlesubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    if (formFields.name === "") {
      context.Alertbox("error", "Please Provide Your Name");
      return false;
    }
    if (formFields.email === "") {
      context.Alertbox("error", "Please Provide Your Email");
      return false;
    }
    if (formFields.password === "") {
      context.Alertbox("error", "Please Provide Your Password");
      return false;
    }

    postData("/api/user/register", formFields).then((res) => {
      if (res.error !== true) {
        setisLoading(false);
        context.Alertbox("success", res.message);
        localStorage.setItem("userEmail", formFields.email);
        console.log(res);
        setfromFields({
          name: "",
          email: "",
          password: "",
        });

        history("/verify");
      } else {
        context.Alertbox("error", res.message);
        setisLoading(false);
      }
    });
  };

  const authWithGoogle = () => {
    signInWithPopup(auth, Googleprovider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        console.log("Logged in user:", user);

        const field = {
          name: user.displayName,
          email: user.email,
          password: null,
          Avatar: user.photoURL,
          Mobile: user.phoneNumber,
          Role: "User",
        };

        postData("/api/user/googleauth", field).then((res) => {
          if (!res.error) {
            localStorage.setItem("userEmail", field.email);
            localStorage.setItem("accesstoken", res.data.accesstoken);
            localStorage.setItem("refreshtoken", res.data.refreshToken);
            context.setislogin(true);

            context.Alertbox("success", res.message);

            history("/");
          } else {
            context.Alertbox("error", res.message);
          }
        });
      })
      .catch((error) => {
        console.error("Google Auth Error:", error);
      });
  };

  return (
    <>
      <section className="section py-10">
        <div className="container">
          <div className="card shadow-md w-[400px] m-auto rounded-md bg-white p-5 px-12">
            <img
              src="src/assets/logo.png"
              className="w-[140px] mx-auto h-auto"
            />

            <h3 className=" !text-center text-[18px] font-[600]">
              {" "}
              Register Your Account
            </h3>
            <form className="w-full " onSubmit={handlesubmit}>
              <div className="formgroup w-full mb-5 mt-5">
                <TextField
                  id="Name"
                  type="text"
                  name="name"
                  value={formFields.name}
                  disabled={isLoading === true ? true : false}
                  label="Full Name"
                  variant="outlined"
                  className="w-full"
                  onChange={onChangeInput}
                />
              </div>

              <div className="formgroup w-full mb-5 mt-5">
                <TextField
                  id="EmailId*"
                  type="email"
                  disabled={isLoading === true ? true : false}
                  value={formFields.email}
                  name="email"
                  label="Email"
                  variant="outlined"
                  className="w-full"
                  onChange={onChangeInput}
                />
              </div>
              <div className="formgroup w-full mb-3 relative">
                <TextField
                  id="Password"
                  type={ShowPassword ? "text" : "password"}
                  name="password"
                  disabled={isLoading}
                  value={formFields.password}
                  label="Password"
                  variant="outlined"
                  className="w-full"
                  onChange={onChangeInput}
                />

                <Button
                  className="!absolute  !top-[10px] !right-[10px] !z-50 !w-[35px] !min-w-[35px] !h-[35px]
              !rounded-full !text-black"
                  onClick={() => setShowPasword(!ShowPassword)}
                >
                  {ShowPassword === true ? (
                    <IoMdEye className="text-[20px]" />
                  ) : (
                    <IoMdEyeOff />
                  )}
                </Button>
              </div>

              <div className="flex !items-center mt-3 mb-3">
                <Button
                  type="submit"
                  disabled={!validValue}
                  className="btn-org w-full gap-3"
                >
                  Sign Up
                  {isLoading === true ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    ""
                  )}
                </Button>
              </div>

              <a className="text-[13px]  text-gray-700 cursor-pointer">
                Already Registered?
                <Link
                  to="/Login"
                  className="link text-[13px]  text-gray-700 cursor-pointer"
                >
                  Login
                </Link>
              </a>

              <p className="text-[14px] mt-3 !text-center  ">
                {" "}
                Or Continue With Social Accounts
              </p>
              <Button
                className="w-full !mt-3 gap-3 !bg-[#f1f1f1] !text-black"
                onClick={authWithGoogle}
              >
                <FcGoogle /> Sign In With Google
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
