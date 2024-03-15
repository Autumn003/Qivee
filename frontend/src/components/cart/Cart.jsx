import React from "react";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../actions/cartAction";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (newQty < 1) {
      return;
    }
    dispatch(addToCart(id, newQty));
  };

  return (
    <>
      <div className="p-10">
        <div className="cartHeader grid grid-cols-5 mx-3">
          <p className="col-span-3 font-bold text-slate-700 text-lg m-2 ">
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
            <div className="cartContainer" key={item.product}>
              <CartItemCard item={item} />
              <div className="cartInput">
                <button
                  onClick={() => decreaseQuantity(item.product, item.quantity)}
                >
                  -
                </button>
                <input type="number" value={item.quantity} readOnly />
                <button
                  onClick={() =>
                    // increaseQuantity(item.product, item.quantity, item.stock),
                    console.log(item.product)
                  }
                >
                  +
                </button>
              </div>
              <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Cart;
