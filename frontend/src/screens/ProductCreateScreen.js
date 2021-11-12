import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { createProduct } from '../actions/productActions';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

const ProductCreateScreen = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setupUploading] = useState(false);

  console.log(image);

  const uploadFileHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setupUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/uploads', formData, config);
      setImage(data);
      setupUploading(false);
    } catch (error) {
      console.log(error);
      setupUploading(false);
    }
  };

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        brand,
        image,
        category,
        countInStock,
        description,
      })
    );
  };
  return (
    <div>
      <Link className="btn btn-light my-3" to="/admin/productlist">
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Product</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="mt-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price" className="mt-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={e => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              className="mb-3"
              type="text"
              placeholder="Enter image URL"
              value={image}
              onChange={e => setImage(e.target.value)}
            ></Form.Control>
            <Form.Control
              type="file"
              id="image-file"
              onClick={uploadFileHandler}
            ></Form.Control>
            {uploading && <Loader />}
          </Form.Group>

          <Form.Group controlId="brand" className="mt-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter brand"
              value={brand}
              onChange={e => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description" className="mt-3">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product description"
              value={description}
              onChange={e => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countInStock" className="mt-3">
            <Form.Label>CountInStock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter countInStock"
              value={countInStock}
              onChange={e => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mt-3">
            <Button type="submit" className="btn btn-primary">
              Create
            </Button>
          </Form.Group>
        </Form>
      </FormContainer>
    </div>
  );
};

export default ProductCreateScreen;
