import { useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { Link, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ItemStars from "./ItemStars";

const ItemInfo = () => {
  const products = useContext(ProductContext);
  const itemId = useParams().itemid;
  const [item, setItem] = useState(null);

  useEffect(() => {
    setItem(products.find((i) => i.id === +itemId));
  }, [products, itemId]);

  const [amount, setAmount] = useState(1);

  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch({ type: "add", payload: { id: itemId, amount } });
  };

  return item ? (
    <div>
      <div id="close-button">
        <Link to="/shop">
          <FiArrowLeft color="black" size="30px" />
        </Link>
      </div>
      <img src={item.image} alt={item.title} />
      <div>
        <h1>{item.title}</h1>
        <p data-testid="prod-description">{item.description}</p>
        <ItemStars rating={item.rating} />
        <div id="add-to-cart">
          <span data-testid="prod-price">${item.price}</span>
          <input
            type="number"
            max="10"
            step="1"
            value={amount}
            onChange={(e) => setAmount(Number.parseInt(e.target.value))}
          />
          <button type="button" onClick={addToCart}>
            add to cart
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
export default ItemInfo;
