import React, { useState } from 'react';
import { Button, Form, Col, Row } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');
  console.log(keyword);

  const submitHandler = e => {
    e.preventDefault();
    if (keyword) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };
  return (
    <Form onSubmit={submitHandler} inline>
      <Row>
        <Form.Group as={Col} controlId="searchProducts">
          <Form.Control
            type="text"
            value={keyword}
            name="q"
            placeholder="Search Products..."
            onChange={e => setKeyword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group as={Col} controlId="submitProduct">
          <Button type="submit" variant="outline-success" className="p-2">
            Search
          </Button>
        </Form.Group>
      </Row>
    </Form>
  );
};

export default SearchBox;
