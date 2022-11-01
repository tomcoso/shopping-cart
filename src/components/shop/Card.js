import { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { ImStarFull, ImStarEmpty, ImStarHalf } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Card = (props) => {
  const products = useContext(ProductContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(1);

  const item = products[props.itemId - 1];

  const genStars = (val) => {
    const arr = [];
    for (let i = 5; i > 0; i--) {
      if (val > 1) {
        val -= 1;
        arr.push(<ImStarFull key={i} />);
      } else if (val > 0) {
        val = 0;
        arr.push(<ImStarHalf key={i} />);
      } else if (val === 0) {
        arr.push(<ImStarEmpty key={i} />);
      }
    }
    return arr;
  };

  const addToCart = (e) => {
    dispatch({ type: "add", payload: { id: item.id, amount: amount } });
  };

  return (
    <div key={item.id} data-testid="item-card">
      <img
        src={item.image}
        alt={item.title}
        onClick={() => navigate(`/${item.id}`)}
      />
      <div>
        <h2 onClick={() => navigate(`/${item.id}`)}>{item.title}</h2>
        <div id="add-to-cart">
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
        <div data-testid="prod-rating" onClick={() => navigate(`/${item.id}`)}>
          <span>({item.rating.count})</span>
          <span>{item.rating.rate}</span>
          <span id="card-rate">
            {genStars(item.rating.rate).map((star) => star)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
