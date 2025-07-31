import Button from "@mui/material/Button";
import { IoBagCheckOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useContext } from "react";
import { myContext } from "../../App";
import { Link } from "react-router-dom";
import CartItems from "./CartItems";

export default function Cart() {
  const context = useContext(myContext);
  window.scrollTo(0, 0);

  return (
    <section className="section py-10 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="container max-w-[1200px] mx-auto flex flex-col md:flex-row gap-6">
        {/* Left: Cart Items */}
        <div className="w-full md:w-[70%]">
          <div className="shadow-md rounded-md p-5 bg-white">
            <div className="py-2 px-3 border-b border-[rgba(0,0,0,0.1)]">
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <p className="mt-1 text-sm">
                There are{" "}
                <span className="text-primary font-bold">
                  {context.cartData.length} Product
                </span>{" "}
                in your cart
              </p>
            </div>

            {context.cartData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[300px] px-4 text-center">
                <img
                  src="/src/assets/emptycart.png"
                  alt="Empty Cart"
                  className=" w-[80px]  lg:w-[150px] max-w-full"
                />
                <h4 className="  text-sm lg:text-lg mb-2 mt-4 font-medium">
                  Your Cart is Empty
                </h4>
                <Link to="/" className="mt-2">
                  <Button
                    onClick={context.toggleCartPanel(false)}
                    className="  !bg-blue-500 !text-white hover:!bg-blue-600"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            ) : (
              context.cartData.map((item, index) => (
                <CartItems key={index} size="S" qty={item.quantity} data={item} />
              ))
            )}
          </div>
        </div>

        {/* Right: Cart Summary */}
        <div className="w-full md:w-[30%]">
          <div className="shadow-md rounded-md bg-white p-5 sticky top-10">
            <h3 className="pb-3 text-lg font-semibold">Cart Totals</h3>
            <hr className="mb-3" />

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-primary">
                  {context.cartData.length !== 0
                    ? context.cartData
                        .map((item) => parseInt(item.price) * item.quantity)
                        .reduce((total, value) => total + value, 0)
                    : 0}
                  $
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Estimate for:</span>
                <span className="font-semibold">Lebanon</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-primary">
                  {context.cartData.length !== 0
                    ? context.cartData
                        .map((item) => parseInt(item.price) * item.quantity)
                        .reduce((total, value) => total + value, 0)
                    : 0}
                  $
                </span>
              </div>
            </div>

            <Button className="btn-org w-full flex gap-2 mt-4 !h-[45px] !text-base">
              Checkout
              <IoBagCheckOutline className="text-[20px]" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
