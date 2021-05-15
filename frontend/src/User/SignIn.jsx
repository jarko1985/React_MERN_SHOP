import React, { useState } from "react";
import Layout from "../Core/Layout";
import { Redirect } from "react-router-dom";
import { signIn, authenticate, isAuthenticated } from "../API";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirect: false,
  });

  const { email, password, error, loading, redirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (value) => (event) => {
    setValues({ ...values, error: false, [value]: event.target.value });
  };
  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  const showLoading = () =>
    loading && (
      <div className="alert alert-info">
        <h3>Loading...</h3>
      </div>
    );

  const showRedirect = () => {
    if (redirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signIn({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        authenticate(data, () => {
          setValues({
            ...values,
            redirect: true,
          });
        });
      }
    });
  };

  const signInForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">E mail</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={handleChange("email")}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={handleChange("password")}
        />
      </div>
      <button onClick={handleSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  );

  return (
    <Layout
      title="Sign IN"
      description="Sign in Page Here"
      className="container col-md-8 offset-md-2"
    >
      {showLoading()}
      {showError()}
      {signInForm()}
      {showRedirect()}
      <ToastContainer />
    </Layout>
  );
};

export default SignIn;
