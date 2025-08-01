import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUserAction, userListAction } from "../actions/UserActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  Alert,
  Button,
  ButtonGroup,
  Table,
  Row,
  Col,
  Form,
  Card,
  InputGroup,
  Badge,
  Pagination,
} from "react-bootstrap";
import AlertModal from "../components/AertModal";

function UserListScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  // delete user
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete, error: errorDelete } = userDelete;

  // Search and pagination states
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login?redirect=admin/users");
    } else {
      dispatch(userListAction());
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    dispatch(deleteUserAction(id));
  };

  // Filter users based on search term
  const filteredUsers = users
    ? users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.id.toString().includes(searchTerm)
      )
    : [];

  // Get current users for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Generate pagination items
  let paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      {errorDelete && <Alert variant="danger">{errorDelete}</Alert>}

      {/* Breadcrumb Navigation */}
      <Row className="mb-3">
        <Col>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Accueil</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="/admin">Admin</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Utilisateurs
              </li>
            </ol>
          </nav>
        </Col>
      </Row>

      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-primary text-white">
          <Row>
            <Col>
              <h3>
                <i className="fas fa-users me-2"></i> User Management
              </h3>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row className="mb-3 align-items-center">
            <Col md={6}>
              <h5>
                Total Utilisateurs:{" "}
                <Badge bg="secondary">{filteredUsers.length}</Badge>
              </h5>
            </Col>
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>
                  <i className="fas fa-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by name, email or ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>

          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <div className="table-responsive">
                <Table striped bordered hover responsive className="table-sm">
                  <thead className="bg-light">
                    <tr>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>ADMIN STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((user) => (
                      <tr key={user.id}>
                        <td>#{user.id}</td>
                        <td>{user.name}</td>
                        <td>
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </td>
                        <td className="text-center">
                          {user.isAdmin ? (
                            <Badge bg="success">
                              Admin <i className="fas fa-check ms-1"></i>
                            </Badge>
                          ) : (
                            <Badge bg="secondary">Utilisateur Régulier</Badge>
                          )}
                        </td>
                        <td>
                          <ButtonGroup>
                            <Link to={`/admin/users/${user.id}/edit`}>
                              <Button
                                className="btn-sm"
                                variant="outline-primary"
                              >
                                <i className="fas fa-edit"></i> Edit
                              </Button>
                            </Link>

                            <AlertModal
                              myaction={() => deleteHandler(user.id)}
                              customebutton={
                                <Button
                                  className="btn-sm ms-2"
                                  variant="outline-danger"
                                >
                                  <i className="fas fa-trash"></i> Delete
                                </Button>
                              }
                              title="Delete User"
                            />
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-3">
                  <Pagination>
                    <Pagination.First
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                    />
                    <Pagination.Prev
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                    {paginationItems}
                    <Pagination.Next
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    />
                    <Pagination.Last
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserListScreen;
