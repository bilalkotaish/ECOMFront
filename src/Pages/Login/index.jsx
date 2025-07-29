import TextField from "@mui/material/TextField";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { postData } from "../../utils/api";
import { FcGoogle } from "react-icons/fc";
import { myContext } from "../../App";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseapp } from "../../firebase";
const auth = getAuth(firebaseapp);
const Googleprovider = new GoogleAuthProvider();

export default function Login() {
  const [ShowPassword, setShowPasword] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const context = useContext(myContext);

  const [formfield, setformfield] = useState({
    email: "",
    password: "",
  });
  const history = useNavigate();
  const validValue = Object.values(formfield).every((el) => el);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setformfield(() => {
      return {
        ...formfield,
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
    if (formfield.password === "") {
      context.Alertbox("error", "Please Provide Your Password");
      return false;
    }

    postData("/api/user/login", formfield, { withCredentials: true }).then(
      (res) => {
        if (res.error !== true) {
          setisLoading(false);
          context.Alertbox("success", res.message);
          localStorage.setItem("userEmail", formfield.email);
          console.log(res);
          setformfield({
            email: "",
            password: "",
          });
          localStorage.setItem("accesstoken", res.data.accesstoken);
          localStorage.setItem("refreshtoken", res.data.refreshToken);
          context.setislogin(true);

          history("/");
        } else {
          context.Alertbox("error", res.message);
          setisLoading(false);
          context.setislogin(false);
        }
      }
    );
  };

  const forgetPassword = () => {
    if (formfield.email === "") {
      context.Alertbox("error", "Please Provide Your Email");
      return false;
    } else {
      context.Alertbox(
        "success",
        `The verification code is sent to ${formfield.email}`
      );
      localStorage.setItem("userEmail", formfield.email);
      localStorage.setItem("action-type", "forgetPassword");
      postData("/api/user/forgetpassword", {
        email: localStorage.getItem("userEmail"),
      }).then((res) => {
        console.log(res);
        if (res.success) {
          context.Alertbox("success", res.message);

          //localStorage.removeItem("userEmail"),
          history("/verify");
        } else {
          context.Alertbox("error", res.message);
        }
      });
    }
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
              Login To Your Account
            </h3>
            <form className="w-full" onSubmit={handlesubmit}>
              <div className="formgroup w-full mb-5 mt-5">
                <TextField
                  id="EmailId*"
                  type="email"
                  disabled={isLoading}
                  value={formfield.email}
                  label="Email"
                  variant="outlined"
                  className="w-full"
                  autoComplete="email"
                  name="email"
                  onChange={onChangeInput}
                />
              </div>
              <div className="formgroup w-full mb-3 relative">
                <TextField
                  id="Password"
                  type={ShowPassword ? "text" : "password"}
                  name="password"
                  disabled={isLoading}
                  value={formfield.password}
                  label="Password"
                  variant="outlined"
                  className="w-full"
                  autoComplete="current-password"
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

              <Link to="/verify">
                <a
                  className="link text-[13px] text-gray-500 cursor-pointer "
                  onClick={() => {
                    forgetPassword();
                  }}
                >
                  Forget Password?
                </a>
              </Link>

              <div className="flex !items-center mt-3 mb-3">
                <Button
                  type="submit"
                  disabled={!validValue}
                  className="btn-org w-full gap-3"
                >
                  Login
                  {isLoading === true ? (
                    <CircularProgress color="inherit" />
                  ) : (
                    ""
                  )}
                </Button>
              </div>

              <h2 className="text-[13px]  text-gray-700 cursor-pointer">
                New here?
                <Link
                  to="/register"
                  className="link text-[13px]  text-gray-700 cursor-pointer"
                >
                  Create your account!
                </Link>
              </h2>

              <p className="text-[14px] mt-3 !text-center  ">
                {" "}
                Or Continue With Social Accounts
              </p>
              <Button
                onClick={authWithGoogle}
                className="w-full !mt-3 gap-3 !bg-[#f1f1f1] !text-black"
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
