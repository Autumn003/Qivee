import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import { MdVerifiedUser, MdSpellcheck, MdEmail } from "react-icons/md";
import Sidebar from "./Sidebar";
import { updateUserReset } from "../../slices/userSlice";
import { updateUser, userDetails, clearErrors } from "../../actions/userAction";
import Loader from "../layout/Loader";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.updateUser);
  const { loading, error, user } = useSelector((state) => state.userDetails);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user._id !== id) {
      dispatch(userDetails({ id }));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User Updated Successfully");
      navigate("/admin/users");
      dispatch(updateUserReset());
    }
  }, [dispatch, alert, error, navigate, isUpdated, id, userDetails, user]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser({ id: id, userData: myForm }));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update user" />
          <div className="flex flex-col md:flex-row">
            <div>
              <Sidebar />
            </div>
            <div className="updatePasswordContainer flex justify-center w-full  items-center ">
              <form
                className="newProductContainer bg-white w-80 md:w-96 my-10 sm:h-auto h-[65%] box-border border p-4 border-slate-400 rounded-2xl flex flex-col items-center space-y-6"
                encType="multipart/form-data"
                onSubmit={updateProductSubmitHandler}
              >
                <h1 className="text-center text-xl font-semibold text-slate-600">
                  Update User
                </h1>
                <div className="border-b-4 border-slate-400 w-36 mx-auto  rounded-full"></div>
                <div className="productName flex items-center w-[100%]">
                  <MdSpellcheck className="absolute text-xl translate-x-8 md:translate-x-10" />
                  <input
                    type="text"
                    placeholder="Product Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-10 py-2 w-60 md:w-72 pr-2 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
                  />
                </div>
                <div className="productName flex items-center w-[100%]">
                  <MdEmail className="absolute text-xl translate-x-8 md:translate-x-10" />
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-10 py-2 pr-2 w-60 md:w-72 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
                  />
                </div>

                <div className="productName flex items-center justify-center relative ">
                  <MdVerifiedUser className="absolute left-2 text-xl" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="px-10 py-2 pr-2 w-60 md:w-72 border-[1px] border-slate-400 rounded-md outline-none"
                  >
                    <option value="">Choose Role</option>
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                  </select>
                </div>

                <button
                  id="createProductBtn"
                  type="submit"
                  disabled={
                    updateLoading ? true : false || role === "" ? true : false
                  }
                  className="createProductBtn bg-slate-400 w-64 h-12 mb-5 rounded-full text-xl font-semibold cursor-pointer text-slate-800 hover:scale-105 duration-200"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateUser;
