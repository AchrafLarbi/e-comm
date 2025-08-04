import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import styles from "../styles/ProductCard.module.css";

function Product({ product }) {
  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageLink}>
        <img
          src={`${process.env.REACT_APP_MEDIA_URL}${product.image}`}
          alt={product.name}
          className={styles.image}
        />
        <span className={styles.priceBadge}>{product.price} DZD</span>
      </Link>
      <div className={styles.body}>
        <Link to={`/product/${product.id}`} className={styles.titleLink}>
          <div className={styles.title}>{product.name}</div>
        </Link>
        <div className={styles.ratingRow}>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>
        <div className={styles.ctaRow}>
          <Link to={`/product/${product.id}`} className={styles.ctaButton}>
            Voir le produit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Product;
