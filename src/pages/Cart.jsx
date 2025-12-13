import { useEffect, useState } from "react";
import { getAccessToken } from "../utils/auth";
import "../Components/styles/Cart.css";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";   

function Cart() {
  const token = getAccessToken();

  const [cartData, setCartData] = useState([]);
  const [summary, setSummary] = useState({
    total_mrp: 0,
    total_discount: 0,
    total_price: 0,
  });
  const [msg, setMsg] = useState("");

  const fetchCart = async () => {
    try {
      const response = await fetch("https://e-commerce-api-74dp.onrender.com/api/cart-items/", {
        headers: { Authorization: "JWT " + token },
      });

      if (!response.ok) {
        setMsg("Error in displaying cart");
        return;
      }

      const data = await response.json();
      setCartData(data);
      setMsg("");
    } catch (error) {
      setMsg("Network Error");
    }
  };

  const fetchSummary = async () => {
    try {
      const response = await fetch("https://e-commerce-api-74dp.onrender.com/api/cart/", {
        headers: { Authorization: "JWT " + token },
      });

      const data = await response.json();
      const cart = data[0] || {};

      setSummary({
        total_mrp: cart.total_mrp || 0,
        total_discount: cart.total_discount || 0,
        total_price: cart.total_price || 0,
      });
    } catch (error) {
      setMsg("Network Error");
    }
  };

  const increaseQty = async (id, currentQty) => {
    const newQty = currentQty + 1;

    await fetch(`https://e-commerce-api-74dp.onrender.com/api/cart-items/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + token,
      },
      body: JSON.stringify({ quantity: newQty }),
    });

    await fetchCart();
    await fetchSummary();
  };

  const decreaseQty = async (id, currentQty) => {
    if (currentQty <= 1) return;

    const newQty = currentQty - 1;

    await fetch(`https://e-commerce-api-74dp.onrender.com/api/cart-items/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + token,
      },
      body: JSON.stringify({ quantity: newQty }),
    });

    await fetchCart();
    await fetchSummary();
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(
        `https://e-commerce-api-74dp.onrender.com/api/cart-items/${id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: "JWT " + token,
          },
        }
      );

      if (!response.ok) {
        setMsg("Failed to remove item from cart");
        return;
      }

      await fetchCart();
      await fetchSummary();
    } catch (error) {
      setMsg("Network Error");
    }
  };

  useEffect(() => {
    fetchCart();
    fetchSummary();
  }, []);

  const platformFee = 5;

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      {msg && <p>{msg}</p>}

      {cartData.length === 0 && !msg && <h3>Your cart is empty</h3>}

      <div className="cart-content">
        <div className="cart-left">
          {cartData.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.prd_img} alt={item.prd_name} width="120" />

              <div className="cart-item-info">
                <div className="cart-item-header">
                  <h3>{item.prd_name}</h3>

                  <button
                    className="delete-btn"
                    onClick={() => deleteItem(item.id)}
                    aria-label="Remove item"
                  >
                    <FaTrashAlt />
                    <span style={{ fontSize: "15px" }}>Remove</span>
                  </button>
                </div>

                <p> ₹{item.disc_price}</p>

                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item.id, item.quantity)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id, item.quantity)}>
                    +
                  </button>
                </div>

                <p>Total: ₹{item.selling_subtotal}</p>
              </div>
            </div>
          ))}
        </div>

        {cartData.length > 0 && (
          <div className="cart-right">
            <h3>PRICE DETAILS</h3>
            <hr />
            <p>
              Price ({cartData.length} item
              {cartData.length > 1 ? "s" : ""}): ₹{summary.total_mrp}
            </p>

            <p style={{ color: "green" }}>
              Discount: -₹{summary.total_discount}
            </p>

            <p>Platform Fee: ₹{platformFee}</p>

            <p className="delivery-line">
              <span>Delivery Charges:</span>
              <span>
                <span className="strike-amount">₹80</span> Free
              </span>
            </p>

            <hr />

            <p>
              <strong>
                Total Amount: ₹{summary.total_price + platformFee}
              </strong>
            </p>

            <p style={{ color: "green" }}>
              You will save ₹{summary.total_discount}
            </p>
            <Link to="/order" state={{
            total_mrp: summary.total_mrp,
            total_discount: summary.total_discount,
            total_price: summary.total_price,
            total_items: cartData.length,
              }}>
          <button className="checkout-btn">Place Order</button>
            </Link>

          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
