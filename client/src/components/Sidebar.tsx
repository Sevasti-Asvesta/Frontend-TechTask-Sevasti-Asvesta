import React from "react";
import styles from "./Sidebar.module.css";
import { Category } from "../types";

type SidebarProps = {
  categories: Category[];
  loading: boolean;
};

const Sidebar = ({ categories, loading }: SidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles["sidebar-title"]}>Kategorien</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {categories[0]?.childrenCategories?.list.map(
            ({ name, urlPath }, index) => (
              <li key={index}>
                <a href={`/${urlPath}`}>{name}</a>
              </li>
            )
          )}
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;
