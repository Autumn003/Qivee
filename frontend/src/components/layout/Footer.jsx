import React from "react";

const footer = () => {
  return (
    <div className="md:flex bg-slate-700 text-white items-center">
      <div className="w-full flex justify-center min-h-60">left footer</div>
      <div className="w-full flex-col text-center justify-center min-h-60 ">
        <h1 className="font-thin text-4xl mb-12 p-3">QIVEE.</h1>
        <p className="mb-16">High quality is our first priority</p>
        <p className="text-slate-400">copyright 2024 &copy; QIVEE. </p>
      </div>
      <div className="w-full flex justify-center min-h-60 ">
        <h1 className="font-bold hidden md:flex text-2xl mb-16 p-3">Social.</h1>
      </div>
    </div>
  );
};

export default footer;
