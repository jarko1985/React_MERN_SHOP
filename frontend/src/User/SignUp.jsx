import React, { useState } from "react";
import Layout from "../Core/Layout";
import { Link } from "react-router-dom";
import { signUp } from "../API";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

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

  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? "" : "none" }}
      >
        New Account is Created..please <Link to="/signin">Sign in here</Link>
      </div>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signUp({ name, email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        toast.success(`Thank you ${name} ....please sign in`);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          success: true,
        });
      }
    });
  };

  const signUpForm = () => (
    <form>
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
      title="Sign Up"
      description="Sign up Page Here"
      className="container col-md-8 offset-md-2"
    >
      {showSuccess()}
      {showError()}
      {signUpForm()}
      <ToastContainer />
    </Layout>
  );
};

export default SignUp;
