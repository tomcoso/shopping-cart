import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Shop from "../shop/Shop";
import { ProductContext } from "../../context/ProductContext";
import { CategoryContext } from "../../context/CategoryContext";

const customRender = () =>
  render(
    <ProductContext.Provider
      value={[
        { id: 1, category: "test" },
        { id: 2, category: 2 },
      ]}
    >
      <CategoryContext.Provider value={[1, 2, 3, 4]}>
        <Shop />
      </CategoryContext.Provider>
    </ProductContext.Provider>
  );

describe("on first render", () => {
  test("renders nav and section", () => {
    customRender();

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("region")).toBeInTheDocument();
  });
});

describe("after render with context", () => {
  test("renders all category buttons", () => {
    customRender();

    expect(screen.getAllByRole("button").length).toEqual(5);
  });

  test("displays all products by default", () => {
    customRender();

    expect(
      screen.getByRole("heading", { name: "all products" })
    ).toBeInTheDocument();
    expect(screen.getByText("1", { ignore: "button" })).toBeInTheDocument();
  });

  test("nav displays each category", () => {
    customRender();

    userEvent.click(screen.getByRole("button", { name: "2" }));

    expect(screen.getByText("2", { ignore: "button, h1" })).toBeInTheDocument();
  });
});
