import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./styling/app.scss";

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <>
      <Header cart={cart} />
      <Outlet />
    </>
  );
};

export default App;
