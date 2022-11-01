import { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ItemStars from "./ItemStars";

const Card = (props) => {
  const products = useContext(ProductContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);

  const item = products[props.itemId - 1];

  const addToCart = () => {
    dispatch({ type: "add", payload: { id: item.id, amount: amount } });
  };

  return (
    <div key={item.id} data-testid="item-card">
      <img
        src={item.image}
        alt={item.title}
        onClick={() => navigate(`${item.id}`)}
      />
      <div>
        <h2 onClick={() => navigate(`${item.id}`)}>{item.title}</h2>
        <div id="add-to-cart">
          <span data-testid="prod-price">${item.price}</span>
          <input
            max="10"
            step="1"
            type="number"
            onChange={(e) => {
              setAmount(Number.parseInt(e.target.value));
            }}
            value={amount}
          />
          <button type="button" onClick={addToCart}>
            add to cart
          </button>
        </div>
        <div onClick={() => navigate(`${item.id}`)}>
          <ItemStars rating={item.rating} />
        </div>
      </div>
    </div>
  );
};

export default Card;
