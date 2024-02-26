import React from "react";
import ReactStars from "react-rating-stars-component";
import profileImg from "/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "rgb(30, 41, 59)",
    size: window.innerWidth < 600 ? 20 : 25,
    value: review.rating,
    isHalf: true,
  };

  return (
    <div className="items-center justify-center min-w-96 min-h-64 p-2 border-slate-400 border-[1px]">
      <img src={profileImg} alt="User" className="h-16" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <span className="text-sm">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
