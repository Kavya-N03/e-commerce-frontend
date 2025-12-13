import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./styles/Navigation.css";

function NavBar() {
  const location = useLocation();
  const hideroutes = ["/register","/login"];
  if(hideroutes.includes(location.pathname)){
    return null;
  }
  const [open, setOpen] = useState(false);

  return (
    <div className="bottom-nav">
      <div className="nav-inner">

        <button className="menu-btn" onClick={() => setOpen(!open)}>
          ☰
        </button>

        <ul className={open ? "active" : ""}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/collections">Shop Now</Link></li>
          <li><Link to="/offers">Offers</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
