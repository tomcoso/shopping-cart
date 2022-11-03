import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./components/Home";
import Shop from "./components/shop/Shop";
import ItemInfo from "./components/shop/ItemInfo";
import NotFound from "./NotFound";
import Cart from "./components/shop/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/shopping-cart">
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />}>
          <Route path=":itemid" element={<ItemInfo />} />
        </Route>
        <Route path="/shopping-cart" element={<Cart />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
