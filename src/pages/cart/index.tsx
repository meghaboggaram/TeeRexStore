import React,{ useCallback, useContext } from "react";
import CartItem from "../../components/CartItem";
import { CartContext } from "../../util/context";
import "./index.css";

const Cart = () => {
  const cart = useContext(CartContext)[0];

  const computeTotal = useCallback(():number => {
    let sum = 0;
    cart.forEach((product) => (sum += product.item.price * product.quantity));
    return sum;
  }, [cart]);

  return (
    <div className="Cart">
      <h1>Shopping Cart</h1>
      <div className="Cart-list">
        {cart
          .sort((a, b) => a.item.id - b.item.id)
          .map((product) => (
            <div key={product.item.id}>
              <CartItem product={product} />
            </div>
          ))}
        <h2
          style={{ marginTop: "10px" }}
        >{`Cart Total: Rs.${computeTotal()}`}</h2>
      </div>
    </div>
  );
};

export default Cart;
