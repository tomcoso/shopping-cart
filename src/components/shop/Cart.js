import { useContext } from "react";
import { useSelector } from "react-redux";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";

import ReducedCard from "./ReducedCard";
import { BsShop } from "react-icons/bs";
import { FiArrowLeft } from "react-icons/fi";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const products = useContext(ProductContext);
  const navigate = useNavigate();

  const getTotal = () => {
    const selectedProducts = products.filter((x) =>
      cart.find((y) => y.id === x.id)
    );
    return cart.reduce((a, b) => {
      a += selectedProducts.find((x) => x.id === b.id).price * b.amount;
      return a;
    }, 0);
  };

  return (
    <main id="shopping-cart">
      <div id="close-button">
        <FiArrowLeft color="black" size="30px" onClick={() => navigate(-1)} />
      </div>
      <h1>your shopping cart</h1>
      <div id="shopping-items">
        {cart.length === 0 ? (
          <>
            <p>Your shopping cart is empty</p>
            <BsShop size="50%" color="rgba(0,0,0,.05)" />
          </>
        ) : (
          cart.map((x) => <ReducedCard item={x} key={x.id} />)
        )}
      </div>
      <div id="subtotal">
        <span>Subtotal : ${getTotal().toFixed(2)}</span>
        <button type="button">proceed to checkout</button>
      </div>
    </main>
  );
};

export default Cart;
