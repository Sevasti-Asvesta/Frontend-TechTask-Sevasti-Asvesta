import React from "react";
import { render, screen } from "@testing-library/react";
import Sidebar from "./Sidebar";
import { Category } from "../types";

const mockCategories: Category[] = [
  {
    name: "Kategorien",
    articleCount: 10,
    categoryArticles: {
      articles: [],
    },
    childrenCategories: {
      list: [
        { name: "Betten", urlPath: "alle-betten" },
        { name: "Polstermöbel", urlPath: "alle-polstermoebel" },
      ],
    },
  },
];

describe("Sidebar component", () => {
  test("renders loading state", () => {
    render(<Sidebar categories={mockCategories} loading={true} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders category links when not loading", () => {
    render(<Sidebar categories={mockCategories} loading={false} />);

    expect(
      screen.getByRole("heading", { name: /kategorien/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /betten/i })).toHaveAttribute(
      "href",
      "/alle-betten"
    );
    expect(screen.getByRole("link", { name: /polstermöbel/i })).toHaveAttribute(
      "href",
      "/alle-polstermoebel"
    );
  });
});
