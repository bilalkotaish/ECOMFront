import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { myContext } from "../../App";
import { deleteData } from "../../utils/api";
export default function CartPanel(props) {
  const context = useContext(myContext);

  const handleDelete = (id) => {
    deleteData(`/api/cart/deletecart/${id}`).then((res) => {
      if (res.error) {
        context.Alertox("error", res.error);
        return;
      } else {
        context.Alertbox("success", res.message);
        context.getCart();
      }
    });
  };
  return (
    <>
      <div className=" scroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden py-3 px-4">
        {props.data.length === 0 ? (
          <>
            <div className=" text-center text-[14px] font-[500] text-[#0000007a]">
              No Item Found
              <img src="./../assets/emptycart.png" alt="" />
            </div>
          </>
        ) : (
          props.data.map((item) => {
            return (
              <div className=" cartItem w-full flex items-center  gap-4 !border-b !border-[rgba(0,0,0,0.2)] pb-4 pt-4">
                <div className="img w-[25%] overflow-hidden h-[80px] rounded-md ">
                  <Link
                    to={`/productdetails/${item.productId._id}`}
                    className="block group"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="group-hover:scale-105"
                    />
                  </Link>
                </div>
                <div className="info w-[75%] pr-5 relative">
                  <h4 className="text-[14px] font-[500] link">
                    <Link
                      to={`/productdetails/${item.productId._id}`}
                      className="link transition-all"
                    >
                      {item.ProductTitle.substring(0, 30)}
                    </Link>
                  </h4>
                  <p className="flex items-center gap-5 mt-1 mb-4">
                    <span>
                      Qty:<span>{item.quantity}</span>
                    </span>
                    <span className="text-primary">
                      Price:<span>${item.price}</span>
                    </span>
                  </p>

                  <MdDeleteOutline
                    onClick={() => handleDelete(item._id)}
                    className="absolute top-[10px] right-[10px] cursor-pointer text-[20px] link transition-all"
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="btmsection absolute bottom-[10px] left-[10px] w-full overflow-hidden pr-5 ">
        <div className="btminfo w-full px-4 border-t border-[rgba(0,0,0,0.1)] py-3 flex justify-between items-center flex-col ">
          <div className="flex items-center w-full justify-between ">
            <span className="text-[16px] font-[500]">
              {" "}
              {props.data.length} Item :
            </span>
            <span className="text-primary">
              {" "}
              {context.cartData.length !== 0
                ? context.cartData
                    .map((item) => parseInt(item.price) * item.quantity)
                    .reduce((total, value) => total + value, 0)
                : 0}
              $
            </span>
          </div>

          <div className="flex items-center w-full justify-between">
            <span className="text-[16px] font-[500]"> Shipping :</span>
            <span className="text-primary">Free</span>
          </div>
        </div>

        <div className="btminfo w-full px-4 border-t border-[rgba(0,0,0,0.1)] py-3 flex justify-between items-center flex-col ">
          <div className="flex items-center w-full justify-between ">
            <span className="text-[16px] font-[500]"> Total(tax Excl.): </span>
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

        <div className="flex items-center gap-3 w-full jusitfy-between pl-3 pr-3 ">
          <Link to="/cart" className="w-[50%] d-block">
            <Button
              className="btn-org w-full  flex-1 !h-[50px] !text-[16px] font-semibold"
              onClick={context.toggleCartPanel(false)}
            >
              View Cart
            </Button>
          </Link>
          <Link to="/checkout" className="w-[50%] d-block">
            <Button className="btn-org btn-border w-full  flex-1 !h-[50px] !text-[16px] font-semibold">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
