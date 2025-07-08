import React, { useEffect, useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { createOrderAction, deliverOrderAction, getOrderDetailsAction } from '../actions/OrderActions'
import { ORDER_CREATE_RESET, ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/OrderConstants'
import PayPal from '../components/Paypal'

function OrderScreen() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // user login state
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDetails = useSelector(state => state.orderDetails)

    const { order, error, loading } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { success: successPay, loading: loadingPay } = orderPay

    // order delivere state
    const orderDeliver = useSelector(state => state.orderDeliver)
    const { success: successDeliver, loading: loadingDeliver ,message} = orderDeliver
    useEffect(() => {
        if (!order || order.id !== Number(id) || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetailsAction(id))

        }


    }, [id, order,successDeliver])





    const handleSuccessPayment = (paymentResult) => {
        dispatch(createOrderAction({
            paymentResult: paymentResult
        }))
    }
    const deliverHandler = () => {
        dispatch(deliverOrderAction(id))
    }

    return (
        <div>

            <h1>Order {id}</h1>

            {loading ? <Loader></Loader> : error ? <Message variant='danger'> {error}</Message> :
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>

                            <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong>
                                    {order.user.name}
                                    <br />
                                    <strong>Email: </strong>
                                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                </p>
                                <p>
                                    <strong>Shipping: </strong>
                                    {order.shippingAddress.address}, {order.shippingAddress.city},
                                    {' '}
                                    {order.shippingAddress.postalCode},
                                    {' '}
                                    {order.shippingAddress.country}

                                </p>
                                {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message> :
                                    <Message variant='warning'>Not Delivered</Message>}

                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                                {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> :
                                    <Message variant='warning'>Not Paid</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? <Message variant='info'>Your Order is empty</Message>
                                    : (<ListGroup variant='flush'>
                                        {
                                            order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row>
                                                        <Col md={1}>
                                                             <img src={`${process.env.REACT_APP_MEDIA_URL}${item.image}`}  alt={item.name} className='img-fluid' />
                                                        </Col>
                                                        <Col>
                                                            {item.name}
                                                        </Col>
                                                        <Col md={4}>
                                                            {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))

                                        }
                                    </ListGroup>
                                    )}
                            </ListGroup.Item>
                        </ListGroup>

                    </Col>
                    <Col md={4}>
                        <div>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Items Price</Col>
                                            <Col>${order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {/* payment */}
                                    <ListGroup.Item>
                                        {loadingPay && <Loader></Loader>}
                                        {!order.isPaid && (
                                            <PayPal orderId={order.id}
                                            />
                                        )}
                                    </ListGroup.Item>
                                    {/* deliver */}
                                    {loadingDeliver ? <Loader></Loader> : userInfo && userInfo.isAdmin  && !order.isDelivered &&
                                     (   
                                        <ListGroup.Item>
                                            <Button
                                                type='button'
                                                className='btn btn-block'
                                                onClick={deliverHandler}
                                            >
                                                Mark As Delivered
                                            </Button>
                                        </ListGroup.Item>
                                    )}

                                </ListGroup>
                            </Card>
                        </div>
                    </Col>
                </Row>}
        </div>
    )
}

export default OrderScreen