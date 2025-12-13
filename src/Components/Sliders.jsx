import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../Components/styles/sliders.css";

function Sliders() {
  const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        arrows: true,
      }
    },
    {
      breakpoint: 768,
      settings: {
        arrows: false,
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        dots: true
      }
    }
  ]
};

  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        <div>
          <img src="/images/slider1.jpg" alt="slide1" />
        </div>

        <div>
          <img src="/images/slider2.jpg" alt="slide2" />
        </div>

        <div>
          <img src="/images/slider3.jpg" alt="slide3" />
        </div>

        <div>
          <img src="/images/slider4.jpeg" alt="slide4" />
        </div>

        <div>
          <img src="/images/slider5.jpeg" alt="slide5" />
        </div>
      </Slider>
    </div>
  );
}

export default Sliders;
