import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { CategoryContext } from "../../context/CategoryContext";
import Card from "./Card";
import { Outlet, useLocation } from "react-router-dom";
import "../../styling/shop.scss";
import Loader from "../Loader";

const Shop = () => {
  const products = useContext(ProductContext);
  const categories = useContext(CategoryContext);
  const location = useLocation();

  const [currentCategory, setCurrentCategory] = useState("all");

  useEffect(() => {
    const scroll = window.sessionStorage.getItem("scroll");

    if (scroll) {
      window.scrollTo(0, scroll);
    }
  });

  return (
    <main id="shop-root">
      {location.pathname !== "/shop" ? (
        <Outlet />
      ) : products.length === 0 ? (
        <Loader />
      ) : (
        <>
          <nav>
            <button
              type="button"
              className={currentCategory === "all" ? "selected" : ""}
              onClick={() => {
                setCurrentCategory("all");
                window.sessionStorage.removeItem("scroll");
              }}
            >
              all products
            </button>
            {categories.map((each) => (
              <button
                key={each}
                type="button"
                onClick={() => {
                  setCurrentCategory(each);
                  window.sessionStorage.removeItem("scroll");
                }}
                className={currentCategory === each ? "selected" : ""}
              >
                {each}
              </button>
            ))}
          </nav>
          <section aria-label={currentCategory}>
            <h1>
              {currentCategory === "all" ? "all products" : currentCategory}
            </h1>
            <div id="cards-wrapper">
              {products.map((item) => {
                if (
                  item.category === currentCategory ||
                  currentCategory === "all"
                ) {
                  return <Card key={item.id} itemId={item.id} />;
                }
                return null;
              })}
            </div>
          </section>
        </>
      )}
    </main>
  );
};
export default Shop;
