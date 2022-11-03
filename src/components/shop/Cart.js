import { useContext } from "react";
import { useSelector } from "react-redux";
import { ProductContext } from "../../context/ProductContext";
import { createPortal } from "react-dom";

import ReducedCard from "./ReducedCard";
import { BsShop } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";

import "../../styling/cart.scss";

const Cart = (props) => {
  const cart = useSelector((state) => state.cart);
  const products = useContext(ProductContext);

  const getTotal = () => {
    const selectedProducts = products.filter((x) =>
      cart.find((y) => y.id === x.id)
    );
    return cart.reduce((a, b) => {
      a += selectedProducts.find((x) => x.id === b.id).price * b.amount;
      return a;
    }, 0);
  };

  const close = (e) => {
    props.close();
  };

  return createPortal(
    <section
      id="shopping-cart"
      className={props.status ? "show" : "hide"}
      onClick={close}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div id="heading">
          <FiArrowRight color="#1c1c1c" size="40px" onClick={props.close} />
          <h1>your shopping cart</h1>
        </div>

        <div id="shopping-items">
          {cart.length === 0 ? (
            <>
              <p>Your shopping cart is empty</p>
              <BsShop size="50%" color="rgba(0,0,0,.05)" />
            </>
          ) : (
            cart.map((x) => (
              <ReducedCard close={props.close} item={x} key={x.id} />
            ))
          )}
        </div>
        <div id="subtotal">
          <span>
            Subtotal : <span>${getTotal().toFixed(2)}</span>
          </span>
          <button type="button">proceed to checkout</button>
        </div>
      </div>
    </section>,
    document.getElementById("root")
  );
};

export default Cart;
