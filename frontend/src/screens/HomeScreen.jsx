import React, { useRef, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { productsListAction } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginator from "../components/Paginator";
import ProductsCarousel from "../components/ProductsCarousel/ProductsCarousel";
import styles from "../styles/HeroSection.module.css";
import landingStyles from "../styles/LandingSections.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function HomeScreen({ setHeaderTransparent }) {
  // get search keyword from the url
  const searchQuery = window.location ? window.location.search : "";
  // Initialize AOS for scroll animations (only once)
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: false,
      offset: 60,
      easing: "ease-in-out",
      mirror: true,
    });
  }, []);
  // Refresh AOS when searchQuery changes to ensure all sections are visible and animated
  useEffect(() => {
    AOS.refresh();
  }, [searchQuery]);
  var keyword = "";
  if (searchQuery) {
    keyword = searchQuery.split("keyword=")[1]?.split("&")[0] || "";
  }

  const dispatch = useDispatch();
  const products_List = useSelector((state) => state.productsList);
  const { loading, products, error, pages, page } = products_List;

  // State for hero product carousel
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [focusedSide, setFocusedSide] = useState(null); // 'left', 'right', or null

  // Remove showHeader state and scroll logic
  // const [showHeader, setShowHeader] = useState(false);
  // const [headerTransparent, setHeaderTransparent] = useState(true); // This state is now passed as a prop

  useEffect(() => {
    // Set initial transparency based on scroll position
    if (window.scrollY < window.innerHeight - 10) {
      setHeaderTransparent(true);
    } else {
      setHeaderTransparent(false);
    }
    const handleScroll = () => {
      if (window.scrollY < window.innerHeight - 10) {
        setHeaderTransparent(true);
      } else {
        setHeaderTransparent(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setHeaderTransparent]);

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

  // Dior hero section logic
  const leftVideoRef = useRef(null);
  const rightVideoRef = useRef(null);
  const heroSectionRef = useRef(null);
  const [videosLoaded, setVideosLoaded] = useState({
    left: false,
    right: false,
  });
  const [videoErrors, setVideoErrors] = useState({ left: false, right: false });
  const [isLeftVideoPlaying, setIsLeftVideoPlaying] = useState(false);
  const [isRightVideoPlaying, setIsRightVideoPlaying] = useState(false);
  const [shouldLoadVideos, setShouldLoadVideos] = useState(false);

  // Video optimization and hover handling
  const handleVideoLoad = (side) => {
    setVideosLoaded((prev) => ({ ...prev, [side]: true }));
  };

  const handleVideoError = (side) => {
    setVideoErrors((prev) => ({ ...prev, [side]: true }));
    console.warn(`Failed to load ${side} video`);
  };

  const handleVideoHover = (side, isHovering) => {
    const videoRef = side === "left" ? leftVideoRef : rightVideoRef;
    const setVideoPlaying =
      side === "left" ? setIsLeftVideoPlaying : setIsRightVideoPlaying;

    if (videoRef.current && videosLoaded[side] && !videoErrors[side]) {
      try {
        if (isHovering) {
          videoRef.current.play();
          setVideoPlaying(true);
        } else {
          videoRef.current.pause();
          setVideoPlaying(false);
        }
      } catch (error) {
        console.warn(`Video ${isHovering ? "play" : "pause"} failed:`, error);
      }
    }
  };

  // Intersection observer for lazy loading videos
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoadVideos(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Preload videos only when they should be loaded
  useEffect(() => {
    if (!shouldLoadVideos) return;

    const preloadVideo = (src, side) => {
      const video = document.createElement("video");
      video.src = src;
      video.muted = true;
      video.preload = "metadata";
      video.onloadedmetadata = () => handleVideoLoad(side);
      video.onerror = () => handleVideoError(side);
    };

    // Preload both videos
    preloadVideo("/videos/left-video.mp4", "left");
    preloadVideo("/videos/right-video.mp4", "right");
  }, [shouldLoadVideos]);

  const navigate = useNavigate();

  // Animation helper
  const animateButton = (e) => {
    e.target.classList.add(styles.heroButtonClick);
    setTimeout(() => {
      e.target.classList.remove(styles.heroButtonClick);
    }, 300);
  };

  return (
    <div
      className={landingStyles.landingBg}
      style={{
        minHeight: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        position: "relative",
        top: 0,
        left: 0,
        overflow: "hidden",
        background: `radial-gradient(ellipse 120% 80% at 50% 20%, #f8f6f2 80%, #e9e4d9 100%), linear-gradient(120deg, #f8f6f2 0%, #e9e4d9 100%)`,
      }}
    >
      {/* Gold shimmer effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background:
            "linear-gradient(120deg, rgba(255,215,120,0.08) 0%, rgba(255,255,255,0.01) 100%)",
          mixBlendMode: "screen",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* Subtle vignette for depth */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background:
            "radial-gradient(ellipse 100% 80% at 50% 60%, rgba(0,0,0,0.07) 0%, rgba(0,0,0,0.18) 100%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {/* Faint luxury pattern overlay (SVG) */}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
        viewBox="0 0 1920 1080"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern
          id="luxuryPattern"
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          <circle
            cx="60"
            cy="60"
            r="48"
            fill="none"
            stroke="#d6cfc2"
            strokeWidth="2"
            opacity="0.08"
          />
          <circle
            cx="60"
            cy="60"
            r="24"
            fill="none"
            stroke="#bfae8f"
            strokeWidth="1"
            opacity="0.07"
          />
        </pattern>
        <rect width="1920" height="1080" fill="url(#luxuryPattern)" />
      </svg>
      {/* Soft blur effect for extra elegance */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backdropFilter: "blur(6px)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      {/* Dior-style Hero Section - Responsive Split */}
      {!searchQuery && (
        <section ref={heroSectionRef} className={styles.diorHeroSection}>
          <div className={styles.diorHeroVideosWrapper}>
            {/* Top/Left Video Side */}
            <div
              className={styles.diorHeroSide}
              onMouseEnter={() => {
                setFocusedSide("left");
                handleVideoHover("left", true);
              }}
              onMouseLeave={() => {
                setFocusedSide(null);
                handleVideoHover("left", false);
              }}
              style={{ position: "relative" }}
            >
              {/* Loading placeholder */}
              {!videosLoaded.left && !videoErrors.left && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                    color: "#666",
                    fontSize: "1.2rem",
                  }}
                >
                  Chargement...
                </div>
              )}

              {/* Error fallback */}
              {videoErrors.left && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                  }}
                >
                  <div style={{ color: "white", textAlign: "center" }}>
                    <i
                      className="fas fa-image"
                      style={{ fontSize: "3rem", marginBottom: "1rem" }}
                    ></i>
                    <div>Contenu de démonstration</div>
                  </div>
                </div>
              )}

              <video
                ref={leftVideoRef}
                src="/videos/left-video.mp4"
                className={styles.diorHeroVideo}
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/video-poster-left.jpg"
                onLoadedMetadata={() => handleVideoLoad("left")}
                onError={() => handleVideoError("left")}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  opacity: videosLoaded.left ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />
              {/* Removed darkness effect on hover */}
              <div
                style={{
                  position: "absolute",
                  bottom: 80,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "white",
                  zIndex: 2,
                  maxWidth: "400px",
                  textAlign: "center",
                }}
              >
                <h2
                  style={{
                    fontFamily: "serif",
                    fontSize: "2rem",
                    marginBottom: 24,
                    letterSpacing: 2,
                    fontWeight: 300,
                    lineHeight: 1.2,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    color: "white",
                    ...(window.innerWidth <= 900
                      ? { fontSize: "0rem", marginBottom: 16 }
                      : {}),
                  }}
                >
                  Découvrez l'élégance avec Maison Syra
                </h2>
                <button
                  style={{
                    padding:
                      window.innerWidth <= 900 ? "12px 24px" : "16px 32px",
                    background: "rgba(255,255,255,0.9)",
                    color: "#1a1a1a",
                    fontWeight: 500,
                    border: "none",
                    cursor: "pointer",
                    fontSize: window.innerWidth <= 900 ? "0.85rem" : "1rem",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                  onClick={(e) => {
                    animateButton(e);
                    const productsSection = document.getElementById("products");
                    if (productsSection) {
                      productsSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.background = "rgba(255,255,255,1)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.background = "rgba(255,255,255,0.9)")
                  }
                  className={styles.heroButton}
                >
                  Découvrir notre collection
                </button>
              </div>
            </div>
            {/* Centered Logo/Text (desktop only, hidden on mobile) */}
            <div className={styles.diorHeroLogoWrapper}>
              <img
                src="/images/syra-logo.png"
                alt="Syra Logo"
                style={{ height: "300px", width: "auto", objectFit: "contain" }}
              />
            </div>
            {/* Bottom/Right Video Side */}
            <div
              className={styles.diorHeroSide}
              onMouseEnter={() => {
                setFocusedSide("right");
                handleVideoHover("right", true);
              }}
              onMouseLeave={() => {
                setFocusedSide(null);
                handleVideoHover("right", false);
              }}
              style={{ position: "relative" }}
            >
              {/* Loading placeholder */}
              {!videosLoaded.right && !videoErrors.right && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)",
                    backgroundSize: "20px 20px",
                    backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                    color: "#666",
                    fontSize: "1.2rem",
                  }}
                >
                  Chargement...
                </div>
              )}

              {/* Error fallback */}
              {videoErrors.right && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1,
                  }}
                >
                  <div style={{ color: "white", textAlign: "center" }}>
                    <i
                      className="fas fa-image"
                      style={{ fontSize: "3rem", marginBottom: "1rem" }}
                    ></i>
                    <div>Contenu de démonstration</div>
                  </div>
                </div>
              )}

              <video
                ref={rightVideoRef}
                src="/videos/right-video.mp4"
                className={styles.diorHeroVideo}
                muted
                loop
                playsInline
                preload="metadata"
                poster="/images/video-poster-right.jpg"
                onLoadedMetadata={() => handleVideoLoad("right")}
                onError={() => handleVideoError("right")}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  opacity: videosLoaded.right ? 1 : 0,
                  transition: "opacity 0.3s ease",
                }}
              />
              {/* Removed darkness effect on hover */}
              <div
                style={{
                  position: "absolute",
                  bottom: 80,
                  left: "50%",
                  transform: "translateX(-50%)",
                  color: "white",
                  zIndex: 2,
                  maxWidth: "400px",
                  textAlign: "center",
                }}
              >
                <h2
                  style={{
                    fontFamily: "serif",
                    fontSize: "2rem",
                    marginBottom: 32,
                    letterSpacing: 2,
                    fontWeight: 300,
                    lineHeight: 1.2,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                    color: "white",
                  }}
                >
                  Faites partie de la Maison Syra
                </h2>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    type="button"
                    style={{
                      padding: "14px 28px",
                      background: "rgba(255,255,255,0.9)",
                      color: "#1a1a1a",
                      fontWeight: 500,
                      border: "none",
                      cursor: "pointer",
                      fontSize: "0.95rem",
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      width: "fit-content",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      animateButton(e);
                      setTimeout(() => {
                        navigate("/login");
                      }, 200);
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.background = "rgba(255,255,255,1)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background = "rgba(255,255,255,0.9)")
                    }
                    className={styles.heroButton}
                  >
                    Sign In
                  </button>
                  <button
                    style={{
                      padding: "14px 28px",
                      background: "transparent",
                      color: "white",
                      fontWeight: 500,
                      border: "2px solid rgba(255,255,255,0.8)",
                      cursor: "pointer",
                      fontSize: "0.95rem",
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      transition: "all 0.3s ease",
                      width: "fit-content",
                    }}
                    onClick={(e) => {
                      animateButton(e);
                      navigate("/register");
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = "rgba(255,255,255,0.1)";
                      e.target.style.borderColor = "rgba(255,255,255,1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = "transparent";
                      e.target.style.borderColor = "rgba(255,255,255,0.8)";
                    }}
                    className={styles.heroButton}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
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

HomeScreen.propTypes = {
  setHeaderTransparent: PropTypes.func,
};

export default HomeScreen;
