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
      <section className="py-10">
        <div className="container flex gap-5">
          <div className="col1 w-[20%]">
            <Accountsidebar />
          </div>

          <div className="col-2 w-[50%]">
            <div className="card bg-white shadow-md rounded-md p-5 mb-5">
              <div className="flex items-center">
                <h2 className="pb-3 font-[500] justify-between"> My Address</h2>
              </div>

              <hr />
              <div
                onClick={context.toggleaddressPanel(true)}
                className="flex items-center mt-3 p-5 cursor-pointer hover:bg-[#e7f3f9] justify-center border border-[rgba(0,0,0,0.2)] border-dashed bg-[#f1faff]"
              >
                <span className="text-[16px] font-[400]">Add Address</span>
              </div>
              <div className="gap-2 flex-col flex mt-4">
                {address?.length > 0 &&
                  address?.map((address, index) => {
                    return (
                      <>
                        <div className="addressBox p-3 border  flex-col border-[rgba(0,0,0,0.2)] bg-[#fafafa]  w-full !pt-3 !pb-3 cursor-pointer">
                          <div className="flex justify-between items-start">
                            <span className="text-[12px] font-[500] rounded-sm bg-[#e9e9e9] inline-block">
                              {address.Address_Type}
                            </span>
                            <Addressmenu
                              address={address}
                              setmode={setmode}
                              editAddress={editAddress}
                            />
                          </div>

                          <h4 className="text-[13px] font-[600] ">
                            {context?.userData?.name}
                            {"  "}
                            {address?.Mobile}
                          </h4>

                          {/* <Radio
                            onChange={handleChange}
                            value={address._id}
                            checked={selectedValue === address._id}
                            name="address"
                          /> */}
                          <span className="text-[12px]  pt-0 block w-full  font-[400]">
                            {address?.Address_line},{address?.City},{" "}
                            {address?.Country},{address?.Pincode},
                            {address?.Mobile},{address?.landmark},
                          </span>
                          {/* <span
                            onClick={() => removeAddress(address._id)}
                            className="text-[20px] ml-auto hover:text-[#ff0000] cursor-pointer"
                          >
                            <RiDeleteBin2Line />{" "}
                          </span> */}
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <Dialog onClose={handleClose} open={isOpen}>
        <DialogTitle className="text-center">
          {mode === "edit" ? "Edit Address" : "Add Address"}
        </DialogTitle>
        <form action="" className="p-8 py-3 pb-8 " onSubmit={handlesubmit}>
          <div className="flex items-center gap-3 pb-5">
            <TextField
              className="w-full"
              id="outlined-basic"
              name="Address_line"
              value={formfield.Address_line}
              onChange={onChangeInput}
              label="Address_line"
              variant="outlined"
            />
          </div>
          <div className="flex items-center gap-3 pb-5">
            <TextField
              className="w-1/2"
              id="outlined-basic"
              value={formfield.Country}
              name="Country"
              label="Country"
              onChange={onChangeInput}
              variant="outlined"
            />
            <TextField
              className="w-1/2"
              id="outlined-basic"
              name="City"
              label="City"
              value={formfield.City}
              onChange={onChangeInput}
              variant="outlined"
            />{" "}
          </div>
          <div className="flex items-center gap-3 pb-5">
            <TextField
              className="w-full"
              id="outlined-basic"
              value={formfield.State}
              name="State"
              label="State"
              onChange={onChangeInput}
              variant="outlined"
            />
            <TextField
              className="w-full"
              id="outlined-basic"
              value={formfield.Pincode}
              name="Pincode"
              onChange={onChangeInput}
              label="Pincode"
              variant="outlined"
            />
          </div>
          <div className="flex items-center gap-3 pb-5">
            <div className="w-1/2">
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
          

            <div className="w-1/2">
              <TextField
                className="w-full"
                id="outlined-basic"
                value={formfield.landmark}
                name="landmark"
                label="landmark"
                onChange={onChangeInput}
                variant="outlined"
              />
            </div>
          </div>
          <div className="flex items-center gap-3 pb-5">
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Address Type
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={Addresstype}
                onChange={onChangeAddresstype}
              >
                <FormControlLabel
                  value="Home"
                  control={<Radio />}
                  label="Home"
                />
                <FormControlLabel
                  value="Office"
                  control={<Radio />}
                  label="Office"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div className="flex items-center gap-3 pb-5">
            <Button
              type="submit"
              className="btn-org w-full  flex-1 !h-[50px] !text-[16px] font-semibold"
            >
              {mode === "edit" ? "Edit Address" : "Add Address"}
            </Button>
            <Button
              onClick={handleClose}
              className="btn-org btn-border w-full  flex-1 !h-[50px] !text-[16px] font-semibold"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Dialog> */}
    </>
  );
}
