import React, { useRef, useState, useEffect } from "react";
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { Loader } from "../index";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email: loginEmail, password: loginPassword }));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, error, alert, isAuthenticated, navigate]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("translate-x-0");
      switcherTab.current.classList.remove("translate-x-full");

      registerTab.current.classList.add("hidden");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("translate-x-full");
      switcherTab.current.classList.remove("translate-x-0");

      registerTab.current.classList.add("translate-x-0");
      registerTab.current.classList.remove("hidden");
      registerTab.current.classList.add("flex");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="loginSignupContainer w-screen h-screen max-w-[100%] flex justify-center items-center bg-slate-200 fixed top-0 left-0">
            <div className="loginSignupBox bg-white w-80 sm:h-4/5 h-[65%] box-border rounded-2xl">
              <div>
                <div className="loginSignupToggle flex h-[3vmax] mt-2">
                  <p
                    onClick={(e) => switchTabs(e, "login")}
                    className="text-slate-400 font-semibold cursor-pointer flex justify-center items-center w-[100%] text-lg hover:scale-105 duration-200"
                  >
                    LOGIN
                  </p>
                  <p
                    onClick={(e) => switchTabs(e, "register")}
                    className="text-slate-400 font-semibold cursor-pointer flex justify-center items-center w-[100%] text-lg hover:scale-105 duration-200"
                  >
                    REGISTER
                  </p>
                </div>
                <button
                  ref={switcherTab}
                  className="bg-slate-400 h-1 w-[45%] border-none duration-200 mx-3 rounded-full"
                ></button>
              </div>
              <form
                className="loginForm flex flex-col items-center m-auto p-2 justify-evenly h-[80%]"
                ref={loginTab}
                onSubmit={loginSubmit}
              >
                <div className="loginEmail flex items-center w-[100%]">
                  <AiOutlineMail className="absolute translate-x-12" />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="px-10 py-2 pr-2 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
                  />
                </div>
                <div className="loginPassword flex items-center w-[100%]">
                  <AiOutlineLock className="absolute translate-x-12" />
                  <input
                    type="password"
                    placeholder="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="px-10 py-2 pr-2 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
                  />
                </div>
                <Link
                  to={"/password/forgot"}
                  className="flex text-sm items-end self-end mx-10 text-slate-700"
                >
                  Forget Password ?
                </Link>
                <input
                  type="submit"
                  value="Login"
                  className="LoginBtn bg-slate-400 w-64 h-12 rounded-full text-xl font-semibold cursor-pointer text-slate-800 hover:scale-105 duration-200"
                />
              </form>
              <form
                className="signupForm bg-white hidden flex-col items-center m-auto p-2 justify-evenly h-[80%] -translate-y-full -translate-x-full"
                ref={registerTab}
                encType="multipaert/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signupName flex items-center w-[100%]">
                  <AiOutlineUser className="absolute translate-x-12" />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                    className="px-10 py-2 pr-2 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
                  />
                </div>
                <div className="signupEmail flex items-center w-[100%]">
                  <AiOutlineMail className="absolute translate-x-12" />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                    className="px-10 py-2 pr-2 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
                  />
                </div>
                <div className="signupPassword flex items-center w-[100%]">
                  <AiOutlineLock className="absolute translate-x-12" />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                    className="px-10 py-2 pr-2 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
                  />
                </div>
                <div className="registerImage flex items-center w-[100%] px-10">
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-16 rounded-full mx-3"
                  />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                    className="flex file:cursor-pointer file:w-full file:z-10 file:h-10 file:m-0 hover:scale-105 rounded-full file:border-none border-slate-400 border-[1.5px] duration-200 file:text-slate-600"
                  />
                </div>
                <input
                  type="submit"
                  value="Register"
                  className="SignupBtn bg-slate-400 w-64 h-12 rounded-full text-xl font-semibold cursor-pointer text-slate-800 hover:scale-105 duration-200"
                  // disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginSignup;
