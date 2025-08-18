import React from "react";
import { Container, Row, Col, Card, Badge, InputGroup } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getUserDetailAction, updateUserAction } from "../actions/UserActions";
import { USER_UPDATE_RESET } from "../constants/UserConstants";
import {
  FiArrowLeft,
  FiUserCheck,
  FiAlertCircle,
  FiUser,
  FiAtSign,
  FiMail,
  FiCheck,
  FiX,
  FiSave,
  FiCheckCircle,
} from "react-icons/fi";

function UserEditScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userdata, setUserData] = useState({
    name: "",
    username: "",
    email: "",
    isAdmin: false,
  });
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const dispatch = useDispatch();
  const userDetail = useSelector((state) => state.userDetail);
  const { loading, error, userDetail: user } = userDetail;
  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading: updateLoading, error: updateError, success } = userUpdate;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }

    if (!user || user.id !== Number(id)) {
      dispatch(getUserDetailAction(id, `/api/users/user/${id}/`));
    } else
      setUserData({
        name: user.name,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
      });
  }, [navigate, userInfo, user, dispatch, id]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch({ type: USER_UPDATE_RESET });
      }, 2000);
    }
  }, [success, dispatch, navigate]);
  // Improved submitHandler with validation
  const submitHandler = (e) => {
    e.preventDefault();

    // Validate before submitting
    if (userdata.isAdmin === undefined) {
      // You could set a local error state here
      return;
    }

    dispatch(updateUserAction(id, { isAdmin: userdata.isAdmin }));
  };

  const handlechange = (e) => {
    if (e.target.name === "isAdmin") {
      setUserData({ ...userdata, [e.target.name]: e.target.checked });
    }
  };

  const { name, username, email, isAdmin } = userdata;

  return (
    <Container className="py-4">
      <Link to="/admin/users" className="btn btn-outline-secondary mb-4">
        <FiArrowLeft className="me-2" />
        Back to Users List
      </Link>

      <Card className="shadow-sm border-0 mb-4">
        <Card.Header className="bg-primary text-white py-3">
          <h4 className="mb-0">
            <FiUserCheck className="me-2" />
            User Details
          </h4>
        </Card.Header>
        <Card.Body className="p-4">
          {loading ? (
            <div className="text-center py-4">
              <Loader size={50} />
            </div>
          ) : error ? (
            <Message variant="danger">
              <FiAlertCircle className="me-2" />
              {error}
            </Message>
          ) : (
            <Form onSubmit={submitHandler}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="name" className="mb-4">
                    <Form.Label>
                      <FiUser className="me-2" />
                      Full Name
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        value={name ? name : ""}
                        disabled
                        className="bg-light"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="username" className="mb-4">
                    <Form.Label>
                      <FiAtSign className="me-2" />
                      Nom d'utilisateur
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        value={username ? username : ""}
                        disabled
                        className="bg-light"
                      />
                    </InputGroup>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="email" className="mb-4">
                <Form.Label>
                  <FiMail className="me-2" />
                  Adresse Email
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="email"
                    value={email ? email : ""}
                    disabled
                    className="bg-light"
                  />
                </InputGroup>
              </Form.Group>

              {userInfo.is_superuser && (
                <Card className="border-light bg-light mb-4">
                  <Card.Body>
                    <div className="d-flex align-items-center mb-2">
                      <Badge
                        bg={isAdmin ? "success" : "secondary"}
                        className="me-2 p-2"
                      >
                        {isAdmin ? (
                          <FiCheck className="me-1" />
                        ) : (
                          <FiX className="me-1" />
                        )}
                        {isAdmin ? "Admin" : "Pas Admin"}
                      </Badge>
                      <h5 className="mb-0">Privilèges Admin</h5>
                    </div>

                    <Form.Group controlId="isAdmin" className="mb-0">
                      <Form.Check
                        type="switch"
                        label="Accorder les privilèges admin à cet utilisateur"
                        checked={isAdmin}
                        name="isAdmin"
                        onChange={handlechange}
                        className="mt-2"
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              )}

              {updateError && (
                <Message variant="danger" className="mb-4">
                  <FiAlertCircle className="me-2" />
                  {updateError}
                </Message>
              )}

              {success && (
                <Message variant="success" className="mb-4">
                  <FiCheckCircle className="me-2" />
                  Informations utilisateur mises à jour avec succès
                </Message>
              )}

              {userInfo.is_superuser && (
                <div className="d-flex justify-content-end">
                  <Button
                    type="submit"
                    variant="primary"
                    className="px-4 py-2"
                    disabled={updateLoading}
                  >
                    {updateLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Mise à jour...
                      </>
                    ) : (
                      <>
                        <FiSave className="me-2" />
                        Enregistrer les Modifications
                      </>
                    )}
                  </Button>
                </div>
              )}
            </Form>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserEditScreen;
