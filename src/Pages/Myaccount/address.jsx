import Accountsidebar from "../../Component/AccountSidebar";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
// import Radio from "@mui/material/Radio";
// import React from "react";
import { myContext } from "../../App";
import { useContext } from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import Select from "@mui/material/Select";
// import { RiDeleteBin2Line } from "react-icons/ri";
// import DialogTitle from "@mui/material/DialogTitle";
import { postData, fetchData, editData, deleteData } from "../../utils/api";
// import IconButton from "@mui/material/IconButton";
import { useEffect } from "react";
// import {
//   FormControl,
//   FormControlLabel,
//   FormLabel,
//   RadioGroup,
// } from "@mui/material";
import Addressmenu from "./addressmenu";

export default function Address() {
  const [isLoading, setisLoading] = useState(false);

  const [address, setaddress] = useState([]);
  const context = useContext(myContext);
  const [phone, setPhone] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [userId, setuserId] = useState("");
  const [addressId, setaddressId] = useState("");
  const [Addresstype, setAddresstype] = useState("");
  const [mode, setmode] = useState("add");

  // const [status, setStatus] = useState(false);
  //   const ph = `"${context?.userData?.Mobile}"`;
  //   setPhone(ph);
  const [formfield, setformfield] = useState({
    Address_line: "",
    City: "",
    State: "",
    Pincode: "",
    Country: "",
    Mobile: "",
    Address_Type: "",
    landmark: "",
  });
  // const handleChange = (event) => {
  //   const selectedId = event.target.value;
  //   setSelectedValue(selectedId);

  //   // Call single backend route to handle selection logic
  //   editData(`/api/address/update/${selectedId}`, {});
  // };

  useEffect(() => {
    if (context?.userData?._id !== "" && context?.userData?._id !== undefined) {
      setuserId(context?.userData?._id);
      fetchData(`/api/address/get?${context?.userData?._id}`, {
        withCredentials: true,
      }).then((res) => {
        console.log(res.data);
        setaddress(res.data);
        setSelectedValue(res.data);
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
  };
  // const handleChangeStatus = (event) => {
  //   setStatus(event.target.value);
  //   setformfield({ ...formfield, Status: event.target.value });
  // };
  const handleClose = () => {
    setOpen(false);
  };
  const removeAddress = (id) => {
    deleteData(`/api/address/${id}`).then((res) => {
      context.Alertbox("success", res.message);
      // Refetch updated address list
      fetchData(`/api/address/get?userId=${context.userData._id}`, {
        withCredentials: true,
      }).then((res) => {
        setaddress(res.data);
      });
    });
  };

  const handlesubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    setmode("add");

    if (formfield.Address_line === "") {
      context.Alertbox("error", "Please Provide Your Address");
      return;
    }
    if (formfield.City === "") {
      context.Alertbox("error", "Please Provide Your City");
      return;
    }
    if (formfield.Mobile === "") {
      context.Alertbox("error", "Please Provide Your Mobile Number");
      return;
    }
    if (formfield.State === "") {
      context.Alertbox("error", "Please Provide Your state");
      return;
    }
    if (formfield.Pincode === "") {
      context.Alertbox("error", "Please Provide Your Pincode");
      return;
    }
    if (formfield.Country === "") {
      context.Alertbox("error", "Please Provide Your Country");
      return;
    }
    if (formfield.landmark === "") {
      context.Alertbox("error", "Please Provide Your Landmark");
      return;
    }
    if (formfield.Address_Type === "") {
      context.Alertbox("error", "Please Provide Your Address Type");
      return;
    }
    if (mode === "add") {
      postData(`/api/address/add`, formfield, { withCredentials: true }).then(
        (res) => {
          setisLoading(false);
          if (res.error !== true) {
            context.Alertbox("success", res.message);
            console.log(res);

            setOpen(false);
            fetchData(`/api/address/get?${context?.userData?._id}`, {
              withCredentials: true,
            }).then((res) => {
              console.log(res.data);
              setaddress(res.data);
              setformfield({
                Address_line: "",
                City: "",
                State: "",
                Pincode: "",
                Country: "",
                Mobile: "",
                Address_Type: "",
                landmark: "",
              });
              setAddresstype("");
              setPhone("");
            });
          } else {
            context.Alertbox("error", res.message);
          }
        }
      );
    } else if (mode === "edit") {
      editAddress();
      editData(`/api/address/update/${addressId}`, formfield, {
        withCredentials: true,
      }).then((res) => {
        setisLoading(false);
        if (res.error !== true) {
          context.Alertbox("success", res.message);
          setOpen(false);
          fetchData(`/api/address/get?${context?.userData?._id}`, {
            withCredentials: true,
          }).then((res) => {
            console.log(res.data);
            setaddress(res.data);
            setformfield({
              Address_line: "",
              City: "",
              State: "",
              Pincode: "",
              Country: "",
              Mobile: "",
              Address_Type: "",
              landmark: "",
            });
            setAddresstype("");
            setPhone("");
          });
        } else {
          context.Alertbox("error", res.message);
        }
      });
    }
  };

  const editAddress = (id) => {
    setisLoading(true);
    setmode("edit");

    setOpen(true);
    setaddressId(id);
    fetchData(`/api/address/${id}`, { withCredentials: true }).then((res) => {
      console.log(res.data);
      setformfield({
        Address_line: res.data?.Address_line,
        City: res.data?.City,
        State: res.data?.State,
        Pincode: res.data?.Pincode,
        Country: res.data?.Country,
        Mobile: res.data?.Mobile,
        Address_Type: res.data?.Address_Type,
        landmark: res.data?.landmark,
      });
      setAddresstype(res.data?.Address_Type);
      setPhone(res.data?.Mobile);
      setisLoading(false);
    });
  };
  const onChangeAddresstype = (e) => {
    setAddresstype(e.target.value);
    setformfield({ ...formfield, Address_Type: e.target.value });
  };

  return (
    <>
       <section className=" w-full py-10 ">
    <div className="container flex flex-col lg:flex-row gap-5">
      <div className=" w-full lg:w-[20%]">
        <Accountsidebar />
      </div>

      <div className=" w-full md:w-[70%] lg:w-[50%]">
  <div className="card bg-white shadow-md rounded-md p-5 mb-5">
    <div className="flex items-center">
      <h2 className="pb-3 font-[500] text-lg">My Address</h2>
    </div>

    <hr className="mb-4" />

    <div
      onClick={context.toggleaddressPanel(true)}
      className="flex items-center mt-3 p-4 cursor-pointer hover:bg-[#e7f3f9] justify-center border border-[rgba(0,0,0,0.2)] border-dashed bg-[#f1faff] rounded-md transition-all duration-200"
    >
      <span className="text-[16px] font-[500]">Add Address</span>
    </div>

    <div className="gap-3 flex flex-col mt-5">
      {address?.length > 0 &&
        address.map((address, index) => (
          <div
            key={index}
            className="addressBox p-4 border border-[rgba(0,0,0,0.2)] bg-[#fafafa] rounded-md"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-[12px] font-[500] rounded-sm bg-[#e9e9e9] px-2 py-1">
                {address.Address_Type}
              </span>
              <Addressmenu
                address={address}
                setmode={setmode}
                editAddress={editAddress}
              />
            </div>

            <h4 className="text-[14px] font-[600] mb-1">
              {context?.userData?.name} — {address?.Mobile}
            </h4>

            <p className="text-[13px] leading-snug font-[400] text-gray-700">
              {address?.Address_line}, {address?.City}, {address?.Country},
              {address?.Pincode}, {address?.Mobile}, {address?.landmark}
            </p>
          </div>
        ))}
    </div>
  </div>
</div>

        </div>
      </section>

    </>
  );
}
