import React, { ChangeEvent } from "react";
import styles from "./Header.module.css";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  cartCount: number;
}

const Header = ({ searchTerm, onSearchChange, cartCount }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <a
        href="/"
        className={styles["logo-link"]}
        title="Go to homepage"
        aria-label="Home24 homepage"
      >
        <h1 className={styles.logo}>home24</h1>
      </a>
      <div>
        <input
          className={styles.search}
          type="text"
          placeholder="Search"
          aria-label="Search products"
          value={searchTerm}
          onChange={onSearchChange}
        />
        <span className={styles.cart} aria-label="Cart">
          🛒 Cart: {cartCount}
        </span>
      </div>
    </header>
  );
};

export default Header;
