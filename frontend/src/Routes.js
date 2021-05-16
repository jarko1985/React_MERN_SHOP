import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SignUp from "./User/SignUp";
import SignIn from "./User/SignIn";
import Home from "./Core/Home";
import PrivateRoute from "./API/PrivateRoute";
import AdminRoute from "./API/AdminRoute";
import UserDashBoard from "./User/UserDashBoard";
import AdminDashBoard from "./User/AdminDashBoard";
import AddCategory from "./Admin/AddCategory";
import AddProduct from "./Admin/AddProduct";
import Shop from "./Core/Shop";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <PrivateRoute exact path="/user/dashboard" component={UserDashBoard} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashBoard} />
        <AdminRoute exact path="/create/category" component={AddCategory} />
        <AdminRoute exact path="/create/product" component={AddProduct} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
