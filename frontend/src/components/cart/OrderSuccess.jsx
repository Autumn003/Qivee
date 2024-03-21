import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <>
      <div className="orderSuccess h-screen flex flex-col justify-center items-center">
        <FaCheckCircle className=" size-24" />

        <h1 className="text-xl text-slate-900 my-4 p-2 text-center">
          Your Order has been Placed successfully
        </h1>
        <Link
          to="/orders"
          className=" bg-slate-700 w-64 p-4 rounded-full text-xl font-semibold cursor-pointer text-slate-200 hover:scale-105 duration-200 text-center my-4"
        >
          View Orders
        </Link>
      </div>
    </>
  );
};

export default OrderSuccess;
