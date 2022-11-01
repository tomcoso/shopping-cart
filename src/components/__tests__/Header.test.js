import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";
import userEvent from "@testing-library/user-event";
import { Link, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../store/store";

jest.mock("react-router-dom", () => ({
  Link: jest.fn(),
  useLocation: jest.fn(),
}));

const click = jest.fn();

const customRender = () => {
  render(
    <Provider store={store}>
      <Header />
    </Provider>
  );
};

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
    window.visualViewport = { width: 900, addEventListener: jest.fn() };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("when first mounted", () => {
    test("renders heading, navbar, and cart", () => {
      customRender();
      const title = screen.getByRole("heading", { name: "conditum" });
      const nav = screen.getByRole("navigation");
      const cart = screen.getByTestId("shopping-cart");

      expect(title).toBeInTheDocument();
      expect(nav).toBeInTheDocument();
      expect(cart).toBeInTheDocument();
    });

    test.skip("renders cart with no items in cart", () => {
      // INTEGRATION
      customRender();

      expect(screen.getByTestId("shopping-cart").textContent).toEqual(
        "Cart (0)"
      );
    });

    test.skip("renders cart with multiple items in cart", () => {
      // INTEGRATION
      customRender();

      expect(screen.getByTestId("shopping-cart").textContent).toEqual(
        "Cart (9)"
      );
    });
  });

  describe("when user interacts", () => {
    test("takes user to shopping cart", () => {
      customRender();
      const shopLink = screen.getByTestId("shopping-cart");

      userEvent.click(shopLink);

      expect(Link).toHaveBeenCalled();
    });

    test("takes user to shop", () => {
      customRender();

      userEvent.click(screen.getByText("Shop"));

      expect(click).toHaveBeenCalled();
    });

    test("takes user to home", () => {
      customRender();

      userEvent.click(screen.getByText("Home"));

      expect(click).toHaveBeenCalled();
    });

    test("takes user to home when click on logo", () => {
      customRender();

      userEvent.click(screen.getByText("conditum"));

      expect(click).toHaveBeenCalled();
    });
  });
});
