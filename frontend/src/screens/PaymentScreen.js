import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentsMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';
import Meta from '../components/Meta';

const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePaymentsMethod(paymentMethod));
    history.push('/placeorder');
  };

  return (
    <>
      <Meta title="Payment page" />
      <FormContainer>
        <CheckoutSteps step1 step2 step3 />
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <Form.Label as="legend">Select Method</Form.Label>
          <Row>
            <Col>
              <Form.Check
                type="radio"
                label="PayPal or Credit Card"
                name="paymentMethod"
                value="PayPal"
                checked
                id="PayPal"
                onChange={e => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="Stripe"
                name="paymentMethod"
                value="Stripe"
                id="Stripe"
                onChange={e => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Row>

          <Button type="submit" variant="primary" className="mt-3">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
