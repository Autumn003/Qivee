import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, orderDetails } from "../../actions/orderActions";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const order = useSelector((state) => state.orderDetails.order.data);
  const { loading, error } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(orderDetails(id));
  }, [dispatch, id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="orderContainer">
          <h1 className="m-4 md:m-8 sm:text-xl text-lg text-slate-600 font-bold">
            Order #{order && order._id}
          </h1>
          <div className="flex flex-col md:flex-row gap-4 my-10 ">
            <div className="shippinginfo md:px-12 px-6">
              <h1 className="text-xl font-semibold text-slate-500 mb-3">
                Shipping info
              </h1>
              <div className="orderDetailsContainerBox space-y-5">
                <div className="flex gap-2 ">
                  <p className="font-semibold text-slate-800">Name:</p>
                  <span className="text-slate-700">
                    {order.shippingInfo &&
                      order.shippingInfo.name.toUpperCase()}
                  </span>
                </div>
                <div className="flex gap-2 ">
                  <p className="font-semibold text-slate-800"> Phone:</p>
                  <span className="text-slate-700">
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div className="flex gap-2 ">
                  <p className="font-semibold text-slate-800">Address:</p>
                  <span className="text-slate-700">
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>
            </div>
            {/*  */}
            <div className=" paymentinfo md:px-12 px-6 space-y-5 mt-4">
              <div>
                <div className="flex gap-3">
                  <h2 className="text-xl font-semibold text-slate-500 mb-3">
                    Payment info
                  </h2>
                  <div>
                    <p
                      className={`w-fit px-3 py-1 font-semibold rounded-full ${
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "bg-green-200 text-green-900"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>
                </div>
                <div className="orderDetailsContainerBox">
                  <div className="flex gap-2">
                    <p className="font-semibold text-slate-800">Amount:</p>
                    <b>{order.totalPrice && order.totalPrice}</b>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <h2 className="font-semibold text-slate-800">Order Status:</h2>
                <div className="orderDetailsContainerBox">
                  <div className="w-fit">
                    <p
                      className={`px-3 py-1 rounded-full font-semibold ${
                        order.orderStatus && order.orderStatus === "Delivered"
                          ? "bg-green-200 text-green-900"
                          : "bg-amber-200 text-amber-900"
                      }`}
                    >
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="my-10">
            <h2 className="text-xl font-semibold text-slate-500 md:px-12 px-6">
              Order Items
            </h2>
            {order.orderItems &&
              order.orderItems.map((item) => (
                <Link to={`/product/${item.product}`} key={item.product}>
                  <div className="orderContainer flex justify-between items-center p-5 md:mx-12 border-b-[1px] border-slate-700 hover:bg-slate-200 duration-200">
                    <div className=" gap-2 ">
                      <img
                        src={item.image}
                        alt="Product"
                        className="w-fit h-20 rounded-lg object-cover"
                      />
                    </div>
                    <div className="cartInput text-center mx-4">
                      <p>{item.name}</p>
                    </div>
                    <p className="cartSubtotal  text-end m-2">
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
