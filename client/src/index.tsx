import React from "react";
import * as ReactDOM from "react-dom/client";

import "./index.css";
import ProductList from "./components/ProductList";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <ProductList />
  </React.StrictMode>
);
