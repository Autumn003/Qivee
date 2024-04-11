import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import {
  clearErrors,
  deleteProduct,
  getAdminProducts,
} from "../../actions/productAction";
import { deleteReset } from "../../slices/productSlice";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
// import { useParams } from "react-router-dom";

const ProductList = () => {
  const products = useSelector((state) => state.products.data);
  const { error, loading } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  // let { id } = useParams();

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct({ id }));
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
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch(deleteReset());
    }

    dispatch(getAdminProducts());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Products" />
          <div className="flex flex-col md:flex-row">
            <div>
              <Sidebar />
            </div>
            <div className="md:p-10 p-2 min-h-screen overflow-x-auto">
              <div className="cartHeader grid md:grid-cols-5 grid-cols-4">
                <p className="md:col-span-2 col-span-1 font-bold text-slate-700 text-lg m-2 ">
                  Product
                </p>

                <p className="col-span-1 font-bold text-slate-700 text-lg m-2 text-end">
                  Stock
                </p>
                <p className="col-span-1 font-bold text-slate-700 text-lg  m-2 text-end">
                  Price
                </p>
                <p className="col-span-1 font-bold text-slate-700 text-lg  m-2 text-end">
                  Actions
                </p>
              </div>
              <div className="border-[1.5px] border-slate-500  rounded-full"></div>

              {products &&
                products.map((item) => (
                  <div key={item._id}>
                    <div className="orderContainer grid md:grid-cols-5 grid-cols-4  mx-1 py-5 border-b-[1px] border-slate-700 ">
                      <div className="md:col-span-2 col-span-1 flex md:flex-row flex-col md:gap-20 gap-2 md:items-center ">
                        <p className="text-xs md:text-base">{item._id}</p>
                        <span>{item.name}</span>
                      </div>
                      {/* <div className="cartInput col-span-1 self-center">
                  <p>{item.name}</p>
                </div> */}
                      <div className="cartInput col-span-1 text-end self-center">
                        <p>{item.stock}</p>
                      </div>
                      <div className="cartSubtotal col-span-1 text-end self-center">
                        <p>₹{item.price}</p>
                      </div>
                      <div className="cartSubtotal col-span-1 m-2 flex items-center justify-end  text-xl">
                        <Link
                          to={`/admin/product/${item._id}`}
                          className="hover:bg-slate-300 md:p-3 p-[6px] rounded-full duration-200"
                        >
                          <MdEdit />
                        </Link>
                        <button
                          onClick={() => deleteProductHandler(item._id)}
                          className="hover:bg-slate-300 md:p-3 p-[6px] rounded-full duration-200"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductList;
