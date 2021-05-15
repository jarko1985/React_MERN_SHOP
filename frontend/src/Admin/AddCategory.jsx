import React, { useState } from "react";
import Layout from "../Core/Layout";
import { isAuthenticated } from "../API";
import { createCategory } from "./AdminApi";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setSuccess(true);
      }
    });
  };
  const showSuccess = () => {
    if (success) {
      return (
        <div className="alert alert-success">
          <h5>{name} is created</h5>
        </div>
      );
    }
  };

  const showError = () => {
    if (error) {
      return (
        <div className="alert alert-danger">
          <h5> {name} already exists...Category should be unique</h5>
        </div>
      );
    }
  };

  const goBack = () => (
    <div className="mt-5">
      <Link className="text-warning" to="/admin/dashboard">
        Back to DashBoard
      </Link>
    </div>
  );
  const addCategoryForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category-name" className="text-muted">
            Category Name
          </label>
          <input
            className="form-control"
            name="category-name"
            type="text"
            value={name}
            onChange={handleChange}
            autoFocus
          />
        </div>
        <button className="btn btn-outline-primary">Add Category</button>
      </form>
    );
  };
  return (
    <Layout
      title="Add New Category"
      description={`Welcome ${user.name} here you can add a new Category`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {addCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Layout>
  );
};

export default AddCategory;
