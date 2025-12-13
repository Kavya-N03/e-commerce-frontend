import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../Components/styles/ProductDetails.css";
import { getAccessToken } from "../utils/auth";

function ProductDetails() {
  const { id } = useParams();
  const token = getAccessToken();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`https://e-commerce-api-74dp.onrender.com/api/products/${id}/`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const getReviews = async () => {
      try {
        const response = await fetch(
          `https://e-commerce-api-74dp.onrender.com/api/reviews/?product=${id}`
        );
        const data = await response.json();
        setReviews(data);
      } catch (error) {nrender.com/api
        console.error("Error fetching reviews:", error);
      }
    };

    getProduct();
    getReviews();
  }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login to write a review");
      return;
    }

    const response = await fetch("https://e-commerce-api-74dp.onrender.com/api/reviews/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + token,
      },
      body: JSON.stringify({
        product: id,
        rating: rating,
        review_text: reviewText,
      }),
    });

    if (response.status === 400) {
      alert("You already reviewed this product.");
      return;
    }

    if (!response.ok) {
      alert("Failed to submit review");
      return;
    }

    setReviewText("");
    setMsg("Review added successfully!");

    const updated = await fetch(
      `https://e-commerce-api-74dp.onrender.com/api/reviews/?product=${id}`
    );
    const newData = await updated.json();
    setReviews(newData);
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="product-details">
      <div className="product-img-wrapper">
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>

        <p className="discount-price">₹{product.discount_price}</p>
        <p className="product-price">₹{product.price}</p>

        <p className="product-description">{product.description}</p>
      </div>

      {/* REVIEWS SECTION */}
      <div className="reviews-section">
        <h2>Customer Reviews</h2>

        {reviews.length === 0 && <p>No reviews yet.</p>}

        {reviews.map((rev) => (
          <div key={rev.id} className="review-card">
            <p className="review-user">{rev.user_name}</p>
            <p className="review-rating">⭐ {rev.rating}</p>
            <p className="review-text">{rev.review_text}</p>
            <p className="review-date">
              {new Date(rev.created_at).toDateString()}
            </p>
          </div>
        ))}

        {token ? (
          <form className="add-review-form" onSubmit={submitReview}>
            <h3>Write a Review</h3>

            <select value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="5">⭐ 5 - Excellent</option>
              <option value="4">⭐ 4 - Good</option>
              <option value="3">⭐ 3 - Average</option>
              <option value="2">⭐ 2 - Poor</option>
              <option value="1">⭐ 1 - Very Bad</option>
            </select>

            <textarea
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <button type="submit">Submit Review</button>

            {msg && <p style={{ color: "green" }}>{msg}</p>}
          </form>
        ) : (
          <p className="login-msg">Login to write a review</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
