import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";
import userEvent from "@testing-library/user-event";
import { Link, useLocation } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  Link: jest.fn(),
  useLocation: jest.fn(),
}));

const click = jest.fn();

describe("App Header", () => {
  beforeEach(() => {
    Link.mockImplementation(({ children }) => (
      <a href="/" onClick={click}>
        {children}
      </a>
    ));
    useLocation.mockImplementation(() => {
      return [{ pathname: "/" }, ""];
    });
  });
  describe("when first mounted", () => {
    test("renders heading, navbar, and cart", () => {
      const cartObj = [];

      render(<Header cart={cartObj} />);
      const title = screen.getByRole("heading", { name: "Conditum" });
      const nav = screen.getByRole("navigation");
      const cart = screen.getByTestId("shopping-cart");

      expect(title).toBeInTheDocument();
      expect(nav).toBeInTheDocument();
      expect(cart).toBeInTheDocument();
    });

    test("renders cart with no items in cart", () => {
      const cartObj = [];
      render(<Header cart={cartObj} />);

      expect(screen.getByTestId("shopping-cart").textContent).toEqual(
        "Cart (0)"
      );
    });

    test("renders cart with multiple items in cart", () => {
      const cartObj = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      render(<Header cart={cartObj} />);

      expect(screen.getByTestId("shopping-cart").textContent).toEqual(
        "Cart (9)"
      );
    });
  });

  describe("when user interacts", () => {
    test("takes user to shopping cart", () => {
      const cartObj = [];
      render(<Header cart={cartObj} />);
      const shopLink = screen.getByTestId("shopping-cart");

      userEvent.click(shopLink);

      expect(Link).toHaveBeenCalled();
    });

    test("takes user to shop", () => {
      render(<Header cart={[]} />);

      userEvent.click(screen.getByText("Shop"));

      expect(click).toHaveBeenCalled();
    });

    test("takes user to home", () => {
      render(<Header cart={[]} />);

      userEvent.click(screen.getByText("Home"));

      expect(click).toHaveBeenCalled();
    });

    test("takes user to home when click on logo", () => {
      render(<Header cart={[]} />);

      userEvent.click(screen.getByText("Conditum"));

      expect(click).toHaveBeenCalled();
    });
  });
});
