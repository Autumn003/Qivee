import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import Sidebar from "./Sidebar";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { deleteUserReset } from "../../slices/userSlice";
import { allUsers, deleteUser, clearErrors } from "../../actions/userAction";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const ProductList = () => {
  const { error, users, loading } = useSelector((state) => state.allUsers);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.updateUser
  );

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const deleteUserHandler = (id) => {
    if (window.confirm(`You want to delete user ${id}`)) {
      dispatch(deleteUser({ id }));
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
      alert.success("User Deleted Successfully");
      navigate("/admin/users");
      dispatch(deleteUserReset());
    }

    dispatch(allUsers());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  return (
    <>
      <MetaData title="Users" />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex flex-col md:flex-row">
            <div>
              <Sidebar />
            </div>
            <div className="md:p-10 p-2 min-h-screen overflow-x-auto">
              <div className="cartHeader grid md:grid-cols-5 grid-cols-4">
                <p className="md:col-span-2 col-span-1 font-bold text-slate-700 text-lg m-2 ">
                  User
                </p>

                <p className="col-span-1 font-bold text-slate-700 text-lg m-2 text-end">
                  Email
                </p>
                <p className="col-span-1 font-bold text-slate-700 text-lg  m-2 text-end">
                  Role
                </p>
                <p className="col-span-1 font-bold text-slate-700 text-lg  m-2 text-end">
                  Actions
                </p>
              </div>
              <div className="border-[1.5px] border-slate-500  rounded-full"></div>

              {users &&
                users.map((user) => (
                  <div key={user._id}>
                    <div className="orderContainer grid md:grid-cols-5 grid-cols-4  mx-1 py-5 border-b-[1px] border-slate-700 ">
                      <div className="md:col-span-2 col-span-1 flex md:flex-row flex-col md:gap-20 gap-2 md:items-center ">
                        <p className="text-xs md:text-base">{user._id}</p>
                        <span>{user.name}</span>
                      </div>
                      <div className="cartInput col-span-1 text-end self-center">
                        <p>{user.email}</p>
                      </div>
                      <div className="cartSubtotal col-span-1 text-end self-center">
                        <p
                          className={` ${user.role === "admin" ? "text-green-500" : "text-yellow-500"} font-semibold`}
                        >
                          {user.role.toUpperCase()}
                        </p>
                      </div>
                      <div className="cartSubtotal col-span-1 m-2 flex items-center justify-end  text-xl">
                        <Link
                          to={`/admin/user/${user._id}`}
                          className="hover:bg-slate-300 md:p-3 p-[6px] rounded-full duration-200"
                        >
                          <MdEdit />
                        </Link>
                        <button
                          onClick={() => deleteUserHandler(user._id)}
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
