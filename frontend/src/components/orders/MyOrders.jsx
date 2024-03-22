import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { myOrders } from "../../actions/orderActions";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { clearErrors } from "../../actions/orderActions";

const MyOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.myOrder.orders.data);
  const { error } = useSelector((state) => state.myOrder);
  const alert = useAlert();

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "bg-amber-200 text-amber-900";
      case "Delivered":
        return "bg-green-200 text-green-900";
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <>
      <div className="md:p-10 p-2 min-h-screen overflow-x-auto">
        <div className="cartHeader grid md:grid-cols-5 grid-cols-4 md:mx-3">
          <p className="col-span-2 md:col-span-3 font-bold text-slate-700 text-lg m-2 ">
            Order Id
          </p>

          <p className="col-span-1 font-bold text-slate-700 text-lg m-2 text-center">
            Quantity
          </p>
          <p className="col-span-1 font-bold text-slate-700 text-lg  m-2 text-end">
            Amount
          </p>
        </div>
        <div className="border-[1.5px] border-slate-500  rounded-full"></div>

        {orders &&
          orders.map((item) => (
            <Link to={`order/${item._id}`} key={item._id}>
              <div className="orderContainer grid md:grid-cols-5 grid-cols-4  mx-1 py-5 border-b-[1px] border-slate-700 hover:bg-slate-200 duration-200">
                <div className="col-span-2 md:col-span-3 flex md:flex-row flex-col md:gap-20 gap-2 md:items-center">
                  <p>{item._id}</p>
                  <span
                    className={`px-3 py-1 rounded-full font-semibold w-fit ${getOrderStatusColor(item.orderStatus)}`}
                  >
                    {item.orderStatus}
                  </span>
                </div>
                <div className="cartInput col-span-1 text-center">
                  <p>{item.orderItems.length}</p>
                </div>
                <p className="cartSubtotal col-span-1 text-end m-2">
                  ₹{item.totalPrice}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
};

export default MyOrders;
