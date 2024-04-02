import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import { Loader } from "../index";
import ReviewCard from "./ReviewCard.jsx";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addToCart } from "../../actions/cartAction.js";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
// import { Rating } from "@mui/lab";
import { Rating } from "@mui/material";

const ProductDetails = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error } = useSelector((state) => state.productDetails);
  const product = useSelector((state) => state.productDetails.product.data);
  const productDetail = useSelector(
    (state) => state.productDetails.productDetail
  );
  const images = product ? product.images : [];

  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addToCartHandler = () => {
    dispatch(addToCart({ id, quantity: quantity }));
    alert.success("Item added to cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const submitReviewHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview({ reviewData: myForm }));
    setOpen(false);
    alert.success("Your review has been submitted!");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(
      getProductDetails({
        apiUrl: `/api/v1/product/${id}`,
      })
    );
  }, [dispatch, id, error, alert]);

  useEffect(() => {
    if (images.length > 0) {
      const imageUrls = images.map((image) => image.url);
      setSlides(imageUrls);
    }
  }, [images]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const prev = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const next = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const options = {
    size: "large",
    value: productDetail.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (productDetail.stock > quantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <MetaData title={`${productDetail.name} - QIVEE`} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="my-10">
            <div className="flex-col md:flex-row flex  items-center justify-evenly">
              <div className="flex carousel mb-6 mx-3  transition-transform ease-out ">
                <button
                  onClick={prev}
                  className="bg-slate-300 h-12 w-12 my-auto rounded-full -m-5 font-bold text-2xl hover:text-white hover:bg-slate-500 duration-300 ease-in-out rotate-180 items-center"
                >
                  ➜
                </button>
                <div
                  style={{
                    backgroundImage: `url(${slides[currentIndex]})`,
                  }}
                  className="py-16 px-4 h-96 w-72 bg-cover bg-center duration-1000 rounded-xl"
                ></div>
                <button
                  onClick={next}
                  className="bg-slate-300 h-12 w-12 my-auto rounded-full -m-5 font-bold text-2xl hover:text-white hover:bg-slate-500 duration-300 ease-in-out items-center "
                >
                  ➜
                </button>
              </div>

              <div className=" md:max-w-[30rem] max-w-96  sm items-center">
                <div className="detailsBlock-1">
                  <h2 className="font-semibold text-2xl">
                    {productDetail.name}
                  </h2>
                  <p className="text-sm text-slate-400 my-2">
                    Product # {productDetail._id}
                  </p>
                </div>
                <div className="detailsBlock-2 flex w-96 items-center my-4 border-y-[1px] py-2 border-slate-600">
                  <Rating {...options} />
                  <span className=" ml-2">
                    ({productDetail.numberOfReview} Reviews)
                  </span>
                </div>
                <div className="detailsBlock-3">
                  <h1 className="text-3xl font-bold ">
                    ₹{productDetail.price}
                  </h1>
                  <div className="3-1 my-4 flex items-center">
                    <div className="3-1-1 ">
                      <button
                        onClick={decreaseQuantity}
                        className=" px-4 pb-1 bg-slate-400 hover:bg-slate-600 duration-200 rounded-lg font-semibold text-2xl "
                      >
                        -
                      </button>
                      <input
                        type="number"
                        readOnly
                        value={quantity}
                        className="outline-none w-12 h-10 text-center"
                      />
                      <button
                        onClick={increaseQuantity}
                        className=" px-4 py-1 bg-slate-400 hover:bg-slate-600 duration-200 rounded-lg font-semibold text-xl"
                      >
                        +
                      </button>
                    </div>{" "}
                    <button
                      disabled={productDetail.stock === 0 ? true : false}
                      onClick={addToCartHandler}
                      className=" bg-slate-400 text-slate-900 hover:scale-110 duration-200 p-3 w-56 ml-6 rounded-full font-semibold text-xl"
                    >
                      Add To Cart
                    </button>
                  </div>
                  <p className="font-semibold my-6 p-4 w-96 border-y-[1px] border-slate-400">
                    Status :{" "}
                    <span
                      className={
                        productDetail.stock < 1
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {productDetail.stock < 1 ? "Out of stock" : "In stock"}
                    </span>
                  </p>
                </div>
                <div className="detailsBlock-4 my-4">
                  <p className="text-lg font-semibold">Description :</p>
                  <p className="text-slate-500 ">{productDetail.description}</p>
                </div>
                <button
                  onClick={submitReviewToggle}
                  className="submitReview  bg-slate-400 text-slate-900 duration-200 hover:scale-105 p-3 w-40 rounded-full font-semibold my-4"
                >
                  Submit Review
                </button>
              </div>
            </div>

            <h3 className="text-slate-900 text-2xl border-b-[1px] my-5 pb-2 w-44 text-center m-auto border-slate-400 ">
              Reviews
            </h3>

            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <DialogContent className="submitDialog flex flex-col">
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={Number(rating)}
                  size="large"
                />

                <textarea
                  className="submitDialogTextArea p-4 my-2 border-2 border-slate-300 rounded-md"
                  cols="30"
                  rows="4"
                  placeholder="Write your review here..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </DialogContent>
              <DialogActions>
                <Button onClick={submitReviewToggle}>Cancel</Button>
                <Button onClick={submitReviewHandler}>Submit</Button>
              </DialogActions>
            </Dialog>

            <div className="">
              {productDetail &&
              productDetail.reviews &&
              productDetail.reviews.length > 0 ? (
                <div className="flex flex-none m-10 overflow-x-auto gap-5">
                  {productDetail.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </div>
              ) : (
                <p className=" text-xl text-slate-600 text-center pb-10">
                  No reviews yet
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
