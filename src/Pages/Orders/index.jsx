import Accountsidebar from "../../Component/AccountSidebar";
import Listitems from "../../Component/Mylist/Listitems";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import Button from "@mui/material/Button";
import Badge from "../../Component/Badge";
import { useState } from "react";
import { fetchData } from "../../utils/api";
import { useContext } from "react";
import { myContext } from "../../App";
import { useEffect } from "react";

export default function Orders() {
  const [openPopupIndex, setOpenPopupIndex] = useState(null);
  const [orderData, setOrderData] = useState([]);
  const context = useContext(myContext);

  const handleTogglePopup = (index) => {
    if (openPopupIndex === index) {
      setOpenPopupIndex(null);
    } else {
      setOpenPopupIndex(index);
    }
  };

  useEffect(() => {
    console.log(context.userData?._id);
    const getOrderData = async () => {
      const res = await fetchData(`/api/orders/get/${context.userData._id}`);
      if (res.error) {
        context.Alertbox("error", res.message);
      } else {
        setOrderData(res.data);
        console.log("Order Data:", res.data);
      }
    };

    getOrderData();
  }, [context.Alertbox, context.userData?._id]); // Add any dependencies here if needed

  return (
    <section className=" w-full py-10 ">
    <div className="container flex flex-col lg:flex-row gap-5">
      <div className=" w-full lg:w-[20%]">
        <Accountsidebar />
      </div>

        {/* Main Content */}
        <section className="w-full md:w-[70%] lg:w-[80%]">
  <div className="flex flex-col lg:flex-row gap-6">
    <main className="w-full">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 px-4 sm:px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">My Orders</h2>
          <p className="text-sm text-gray-600">
            There are{" "}
            <span className="text-primary font-semibold">{orderData?.length}</span>{" "}
            Orders in Total
          </p>
        </div>

        {/* Orders Table */}
        {orderData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600 min-w-[800px]">
              <thead className="bg-gray-50 text-xs text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-3"></th>
                  <th className="px-4 py-3">Order ID</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Address</th>
                  <th className="px-4 py-3">Total</th>
                  <th className="px-4 py-3">Pincode</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {orderData.map((item, index) => (
                  <tr key={item._id} className="bg-white border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <Button
                        onClick={() => handleTogglePopup(index)}
                        className="w-9 h-9 min-w-9 rounded-full bg-gray-100 hover:bg-gray-200"
                      >
                        {openPopupIndex === index ? (
                          <FaAngleUp className="text-gray-600 text-lg" />
                        ) : (
                          <FaAngleDown className="text-gray-600 text-lg" />
                        )}
                      </Button>
                    </td>
                    <td className="px-4 py-3 text-primary">{item._id}</td>
                    <td className="px-4 py-3">{item.PaymentId}</td>
                    <td className="px-4 py-3">{context.userData.name}</td>
                    <td className="px-4 py-3">{item.deliver_address.Mobile}</td>
                    <td className="px-4 py-3 max-w-[250px] truncate">
                      {[
                        item.deliver_address.Address_Type,
                        item.deliver_address.Address_line,
                        item.deliver_address.City,
                        item.deliver_address.State,
                        item.deliver_address.Country,
                        item.deliver_address.landmark,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </td>
                    <td className="px-4 py-3 font-semibold text-primary">${item.Total}</td>
                    <td className="px-4 py-3">{item.deliver_address.Pincode}</td>
                    <td className="px-4 py-3">{context.userData.email}</td>
                    <td className="px-4 py-3">
                      <Badge status={item.orderStatus} />
                    </td>
                    <td className="px-4 py-3">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center">
            <img
              src="https://img.freepik.com/free-vector/removing-goods-from-basket-refusing-purchase-changing-decision-item-deletion-emptying-trash-online-shopping-app-laptop-user-cartoon-character_335657-2566.jpg"
              alt="No orders"
              className="w-32 mb-4 opacity-80"
            />
            <h4 className="text-lg font-medium text-gray-600">No Orders Found</h4>
            <p className="text-sm text-gray-400 mt-1">
              Your order history will appear here once you place an order.
            </p>
          </div>
        )}
      </div>
    </main>
  </div>

  {/* Modal */}
  {openPopupIndex !== null && (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4 py-6 sm:px-0 overflow-auto">
      <div className="bg-white w-full max-w-5xl rounded-lg shadow-lg relative p-6">
        <button
          className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-red-500"
          onClick={() => setOpenPopupIndex(null)}
        >
          ×
        </button>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Order Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700 min-w-[700px]">
            <thead className="bg-gray-100 text-xs uppercase text-gray-600">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {orderData[openPopupIndex]?.products?.map((product, idx) => (
                <tr key={idx} className="bg-white border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-primary">{product.productId?._id}</td>
                  <td className="px-4 py-3">{product.productId?.name || "N/A"}</td>
                  <td className="px-4 py-3">
                    <img
                      src={
                        product?.productId?.images?.[0]?.url ||
                        "https://via.placeholder.com/50"
                      }
                      alt="Product"
                      className="w-[50px] h-[60px] object-cover rounded-md border"
                    />
                  </td>
                  <td className="px-4 py-3">{product.quantity}</td>
                  <td className="px-4 py-3">${product.price}</td>
                  <td className="px-4 py-3 font-semibold text-primary">
                    ${product.SubTotal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )}
</section>
</div>
    </section>
  );
}
