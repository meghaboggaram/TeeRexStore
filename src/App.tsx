import React from 'react';
import "./App.css";
import Home from "./pages/home";
import { Routes, Route, Link } from "react-router-dom";
import Products from "./pages/products";
import Cart from "./pages/cart";
import { useState } from "react";
import { CartContext } from "./util/context";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartProduct } from './CustomTypes';

function App(): React.ReactElement {
  const defaultCart = useState<CartProduct[]>([]);
  return (
    <div className="App">
      <CartContext.Provider value={defaultCart}>
        <nav className="App-header">
          <Link to="/">
            <p className="App-link">TeeRex store</p>
          </Link>
          <div>
            <Link to="/products">
              <p className="App-link">Products</p>
            </Link>
            <Link to="/cart">
              <div className="App-link">
                <AiOutlineShoppingCart />
              </div>
            </Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </CartContext.Provider>
    </div>
  );
}

export default App;
