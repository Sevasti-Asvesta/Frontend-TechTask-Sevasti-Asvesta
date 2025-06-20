import React, { useState, ChangeEvent, useEffect } from "react";
import useCategories from "../useCategories";
import ArticleCard from "./ArticleCard";
import styles from "./ProductList.module.css";
import { Article } from "../types";
import Header from "./Header";
import Sidebar from "./Sidebar";

const ProductList = () => {
  const { categories, loading } = useCategories();

  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Article[]>(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleAddToCart = (article: Article) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, article];
      console.log("Cart items:", updatedCart);
      return updatedCart;
    });
  };

  const allArticles = categories.flatMap(
    (category) => category.categoryArticles.articles
  );

  const filteredArticles = allArticles.filter((article) =>
    article.name.toLowerCase().includes(searchTerm)
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  console.log(categories)

  return (
    <div className={styles.container}>
      <Header
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        cartCount={cart.length}
      />
      <Sidebar categories={categories} loading={loading} />

      <main className={styles.main} role="main" aria-label="Product results">
        {loading ? (
          <p>"Loading..."</p>
        ) : filteredArticles.length > 0 ? (
          <div className={styles.articles}>
            {filteredArticles.map((article, index) => (
              <ArticleCard
                key={index}
                article={article}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <p>No matching products found.</p>
        )}
      </main>

      <footer className={styles.footer}>
        <small>
          Alle Preise sind in Euro (€) inkl. gesetzlicher Umsatzsteuer und
          Versandkosten.
        </small>
      </footer>
    </div>
  );
};

export default ProductList;
