import { useState } from "react";
import "../Components/styles/Order.css";
import { useLocation } from "react-router-dom";

function Order() {
  const location = useLocation();

  const summary = location.state || {
    total_mrp: 0,
    total_discount: 0,
    total_price: 0,
    total_items: 0,
  };

  const platformFee = 5;

  const [formData, setFormData] = useState({
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (
      !formData.phone ||
      !formData.address1 ||
      !formData.city ||
      !formData.state ||
      !formData.pincode
    ) {
      alert("Please fill all required fields");
      return;
    }

    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="order-success">
        <div className="success-box">
          <h1>✅ Order Placed Successfully</h1>
          <p>Thank you for shopping with us!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <h1 className="order-title">Checkout</h1>

      <div className="order-container">
        <form className="order-form" onSubmit={handlePlaceOrder}>
          <h2>Delivery Address</h2>

          <div className="form-group">
            <label>Phone Number *</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Address Line 1 *</label>
            <input type="text" name="address1" value={formData.address1} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>Address Line 2</label>
            <input type="text" name="address2" value={formData.address2} onChange={handleChange} />
          </div>

          <div className="form-row">
            <div>
              <label>City *</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} />
            </div>

            <div>
              <label>State *</label>
              <input type="text" name="state" value={formData.state} onChange={handleChange} />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Pincode *</label>
              <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} />
            </div>

            <div>
              <label>Country</label>
              <input type="text" name="country" value={formData.country} onChange={handleChange} />
            </div>
          </div>

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>

        <div className="order-summary">
          <h2>PRICE DETAILS</h2>
          <hr />

          <p>
            Price ({summary.total_items} item
            {summary.total_items > 1 ? "s" : ""}): ₹{summary.total_mrp}
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

          <p className="secure-text">🔒 Safe and secure checkout</p>
        </div>
      </div>
    </div>
  );
}

export default Order;
