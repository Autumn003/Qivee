import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "rgb(30, 41, 59)",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="bg-slate-200 flex flex-col items-center p-4 mx-5 rounded-xl shadow-xl shadow-slate-300 hover:-translate-y-2 transition-transform ease-in my-10"
    >
      <img
        src={product.images[0].url}
        alt={product.name}
        className="h-44 w-40 rounded-lg"
      />
      <p className=" text-slate-800 font-bold mt-2">{product.name}</p>
      <div className="flex items-center my-[6px]">
        <ReactStars {...options} />{" "}
        <span className="text-xs  ml-1">
          ( {product.numberOfReview} Reviews)
        </span>
      </div>
      <span className="text-lg font-bold text-slate-800">₹{product.price}</span>
    </Link>
  );
};

export default ProductCard;
