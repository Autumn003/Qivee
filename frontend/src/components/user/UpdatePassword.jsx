import React, { useRef, useState, useEffect } from "react";
import { AiOutlineLock, AiOutlineUnlock, AiOutlineKey } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/profileActions";
import { useAlert } from "react-alert";
import { Loader } from "../index";
import { loadUser } from "../../actions/userAction";
import { resetUpdate } from "../../slices/profileSlice";
import MetaData from "../layout/MetaData";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  //   const user = useSelector((state) => state.user.data);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Password updated successfully");
      navigate("/account");

      dispatch({ type: resetUpdate });
    }
  }, [dispatch, error, alert, isUpdated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password - QIVEE" />
          <div className="updatePasswordContainer w-screen h-screen max-w-[100%] flex justify-center items-center bg-slate-200 fixed top-0 left-0">
            <div className="updatePasswordBox bg-white w-80 sm:h-4/5 h-[65%] box-border rounded-2xl">
              <h2 className="text-center p-4 text-xl font-semibold text-slate-600">
                Change password
              </h2>
              <div className="border-b-4 border-slate-400 w-36 mx-auto mb-10 rounded-full"></div>
              <form
                className="updatePasswordForm bg-white flex flex-col items-center space-y-10"
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                <div className="oldPassword flex items-center w-[100%]">
                  <AiOutlineKey className="absolute translate-x-12" />
                  <input
                    type="password"
                    placeholder="Old password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="px-10 py-2 pr-2 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
                  />
                </div>
                <div className="newPassword flex items-center w-[100%]">
                  <AiOutlineUnlock className="absolute translate-x-12" />
                  <input
                    type="password"
                    placeholder="New password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="px-10 py-2 pr-2 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
                  />
                </div>
                <div className="confirmPassword flex items-center w-[100%]">
                  <AiOutlineLock className="absolute translate-x-12" />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="px-10 py-2 pr-2 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn bg-slate-400 w-64 h-12 rounded-full text-xl font-semibold cursor-pointer text-slate-800 hover:scale-105 duration-200"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdatePassword;
