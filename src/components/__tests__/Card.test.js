import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Card from "../shop/Card";
import { ProductContext } from "../../context/ProductContext";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
const mockNav = jest.fn();

const renderX = () => {
  render(
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
  );
};

beforeEach(() => {});

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
  test.skip("adds to cart on button click", () => {
    renderX();

    userEvent.click(screen.getByRole("button"));

    // learn redux
  });

  test("goes to itemInfo on card click", () => {
    useNavigate.mockImplementation(() => mockNav);

    renderX();

    userEvent.click(screen.getByTestId("item-card"));

    expect(mockNav).toHaveBeenCalled();
  });

  test("does not go into itemInfo on button click", () => {
    useNavigate.mockImplementation(() => mockNav);

    renderX();

    userEvent.click(screen.getByRole("button"));

    expect(mockNav).not.toHaveBeenCalled();
  });
});
