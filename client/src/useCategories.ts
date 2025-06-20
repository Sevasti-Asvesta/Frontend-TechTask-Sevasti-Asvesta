import { useEffect, useState } from "react";
import type { Category } from "./types";

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `{
              categories: productLists(ids: "156126", locale: de_DE) {
                name
                articleCount
                childrenCategories: childrenProductLists {
                  list {
                    name
                    urlPath
                  }
                }
                categoryArticles: articlesList(first: 50) {
                  articles {
                    name
                    variantName
                    prices {
                      currency
                      regular {
                        value
                      }
                    }
                    images(format: WEBP, maxWidth: 200, maxHeight: 200, limit: 1) {
                      path
                    }
                  }
                }
              }
            }`,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          setCategories(result.data.categories);
        } else {
          console.error("GraphQL request failed", response.statusText);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { categories, loading };
};

export default useCategories;
