import Button from "@mui/material/Button";
import { IoBagCheckOutline } from "react-icons/io5";
import { useContext, useState } from "react";

import { IoMdClose } from "react-icons/io";
import Listitems from "./Listitems";
import Accountsidebar from "../AccountSidebar";
import { myContext } from "../../App";
import { Link } from "react-router-dom";
export default function MyList() {
  const context = useContext(myContext);
  return (
    <section className=" w-full py-10 ">
    <div className="container flex flex-col lg:flex-row gap-5">
      <div className=" w-full lg:w-[20%]">
        <Accountsidebar />
      </div>

      <div className="w-full md:w-[70%] lg:w-[50%]">
  <div className="shadow-md rounded-md bg-white overflow-hidden">
    <div className="py-5 px-4 border-b border-[rgba(0,0,0,0.1)]">
      <h2 className="text-xl font-semibold mb-1">My List</h2>
      <p className="text-sm text-gray-600">
        There are{" "}
        <span className="text-primary font-bold">
          {context?.listData?.length}
        </span>{" "}
        product{context?.listData?.length === 1 ? "" : "s"} in your list
      </p>
    </div>

    {context?.listData?.length > 0 &&
      context?.listData.map((item, index) => (
        <Listitems key={index} item={item} />
      ))}

    {context?.listData?.length === 0 && (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <img
          src="src/assets/emptylist.png"
          alt="Empty List"
          className="w-[150px] h-auto mb-6"
        />
        <h4 className="text-[18px] font-[500] mb-2">
          Your List is Currently Empty
        </h4>
        <Link to="/">
          <Button className="mt-3 !bg-primary !text-white hover:!bg-blue-600 transition-all">
            Continue Shopping
          </Button>
        </Link>
      </div>
    )}
  </div>
</div>

      </div>
    </section>
  );
}
