import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect, useState } from "react";
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

  // State for hero product carousel
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  useEffect(() => {
    dispatch(productsListAction(searchQuery));
  }, [dispatch, searchQuery]);

  // Auto-rotate products every 4 seconds
  useEffect(() => {
    if (products && products.length > 1) {
      const interval = setInterval(() => {
        setCurrentProductIndex(
          (prev) => (prev + 1) % Math.min(4, products.length)
        );
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [products]);

  // Function to handle navigation dot clicks
  const handleProductNavigation = (index) => {
    setCurrentProductIndex(index);
  };

  // Function to handle next button click
  const handleNextProduct = () => {
    if (products && products.length > 0) {
      setCurrentProductIndex(
        (prev) => (prev + 1) % Math.min(4, products.length)
      );
    }
  };

  // Sample data for testimonials
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
    <div className={landingStyles.landingBg}>
      {/* Hero Section */}
      {!searchQuery && (
        <section className={styles.heroSection + " " + styles.heroEditorial}>
          <div className={styles.heroEditorialGrid}>
            {/* Left Side: Text */}
            <div className={styles.heroEditorialLeft}>
              <h1 className={styles.heroEditorialHeadline}>
                Une Symphonie
                <br />
                de Parfums
              </h1>
              <p className={styles.heroEditorialSubtext}>
                Laissez-vous envoûter par un parfum créé pour transcender le
                temps—une symphonie d'élégance, de mystère et d'allure, conçue
                pour ceux qui recherchent la beauté à chaque respiration.
              </p>
              <div className={styles.heroEditorialButtonGroup}>
                <a href="#products" className={styles.heroEditorialCta}>
                  Acheter Maintenant
                </a>
                <a
                  href="#products"
                  className={styles.heroEditorialCtaSecondary}
                >
                  Voir Détails
                </a>
              </div>
              <div className={styles.heroEditorialExpertsSection}>
                <h3 className={styles.heroEditorialExpertsTitle}>
                  Nos Experts
                </h3>
                <p className={styles.heroEditorialExpertsText}>
                  Exploitez la puissance des ingrédients naturels pour révéler
                  votre personnalité unique.
                </p>
                <a href="#about" className={styles.heroEditorialExploreMore}>
                  Explorer Plus →
                </a>
              </div>
            </div>
            {/* Right Side: Product & Stats */}
            <div className="mb-4">
              <h2 className="text-primary mb-3">Produits les Mieux Notés</h2>

              <ProductsCarousel />
            </div>
          </div>
        </section>
      )}

      <Container className={landingStyles.sectionsContainer}>
        {/* About Section */}
        {!searchQuery && (
          <section id="about" className={landingStyles.aboutSection}>
            <h2 className={landingStyles.aboutTitle}>
              À propos de MAISON DE SYRA
            </h2>
            <p className={landingStyles.aboutText}>
              MAISON DE SYRA est une maison de création dédiée à l'artisanat
              d'excellence et au design contemporain. Nous croyons en la beauté
              des détails, l'authenticité des matières et la passion du
              fait-main. Découvrez une collection unique, pensée pour sublimer
              votre quotidien.
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

        {/* Testimonials Section */}
        {!searchQuery && (
          <section className={landingStyles.testimonialsSection}>
            <h2 className={landingStyles.testimonialsTitle}>
              Ils parlent de nous
            </h2>
            <div className={landingStyles.testimonialsGrid}>
              {testimonials.map((t, idx) => (
                <div className={landingStyles.testimonialCard} key={idx}>
                  <div className={landingStyles.testimonialText}>
                    "{t.text}"
                  </div>
                  <div className={landingStyles.testimonialAuthor}>
                    - {t.author}
                  </div>
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
              Recevez nos nouveautés, offres et inspirations directement dans
              votre boîte mail.
            </div>
            <form
              className={landingStyles.newsletterForm}
              onSubmit={(e) => e.preventDefault()}
            >
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
        <section className={landingStyles.productsSection}>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : products && products.length === 0 ? (
            <div className="text-center py-5">
              <Message variant="info">
                <h4>Aucun Produit Trouvé</h4>
                <p className="mt-2">
                  Essayez un terme de recherche différent ou parcourez nos
                  catégories
                </p>
              </Message>
            </div>
          ) : (
            <div id="products">
              <div className="my-4">
                <h2 className={searchQuery ? "mb-4" : "mb-4"}>
                  {searchQuery
                    ? `Résultats de Recherche${
                        keyword ? ` pour "${keyword}"` : ""
                      }`
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
        </section>
      </Container>
    </div>
  );
}

export default HomeScreen;
