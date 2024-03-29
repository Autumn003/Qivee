import React from "react";
import Loader from "../layout/Loader";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userAction";

const Profile = ({ user }) => {
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );

  const imgurl = useSelector((state) => state.user.data.avatar?.url);

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  // Check if the user's role is "admin"
  const isAdmin = user.role === "admin";

  const logoutUser = () => {
    dispatch(logout())
      .then(() => {
        alert.success("Logout successful");
        navigate("/"); // Redirect to homepage after logout
      })
      .catch((error) => {
        alert.error(`Logout failed: ${error}`);
      });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex md:flex-row flex-col">
            <div className="w-screen flex items-center flex-col justify-evenly my-6 md:my-0">
              <h1 className="text-2xl font-semibold text-slate-500">
                My Profile
              </h1>
              <img
                src={imgurl}
                alt={user.name}
                className="md:w-56 w-36 md:h-56 h-36 my-6 md:my-0 object-cover text-center rounded-full"
              />
              <Link
                to="/me/update"
                className="w-72 h-14 my-5 md:my-0 bg-slate-400 flex items-center rounded-full justify-center text-xl hover:scale-105 duration-200 ease-in text-slate-800 font-semibold outline-none"
              >
                Edit Profile
              </Link>

              <Link
                to="/orders"
                className="w-72 h-14  bg-slate-400 flex items-center rounded-full justify-center text-xl hover:scale-105 duration-200 ease-in text-slate-800 font-semibold outline-none"
              >
                My Orders
              </Link>
            </div>
            {/* <div className="bg-blue-400 w-screen">sdfsd</div> */}
            <div className="w-screen mt-7 flex flex-col items-center md:items-start ">
              <div className="my-15">
                <div className="my-10">
                  <h1 className="text-lg text-slate-800 font-semibold ">
                    Full Name
                  </h1>
                  <p className="text-slate-600">{user.name?.toUpperCase()}</p>
                </div>
                <div className="my-10">
                  <h1 className="text-lg text-slate-800 font-semibold ">
                    Email
                  </h1>
                  <p className="text-slate-600">{user.email?.toLowerCase()}</p>
                </div>
                <div className="my-10">
                  <h1 className="text-lg text-slate-800 font-semibold ">
                    Joined On
                  </h1>
                  <p className="text-slate-600">
                    {String(user.createdAt).substr(0, 10)}
                  </p>
                </div>
              </div>
              <div>
                <Link
                  to="/password/update"
                  className="w-72 h-14 my-7 bg-slate-400 flex items-center rounded-full justify-center text-xl hover:scale-105 duration-200 ease-in text-slate-800 font-semibold outline-none"
                >
                  Change Password
                </Link>
                {isAdmin && ( // Render "Dashboard" link only if user is admin
                  <Link
                    to="/admin/dashboard"
                    className="w-72 h-14 bg-slate-400 flex items-center rounded-full justify-center text-xl hover:scale-105 duration-200 ease-in text-slate-800 font-semibold outline-none"
                  >
                    Dashboard
                  </Link>
                )}
                <Link
                  onClick={logoutUser}
                  className="w-72 h-14 my-7 bg-slate-400 flex items-center rounded-full justify-center text-xl hover:scale-105 duration-200 ease-in text-slate-800 font-semibold outline-none"
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
