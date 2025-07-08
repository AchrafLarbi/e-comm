import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToCartAction, removeItemCartAction } from '../actions/CartActions'
import Message from '../components/Message'
function CartPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  // get quantit from the url
  const quantity = window.location.search ? Number(window.location.search.split('=')[1]) : 1
  const dispatch = useDispatch()
  // select cart from the state
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {

    if (id) {
      dispatch(addToCartAction(id, quantity))
    }

  }, [])
  const removeFromCartHandler = (id) => {
    dispatch(removeItemCartAction(id))  // remove the item from the cart
  }
  const checkoutHandler = () => {
    navigate('/login?redirect=shipping')
  }

  return (
    <div>
      <h1>Shopping Cart</h1>
      {/* if the cart is empty */}
      {cartItems.length === 0 ? (
        <Message> Your cart is empty <Link to='/'>Go Back</Link></Message>
      ) : (
        <Link to='/'>Go Back</Link>
      )}
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={`${process.env.REACT_APP_MEDIA_URL}${item.image}`} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addToCartAction(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                  items
                </h2>
                ${cartItems
                  .reduce((acc, item) => acc + item.quantity * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>  </div>

  )
}

export default CartPage