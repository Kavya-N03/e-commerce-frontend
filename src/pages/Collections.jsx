import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import "../Components/styles/ProductCard.css";

function Collections() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search).get("search") || "";

  const fetchProducts = async (searchTerm = "") => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://e-commerce-api-74dp.onrender.com/api/products/?search=${searchTerm}`
      );
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setMsg("Error in displaying products");
      setLoading(false);
    }
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch("https://e-commerce-api-74dp.onrender.com/api/category/");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      setMsg("Error in fetching Category");
    }
  };

  useEffect(() => {
    fetchProducts(query);
    fetchCategory();
  }, [query]);

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((prd) => prd.category === selectedCategory);

  return (
    <div>
      <div className="category-filter">
        <button
          className={selectedCategory === "all" ? "cat-btn active" : "cat-btn"}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            className={
              selectedCategory === cat.id ? "cat-btn active" : "cat-btn"
            }
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          Searching products...
        </p>
      ) : msg ? (
        <p style={{ textAlign: "center", marginTop: "40px", color: "red" }}>
          {msg}
        </p>
      ) : filteredProducts.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          No products found
        </p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((prd) => (
            <ProductCard key={prd.id} prd={prd} msg={msg} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Collections;
