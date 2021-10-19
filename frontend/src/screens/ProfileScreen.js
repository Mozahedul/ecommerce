import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUsersProfile } from '../actions/userActions';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const updateUserProfile = useSelector(state => state.updateUserProfile);
  const { success } = updateUserProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const submitHandler = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('passwords do not match');
    } else {
      dispatch(updateUsersProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {message && <Message variant="danger">{message}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mt-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mt-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="email"
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
              onChange={e => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mt-3" controlId="name">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
