import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  Badge,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import {
  createReviewAction,
  productsDetailsAction,
} from "../actions/productActions";
import { addToCartAction } from "../actions/CartActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import {
  flyToCart,
  showCartSuccessIndicator,
} from "../utils/flyToCartAnimation";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  // get product details form state
  const product_details = useSelector((state) => state.productDetails);
  const [rating, setRating] = useState({ rating: 0, comment: "" });
  // user login
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // create review
  const createReview = useSelector((state) => state.createReview);
  const {
    success: successReview,
    error: errorReview,
    loading: loadingReview,
  } = createReview;

  // get product
  const { loading, product, error } = product_details;

  useEffect(() => {
    // 1// make action to update
    dispatch(productsDetailsAction(id));
    // reset the rating
    if (successReview) {
      setRating({ rating: 0, comment: "" });
      // refresh the page
      dispatch(productsDetailsAction(id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, id, successReview]);
  const checkoutHandler = () => {
    navigate(`/cart/${id}?quantity=${quantity}`);
  };
  const addToCartHandler = () => {
    // Get product image and cart icon elements
    const productImage = document.querySelector(".product-main-image");
    const cartIcon =
      document.querySelector(".cart-icon") ||
      document.querySelector("[data-cart-icon]") ||
      document.querySelector(".fa-shopping-cart");

    // Trigger fly-to-cart animation with callback
    flyToCart(productImage, cartIcon, () => {
      // Add product to cart after animation completes
      dispatch(addToCartAction(id, Number(quantity)));

      // Show success indicator
      showCartSuccessIndicator(cartIcon);
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createReviewAction(id, rating));
  };

  return (
    // find the product with the id

    <div>
      <Link to="/" className="btn btn-outline-secondary my-3">
        <i className="bi bi-arrow-left me-2"></i> Retour aux Produits
      </Link>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger"> {error}</Message>
      ) : (
        <div>
          <Row className="mb-4">
            <Col md={5}>
              <div
                className="product-image-container"
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "8px",
                  padding: "10px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
                  transition: "transform 0.3s ease",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={`${process.env.REACT_APP_MEDIA_URL}${product.image}`}
                  alt={product.name}
                  fluid
                  className="product-image product-main-image"
                  style={{
                    maxHeight: "400px",
                    objectFit: "contain",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              </div>
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item className="border-0 px-0">
                  <h2 style={{ fontWeight: "600" }}>{product.name}</h2>
                </ListGroup.Item>
                <ListGroup.Item className="border-0 px-0">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} avis`}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="border-0 px-0">
                  <h4 style={{ color: "#4a4a4a", fontWeight: "500" }}>
                    <Badge bg="dark" pill className="px-3 py-2">
                      {product.price}DZD
                    </Badge>
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item className="border-0 px-0">
                  <div className="product-description">
                    <h5>Description :</h5>
                    <p style={{ lineHeight: "1.6", color: "#6c757d" }}>
                      {product.description}
                    </p>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card className="shadow-sm">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row className="align-items-center">
                      <Col>Prix :</Col>
                      <Col>
                        <h4 className="mb-0 fw-bold text-primary">
                          {product.price}DZD
                        </h4>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row className="align-items-center">
                      <Col>Statut:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg="success" pill className="px-3 py-2">
                            En Stock
                          </Badge>
                        ) : (
                          <Badge bg="danger" pill className="px-3 py-2">
                            Rupture de Stock
                          </Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {/* set quantity */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row className="align-items-center">
                        <Col>Quantité :</Col>
                        <Col>
                          <Form.Select
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="form-select-sm"
                          >
                            {product.countInStock > 10
                              ? [...Array(10).keys()].map((x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))
                              : [...Array(product.countInStock).keys()].map(
                                  (x) => (
                                    <option key={x + 1} value={x + 1}>
                                      {x + 1}
                                    </option>
                                  )
                                )}
                          </Form.Select>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        size="md"
                        className="mb-2 add-to-cart-btn"
                        type="button"
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                      >
                        <i className="bi bi-cart me-2"></i> Ajouter au Panier
                      </Button>

                      <Button
                        variant="success"
                        size="md"
                        type="button"
                        disabled={product.countInStock === 0}
                        onClick={checkoutHandler}
                      >
                        <i className="bi bi-credit-card me-2"></i> Commander Maintenant
                      </Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          {/* reviews row */}
          <Row className="mt-5">
            <Col md={6}>
              <h3 className="border-bottom pb-2">Avis Clients</h3>
              {product.reviews.length === 0 && (
                <Message>Aucun avis pour le moment</Message>
              )}
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item
                    key={review._id}
                    className="border-bottom py-3"
                  >
                    <div className="d-flex justify-content-between">
                      <strong className="mb-1">{review.name}</strong>
                      <small className="text-muted">
                        {review.createdAt.substring(0, 10)}
                      </small>
                    </div>
                    <Rating value={review.rating} />
                    <p className="mt-2" style={{ fontStyle: "italic" }}>
                      {review.comment}
                    </p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="pt-4">
                  <h4 className="mb-3">Écrire un Avis</h4>
                  {errorReview && (
                    <Message variant="danger">{errorReview}</Message>
                  )}
                  {successReview && (
                    <Message variant="success">Avis soumis avec succès</Message>
                  )}
                  {userInfo ? (
                    userInfo.isAdmin ? (
                      <Message variant="info">
                        Les administrateurs ne peuvent pas écrire d'avis sur les
                        produits. Seuls les clients peuvent laisser des avis.
                      </Message>
                    ) : (
                      <Form className="review-form">
                        <Form.Group controlId="rating" className="mb-3">
                          <Form.Label>Note</Form.Label>
                          <Form.Select
                            value={rating.rating}
                            onChange={(e) =>
                              setRating({ ...rating, rating: e.target.value })
                            }
                          >
                            <option value="0">Sélectionner...</option>
                            <option value="1">1 - Mauvais</option>
                            <option value="2">2 - Passable</option>
                            <option value="3">3 - Bien</option>
                            <option value="4">4 - Très Bien</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group controlId="comment" className="mb-3">
                          <Form.Label>Votre Avis</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={4}
                            value={rating.comment}
                            onChange={(e) =>
                              setRating({ ...rating, comment: e.target.value })
                            }
                            placeholder="Partagez vos impressions sur ce produit..."
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          type="button"
                          variant="outline-primary"
                          className="my-3"
                          disabled={rating.rating === 0 || loadingReview}
                          onClick={submitHandler}
                        >
                          {loadingReview ? "Envoi..." : "Soumettre l'Avis"}
                        </Button>
                      </Form>
                    )
                  ) : (
                    <Message>
                      Veuillez <Link to="/login">vous connecter</Link> pour
                      écrire un avis
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
