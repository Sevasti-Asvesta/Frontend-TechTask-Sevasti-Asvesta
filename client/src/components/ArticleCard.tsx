import React from "react";
import { Article } from "../types";
import styles from "./ArticleCard.module.css";

interface ArticleCardProps {
  article: Article;
  onAddToCart: (article: Article) => void;
}

const intlNumberFormatValues = ["de-DE", "currency", "EUR"] as const;

const formatter = new Intl.NumberFormat(intlNumberFormatValues[0], {
  style: intlNumberFormatValues[1],
  currency: intlNumberFormatValues[2],
});

const ArticleCard = ({ article, onAddToCart }: ArticleCardProps) => {
  const { name, prices, images, variantName } = article;

  return (
    <div className={styles.article}>
      {images.map(({ path }, index) => (
        <img key={index} src={path} alt={variantName} loading="lazy" />
      ))}

      <div className={styles["article-content"]}>
        <h3>{name}</h3>
        <p>{formatter.format(prices.regular.value / 100)}</p>
        <button onClick={() => onAddToCart(article)}>Add to cart</button>
      </div>
    </div>
  );
};

export default ArticleCard;
