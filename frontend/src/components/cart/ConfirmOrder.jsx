import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { data } = useSelector((state) => state.user);
  const user = data;

  const navigate = useNavigate();

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const shippingCharges = subTotal > 1000 ? 0 : 100;
  const tax = subTotal * 0.18;
  const totalAmount = subTotal + shippingCharges + tax;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}, ${shippingInfo.pinCode}`;

  const proceedtoPayment = () => {
    const paymentData = {
      subTotal,
      shippingCharges,
      tax,
      totalAmount,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(paymentData));

    navigate("/process/payment");
  };

  return (
    <>
      <MetaData title="Confirm Order" />
      <div className="confirmorderpage md:grid grid-cols-3">
        <div className="col-span-2 md:border-r-[1.7px] border-slate-400">
          <div className="confirmShippingArea m-8 md:m-16">
            <h1 className="font-semibold text-2xl  text-slate-600">
              Shipping info
            </h1>
            <div className="confirmShippingAreaBox p-4 ">
              <div className="flex gap-3 my-2">
                <p>Name:</p>
                <span className="text-slate-600">
                  {shippingInfo.name.toUpperCase()}
                </span>
              </div>
              <div className="flex gap-3 my-2">
                <p>phone:</p>
                <span className="text-slate-600">{shippingInfo.phoneNo}</span>
              </div>
              <div className="flex gap-3 my-2">
                <p>Address:</p>
                <span className="text-slate-600">{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems m-8 md:m-16">
            <h1 className="font-semibold text-2xl  text-slate-600">
              Cart Items:
            </h1>
            <div className="confirmCartItemscontainer p-4">
              {cartItems &&
                cartItems.map((item) => (
                  <div
                    key={item.product}
                    className="confirmCartItemsCard flex justify-between h-16 md:my-7 my-10"
                  >
                    <img
                      src={item.image}
                      alt="Product"
                      className="h-16 rounded-md"
                    />
                    <div className="flex flex-col md:flex-row md:w-full md:justify-evenly">
                      <Link to={`/product/${item.product}`} className="my-auto">
                        {item.name}
                      </Link>
                      <span className="my-auto">
                        {item.quantity} X ₹{item.price} ={" "}
                        <b>₹{item.price * item.quantity}</b>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/*  */}
        <div className="col-span-1 ">
          <div className="orderSummary flex flex-col items-center m-8 md:m-16">
            <h1 className="font-semibold text-2xl mt-6 text-slate-600">
              Order Summary
            </h1>
            <div className="border-[1px] border-slate-400 w-full my-8"></div>
            <div className="w-full">
              <div className="flex gap-3 my-2 justify-between">
                <p>Subtotal:</p>
                <span className="text-slate-600">₹{subTotal}</span>
              </div>
              <div className="flex gap-3 my-2  justify-between">
                <p>Shipping Charges:</p>
                <span className="text-slate-600">₹{shippingCharges}</span>
              </div>
              <div className="flex gap-3 my-2  justify-between">
                <p>GST:</p>
                <span className="text-slate-600">₹{tax}</span>
              </div>
            </div>
            <div className="border-[1px] border-slate-400 w-full my-8"></div>
            <div className="orderSummaryTotal flex gap-3 my-2 w-full justify-between">
              <p className="text-slate-800 text-xl">
                <b>Total:</b>
              </p>
              <span className=" text-slate-700 text-lg">₹{totalAmount}</span>
            </div>

            <button
              onClick={proceedtoPayment}
              className=" bg-slate-400 text-slate-900 hover:scale-105 duration-200 p-3 w-64 rounded-full font-semibold text-xl my-14"
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
