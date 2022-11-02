import { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { CategoryContext } from "../../context/CategoryContext";
import Card from "./Card";
import { Outlet, useLocation } from "react-router-dom";
import "../../styling/shop.scss";

const Shop = () => {
  const products = useContext(ProductContext);
  const categories = useContext(CategoryContext);
  const location = useLocation();

  const [currentCategory, setCurrentCategory] = useState("all");

  return (
    <main id="shop-root">
      {location.pathname !== "/shop" ? (
        <Outlet />
      ) : (
        <>
          <nav>
            <button
              type="button"
              className={currentCategory === "all" ? "selected" : ""}
              onClick={() => setCurrentCategory("all")}
            >
              all products
            </button>
            {categories.map((each) => (
              <button
                key={each}
                type="button"
                onClick={() => setCurrentCategory(each)}
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
