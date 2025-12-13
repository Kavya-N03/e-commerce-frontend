import { useEffect, useState } from "react";
import Sliders from "../Components/Sliders";
import "../Components/styles/featuredproducts.css";
import HomeCTA from "../Components/HomeCTA";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  const productIds = [3, 4, 5, 6, 7, 11];

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const requests = productIds.map(async (id) => {
        try {
          const res = await fetch(`https://e-commerce-api-74dp.onrender.com/api/products/${id}/`);
          if (!res.ok) return null;
          return await res.json();
        } catch {
          return null;
        }
      });

      const data = await Promise.all(requests);
      const validProducts = data.filter((item) => item !== null);
      setProducts(validProducts);
    } catch (error) {
      console.log("Error loading featured products:", error);
    }
  };

  return (
    <>
      <Sliders />

      <section className="featured-section">
        <div className="featured-container">
          <div className="featured-header">
            <h2 className="featured-title">Featured Products</h2>
          </div>

          <div className="featured-grid">
            {products.map((product) => (
              <div key={product.id} className="featured-card">
                <div className="featured-image-box">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="featured-image"
                  />
                </div>

                <div className="featured-info">
                  <h3 className="featured-name">{product.title}</h3>

                  <div className="featured-price-box">
                    <span className="featured-discount-price">
                      ₹{product.discount_price ?? product.price}
                    </span>

                    {product.discount_price && (
                      <span className="featured-original-price">
                        ₹{product.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <HomeCTA/>
    </>
  );
}

export default FeaturedProducts;
