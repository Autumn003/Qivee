import React, { useState, useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { resetUpdate } from "../../slices/profileSlice";
import { forgotPassword } from "../../actions/profileActions";
import { useAlert } from "react-alert";
import { Loader } from "../index";
import MetaData from "../layout/MetaData";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);
    dispatch(forgotPassword({ email }));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(resetUpdate());
    }

    if (message) {
      alert.success(message);
      dispatch(resetUpdate());
    }

    return () => {
      dispatch(resetUpdate());
    };
  }, [dispatch, alert, error, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot password - QIVEE" />
          <div className="forgotPasswordContainer w-screen h-screen max-w-[100%] flex justify-center items-center bg-slate-200 fixed top-0 left-0">
            <div className="forgotPasswordBox bg-white w-80 sm:h-4/5 h-[65%] box-border rounded-2xl">
              <h2 className="text-center p-4 text-xl font-semibold text-slate-600">
                Forgot Password
              </h2>
              <div className="border-b-4 border-slate-400 w-36 mx-auto mb-4 rounded-full"></div>
              <form
                className="forgotPasswordForm bg-white flex flex-col items-center"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail flex items-center w-[100%] my-5">
                  <AiOutlineMail className="absolute translate-x-12" />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-10 py-2 pr-2 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
                  />
                </div>

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn bg-slate-400 w-64 h-12 rounded-full text-xl font-semibold cursor-pointer text-slate-800 hover:scale-105 duration-200"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
