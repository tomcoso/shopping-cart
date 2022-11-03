import { useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ItemStars from "./ItemStars";
import "../../styling/itemInfo.scss";

const ItemInfo = () => {
  const products = useContext(ProductContext);
  const itemId = useParams().itemid;
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setItem(products.find((i) => i.id === +itemId));
  }, [products, itemId]);

  const [amount, setAmount] = useState(1);

  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch({ type: "add", payload: { id: +itemId, amount: amount } });
  };

  return item ? (
    <div id="item-info">
      <div id="close-button">
        <FiArrowLeft color="black" size="30px" onClick={() => navigate(-1)} />
      </div>
      <div>
        <div id="item-img">
          <img src={item.image} alt={item.title} />
        </div>

        <div id="main-item-info">
          <h1>{item.title}</h1>
          <p data-testid="prod-description">{item.description}</p>
          <div>
            <ItemStars rating={item.rating} />
          </div>

          <div id="add-to-cart">
            <span data-testid="prod-price">${item.price}</span>
            <select
              onChange={(e) => {
                setAmount(Number.parseInt(e.target.value));
              }}
              value={amount}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button type="button" onClick={addToCart}>
              add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
export default ItemInfo;
