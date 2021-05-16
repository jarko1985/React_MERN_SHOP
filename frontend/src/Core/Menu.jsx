import React from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../API";
const Menu = ({ history }) => {
  const isActive = (histoty, path) => {
    if (histoty.location.pathname === path) {
      return { color: "#FF4400" };
    } else {
      return { color: "#FFFFFF" };
    }
  };
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" to="/" style={isActive(history, "/")}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            to="/shop"
            style={isActive(history, "/shop")}
          >
            Shop
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/user/dashboard"
              style={isActive(history, "/user/dashboard")}
            >
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              to="/admin/dashboard"
              style={isActive(history, "/admin/dashboard")}
            >
              Dashboard
            </Link>
          </li>
        )}
        {!isAuthenticated() && (
          <React.Fragment>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signup"
                style={isActive(history, "/signup")}
              >
                Sign up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/signin"
                style={isActive(history, "/signin")}
              >
                Sign in
              </Link>
            </li>
          </React.Fragment>
        )}
        {isAuthenticated() ? (
          <li className="nav-item">
            <span
              className="nav-link"
              onClick={() => signout(() => history.push("/"))}
              style={{ cursor: "pointer", color: "#FFFFFF" }}
            >
              Sign out
            </span>
          </li>
        ) : (
          ""
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
