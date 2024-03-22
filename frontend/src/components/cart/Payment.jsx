import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { FaCreditCard, FaCalendar, FaKey } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { clearErrors, createOrder } from "../../actions/orderActions";

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.data);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalAmount * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subTotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalAmount,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          order.shippingInfo = {
            name: shippingInfo.name,
            phoneNo: shippingInfo.phoneNo,
            country: shippingInfo.country,
            state: shippingInfo.state,
            pincode: shippingInfo.pinCode,
            city: shippingInfo.city,
            address: shippingInfo.address,
          };

          dispatch(createOrder({ order }));

          alert.success("Payment Successful!");
          navigate("/success");
        } else {
          alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, alert]);

  return (
    <>
      <MetaData title="Payment" />
      <div className="paymentContainer w-screen max-w-[100%] flex justify-center items-center bg-slate-200  top-0 left-0">
        <div className="paymentCartBox bg-white p-10 sm:h-4/5 h-[65%] box-border rounded-2xl my-6 py-6">
          <form
            className="paymentForm  bg-white flex flex-col items-center "
            onSubmit={(e) => submitHandler(e)}
          >
            <h1 className="text-center text-xl font-semibold text-slate-600">
              Card Info
            </h1>
            <div className="border-2 border-slate-400 w-36 rounded-full my-4"></div>

            <div className="flex items-center w-[100%] my-4">
              <FaCreditCard className="absolute translate-x-4" />
              <CardNumberElement className="px-10 py-2 pr-2 w-60 mx-auto border-[1px] border-slate-400 rounded-md outline-none" />
            </div>
            <div className="flex items-center w-[100%] my-4">
              <FaCalendar className="absolute translate-x-4" />
              <CardExpiryElement className="px-10 py-2 pr-2 w-60 mx-auto border-[1px] border-slate-400 rounded-md outline-none" />
            </div>
            <div className="flex items-center w-[100%] my-4">
              <FaKey className="absolute translate-x-4" />
              <CardCvcElement className="px-10 py-2 pr-2 w-60 mx-auto border-[1px] border-slate-400 rounded-md outline-none" />
            </div>

            <input
              type="submit"
              value={`Pay - ₹${orderInfo && orderInfo.totalAmount}`}
              ref={payBtn}
              className="paymentFormBtn  bg-slate-400 w-64 h-12 rounded-full text-xl font-semibold cursor-pointer text-slate-800 hover:scale-105 duration-200 mt-8"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Payment;
