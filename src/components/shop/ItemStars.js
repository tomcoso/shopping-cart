import { ImStarFull, ImStarEmpty, ImStarHalf } from "react-icons/im";

const ItemStars = ({ rating }) => {
  const genStars = (val) => {
    const arr = [];
    for (let i = 5; i > 0; i--) {
      if (val > 1) {
        val -= 1;
        arr.push(<ImStarFull color="#e6b402" key={i} />);
      } else if (val > 0) {
        val = 0;
        arr.push(<ImStarHalf color="#e6b402" key={i} />);
      } else if (val === 0) {
        arr.push(<ImStarEmpty color="#e6b402" key={i} />);
      }
    }
    return arr;
  };

  return (
    <>
      <span>{rating.rate}</span>
      <span id="card-rate" data-testid="prod-rating">
        {genStars(rating.rate).map((star) => star)}
      </span>
    </>
  );
};

export default ItemStars;
