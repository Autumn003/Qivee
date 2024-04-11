import React, { useRef, useState, useEffect } from "react";
import { AiOutlineLock, AiOutlineUnlock, AiOutlineKey } from "react-icons/ai";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/profileActions";
import { useAlert } from "react-alert";
import { Loader } from "../index";
import { loadUser } from "../../actions/userAction";
import { resetUpdate } from "../../slices/profileSlice";
import MetaData from "../layout/MetaData";

const ResetPassword = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { token } = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword({ token: token, passwords: myForm }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Password updated successfully");
      navigate("/login");
    }
  }, [dispatch, error, alert, success, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="resetPasswordContainer w-screen h-screen max-w-[100%] flex justify-center items-center bg-slate-200 ">
            <div className="resetPasswordBox bg-white w-80 sm:h-4/5 h-[65%] box-border rounded-2xl">
              <h2 className="text-center p-4 text-xl font-semibold text-slate-600">
                Change password
              </h2>
              <div className="border-b-4 border-slate-400 w-36 mx-auto mb-10 rounded-full"></div>
              <form
                className="resetPasswordForm bg-white flex flex-col items-center space-y-10"
                onSubmit={resetPasswordSubmit}
              >
                <div className="newPassword flex items-center w-[100%]">
                  <AiOutlineUnlock className="absolute translate-x-12" />
                  <input
                    type="password"
                    placeholder="New password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  value="Update"
                  className="resetPasswordBtn bg-slate-400 w-64 h-12 rounded-full text-xl font-semibold cursor-pointer text-slate-800 hover:scale-105 duration-200"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPassword;
