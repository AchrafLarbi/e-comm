import React, { useEffect, useState } from 'react'
import CheckoutSteps from '../components/CheckoutSteps'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Loader from "../components/Loader";
import Message from "../components/Message";
import { createOrderAction } from '../actions/OrderActions'
import { ORDER_CREATE_RESET } from '../constants/OrderConstants'

function PlaceOrderScreen() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error, loading } = orderCreate




    useEffect(() => {
        if (!cart.shippingAddress) {
            navigate('/shipping')
        }
        else if (!cart.paymentMethod) {
            navigate('/payment')
        }
        if (success) {
            navigate(`/order/${order.id}`)
            // reset Order
            dispatch({ type: ORDER_CREATE_RESET })
        }
    }, [success])

    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)
    cart.shippingPrice = (cart.itemsPrice > 500 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number((0.15 * cart.itemsPrice).toFixed(2))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
    const placOrderHandler = () => {
        const order = {
            orderItems: cart.cartItems,
            paymentMethod: cart.paymentMethod,
            shippingAddress: cart.shippingAddress,
            itemsPrice: cart.itemsPrice,
            totalPrice: cart.totalPrice,
            taxPrice: cart.taxPrice,
            shippingPrice: cart.shippingPrice,
        }
        dispatch(createOrderAction(order))
        
    }
    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <h1>Place Order</h1>
            <Row>
                {loading ? <Loader></Loader> : null}
                {error ? <Message variant='danger'> {error}</Message> : null}


                <Col md={8}>
                    <ListGroup variant='flush'>

                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city},
                                {' '}
                                {cart.shippingAddress.postalCode},
                                {' '}
                                {cart.shippingAddress.country}

                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message variant='info'>Your cart is empty</Message>
                                : (<ListGroup variant='flush'>
                                    {
                                        cart.cartItems.map((item, index) => (
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
                                        <Col>Items</Col>
                                        <Col>${cart.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Shipping</Col>
                                        <Col>${cart.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Tax</Col>
                                        <Col>${cart.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Total</Col>
                                        <Col>${cart.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button type='button' className='btn-block' disabled={cart.cartItems == 0} onClick={placOrderHandler}>
                                        Place Order
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen