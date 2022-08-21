import { useContext, useState } from "react";
import { CartContext } from "../util/context";

const Product = (props) => {
  const cart = useContext(CartContext)[0];
  const [addedToCart, setAddedToCart] = useState(
    cart.findIndex((val) => val.item.id === props.id) >= 0
  );
  return (
    <div className="Product-container">
      <div style={{ backgroundColor: "#aaa" }}>
        <p style={{ textAlign: "left" }}>{props.name}</p>

        <img
          src={props.img}
          alt="not available"
          style={{
            backgroundColor: "grey",
            width: "50px",
            height: "50px",
            boxShadow: "0 0 5px 5px grey",
          }}
        />
      </div>
      <div style={{ margin: "0 2px" }}>
        <p
          style={{ display: "inline-block", marginRight: "20px" }}
        >{`Rs.${props.price}`}</p>
        <button
          onClick={() => {
            props.onAdd();
            setAddedToCart(true);
          }}
          disabled={addedToCart}
          style={{
            display: "inline-block",
            backgroundColor: "#888",
            height: "30px",
            border: "none",
            cursor: "pointer",
            borderRadius: "2px",
            minWidth: "80px",
          }}
        >
          {addedToCart ? "Added" : "Add to cart"}
        </button>
      </div>
    </div>
  );
};
export default Product;
