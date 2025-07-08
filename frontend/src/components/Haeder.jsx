import React, { useEffect } from "react";
import { Container, Navbar, Nav, NavDropdown, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { userLogoutAction } from "../actions/UserActions";
import SearchBox from "./SearchBox";
import AlertModal from "./AertModal";

function Haeder() {
  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  useEffect(() => {
  }, [userInfo]);

  const logoutHandler = () => {
    dispatch(userLogoutAction());
  };
  return (
    <header>
      <Navbar expand="lg" className="bg-dark p-2" variant="dark" collapseOnSelect>
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center">
              <i className="fa fa-shopping-cart me-2"></i> 
              <span className="fw-bold">Django Shopping</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
            >
              <LinkContainer to="/">
                <Nav.Link href="/" className="me-2 nav-link-hover">
                  <i className="fa fa-home me-1"></i> Home
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="cart/">
                <Nav.Link className="nav-link-hover">
                  <i className="fa fa-cart-shopping me-1"></i> Cart
                </Nav.Link>
              </LinkContainer>
            </Nav>
            
            <div className="d-flex justify-content-center align-items-center mt-3 mt-md-0 text-white">
              {userInfo ? (
                <NavDropdown 
                  className="d-none d-md-block fw-semibold" 
                  title={<span><i className="fa fa-user me-1"></i> {userInfo.name}</span>} 
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item className="py-2"><i className="fa fa-user-circle me-2"></i>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/my-orders">
                    <NavDropdown.Item className="py-2"><i className="fa fa-shopping-bag me-2"></i>My Orders</NavDropdown.Item>
                  </LinkContainer>
                  <AlertModal 
                    customebutton={<NavDropdown.Item className="py-2 text-danger"><i className="fa fa-sign-out-alt me-2"></i>Logout</NavDropdown.Item>}
                    myaction={logoutHandler}
                    title="Logout" 
                    message="Are you sure you want to logout?"
                    savetitle="Logout"
                    variant="danger"
                  />
                </NavDropdown>
              ) : (
                <div className="d-flex justify-content-between align-items-center" style={{ minWidth: '150px' }}>
                  <LinkContainer to="/register">
                    <Nav.Link className="text-white me-2 nav-link-hover" >
                      <i className="fa fa-user-plus me-1"></i> Sign Up
                    </Nav.Link>
                  </LinkContainer>

                  <LinkContainer to="/login">
                    <Button
                      className="btn bg-white text-dark rounded-pill fw-bold border-0 shadow-sm px-3 py-1 btn-hover"
                    ><i className="fa fa-sign-in-alt me-1"></i> Sign In</Button>
                  </LinkContainer>
                </div>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown 
                  title={<span className="ms-3"><i className="fa fa-lock me-1"></i> Admin</span>}
                  id="adminmenu"
                  className="fw-semibold"
                >
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item className="py-2"><i className="fa fa-users me-2"></i>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item className="py-2"><i className="fa fa-box me-2"></i>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item className="py-2"><i className="fa fa-shopping-bag me-2"></i>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <style jsx>{`
        .nav-link-hover:hover {
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }
        .btn-hover:hover {
          background-color: #f8f9fa !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1) !important;
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
