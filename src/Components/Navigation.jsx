import { CiSearch } from "react-icons/ci";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../Components/styles/Navigation.css";
import { useEffect, useState } from "react";

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const hideroutes = ["/register", "/login"];

  const [isLogged, setIsLogged] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [location.pathname]);

  const logoutUser = () => {
    localStorage.clear();
    setIsLogged(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/collections?search=${search}`);
    setSearch("");
  };

  if (hideroutes.includes(location.pathname)) {
    return null;
  }

  return (
    <div className="nav-container">
      <div className="nav-top">
        <img src="/images/logo.png" alt="logo" className="nav-logo" />

        <form className="nav-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit">
            <CiSearch />
          </button>
        </form>

        <div className="nav-icons">
          <Link to="/cart" className="icon-group">
            <AiOutlineShoppingCart className="icon" />
            <span>Cart</span>
          </Link>

          <Link to="/wishlist" className="icon-group">
            <FaRegHeart className="icon" />
            <span>Wishlist</span>
          </Link>

          {!isLogged ? (
            <Link to="/login" className="login-btn">
              Login <IoIosLogIn />
            </Link>
          ) : (
            <Link className="logout-btn" onClick={logoutUser}>
              Logout <IoIosLogOut />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
