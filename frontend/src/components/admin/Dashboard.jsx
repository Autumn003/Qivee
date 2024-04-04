import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../actions/productAction";
import { allOrders } from "../../actions/orderActions";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";
import { allUsers } from "../../actions/userAction";

const Dashboard = () => {
  const dispatch = useDispatch();

  const totalproducts = useSelector((state) => state.products.data.length);
  const { users } = useSelector((state) => state.allUsers);

  const { totalAmount, orders } = useSelector(
    (state) => state.allOrders.orders
  );
  const { loading } = useSelector((state) => state.allOrders);

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(allUsers());
  }, [dispatch]);

  return (
    <>
      <MetaData title={"Dashboard - QIVEE"} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col md:flex-row">
            <div>
              <Sidebar />
            </div>
            <div className="dasboardContainer w-full">
              <h1 className="text-center text-2xl font-semibold py-6">
                Dashboard
              </h1>
              <div className="dashboardSummary ">
                <div className=" bg-slate-400 text-center py-2">
                  <p>
                    Total Amount <br /> {totalAmount}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row justify-evenly my-10  text-xl items-center gap-5 ">
                  <Link
                    to={"/admin/products"}
                    className="w-40 flex flex-col items-center justify-center h-40 bg-red-400 rounded-full"
                  >
                    <p>Products</p>
                    <p>{totalproducts}</p>
                  </Link>
                  <Link
                    to={"/admin/orders"}
                    className="w-40 flex flex-col items-center justify-center h-40 bg-blue-400 rounded-full"
                  >
                    <p>Orders</p>
                    <p>{orders && orders.length}</p>
                  </Link>
                  <Link
                    to={"/admin/users"}
                    className="w-40 flex flex-col items-center justify-center h-40 bg-amber-200 rounded-full"
                  >
                    <p>Users</p>
                    <p>{users && users.length}</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
