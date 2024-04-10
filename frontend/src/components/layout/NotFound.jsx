import React from "react";
import { MdError } from "react-icons/md";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="text-center justify-center ">
        <MdError className="mx-auto size-14 text-slate-500 mb-5" />
        <h1 className="text-2xl text-slate-600 mb-10">Page not found</h1>
        <Link
          to="/home"
          className=" bg-slate-500 p-3 rounded-lg text-white hover:text-slate-700 border border-slate-500 hover:bg-white duration-150"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
