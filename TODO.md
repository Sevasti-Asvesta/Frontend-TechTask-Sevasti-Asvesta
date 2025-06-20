# 🚧 Future Improvements

There are a few areas I would continue optimizing if I had more time:

## 🛒 Cart Functionality

Currently, items added to the cart are stored in `localStorage` and logged to the console. I would improve this by:

- Displaying the cart contents in a dedicated **Cart page**
- Adding functionality to **remove or update items**

### Category Navigation

The category links are currently non-functional and while investiagting the `urlPath` values for category navigation, I noticed that the GraphQL query fetches a list of 50 products from the parent category, not scoped to the visible subcategories. As a next steps I would investigate if subcategory-specific products can be fetched and if yes, I would add routing to filter products by category.

**Note:** For any questions, please feel free to reach out to <sevasti.asvesta@gmail.com>
