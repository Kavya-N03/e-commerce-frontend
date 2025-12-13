import { useEffect, useState } from "react";
import { getAccessToken } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";

function Wishlist() {
  const token = getAccessToken();
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [msg, setMsg] = useState("");

  const fetchWishlist = async () => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("https://e-commerce-api-74dp.onrender.com/api/wishlist/", {
        headers: {
          Authorization: "JWT " + token,
        },
      });

      const data = await response.json();
      setWishlist(data[0]?.items || []);
    } catch (error) {
      setMsg("Failed to load wishlist");
    }
  };

  const removeFromWishlist = async (wishlistItemId) => {
    try {
      const response = await fetch(
        `https://e-commerce-api-74dp.onrender.com/api/wishlist-items/${wishlistItemId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: "JWT " + token,
          },
        }
      );

      if (response.ok) {
        fetchWishlist(); 
      } else {
        alert("Failed to remove item");
      }
    } catch (error) {
      alert("Network error while removing");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>Your Wishlist</h1>

      {msg && <p>{msg}</p>}

      {wishlist.length === 0 && !msg && <h3>Your wishlist is empty</h3>}

      <div className="products-grid">
        {wishlist.map((item) => (
          <div key={item.id} className="product-card">
            <Link to={`/product/${item.product}`}>
              <img
                src={item.prd_image}
                alt={item.prd_name}
                className="product-img"
              />
            </Link>

            <p className="product-name">{item.prd_name}</p>

            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              ₹{item.prd_desc_price}
            </p>

            <button
              onClick={() => removeFromWishlist(item.id)}
              className="add-to-cart-btn"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
