import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import ItemInfo from "../shop/ItemInfo";
import { useParams } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store/store";
import { ProductContext } from "../../context/ProductContext";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

const customRender = () => {
  render(
    <Provider store={store}>
      <ProductContext.Provider
        value={[
          {
            id: 1,
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price: 109.95,
            description:
              "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category: "men's clothing",
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating: {
              rate: 3.9,
              count: 120,
            },
          },
        ]}
      >
        <ItemInfo />
      </ProductContext.Provider>
    </Provider>
  );
};

describe("on first render", () => {
  test("renders image, title, desc, price, and rating", () => {
    useParams.mockImplementation(() => ({ itemid: 1 }));
    customRender();

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.getByTestId("prod-description")).toBeInTheDocument();
    expect(screen.getByTestId("prod-rating")).toBeInTheDocument();
    expect(screen.getByTestId("prod-price")).toBeInTheDocument();
  });

  test("renders add to cart section", () => {
    useParams.mockImplementation(() => ({ itemid: 1 }));
    customRender();

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toBeInTheDocument();
  });
});
