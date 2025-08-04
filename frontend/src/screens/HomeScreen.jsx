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
import landingStyles from "../styles/LandingSections.module.css";

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

  // Sample data for featured products and testimonials
  const featuredProducts = products ? products.slice(0, 4) : [];
  const testimonials = [
    {
      text: "Des produits magnifiques et un service exceptionnel. J'ai adoré mon expérience!",
      author: "Sofia B.",
    },
    {
      text: "La qualité artisanale et le design unique font toute la différence.",
      author: "Karim L.",
    },
    {
      text: "Livraison rapide et produits conformes à la description. Je recommande!",
      author: "Nadia M.",
    },
  ];
  const values = [
    {
      icon: <i className="fas fa-gem"></i>,
      title: "Qualité Artisanale",
      text: "Chaque pièce est réalisée avec soin et passion par nos artisans.",
    },
    {
      icon: <i className="fas fa-shipping-fast"></i>,
      title: "Livraison Rapide",
      text: "Expédition rapide et soignée partout en Algérie.",
    },
    {
      icon: <i className="fas fa-palette"></i>,
      title: "Design Unique",
      text: "Des créations originales qui reflètent l'élégance et la créativité.",
    },
    {
      icon: <i className="fas fa-heart"></i>,
      title: "Satisfaction Client",
      text: "Un service client à l'écoute pour une expérience inoubliable.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      {!searchQuery && (
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              <span className={styles.animatedText}>MAISON DE SYRA</span>
            </h1>
            <div className={styles.heroTagline}>L'artisanat, l'élégance, l'âme</div>
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

      {/* About Section */}
      {!searchQuery && (
        <section className={landingStyles.aboutSection}>
          <h2 className={landingStyles.aboutTitle}>À propos de MAISON DE SYRA</h2>
          <p className={landingStyles.aboutText}>
            MAISON DE SYRA est une maison de création dédiée à l'artisanat d'excellence et au design contemporain. Nous croyons en la beauté des détails, l'authenticité des matières et la passion du fait-main. Découvrez une collection unique, pensée pour sublimer votre quotidien.
          </p>
        </section>
      )}

      {/* Values Section */}
      {!searchQuery && (
        <section className={landingStyles.valuesSection}>
          <div className={landingStyles.valuesGrid}>
            {values.map((val, idx) => (
              <div className={landingStyles.valueCard} key={idx}>
                <div className={landingStyles.valueIcon}>{val.icon}</div>
                <div className={landingStyles.valueTitle}>{val.title}</div>
                <div className={landingStyles.valueText}>{val.text}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      {!searchQuery && featuredProducts.length > 0 && (
        <section className={landingStyles.featuredSection}>
          <h2 className={landingStyles.featuredTitle}>Produits en Vedette</h2>
          <div className={landingStyles.featuredGrid}>
            {featuredProducts.map((productitem) => (
              <div style={{ minWidth: 250, maxWidth: 270 }} key={productitem.id}>
                <Product product={productitem} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {!searchQuery && (
        <section className={landingStyles.testimonialsSection}>
          <h2 className={landingStyles.testimonialsTitle}>Ils parlent de nous</h2>
          <div className={landingStyles.testimonialsGrid}>
            {testimonials.map((t, idx) => (
              <div className={landingStyles.testimonialCard} key={idx}>
                <div className={landingStyles.testimonialText}>"{t.text}"</div>
                <div className={landingStyles.testimonialAuthor}>- {t.author}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      {!searchQuery && (
        <section className={landingStyles.newsletterSection}>
          <h2 className={landingStyles.newsletterTitle}>Restez informé(e)</h2>
          <div className={landingStyles.newsletterText}>
            Recevez nos nouveautés, offres et inspirations directement dans votre boîte mail.
          </div>
          <form className={landingStyles.newsletterForm} onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              className={landingStyles.newsletterInput}
              placeholder="Votre email"
              required
            />
            <button className={landingStyles.newsletterButton} type="submit">
              S'inscrire
            </button>
          </form>
        </section>
      )}

      {/* Product Catalog Section */}
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
