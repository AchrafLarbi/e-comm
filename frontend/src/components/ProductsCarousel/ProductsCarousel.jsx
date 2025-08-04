import React, { useEffect, useState, useRef } from "react";
import Loader from "../Loader";
import Message from "../Message";
import { useDispatch, useSelector } from "react-redux";
import { topRatedProductsAction } from "../../actions/productActions";
import { Link } from "react-router-dom";
import styles from "./ProductsCarousel.module.css";

function ProductsCarousel() {
  const dispatch = useDispatch();
  const products_Top = useSelector((state) => state.topRatedProducts);
  const { loading: loadingTop, products: productsTop, error: errorTop } = products_Top;

  const [active, setActive] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    dispatch(topRatedProductsAction());
  }, [dispatch]);

  useEffect(() => {
    if (productsTop && productsTop.length > 1) {
      timeoutRef.current = setTimeout(() => {
        setActive((prev) => (prev + 1) % productsTop.length);
      }, 4000);
      return () => clearTimeout(timeoutRef.current);
    }
  }, [active, productsTop]);

  const goTo = (idx) => {
    setActive(idx);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const prev = () => {
    setActive((prev) => (prev - 1 + productsTop.length) % productsTop.length);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };
  const next = () => {
    setActive((prev) => (prev + 1) % productsTop.length);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <div className={styles.carouselWrapper}>
      {loadingTop ? (
        <Loader />
      ) : errorTop ? (
        <Message variant="danger">{errorTop}</Message>
      ) : productsTop && productsTop.length === 0 ? null : (
        <div className={styles.carousel}>
          {productsTop && productsTop.map((product, idx) => (
            <div
              key={product.id}
              className={
                styles.slide +
                (idx === active ? ' ' + styles.active : '') +
                (idx < active ? ' ' + styles.left : '') +
                (idx > active ? ' ' + styles.right : '')
              }
              style={{ zIndex: idx === active ? 2 : 1 }}
            >
              <Link to={`/product/${product.id}`} className={styles.slideLink}>
                <img
                  src={`${process.env.REACT_APP_MEDIA_URL}${product.image}`}
                  alt={product.name}
                  className={styles.slideImage}
                />
                <div className={styles.slideOverlay}>
                  <div className={styles.slideCaption}>
                    <div className={styles.slideName}>{product.name}</div>
                    <div className={styles.slidePrice}>{product.price} DZD</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          {productsTop && productsTop.length > 1 && (
            <>
              <button className={styles.arrow + ' ' + styles.leftArrow} onClick={prev} aria-label="Précédent">
                &#8592;
              </button>
              <button className={styles.arrow + ' ' + styles.rightArrow} onClick={next} aria-label="Suivant">
                &#8594;
              </button>
              <div className={styles.dots}>
                {productsTop.map((_, idx) => (
                  <span
                    key={idx}
                    className={styles.dot + (idx === active ? ' ' + styles.activeDot : '')}
                    onClick={() => goTo(idx)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductsCarousel;
