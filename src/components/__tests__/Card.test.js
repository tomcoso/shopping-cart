import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Card from "../shop/Card";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store/store";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
const mockNav = jest.fn();

const renderX = () => {
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
        <Card itemId="1" />
      </ProductContext.Provider>
    </Provider>
  );
};

beforeAll(() => {});

describe("on render", () => {
  test("displays image, title, rating and cart button", () => {
    renderX();

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByTestId("prod-rating")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});

describe("on interaction", () => {
  test("goes to itemInfo on img, title and rating click", () => {
    useNavigate.mockImplementation(() => mockNav);

    renderX();

    userEvent.click(screen.getByRole("img"));
    userEvent.click(screen.getByRole("heading"));
    userEvent.click(screen.getByTestId("prod-rating"));

    expect(mockNav).toHaveBeenCalledTimes(3);
  });

  test("does not go into itemInfo on button click", () => {
    useNavigate.mockImplementation(() => mockNav);

    renderX();

    userEvent.click(screen.getByRole("button"));

    expect(mockNav).not.toHaveBeenCalled();
  });
});
