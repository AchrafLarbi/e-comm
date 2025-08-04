import React, { useEffect } from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { userLogoutAction } from "../actions/UserActions";
import AlertModal from "./AertModal";
import {
  FaHome,
  FaShoppingCart,
  FaUser,
  FaUserCircle,
  FaShoppingBag,
  FaBox,
  FaUsers,
  FaSignOutAlt,
  FaUserPlus,
  FaSignInAlt,
  FaLock,
} from "react-icons/fa";

function Haeder() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  useEffect(() => {}, [userInfo]);

  const logoutHandler = () => {
    dispatch(userLogoutAction());
  };
  return (
    <header>
      <Navbar
        expand="lg"
        className="p-2"
        style={{
          background:
            "linear-gradient(135deg, var(--syra-green) 70%, var(--syra-burgundy) 100%)",
          color: "var(--syra-gold)",
          fontFamily: "Inter, sans-serif",
        }}
        variant="dark"
        collapseOnSelect
      >
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center">
              <img
                src="/textlogo.png"
                alt="Maison SYRA Logo"
                height="100"
                className="me-2"
                style={{ borderRadius: "4px" }}
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
            >
              <LinkContainer to={userInfo && userInfo.isAdmin ? "/admin" : "/"}>
                <Nav.Link
                  href={userInfo && userInfo.isAdmin ? "/admin" : "/"}
                  className="me-2 nav-link-hover"
                >
                  <FaHome className="me-1" />
                  {userInfo && userInfo.isAdmin ? "Tableau de Bord" : "Accueil"}
                </Nav.Link>
              </LinkContainer>
              {/* Hide cart for admins */}
              {(!userInfo || !userInfo.isAdmin) && (
                <LinkContainer to="cart/">
                  <Nav.Link className="nav-link-hover">
                    <FaShoppingCart className="me-1 cart-icon" data-cart-icon />{" "}
                    Panier
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>

            <div className="d-flex justify-content-center align-items-center mt-3 mt-md-0 text-white">
              {userInfo ? (
                <NavDropdown
                  className="fw-semibold"
                  title={
                    <span>
                      <FaUser className="me-1" /> {userInfo.name}
                    </span>
                  }
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item className="py-2">
                      <FaUserCircle className="me-2" />
                      Profil
                    </NavDropdown.Item>
                  </LinkContainer>
                  {/* Show different menu items for admin vs regular users */}
                  {userInfo.isAdmin ? (
                    <>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item className="py-2">
                          <FaShoppingBag className="me-2" />
                          Toutes les Commandes
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item className="py-2">
                          <FaBox className="me-2" />
                          Produits
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item className="py-2">
                          <FaUsers className="me-2" />
                          Utilisateurs
                        </NavDropdown.Item>
                      </LinkContainer>
                    </>
                  ) : (
                    <LinkContainer to="/my-orders">
                      <NavDropdown.Item className="py-2">
                        <FaShoppingBag className="me-2" />
                        Mes Commandes
                      </NavDropdown.Item>
                    </LinkContainer>
                  )}
                  <AlertModal
                    customebutton={
                      <NavDropdown.Item className="py-2 text-danger">
                        <FaSignOutAlt className="me-2" />
                        Déconnexion
                      </NavDropdown.Item>
                    }
                    myaction={logoutHandler}
                    title="Déconnexion"
                    message="Êtes-vous sûr de vouloir vous déconnecter ?"
                    savetitle="Déconnexion"
                    variant="danger"
                  />
                </NavDropdown>
              ) : (
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ minWidth: "150px" }}
                >
                  <LinkContainer to="/register">
                    <Nav.Link className="text-white me-2 nav-link-hover">
                      <FaUserPlus className="me-1" /> S'inscrire
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/login">
                    <Button className="btn bg-white text-dark rounded-pill fw-bold border-0 shadow-sm px-3 py-1 btn-hover">
                      <FaSignInAlt className="me-1" /> Se Connecter
                    </Button>
                  </LinkContainer>
                </div>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title={
                    <span className="ms-3">
                      <FaLock className="me-1" /> Admin
                    </span>
                  }
                  id="adminmenu"
                  className="fw-semibold"
                >
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item className="py-2">
                      <FaUsers className="me-2" />
                      Utilisateurs
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item className="py-2">
                      <FaBox className="me-2" />
                      Produits
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item className="py-2">
                      <FaShoppingBag className="me-2" />
                      Commandes
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <style jsx>{`
        .navbar,
        .nav-link,
        .navbar-brand,
        .dropdown-menu,
        .dropdown-item,
        .navbar-nav,
        .nav-dropdown,
        .btn,
        .btn * {
          font-family: "Inter", sans-serif !important;
        }
        .nav-link-hover:hover {
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }
        .btn-hover:hover {
          background-color: #f8f9fa !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
        }
        .navbar-brand {
          transition: all 0.3s ease;
        }
        .navbar-brand:hover {
          transform: scale(1.05);
        }
      `}</style>
    </header>
  );
}

export default Haeder;
