import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { ImStarFull, ImStarEmpty, ImStarHalf } from "react-icons/im";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const products = useContext(ProductContext);

  const navigate = useNavigate();

  const item = products[props.itemId - 1];

  const genStars = (val) => {
    const arr = [];
    for (let i = 5; i > 0; i--) {
      if (val > 1) {
        val -= 1;
        arr.push(<ImStarFull />);
      } else if (val > 0) {
        val = 0;
        arr.push(<ImStarHalf />);
      } else if (val === 0) {
        arr.push(<ImStarEmpty />);
      }
    }
    return arr;
  };

  const addToCart = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      key={item.id}
      data-testid="item-card"
      onClick={() => navigate(`/${item.id}`)}
    >
      <img src={item.image} alt={item.title} />
      <div>
        <h2>{item.title}</h2>
        <button type="button" onClick={addToCart}>
          add to cart
        </button>
        <div data-testid="prod-rating">
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
