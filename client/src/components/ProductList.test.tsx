import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductList from "./ProductList";
import * as useCategoriesModule from "../useCategories";
import { Category } from "../types";

const mockCategories: Category[] = [
  {
    name: "Betten",
    articleCount: 2,
    categoryArticles: {
      articles: [
        {
          name: "Bett Holz",
          variantName: "Braun",
          prices: { currency: "EUR", regular: { value: 12999 } },
          images: [{ path: "https://example.com/image.webp" }],
        },
        {
          name: "Bett Blau",
          variantName: "Blau",
          prices: { currency: "EUR", regular: { value: 9999 } },
          images: [{ path: "https://example.com/image.webp" }],
        },
      ],
    },
    childrenCategories: {
      list: [{ name: "Sessel", urlPath: "alle-sessel" }],
    },
  },
];

const renderComponent = () => render(<ProductList />);

describe("ProductList", () => {
  beforeEach(() => {
    jest.spyOn(useCategoriesModule, "default").mockReturnValue({
      categories: mockCategories,
      loading: false,
    });
    localStorage.clear();
  });

  test("renders header and search input", () => {
    renderComponent();
    expect(screen.getByText(/home24/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByText(/cart: 0/i)).toBeInTheDocument();
  });

  test("filters articles based on search term", () => {
    renderComponent();
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "holz" } });

    expect(screen.getByText(/bett holz/i)).toBeInTheDocument();
    expect(screen.queryByText(/bett blau/i)).not.toBeInTheDocument();
  });

  test("shows all articles if search term is empty", () => {
    renderComponent();
    expect(screen.getByText(/bett holz/i)).toBeInTheDocument();
    expect(screen.getByText(/bett blau/i)).toBeInTheDocument();
  });

  test("adds item to cart and updates counter", () => {
    renderComponent();
    const addButton = screen.getAllByText(/add to cart/i)[0];
    fireEvent.click(addButton);
    expect(screen.getByText(/cart: 1/i)).toBeInTheDocument();
  });

  test("shows 'No matching products found.' if no results", () => {
    renderComponent();
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "nonexistent" } });
    expect(screen.getByText(/no matching products found/i)).toBeInTheDocument();
  });

  test("shows loading message when loading", () => {
    jest.spyOn(useCategoriesModule, "default").mockReturnValue({
      categories: [],
      loading: true,
    });
    renderComponent();
    expect(screen.getAllByText(/loading/i).length).toBeGreaterThan(0);
  });
});
