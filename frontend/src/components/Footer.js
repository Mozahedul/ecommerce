import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return (
    <>
      <Container>
        <Row>
          <Col className="text-center my-3">
            Copyright &copy; eCommerce Limited
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
