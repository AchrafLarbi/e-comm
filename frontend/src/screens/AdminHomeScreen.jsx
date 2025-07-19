import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Badge,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { adminGetAllOrdersAction } from "../actions/AdminActions";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { formatCurrency } from "../utils/currency";

function AdminHomeScreen() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const allOrders = useSelector((state) => state.allOrders);
  const { orders, loading, error } = allOrders;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(adminGetAllOrdersAction());
    }
  }, [dispatch, userInfo]);

  const getTotalStats = () => {
    if (!orders)
      return {
        totalOrders: 0,
        paidOrders: 0,
        deliveredOrders: 0,
        totalRevenue: 0,
      };

    const totalOrders = orders.length;
    const paidOrders = orders.filter((order) => order.isPaid).length;
    const deliveredOrders = orders.filter((order) => order.isDelivered).length;
    const totalRevenue = orders.reduce(
      (sum, order) => sum + parseFloat(order.totalPrice || 0),
      0
    );

    return { totalOrders, paidOrders, deliveredOrders, totalRevenue };
  };

  const stats = getTotalStats();

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h1>Admin Dashboard</h1>
          <p className="text-muted">
            Welcome back, {userInfo?.name}! Here's your business overview.
          </p>
        </Col>
      </Row>

      {/* Statistics Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center bg-primary text-white">
            <Card.Body>
              <h3>{stats.totalOrders}</h3>
              <Card.Text>Total Orders</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-success text-white">
            <Card.Body>
              <h3>{stats.paidOrders}</h3>
              <Card.Text>Paid Orders</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-info text-white">
            <Card.Body>
              <h3>{stats.deliveredOrders}</h3>
              <Card.Text>Delivered Orders</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center bg-warning text-white">
            <Card.Body>
              <h3>{formatCurrency(stats.totalRevenue)}</h3>
              <Card.Text>Total Revenue</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <Card.Title>Orders Management</Card.Title>
              <Card.Text>View, manage, and process customer orders</Card.Text>
              <Link to="/admin/orders">
                <Button variant="primary" size="lg">
                  Manage Orders
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <Card.Title>Products Management</Card.Title>
              <Card.Text>Add, edit, and manage your product catalog</Card.Text>
              <Link to="/admin/products">
                <Button variant="success" size="lg">
                  Manage Products
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <Card.Title>Users Management</Card.Title>
              <Card.Text>View and manage customer accounts</Card.Text>
              <Link to="/admin/users">
                <Button variant="info" size="lg">
                  Manage Users
                </Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders Table */}
      <Row>
        <Col>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h4>Recent Orders</h4>
              <Link to="/admin/orders">
                <Button variant="outline-primary" size="sm">
                  View All Orders
                </Button>
              </Link>
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
                      <th>Date</th>
                      <th>Total</th>
                      <th>Payment</th>
                      <th>Delivery</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders &&
                      orders.slice(0, 10).map((order) => (
                        <tr key={order.id}>
                          <td>
                            <Link
                              to={`/order/${order.id}`}
                              className="text-decoration-none"
                            >
                              #{order.id}
                            </Link>
                          </td>
                          <td>{order.user?.name || "N/A"}</td>
                          <td>
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td>{formatCurrency(order.totalPrice)}</td>
                          <td>
                            <Badge bg={order.isPaid ? "success" : "warning"}>
                              {order.isPaid ? "Paid" : "Unpaid"}
                            </Badge>
                          </td>
                          <td>
                            <Badge
                              bg={order.isDelivered ? "success" : "secondary"}
                            >
                              {order.isDelivered ? "Delivered" : "Pending"}
                            </Badge>
                          </td>
                          <td>
                            <Link to={`/order/${order.id}`}>
                              <Button variant="outline-primary" size="sm">
                                Manage
                              </Button>
                            </Link>
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

export default AdminHomeScreen;
