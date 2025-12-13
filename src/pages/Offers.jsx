import { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
import "../Components/styles/Offers.css";

function Offers() {
  const [offerProducts, setOfferProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const response = await fetch("https://e-commerce-api-74dp.onrender.com/api/products/");
      const data = await response.json();

      const filtered = data.filter((item) => item.is_offer === true);

      setOfferProducts(filtered);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching offers:", error);
      setLoading(false);
    }
  };

  return (
    <div className="offers-page">

      <div className="offer-banner-wrapper">
        <div className="offer-banner">
          <h1>🔥 Today’s Top Deals</h1>
          <p>
            Hand-picked products at special prices. Grab the best offers before
            stock runs out.
          </p>
          <span>Limited-time offers • Trusted quality • Best value</span>
        </div>
      </div>

      <div className="promo-cards-wrapper">
        <div className="promo-card festive">
          <h3>Festive Specials</h3>
          <p>Celebrate the season with exclusive deals</p>
        </div>

        <div className="promo-card new">
          <h3>New Arrivals</h3>
          <p>Latest collections with fresh styles</p>
        </div>

        <div className="promo-card trending">
          <h3>Trending Deals</h3>
          <p>Top-selling products customers love</p>
        </div>

        <div className="promo-card limited">
          <h3>Limited Time</h3>
          <p>Hurry up before these deals expire</p>
        </div>
      </div>


      <div className="offer-intro">
        <h2>Exclusive Offers & Featured Deals</h2>
        <p>
          Explore our collection of specially selected discounted products.
          These deals are refreshed regularly and include top-selling items
          across multiple categories. Don’t miss the chance to save on products
          you love.
        </p>
      </div>

      {/* 🛒 OFFER PRODUCTS */}
      <div className="offer-products">
        {loading ? (
          <p className="loading-text">Loading today’s best offers...</p>
        ) : offerProducts.length === 0 ? (
          <p className="no-offers">
            Currently no deals available. Please check back later.
          </p>
        ) : (
          <div className="offer-grid">
            {offerProducts.map((prd) => (
              <ProductCard key={prd.id} prd={prd} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Offers;
