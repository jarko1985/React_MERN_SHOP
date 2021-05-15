import React, { useState, useEffect } from "react";
import Layout from "../Core/Layout";
import { isAuthenticated } from "../API";
import { createProduct } from "./AdminApi";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const { user, token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    categories: [],
    shipping: "",
    quantity: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    redirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    category,
    categories,
    shipping,
    quantity,
    loading,
    error,
    createdProduct,
    redirect,
    formData,
  } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createProduct(user._id, token, formData);
  };

  const newProductForm = () => {
    return (
      <form className="mb-3">
        <h4>Product Image</h4>
        <div className="form-group">
          <label className="btn btn-secondary">
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange("photo")}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleChange("name")}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={handleChange("description")}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={handleChange("price")}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Category</label>
          <select className="form-control" onChange={handleChange("category")}>
            <option value="fruits">Fruits</option>
            <option value="fruits">Vegetables</option>
            <option value="fruits">Clothes</option>
            <option value="fruits">Sporting Goods</option>
          </select>
        </div>
        <div className="form-group">
          <label className="text-muted">Shipping</label>
          <select className="form-control" onChange={handleChange("shipping")}>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <div className="form-group">
          <label className="text-muted">Quantity</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={handleChange("quantity")}
          />
        </div>
        <button className="btn btn-outline-primary" onClick={handleSubmit}>
          Add Product
        </button>
      </form>
    );
  };

  return (
    <Layout
      title="Add New Product"
      description={`Welcome  here you can add a new Product`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">{newProductForm()}</div>
      </div>
    </Layout>
  );
};

export default AddProduct;
