import React from "react";

const Loader = () => {
  return (
    <div className="h-[50vh] ">
      <div
        className="flex h-20 w-20 mx-auto my-[15%] animate-spin rounded-full border-4 border-solid border-slate-700 border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loader;
