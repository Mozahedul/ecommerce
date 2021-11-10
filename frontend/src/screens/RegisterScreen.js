import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState('Show Password');
  const [showConfirmPassword, setShowConfirmPassword] = useState(
    'Show Confirm Password'
  );

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  const checkoutHandler = () => {
    const passwordElement = document.getElementById('passwordId');
    if (passwordElement.type === 'password') {
      passwordElement.type = 'text';
      setShowPassword('Hide Password');
    } else {
      passwordElement.type = 'password';
      setShowPassword('Show Password');
    }
  };

  const checkoutConfirmHandler = () => {
    const confirmCheckoutElement = document.getElementById('confirmPasswordId');
    if (confirmCheckoutElement.type === 'password') {
      confirmCheckoutElement.type = 'text';
      setShowConfirmPassword('Hide Confirm Password');
    } else {
      confirmCheckoutElement.type = 'password';
      setShowConfirmPassword('Show Confirm Password');
    }
  };

  return (
    <>
      <Meta title="Register page" />
      <FormContainer>
        <h2>Sign Up</h2>
        {message && <Message variant="danger">{message}</Message>}
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mt-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mt-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mt-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="password"
              value={password}
              id="passwordId"
              onChange={e => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Check
              label={showPassword}
              onClick={checkoutHandler}
              disabled={password === ''}
            />
          </Form.Group>

          <Form.Group className="mt-3" controlId="confirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              id="confirmPasswordId"
              onChange={e => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Check
              label={showConfirmPassword}
              onClick={checkoutConfirmHandler}
              disabled={confirmPassword === ''}
            />
          </Form.Group>

          <Button type="submit" className="my-3">
            Sign Up
          </Button>
        </Form>
        <Row>
          <Col>
            Have an Account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/register'}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default RegisterScreen;
