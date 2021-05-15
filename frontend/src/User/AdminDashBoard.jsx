import React from "react";
import Layout from "../Core/Layout";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../API";

const AdminDashBoard = () => {
  const { user } = isAuthenticated();
  const { name, email, role } = user;

  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Add Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Add Product
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Admin Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">{role === 1 ? "Admin" : "User"}</li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="DashBoard"
      description={`Welcome ${name} Have a great day!!`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashBoard;
