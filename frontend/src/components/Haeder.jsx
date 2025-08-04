import React, { useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { userLogoutAction } from "../actions/UserActions";
import SearchBox from "./SearchBox";
import AlertModal from "./AertModal";

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
          fontFamily: "Inter, sans-serif"
        }}
        variant="dark"
        collapseOnSelect
      >
        <Container fluid className="d-flex flex-row align-items-center justify-content-between position-relative" style={{ minHeight: '80px' }}>
          {/* Left: Nav links */}
          <div className="d-flex align-items-center flex-grow-1" style={{ minWidth: 0 }}>
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
                    <i className="fa fa-home me-1"></i>
                    {userInfo && userInfo.isAdmin ? "Tableau de Bord" : "Accueil"}
                  </Nav.Link>
                </LinkContainer>
                {/* Hide cart for admins */}
                {(!userInfo || !userInfo.isAdmin) && (
                  <LinkContainer to="cart/">
                    <Nav.Link className="nav-link-hover">
                      <i
                        className="fa fa-cart-shopping me-1 cart-icon"
                        data-cart-icon
                      ></i>{" "}
                      Panier
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </div>
          {/* Center: Logo */}
          <div className="position-absolute top-50 start-50 translate-middle" style={{ zIndex: 2 }}>
            <LinkContainer to="/">
              <Navbar.Brand className="d-flex align-items-center justify-content-center mx-auto">
                <img
                  src="/textlogo.png"
                  alt="Maison SYRA Logo"
                  height="80"
                  className="mx-auto"
                  style={{ borderRadius: "4px", display: 'block' }}
                />
              </Navbar.Brand>
            </LinkContainer>
          </div>
          {/* Right: User/Profile/Login */}
          <div className="d-flex align-items-center justify-content-end flex-grow-1" style={{ minWidth: 0 }}>
            <div className="d-flex justify-content-center align-items-center mt-3 mt-md-0 text-white ms-auto">
              {userInfo ? (
                <NavDropdown
                  className="fw-semibold"
                  title={
                    <span>
                      <i className="fa fa-user me-1"></i> {userInfo.name}
                    </span>
                  }
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item className="py-2">
                      <i className="fa fa-user-circle me-2"></i>Profil
                    </NavDropdown.Item>
                  </LinkContainer>
                  {/* Show different menu items for admin vs regular users */}
                  {userInfo.isAdmin ? (
                    <>
                      <LinkContainer to="/admin/orders">
                        <NavDropdown.Item className="py-2">
                          <i className="fa fa-shopping-bag me-2"></i>Toutes les
                          Commandes
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/products">
                        <NavDropdown.Item className="py-2">
                          <i className="fa fa-box me-2"></i>Produits
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/users">
                        <NavDropdown.Item className="py-2">
                          <i className="fa fa-users me-2"></i>Utilisateurs
                        </NavDropdown.Item>
                      </LinkContainer>
                    </>
                  ) : (
                    <LinkContainer to="/my-orders">
                      <NavDropdown.Item className="py-2">
                        <i className="fa fa-shopping-bag me-2"></i>Mes Commandes
                      </NavDropdown.Item>
                    </LinkContainer>
                  )}
                  <AlertModal
                    customebutton={
                      <NavDropdown.Item className="py-2 text-danger">
                        <i className="fa fa-sign-out-alt me-2"></i>Déconnexion
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
                      <i className="fa fa-user-plus me-1"></i> S'inscrire
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/login">
                    <Button className="btn bg-white text-dark rounded-pill fw-bold border-0 shadow-sm px-3 py-1 btn-hover">
                      <i className="fa fa-sign-in-alt me-1"></i> Se Connecter
                    </Button>
                  </LinkContainer>
                </div>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title={
                    <span className="ms-3">
                      <i className="fa fa-lock me-1"></i> Admin
                    </span>
                  }
                  id="adminmenu"
                  className="fw-semibold"
                >
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item className="py-2">
                      <i className="fa fa-users me-2"></i>Utilisateurs
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item className="py-2">
                      <i className="fa fa-box me-2"></i>Produits
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item className="py-2">
                      <i className="fa fa-shopping-bag me-2"></i>Commandes
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </div>
          </div>
        </Container>
      </Navbar>

      <style jsx>{`
        .navbar, .nav-link, .navbar-brand, .dropdown-menu, .dropdown-item, .navbar-nav, .nav-dropdown, .btn, .btn * {
          font-family: 'Inter', sans-serif !important;
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
