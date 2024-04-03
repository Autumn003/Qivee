import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";
import {
  orderDetails,
  updateOrder,
  clearErrors,
} from "../../actions/orderActions.js";
import Sidebar from "./Sidebar.jsx";
import { MdAccountTree } from "react-icons/md";
import { useAlert } from "react-alert";
import { updateOrderReset } from "../../slices/orderSlice.js";

const ProcessOrder = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const [status, setStatus] = useState("");

  const order = useSelector((state) => state.orderDetails.order.data);
  const { loading, error } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.orders
  );

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder({ id: id, order: myForm }));
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-amber-200 text-amber-900";
      case "Delivered":
        return "bg-green-200 text-green-900";
      case "Shipped":
        return "bg-blue-200 text-sky-900";
    }
  };

  useEffect(() => {
    dispatch(orderDetails(id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Order Updated Successfully");
      dispatch(updateOrderReset());
    }
  }, [dispatch, id, alert, isUpdated, error, updateError]);

  return (
    <>
      <MetaData title="Confirm Order" />

      <div className="flex flex-col md:flex-row">
        <div>
          <Sidebar />
        </div>
        <div className=" md:grid grid-cols-3">
          <div className="col-span-2 md:border-r-[1.7px] border-slate-400">
            <div className=" m-8 md:m-16">
              <h1 className="font-semibold text-2xl  text-slate-600">
                Shipping info
              </h1>
              <div className=" p-4 ">
                <div className="flex gap-3 my-2">
                  <p>Name:</p>
                  <span className="text-slate-600">
                    {order && order.shippingInfo.name.toUpperCase()}
                  </span>
                </div>
                <div className="flex gap-3 my-2">
                  <p>phone:</p>
                  <span className="text-slate-600">
                    {order && order.shippingInfo.phoneNo}
                  </span>
                </div>
                <div className="flex gap-3 my-2">
                  <p>Address:</p>
                  <span>
                    {order && order.shippingInfo.address},{" "}
                    {order && order.shippingInfo.city},{" "}
                    {order && order.shippingInfo.state},{" "}
                    {order && order.shippingInfo.country},{" "}
                    {order && order.shippingInfo.pincode}
                  </span>
                </div>
              </div>
            </div>
            {/*  */}
            <div className=" m-8 md:m-16">
              <div>
                <div className="flex gap-3">
                  <h2 className="text-2xl font-semibold text-slate-600 mb-3">
                    Payment info
                  </h2>
                  <div>
                    <p
                      className={`w-fit px-3 py-1 font-semibold rounded-full ${
                        order &&
                        order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "bg-green-200 text-green-900"
                          : "bg-red-200 text-red-600"
                      }`}
                    >
                      {order &&
                      order.paymentInfo &&
                      order.paymentInfo.status === "succeeded"
                        ? "PAID"
                        : "NOT PAID"}
                    </p>
                  </div>
                </div>
                <div className=" p-4">
                  <div className="flex gap-2">
                    <p className="font-semibold text-slate-800">Amount:</p>
                    <b>₹{order && order.totalPrice && order.totalPrice} </b>
                    <span>(Incluiding taxes)</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                <h2 className="font-semibold text-slate-800">Order Status:</h2>
                <div className="">
                  <div className="w-fit">
                    <p
                      className={`px-3 py-1 rounded-full font-semibold ${getOrderStatusColor(
                        order && order.orderStatus
                      )}`}
                    >
                      {order && order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/*  */}

            <div className="m-8 md:m-16">
              <h1 className="font-semibold text-2xl  text-slate-600">
                Order Items:
              </h1>
              <div className=" p-4">
                {order &&
                  order.orderItems &&
                  order.orderItems.map((item) => (
                    <Link to={`/product/${item.product}`} key={item.product}>
                      <div className="orderContainer flex justify-between items-center p-5 border-b-[1px] border-slate-700 hover:bg-slate-200 duration-200">
                        <div className=" gap-2 ">
                          <img
                            src={item.image}
                            alt="Product"
                            className="w-fit h-20 rounded-lg object-cover"
                          />
                        </div>
                        <div className=" text-center mx-4">
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
          </div>
          {/*  */}
          <div className={"col-span-1 "}>
            <div className="flex flex-col items-center m-8 md:m-16">
              <h1 className="font-semibold text-2xl mt-6 text-slate-600">
                Process Order
              </h1>
              {/*  */}

              <form
                className="newProductContainer bg-white w-80 my-10 sm:h-auto h-[65%] box-border rounded-2xl flex flex-col items-center space-y-6"
                encType="multipart/form-data"
                onSubmit={updateOrderSubmitHandler}
              >
                <div className="productName flex items-center justify-center relative">
                  <MdAccountTree className="absolute left-2" />
                  <select
                    onChange={(e) => setStatus(e.target.value)}
                    className="px-10 py-2 pr-2 w-60 border-[1px] border-slate-400 rounded-md outline-none"
                  >
                    <option value="">Choose Category</option>
                    {order && order.orderStatus === "Processing" && (
                      <option value="Shipped">Shipped</option>
                    )}

                    {order && order.orderStatus === "Shipped" && (
                      <option value="Delivered">Delivered</option>
                    )}
                  </select>
                </div>

                <button
                  id="createProductBtn"
                  type="submit"
                  disabled={
                    loading ? true : false || status === "" ? true : false
                  }
                  className="createProductBtn bg-slate-400 w-64 h-12 mb-5 rounded-full text-xl font-semibold cursor-pointer text-slate-800 hover:scale-105 duration-200"
                >
                  Update
                </button>
              </form>

              {/*  */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
