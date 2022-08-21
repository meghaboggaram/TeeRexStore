import { useContext } from "react";
import { CartContext } from "../util/context";
import "./index.css";

const CartItem = (props) => {
  const {
    product: { item, quantity },
  } = props;
  const setCart = useContext(CartContext)[1];
  return (
    <div className="Cart-item">
      <div className="Cartitem-img">
        <img
          src={item.imageURL}
          alt="not available"
          style={{ width: "70px", height: "70px" }}
        />
      </div>
      <div className="Cartitem-name-price">
        <p>{item.name}</p>
        <p>{`Rs. ${item.price}`}</p>
      </div>
      <div className="Cartitem-quantity">
        <button
          disabled={quantity === 1}
          onClick={() => {
            if (quantity > 1) {
              setCart((curCart) => {
                let newCart = curCart.filter((val) => val.item.id !== item.id);
                newCart.push({ item, quantity: quantity - 1 });
                return newCart;
              });
            }
          }}
        >
          -
        </button>
        <h3 style={{ margin: "0px 1rem" }}>{quantity}</h3>
        <button
          disabled={quantity === item.quantity}
          onClick={() => {
            if (quantity < item.quantity) {
              setCart((curCart) => {
                let newCart = curCart.filter((val) => val.item.id !== item.id);
                newCart.push({ item, quantity: quantity + 1 });
                return newCart;
              });
            }
          }}
        >
          +
        </button>

        <button
          onClick={() => {
            setCart((curCart) =>
              curCart.filter((val) => val.item.id !== item.id)
            );
          }}
          style={{ marginLeft: "1rem" }}
        >
          delete
        </button>
      </div>
    </div>
  );
};
export default CartItem;
