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
    <section className="section py-10 pb-10 sticky">
      <div className="container flex gap-5">
        <div className="col1 w-[20%]">
          <Accountsidebar />
        </div>

        <div className="col-2 w-[70%]">
          <div className="shadow-md rounded-md  bg-white">
            <div className="py-5 px-3  border-b border-[rgba(0,0,0,0.1)]">
              <h2>My List</h2>
              <p className="mt-0">
                {" "}
                There are{" "}
                <span className="text-primary font-bold">
                  {context?.listData?.length} Product
                </span>{" "}
                In Your List
              </p>
            </div>
            {context?.listData?.length !== 0 &&
              context?.listData?.map((item, index) => {
                return <Listitems key={index} item={item} />;
              })}
            {context?.listData?.length === 0 && (
              <div className="flex flex-col items-center justify-center h-[300px]">
                <img src="src\assets\emptylist.png" alt="" />
                <h4 className="text-[18px] mb-2 mt-4 font-[500]">
                  Your List is Currently Empty
                </h4>
                <Link to="/">
                  <Button className="mt-4 !bg-primary !text-white hover:!bg-blue-600">
                    Continue Shopping
                  </Button>{" "}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
