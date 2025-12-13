import "./styles/ProductCard.css";
import { Link, useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/auth";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function ProductCard({ prd, msg }) {
  const token = getAccessToken();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const handleAddToCart = async () => {
    if (!token) {
      alert("Please login to add items to cart!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("https://e-commerce-api-74dp.onrender.com/api/cart-items/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + token,
        },
        body: JSON.stringify({
          product_id: prd.id,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Product added to cart ✅");
      } else {
        alert(data.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Something went wrong!");
    }
  };

  const handleWishlist = async () => {
    if (!token) {
      alert("Please login to add items to wishlist!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("https://e-commerce-api-74dp.onrender.com/api/wishlist-items/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + token,
        },
        body: JSON.stringify({
          product: prd.id,
        }),
      });

      if (response.ok) {
        setLiked(true);
        alert("Added to wishlist ❤️");
      } else {
        alert("Already in wishlist");
      }
    } catch (error) {
      console.error("Wishlist error:", error);
    }
  };

  return (
    <div className="product-card">
      <div className="wishlist-icon" onClick={handleWishlist}>
        {liked ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
      </div>

      <Link to={`/product/${prd.id}`} className="product-link">
        <div className="product-image-wrapper">
          <img src={prd.image} alt={prd.name} className="product-img" />

          <div className="hover-overlay">
            <span>Click to view more</span>
          </div>
        </div>
      </Link>

      <Link to={`/product/${prd.id}`} className="product-link">
        <p className="product-name">{prd.name}</p>
      </Link>

      <div className="price-box">
        <span className="discount-price">₹{prd.discount_price}</span>
        <span className="actual-price">₹{prd.price}</span>
      </div>

      <h3 className="product-msg">{msg}</h3>

      <button className="add-to-cart-btn" onClick={handleAddToCart}>
        Add to cart
      </button>
    </div>
  );
}

export default ProductCard;
