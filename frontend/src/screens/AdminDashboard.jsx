import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllOrdersAction } from "../actions/AdminActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { formatCurrency } from "../utils/currency";

function AdminDashboard() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderAll = useSelector((state) => state.orderAll);
  const { orders, loading, error } = orderAll;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(adminGetAllOrdersAction());
    }
  }, [dispatch, userInfo]);

  if (!userInfo || !userInfo.isAdmin) {
    return (
      <Container>
        <Message variant="danger">Accès Refusé. Admin Seulement.</Message>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Admin Dashboard</h1>
          <p className="text-muted">Manage orders, users, and products</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Orders Management</Card.Title>
              <Card.Text>View and manage all customer orders</Card.Text>
              <Button variant="primary" href="/admin/orders">
                Manage Orders
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Users Management</Card.Title>
              <Card.Text>View and manage customer accounts</Card.Text>
              <Button variant="success" href="/admin/users">
                Manage Users
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Products Management</Card.Title>
              <Card.Text>Add, edit, and manage products</Card.Text>
              <Button variant="warning" href="/admin/products">
                Manage Products
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Header>
              <h3>Recent Orders</h3>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Total</th>
                      <th>Payment Status</th>
                      <th>Delivery Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders &&
                      orders.slice(0, 10).map((order) => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{order.user?.name || "N/A"}</td>
                          <td>{formatCurrency(order.totalPrice)}</td>
                          <td>
                            <span
                              className={`badge ${
                                order.isPaid ? "bg-success" : "bg-warning"
                              }`}
                            >
                              {order.isPaid ? "Payé" : "Non Payé"}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                order.isDelivered
                                  ? "bg-success"
                                  : "bg-secondary"
                              }`}
                            >
                              {order.isDelivered ? "Livré" : "En Attente"}
                            </span>
                          </td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              href={`/order/${order.id}`}
                            >
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;
