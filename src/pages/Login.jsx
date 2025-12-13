import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Components/styles/login.css"

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://e-commerce-api-74dp.onrender.com/api/auth/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      navigate("/");
    } catch (error) {
      setError("Network Error");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to your account</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={loginUser}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              name="email"
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="auth-btn">
            Login
          </button>

          <p className="signup-text">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>Sign Up</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
