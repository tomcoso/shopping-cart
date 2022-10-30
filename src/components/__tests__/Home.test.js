import Home from "../Home";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Link } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  Link: jest.fn(),
}));

const click = jest.fn();

test("renders headers, text and button", () => {
  Link.mockImplementation(({ children }) => (
    <a href="/" role="button" onClick={click}>
      {children}
    </a>
  ));
  render(<Home />);

  expect(screen.getAllByRole("heading").length).toEqual(2);
  expect(screen.getByTestId("home-text")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});
test("button works", () => {
  Link.mockImplementation(({ children }) => (
    <a href="/" role="button" onClick={click}>
      {children}
    </a>
  ));
  render(<Home />);

  userEvent.click(screen.getByRole("button"));

  expect(click).toHaveBeenCalled();
});
