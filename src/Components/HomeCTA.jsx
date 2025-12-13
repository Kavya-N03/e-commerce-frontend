import { useNavigate } from "react-router-dom";
import "../Components/styles/HomeCTA.css";

function HomeCTA() {
  const navigate = useNavigate();

  return (
    <>
      <section className="home-cta">
    <div className="home-cta-content">
    <h2>Don’t Miss Out on Our Latest Collections</h2>

    <p className="cta-subtitle">
      Discover hand-picked styles, trending products, and exclusive offers
      crafted just for you.
    </p>

    <p className="cta-description">
      From everyday essentials to premium picks, explore a wide range of
      products designed to match your lifestyle. Stay ahead with fresh arrivals,
      exciting deals, and quality you can trust — all in one place.
    </p>
  </div>
</section>


      <section className="posters-section">
        <div className="posters-grid">

          <div className="poster-box" onClick={() => navigate("/collections")}>
            <img src="/images/poster1.png" alt="Big Sale" className="poster-img" />
            <div className="poster-overlay">
              <h3>Big Sale</h3>
              <p>Special Offers Just For You</p>
            </div>
          </div>

          <div className="poster-box" onClick={() => navigate("/collections")}>
            <img src="/images/poster2.jpg" alt="Last Chance" className="poster-img" />
            <div className="poster-overlay">
              <h3>Last Chance</h3>
              <p>Limited Time Discounts</p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default HomeCTA;
