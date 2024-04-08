import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit, MdEmail } from "react-icons/md";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { allReviews, deleteReview } from "../../actions/productAction";
import { clearErrors } from "../../actions/userAction";
import { deleteReviewReset } from "../../slices/productSlice";
import Loader from "../layout/Loader";

const ProductReviews = () => {
  const { loading, error } = useSelector((state) => state.productReview);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );
  const reviews = useSelector((state) => state.productReview.reviews.data);

  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const deleteReviewHandler = (id) => {
    if (window.confirm(`You want to delete user ${id}`)) {
      console.log(productId);
      console.log(id);
      dispatch(deleteReview({ reviewId: id, productId: productId }));
    }
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(allReviews({ id: productId }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Review Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch(deleteReviewReset());
    }
  }, [dispatch, alert, error, deleteError, isDeleted, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:flex-row">
          <div>
            <Sidebar />
          </div>
          <div className="mx-auto">
            <div className="flex flex-col items-center m-8 ">
              <form
                className="newProductContainer bg-white w-80 my-4 sm:h-auto h-[65%] box-border rounded-2xl flex flex-col items-center space-y-6"
                encType="multipart/form-data"
                onSubmit={productReviewsSubmitHandler}
              >
                <div className="productName flex items-center w-[100%]">
                  <MdEmail className="absolute text-xl translate-x-12 md:translate-x-8" />
                  <input
                    type="text"
                    placeholder="Product Id"
                    value={productId}
                    required
                    onChange={(e) => setProductId(e.target.value)}
                    className="px-10 py-2 pr-2 w-60 md:w-72 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
                  />
                </div>

                <button
                  id="createProductBtn"
                  type="submit"
                  disabled={loading || productId === ""}
                  className="createProductBtn bg-slate-400 w-64 h-12 mb-5 rounded-full text-xl font-semibold cursor-pointer text-slate-800 hover:scale-105 duration-200"
                >
                  Get Reviews
                </button>
              </form>
            </div>

            {reviews && reviews.length > 0 ? (
              <div className="md:p-10 p-2 min-h-screen overflow-x-auto">
                <h1 className="font-semibold text-2xl text-slate-600 mx-auto w-fit mb-3">
                  All Reviews
                </h1>
                <div className="border-b-4 border-slate-400 w-36 mx-auto mb-10 rounded-full"></div>
                <div className="cartHeader grid md:grid-cols-5 grid-cols-4">
                  <p className="md:col-span-2 col-span-1 font-bold text-slate-700 text-lg m-2 ">
                    Review
                  </p>
                  <p className="col-span-1 font-bold text-slate-700 text-end  text-lg m-2 ">
                    Rating
                  </p>
                  <p className="col-span-1 font-bold text-slate-700 text-end text-lg m-2 ">
                    Comment
                  </p>
                  <p className="col-span-1 font-bold text-slate-700 text-lg m-2 text-end">
                    Actions
                  </p>
                </div>
                <div className="border-[1.5px] border-slate-500  rounded-full"></div>

                {reviews.map((review) => (
                  <div key={review._id}>
                    <div className="orderContainer grid md:grid-cols-5 grid-cols-4  mx-1 py-5 border-b-[1px] border-slate-700 ">
                      <div className="md:col-span-2 col-span-1 flex md:flex-row flex-col md:gap-20 gap-2 md:items-center ">
                        <p className="text-xs md:text-base">{review._id}</p>
                        <span>{review.name}</span>
                      </div>
                      <div className="cartInput col-span-1 text-end self-center">
                        <p
                          className={`${
                            review.rating >= 4
                              ? "text-green-500"
                              : "text-red-500"
                          } font-semibold pr-5`}
                        >
                          {review.rating}
                        </p>
                      </div>
                      <div className="cartSubtotal col-span-1 text-end self-center">
                        <p>{review.comment.toUpperCase()}</p>
                      </div>
                      <div className="cartSubtotal col-span-1 m-2 flex items-center justify-end  text-xl">
                        <button
                          onClick={() => deleteReviewHandler(review._id)}
                          className="hover:bg-slate-300 md:p-3 p-[6px] rounded-full duration-200"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h1 className="productReviewsFormHeading mx-auto text-xl text-slate-600 w-fit m-10">
                No Reviews Found
              </h1>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductReviews;
