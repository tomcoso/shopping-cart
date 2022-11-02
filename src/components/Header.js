import { Link, useLocation } from "react-router-dom";
import "../styling/header.scss";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const VisualViewport = window.visualViewport;
  const location = useLocation();
  const [width, setWidth] = useState(VisualViewport.width);
  const [navDisplay, setNavDisplay] = useState("mobile-nav-hidden");

  const cart = useSelector((state) => {
    return state.cart.reduce((a, b) => a + b.amount, 0);
  });

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
              <Link
                to="/"
                onClick={() => window.sessionStorage.removeItem("scroll")}
              >
                Home
              </Link>
              <Link
                to="shop"
                onClick={() => window.sessionStorage.removeItem("scroll")}
              >
                Shop
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link
              to="/"
              onClick={() => window.sessionStorage.removeItem("scroll")}
            >
              Home
            </Link>
            <Link
              to="shop"
              onClick={() => window.sessionStorage.removeItem("scroll")}
            >
              Shop
            </Link>
          </>
        )}
      </nav>
      <div id="cart-icon" data-testid="shopping-cart">
        <Link to="shopping-cart">
          <HiOutlineShoppingBag
            size="35px"
            color={cart ? "#8c6b4c" : "#1c1c1c"}
          />
          {cart ? <div id="cart-count">{cart}</div> : null}
        </Link>
      </div>
    </header>
  );
};

export default Header;
