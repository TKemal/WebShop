import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart)
  const user = useSelector((state) => state.userLogin)

  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }
  //Calculate prices
  cart.itemsPrice = addDecimal(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimal(7)
  cart.taxPrice = addDecimal(Number(0.17 * cart.itemsPrice).toFixed(2))
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2)

  const placeOrderhandler = () => {
    console.log('order done')
  }

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong> {user.userInfo.name}
                {', '}
                {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.postalCode}, {cart.shippingAddress.city},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method </h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.lenght === 0 ? (
                <Message>Your Cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x €{item.price} = €{item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item disabled>
                <Row>
                  <Col>Items</Col>
                  <Col>€{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item disabled>
                <Row>
                  <Col>Shipping</Col>
                  <Col>€{cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item disabled>
                <Row>
                  <Col>Tax</Col>
                  <Col>€{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item variant='dark'>
                <Row>
                  <Col>TOTAL :</Col>
                  <Col>€{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disebled={cart.cartItems === 0}
                  onClick={placeOrderhandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
