import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import "../../styling/reduced.scss";

const ReducedCard = (props) => {
  const dispatch = useDispatch();
  const products = useContext(ProductContext);
  const navigate = useNavigate();

  const cartItem = useSelector((state) =>
    state.cart.find((x) => x.id === props.item.id)
  );
  const item = products.find((x) => x.id === props.item.id);

  const increaseAmount = () => {
    dispatch({
      type: "set",
      payload: { id: cartItem.id, amount: cartItem.amount + 1 },
    });
  };

  const decreaseAmount = () => {
    if (cartItem.amount === 0) return;
    dispatch({
      type: "set",
      payload: { id: cartItem.id, amount: cartItem.amount - 1 },
    });
  };

  const removeItem = (e) => {
    dispatch({
      type: "set",
      payload: { id: cartItem.id, amount: 0 },
    });
    dispatch({ type: "clean", payload: {} });
  };

  const toItem = () => {
    window.sessionStorage.setItem("scroll", window.pageYOffset);
    navigate(`/shop/${item.id}`);
  };

  return (
    <div className="reduced-card">
      <div id="reduced-card-image">
        <img src={item.image} alt={item.title} onClick={toItem} />
      </div>
      <div id="reduced-card-info">
        <h2 onClick={toItem}>{item.title}</h2>
        <span>${item.price}</span>
        <div id="reduced-card-count">
          <AiOutlineMinus size="1.5rem" onClick={decreaseAmount} />
          <span>{cartItem.amount}</span>
          <AiOutlinePlus size="1.5rem" onClick={increaseAmount} />
        </div>
        <button type="button" onClick={removeItem}>
          remove
        </button>
      </div>
    </div>
  );
};

export default ReducedCard;
