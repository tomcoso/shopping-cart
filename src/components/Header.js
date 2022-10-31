import { Link, useLocation } from "react-router-dom";
import "../styling/header.scss";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useState } from "react";

const Header = (props) => {
  const VisualViewport = window.visualViewport;
  const location = useLocation();
  const [width, setWidth] = useState(VisualViewport.width);
  const [navDisplay, setNavDisplay] = useState("mobile-nav-hidden");

  VisualViewport.addEventListener("resize", (e) => {
    setWidth(VisualViewport.width);
  });

  return (
    <header
      className={location.pathname === "/" ? "header-home" : "header-shop"}
    >
      <h1 id="shop-title">
        <Link to="/">conditum</Link>
      </h1>
      <nav id="header-nav">
        {width < 600 ? (
          <>
            <AiOutlineMenu
              size="25px"
              onClick={() => {
                navDisplay === "mobile-nav-hidden"
                  ? setNavDisplay("mobile-nav-visible")
                  : setNavDisplay("mobile-nav-hidden");
              }}
            />
            <div id={navDisplay}>
              <Link to="/">Home</Link>
              <Link to="shop">Shop</Link>
            </div>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="shop">Shop</Link>
          </>
        )}
      </nav>
      <div id="cart-icon" data-testid="shopping-cart">
        <Link to="shopping-cart">
          <HiOutlineShoppingBag
            size="35px"
            color={props.cart.length ? "#8c6b4c" : "#1c1c1c"}
          />
          {props.cart.length ? (
            <div id="cart-count">{props.cart.length}</div>
          ) : null}
        </Link>
      </div>
    </header>
  );
};

export default Header;
