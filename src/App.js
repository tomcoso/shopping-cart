import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ProductContext } from "./context/ProductContext";
import { CategoryContext } from "./context/CategoryContext";
import Header from "./components/Header";
import "./styling/app.scss";

const App = () => {
  const [cart, setCart] = useState([]);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let prodData = await fetch("https://fakestoreapi.com/products");
      let catData = await fetch("https://fakestoreapi.com/products/categories");

      prodData = await prodData.json();
      catData = await catData.json();
      setProducts(prodData);
      setCategories(catData);
    };
    fetchData();
  }, []);

  return (
    <>
      <ProductContext.Provider value={products}>
        <CategoryContext.Provider value={categories}>
          <Header cart={cart} />
          <Outlet />
        </CategoryContext.Provider>
      </ProductContext.Provider>
    </>
  );
};

export default App;
