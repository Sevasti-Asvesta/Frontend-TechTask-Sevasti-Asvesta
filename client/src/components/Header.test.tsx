import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Header component", () => {
  test("renders logo, search input, and cart count", () => {
    const mockOnSearchChange = jest.fn();

    render(
      <Header searchTerm="" onSearchChange={mockOnSearchChange} cartCount={3} />
    );

    expect(
      screen.getByRole("heading", { name: /home24/i })
    ).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/search/i);
    expect(searchInput).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: "sofa" } });
    expect(mockOnSearchChange).toHaveBeenCalled();

    expect(screen.getByText(/cart: 3/i)).toBeInTheDocument();
  });
});
