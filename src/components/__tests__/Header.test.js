import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../Header";

describe("App Header", () => {
  describe("when first mounted", () => {
    test("renders correctly", () => {
      render(<Header />);
      const title = screen.getByRole("heading", { name: "Shop Name" });
      expect(title).toBeInTheDocument();
    });
  });
});
