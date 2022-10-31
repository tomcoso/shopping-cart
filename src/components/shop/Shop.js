import { useContext, useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import { CategoryContext } from "../../context/CategoryContext";
import Card from "./Card";

const Shop = () => {
  const products = useContext(ProductContext);
  const categories = useContext(CategoryContext);

  console.log(products);
  console.log(categories);

  const [currentCategory, setCurrentCategory] = useState("all");

  return (
    <main>
      <nav>
        <button type="button" onClick={() => setCurrentCategory("all")}>
          all products
        </button>
        {categories.map((each) => (
          <button type="button" onClick={() => setCurrentCategory(each)}>
            {each}
          </button>
        ))}
      </nav>
      <section aria-label={currentCategory}>
        <h1>{currentCategory === "all" ? "all products" : currentCategory}</h1>
        {products.map((item) => {
          if (item.category === currentCategory || currentCategory === "all") {
            return <Card itemId={item.id} />;
          }
          return null;
        })}
      </section>
    </main>
  );
};
export default Shop;
