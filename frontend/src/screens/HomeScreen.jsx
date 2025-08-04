import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsListAction } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginator from "../components/Paginator";
import ProductsCarousel from "../components/ProductsCarousel/ProductsCarousel";
import styles from "../styles/HeroSection.module.css";

function HomeScreen() {
  // get search keyword from the url
  const searchQuery = window.location ? window.location.search : "";
  var keyword = "";
  if (searchQuery) {
    keyword = searchQuery.split("keyword=")[1]?.split("&")[0] || "";
  }

  const dispatch = useDispatch();
  const products_List = useSelector((state) => state.productsList);
  const { loading, products, error, pages, page } = products_List;

  useEffect(() => {
    dispatch(productsListAction(searchQuery));
  }, [dispatch, searchQuery]);

  return (
    <>
      {/* Hero Section */}
      {!searchQuery && (
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.animatedText}>MAISON DE SYRA</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Découvrez l'élégance, la créativité et l'authenticité. Explorez nos produits les mieux notés et les dernières tendances.
            </p>
            <a href="#products" className={styles.ctaButton}>
              Découvrir la Collection
            </a>
          </div>
          <div className={styles.heroCarouselWrapper}>
            <ProductsCarousel />
          </div>
        </section>
      )}

      <Container className="py-4">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : products && products.length === 0 ? (
          <div className="text-center py-5">
            <Message variant="info">
              <h4>Aucun Produit Trouvé</h4>
              <p className="mt-2">
                Essayez un terme de recherche différent ou parcourez nos catégories
              </p>
            </Message>
          </div>
        ) : (
          <div id="products">
            <div className="my-4">
              <h2 className={searchQuery ? "mb-4" : "mb-4"}>
                {searchQuery
                  ? `Résultats de Recherche${keyword ? ` pour "${keyword}"` : ""}`
                  : "Tous les Produits"}
              </h2>
              <Row>
                {products &&
                  products.length > 0 &&
                  products.map((productitem) => (
                    <Col
                      key={productitem.id}
                      sm={12}
                      md={6}
                      lg={4}
                      xl={3}
                      className="mb-4"
                    >
                      <Product product={productitem} />
                    </Col>
                  ))}
              </Row>
            </div>
            <div className="d-flex justify-content-center mt-4">
              <Paginator pages={pages} page={page} keyword={keyword} />
            </div>
          </div>
        )}
      </Container>
    </>
  );
}

export default HomeScreen;
