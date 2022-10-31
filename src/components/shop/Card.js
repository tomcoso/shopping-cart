import { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
const Card = (props) => {
  const products = useContext(ProductContext);

  const item = products[props.itemId - 1];

  return <div>{item.id}</div>;
};

export default Card;
