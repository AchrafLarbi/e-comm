import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
  };

  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)",
        color: "#ffffff",
        marginTop: "3rem",
      }}
    >
      <Container>
        <Row className="py-5">
          {/* CONTACT Section */}
          <Col lg={3} md={6} className="mb-4">
            <h6
              className="text-uppercase fw-bold mb-4"
              style={{ color: "#ffffff", letterSpacing: "1px" }}
            >
              CONTACT
            </h6>
            <div style={{ color: "#cccccc", lineHeight: "1.8" }}>
              <p className="mb-2">Street 2017 Harron Drive</p>
              <p className="mb-2">City: Baltimore</p>
              <p className="mb-2">State Full: Maryland</p>
              <p className="mb-2">Zip Code: 21201</p>
              <p className="mb-2">Phone Number: 443-498-7166</p>
              <p className="mb-0">Mobile Number: 443-934-9384</p>
            </div>
          </Col>

          {/* MENU Section */}
          <Col lg={2} md={6} className="mb-4">
            <h6
              className="text-uppercase fw-bold mb-4"
              style={{ color: "#ffffff", letterSpacing: "1px" }}
            >
              MENU
            </h6>
            <ul className="list-unstyled" style={{ lineHeight: "2" }}>
              <li className="mb-2">
                <a
                  href="/"
                  className="text-decoration-none"
                  style={{ color: "#cccccc" }}
                >
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/products"
                  className="text-decoration-none"
                  style={{ color: "#cccccc" }}
                >
                  Books
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/about"
                  className="text-decoration-none"
                  style={{ color: "#cccccc" }}
                >
                  About
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/courses"
                  className="text-decoration-none"
                  style={{ color: "#cccccc" }}
                >
                  Courses
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/blog"
                  className="text-decoration-none"
                  style={{ color: "#cccccc" }}
                >
                  Our blog
                </a>
              </li>
              <li className="mb-0">
                <a
                  href="/pricing"
                  className="text-decoration-none"
                  style={{ color: "#cccccc" }}
                >
                  Pricing
                </a>
              </li>
            </ul>
          </Col>

          {/* RECENT POSTS Section */}
          <Col lg={4} md={6} className="mb-4">
            <h6
              className="text-uppercase fw-bold mb-4"
              style={{ color: "#ffffff", letterSpacing: "1px" }}
            >
              RECENT POSTS
            </h6>
            <div style={{ color: "#cccccc", lineHeight: "1.8" }}>
              <p className="mb-3">
                <a
                  href="/post1"
                  className="text-decoration-none"
                  style={{ color: "#cccccc" }}
                >
                  Breaking Down Barriers
                </a>
              </p>
              <p className="mb-3">
                <a
                  href="/post2"
                  className="text-decoration-none"
                  style={{ color: "#cccccc" }}
                >
                  A Celebration of Success
                </a>
              </p>
              <p className="mb-0">
                <a
                  href="/post3"
                  className="text-decoration-none"
                  style={{ color: "#cccccc" }}
                >
                  A World of Opportunities
                </a>
              </p>
            </div>
          </Col>

          {/* NEWSLETTER Section */}
          <Col lg={3} md={6} className="mb-4">
            <h6
              className="text-uppercase fw-bold mb-4"
              style={{ color: "#ffffff", letterSpacing: "1px" }}
            >
              NEWSLETTER
            </h6>
            <Form onSubmit={handleNewsletterSubmit}>
              <div className="d-flex">
                <Form.Control
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid #555",
                    color: "#cccccc",
                    borderRadius: "0",
                    borderRight: "none",
                  }}
                />
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "#dc3545",
                    border: "1px solid #dc3545",
                    borderRadius: "0",
                    borderLeft: "none",
                    padding: "0.375rem 1rem",
                  }}
                >
                  SIGN UP
                </Button>
              </div>
            </Form>

            {/* Social Media Icons */}
            <div className="d-flex gap-3 mt-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#cccccc", fontSize: "1.2rem" }}
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#cccccc", fontSize: "1.2rem" }}
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#cccccc", fontSize: "1.2rem" }}
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://plus.google.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#cccccc", fontSize: "1.2rem" }}
              >
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#cccccc", fontSize: "1.2rem" }}
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </Col>
        </Row>

        {/* Bottom Section */}
        <Row className="py-3" style={{ borderTop: "1px solid #444" }}>
          <Col className="text-center">
            <p className="mb-0" style={{ color: "#999", fontSize: "0.9rem" }}>
              © 2025 E-Commerce. Built using Django and React.
            </p>
          </Col>
        </Row>
      </Container>

      <style jsx>{`
        footer a:hover {
          color: #ffffff !important;
          transition: color 0.3s ease;
        }
        .fab:hover {
          transform: translateY(-2px);
          transition: transform 0.3s ease;
          color: #ffffff !important;
        }
        input::placeholder {
          color: #999 !important;
        }
        input:focus {
          background-color: transparent !important;
          border-color: #666 !important;
          box-shadow: none !important;
          color: #cccccc !important;
        }
      `}</style>
    </footer>
  );
}

export default Footer;
