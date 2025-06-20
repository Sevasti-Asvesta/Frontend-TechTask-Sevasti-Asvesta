# 📝 Sevasti Asvesta Notes

## 🔧 Architecture & Structure

To maintain clarity, scalability, and testability, I refactored the original `ProductList` component by separating concerns into modular components:

- **`Header`** – Contains the logo, search input, and cart.
- **`Sidebar`** – Displays the category navigation.
- **`ProductList`** – Core logic for rendering products, handling search, cart functionality and categories.
- **`ArticleCard`** – Displays individual product information.

## 📦 Data Fetching with useCategories Hook

I extracted the GraphQL API call into a custom hook: `useCategories`.

```ts
const { categories, loading } = useCategories();
```

I used the modern `fetch` API for its cleaner syntax, Promise support, and better compatibility with async/await, making the code more readable and maintainable than `XMLHttpRequest`.

## 🎨 Styling Approach

All styling was refactored using **CSS Modules** with **Flexbox** and **CSS Grid** for layout. This ensures:

- Fully responsive layout
- Modular and scoped styling
- Clean structural separation using `grid-area` and `flex`

## Accessibility

Each component was built with accessibility in mind:

- Semantic HTML structure (`<header>`, `<main>`, `<aside>`, etc.)
- Use of accessible attributes (`aria-label`, `title`, `role` where needed)

## 🔍 Key Functionality

### 🔎 Real-time Search

- Filters product list based on user input in the search bar.

### 🛒 Add to Cart

- Adds products to a cart (stored in `localStorage`)
- Cart items count displayed in the header
- Items persist between sessions
- `console.log` is currently used to showcase cart content
