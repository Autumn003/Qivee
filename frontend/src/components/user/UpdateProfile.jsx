import React, { useRef, useState, useEffect } from "react";
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updateProfile } from "../../actions/profileActions";
import { useAlert } from "react-alert";
import { Loader } from "../index";
import { loadUser } from "../../actions/userAction";
import { resetUpdate } from "../../slices/profileSlice";
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.data);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("profile updated successfully");
      dispatch(loadUser());
      navigate("/account");

      dispatch({ type: resetUpdate });
    }
  }, [dispatch, error, alert, isUpdated, user, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update profile" />
          <div className="updateProfileContainer w-screen h-screen max-w-[100%] flex justify-center items-center bg-slate-200 ">
            <div className="updateProfileBox bg-white w-80 sm:h-4/5 h-[65%] box-border rounded-2xl">
              <h2 className="text-center p-4 text-xl font-semibold text-slate-600">
                Update profile
              </h2>
              <div className="border-b-4 border-slate-400 w-36 mx-auto mb-4 rounded-full"></div>
              <form
                className="updateProfileForm bg-white flex flex-col items-center"
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <div className="updateProfileName flex items-center w-[100%] my-5">
                  <AiOutlineUser className="absolute translate-x-12" />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={updateProfileDataChange}
                    className="px-10 py-2 pr-2 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
                  />
                </div>
                <div className="updateProfileEmail flex items-center w-[100%] my-5">
                  <AiOutlineMail className="absolute translate-x-12" />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={updateProfileDataChange}
                    className="px-10 py-2 pr-2 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
                  />
                </div>

                <div className="updateProfileImage flex items-center w-[100%] h-[100%] px-10 ">
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-16 h-16 rounded-full mx-3"
                  />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                    className="flex file:cursor-pointer file:w-full file:z-10 file:h-10 file:m-0 hover:scale-105 rounded-full file:border-none border-slate-400 border-[1.5px] duration-200 file:text-slate-600 my-5"
                  />
                </div>
                <input
                  type="submit"
                  value="Update Profile"
                  className="updateProfileBtn bg-slate-400 w-64 h-12 rounded-full text-xl font-semibold cursor-pointer text-slate-800 hover:scale-105 duration-200"
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

export default UpdateProfile;
