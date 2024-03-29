import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Meta from '../components/Meta';
import {
  Col,
  Image,
  ListGroup,
  Row,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Message from '../components/Message';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
    history.push('/cart');
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <>
      <Meta title="Shopping cart" />
      <Row>
        <Col md={8}>
          <h2 className="my-3">Shopping Cart</h2>
          {cartItems.length < 1 ? (
            <Message>
              Your cart is empty.{' '}
              <Link to="/" className="btn btn-sm btn-light">
                Go Back
              </Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {Array.isArray(cartItems) &&
                cartItems.length > 0 &&
                cartItems.map(item => (
                  <ListGroup.Item key={item.product} className="py-3">
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={4}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
                        <Form>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={e =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Form>
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>
                  SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items
                </h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price: </Col>
                  <Col>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
