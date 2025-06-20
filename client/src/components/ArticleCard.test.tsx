import React from "react";
import { render } from "@testing-library/react";
import ArticleCard from "./ArticleCard";
import { Article } from "../types";

const mockArticle: Article = {
  name: "Bett Holz",
  variantName: "Braun",
  prices: {
    currency: "EUR",
    regular: {
      value: 12999,
    },
  },
  images: [
    {
      path: "https://example.com/image.webp",
    },
  ],
};

const mockAddToCart = jest.fn();

test("renders the ArticleCard with correct content", () => {
  const { getByText, getByAltText, getByRole } = render(
    <ArticleCard article={mockArticle} onAddToCart={mockAddToCart} />
  );

  expect(getByText("Bett Holz")).toBeInTheDocument();

  expect(getByText(/129,99/)).toBeInTheDocument();

  expect(getByAltText("Braun")).toBeInTheDocument();

  expect(getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
});
