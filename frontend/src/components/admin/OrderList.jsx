import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { deleteOrderReset } from "../../slices/orderSlice";
import {
  allOrders,
  deleteOrder,
  clearErrors,
} from "../../actions/orderActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const OrderList = () => {
  const { error, loading } = useSelector((state) => state.allOrders);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.orders
  );

  const { orders } = useSelector((state) => state.allOrders.orders);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const deleteOrderHandler = (id) => {
    if (window.confirm(`You want to delete order ${id}`)) {
      dispatch(deleteOrder({ id }));
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-amber-200 text-amber-900";
      case "Delivered":
        return "bg-green-200 text-green-900";
      case "Shipped":
        return "bg-blue-200 text-sky-900";
    }
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
      alert.success("Order Deleted Successfully");
      navigate("/admin/orders");
      dispatch(deleteOrderReset());
    }

    dispatch(allOrders());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Orders" />
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

              {orders &&
                orders.map((item) => (
                  <div key={item._id}>
                    <div className="orderContainer grid md:grid-cols-5 grid-cols-4  mx-1 py-5 border-b-[1px] border-slate-700 ">
                      <div className="md:col-span-2 col-span-1 flex md:flex-row flex-col md:gap-20 gap-2 md:items-center ">
                        <p className="text-xs md:text-base">{item._id}</p>
                        <span
                          className={`px-3 py-1 rounded-full font-semibold w-fit ${getOrderStatusColor(item.orderStatus)}`}
                        >
                          {item.orderStatus}
                        </span>
                      </div>
                      <div className="cartInput col-span-1 text-end self-center">
                        <p>{item.orderItems.length}</p>
                      </div>
                      <div className="cartSubtotal col-span-1 text-end self-center">
                        <p>₹{item.totalPrice}</p>
                      </div>
                      <div className="cartSubtotal col-span-1 m-2 flex items-center justify-end  text-xl">
                        <Link
                          to={`/admin/order/${item._id}`}
                          className="hover:bg-slate-300 md:p-3 p-[6px] rounded-full duration-200"
                        >
                          <MdEdit />
                        </Link>
                        <button
                          onClick={() => deleteOrderHandler(item._id)}
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

export default OrderList;
