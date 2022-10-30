import { Link, useLocation } from "react-router-dom";
import "../styling/header.scss";

const Header = (props) => {
  const location = useLocation();
  return (
    <header
      className={location.pathname === "/" ? "header-home" : "header-shop"}
    >
      <h1 id="shop-title">
        <Link to="/">Conditum</Link>
      </h1>

      <nav id="header-nav">
        <Link to="/">Home</Link>
        <Link to="shop">Shop</Link>
      </nav>
      <div id="cart-icon" data-testid="shopping-cart">
        <Link to="shopping-cart">Cart ({props.cart.length})</Link>
      </div>
    </header>
  );
};

export default Header;
