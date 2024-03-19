import React from "react";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartAction";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (newQty > stock) {
      return;
    }
    dispatch(addToCart({ id, quantity: newQty }));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty < 1) {
      return;
    }
    dispatch(addToCart({ id, quantity: newQty }));
  };

  const deleteCartItems = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      <div className="md:p-10 p-2 min-h-screen">
        <div className="cartHeader grid md:grid-cols-5 grid-cols-4 md:mx-3">
          <p className="md:col-span-3 col-span-2 font-bold text-slate-700 text-lg m-2 ">
            Product
          </p>
          <p className="col-span-1 font-bold text-slate-700 text-lg m-2 ">
            Quantity
          </p>
          <p className="col-span-1 font-bold text-slate-700 text-lg  m-2 text-end">
            Subtotal
          </p>
        </div>
        <div className="border-[1.5px] border-slate-500  rounded-full"></div>

        {cartItems &&
          cartItems.map((item) => (
            <div
              className="cartContainer grid md:grid-cols-5 grid-cols-4 mx-1 my-6"
              key={item.product}
            >
              <div className="md:col-span-3 col-span-2">
                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
              </div>
              <div className="cartInput col-span-1">
                <button
                  onClick={() => decreaseQuantity(item.product, item.quantity)}
                  className="p-2 py-[1px] bg-slate-300 hover:bg-slate-400 duration-200 rounded-lg font-semibold"
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  readOnly
                  className="outline-none w-8 h-10 text-center"
                />
                <button
                  onClick={() =>
                    increaseQuantity(item.product, item.quantity, item.stock)
                  }
                  className="p-[.4rem] py-[1px] bg-slate-300 hover:bg-slate-400 duration-200 rounded-lg font-semibold"
                >
                  +
                </button>
              </div>
              <p className="cartSubtotal col-span-1 text-end m-2">{`₹${item.price * item.quantity}`}</p>
            </div>
          ))}
        <div className="cartGrossTotal grid md:grid-cols-5 grid-cols-4">
          <div className="md:col-span-3 col-span-2"></div>
          <div className="cartGrossTotalBox md:grid-cols-5 grid-cols-4">
            <div className="border-[1.5px] border-slate-500 rounded-l-ful"></div>
            <p className="p-4">Gross Total</p>
          </div>
          <div className="col-span-1 text-end ">
            <div className="border-[1.5px] border-slate-500 rounded-r-full"></div>
            <p className="p-4">{`₹${cartItems.reduce(
              (acc, item) => acc + item.quantity * item.price,
              0
            )}`}</p>
          </div>
        </div>
        <div className="checkOutBtn text-end my-4">
          <button
            className=" bg-slate-400 text-slate-900 hover:scale-110 duration-200 p-3 w-56 ml-6 rounded-full font-semibold text-xl"
            onClick={checkoutHandler}
          >
            Check Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
