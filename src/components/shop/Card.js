import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import ItemStars from "./ItemStars";
import "../../styling/card.scss";
import { useDispatch } from "react-redux";

const Card = (props) => {
  const products = useContext(ProductContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const item = products[props.itemId - 1];

  const addToCart = () => {
    dispatch({ type: "add", payload: { id: item.id, amount: 1 } });
  };

  return (
    <div id="item-card" tabIndex="0" key={item.id} data-testid="item-card">
      <div>
        <div id="card-img">
          <img
            src={item.image}
            alt={item.title}
            onClick={() => navigate(`${item.id}`)}
            tabIndex="0"
          />
        </div>
        <div id="card-info">
          <h2 onClick={() => navigate(`${item.id}`)}>{item.title}</h2>
          <span id="card-price" data-testid="prod-price">
            ${item.price}
          </span>
          <div onClick={() => navigate(`${item.id}`)}>
            <ItemStars rating={item.rating} />
          </div>
          <button type="button" onClick={addToCart}>
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
