import React from "react";
import { Link } from "react-router-dom";

const CartItemCard = ({ item }) => {
  return (
    <div className="CartItemCard flex p-2 box-border h-28 ">
      <img src={item.image} alt="ssa" className="w-15 h-20 rounded-lg" />
      <div className="flex flex-col ml-4">
        <Link
          to={`/product/${item.product}`}
          className="font-semibold text-slate-700"
        >
          {item.name}
        </Link>
        <span className="text-slate-600">{`Price: ₹${item.price}`}</span>
        <p className="text-red-600">Remove</p>
        {/* <p onClick={() => deleteCartItems(item.product)}>Remove</p> */}
      </div>
    </div>
  );
};

export default CartItemCard;
