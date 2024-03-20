import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import {
  AiFillHome,
  AiFillCompass,
  AiFillPhone,
  AiOutlineGlobal,
} from "react-icons/ai";
import { FaMapLocationDot, FaLocationDot, FaUser } from "react-icons/fa6";

const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [name, setName] = useState(shippingInfo.name);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }

    dispatch(
      saveShippingInfo({
        name,
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      })
    );

    navigate("/order/confirm");
  };

  return (
    <>
      <MetaData title="Shipping Details" />

      <div className="shippingContainer w-screen max-w-[100%] flex justify-center items-center bg-slate-200  top-0 left-0">
        <div className="shippingCartBox bg-white w-96 sm:h-4/5 h-[65%] box-border rounded-2xl my-6 py-6">
          <h2 className="text-center p-4 text-xl font-semibold text-slate-600">
            Shipping Details
          </h2>
          <div className="border-b-4 border-slate-400 w-36 mx-auto mb-10 rounded-full"></div>

          <form
            className=" bg-white flex flex-col items-center space-y-7"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div className=" flex items-center w-[100%]">
              <FaUser className="absolute translate-x-11" />
              <input
                type="text"
                placeholder="Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-10 py-2 pr-2 mx-auto w-80 border-[1px] border-slate-400 rounded-md outline-none"
              />
            </div>
            <div className=" flex items-center w-[100%]">
              <AiFillHome className="absolute translate-x-11" />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="px-10 py-2 pr-2 mx-auto w-80 border-[1px] border-slate-400 rounded-md outline-none"
              />
            </div>
            <div className=" flex items-center w-[100%]">
              <FaLocationDot className="absolute translate-x-11" />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="px-10 py-2 pr-2 w-80 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
              />
            </div>
            <div className=" flex items-center w-[100%]">
              <AiFillCompass className="absolute translate-x-11" />
              <input
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="px-10 py-2 pr-2 w-80 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
              />
            </div>
            <div className="confirmPassword flex items-center w-[100%]">
              <AiFillPhone className="absolute translate-x-11" />
              <input
                type="number"
                placeholder="Contact Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="px-10 py-2 pr-2 w-80 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
              />
            </div>

            <div className=" flex items-center w-[100%]">
              <AiOutlineGlobal className="absolute translate-x-11" />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="px-10 py-2 pr-2 w-80 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div className=" flex items-center w-[100%]">
                <FaMapLocationDot className="absolute translate-x-11" />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="px-10 py-2 pr-2 w-80 mx-auto border-[1px] border-slate-400 rounded-md outline-none"
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              disabled={state ? false : true}
              className="updatePasswordBtn bg-slate-400 w-64 h-12 rounded-full text-xl font-semibold cursor-pointer text-slate-800 hover:scale-105 duration-200"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
