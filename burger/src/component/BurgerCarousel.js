import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./BurgerCarousel.module.css";
import food from "./food.json";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";

function BurgerCarousel() {
  const { currencyRate } = useContext(CartContext);
  const { currency } = useContext(CartContext);
  const { menu } = useContext(CartContext);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1001 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1000, min: 651 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 650, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <Carousel
      swipeable={true}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlaySpeed={3000}
      centerMode={true}
      autoPlay={true}
      pauseOnHover
      keyBoardControl={true}
      customTransition="transform 700ms ease-in-out"
      transitionDuration={500}
      containerClass={styles.carouselContainer}
      dotListClass={styles.customDotListStyle}
      itemClass={styles.carouselItemPadding40px}
      className={styles.carousel}
    >
      {food["Handmade Burger"].map(({ product, image, price }, i) => {
        return (
          <div className={styles.burgerContainer} key={i}>
            <img className={styles.burger} src={image} alt="burgers" />
            <div className={styles.desc}>{product}</div>
            <div className={styles.price}>
              Price: {`${currency}${(price * currencyRate).toFixed(1)}`}
            </div>
            <Link to="/online-order">
              <button className={styles.orderBtn} onClick={() => menu()}>
                Order Now
              </button>
            </Link>
          </div>
        );
      })}
    </Carousel>
  );
}
export default BurgerCarousel;
