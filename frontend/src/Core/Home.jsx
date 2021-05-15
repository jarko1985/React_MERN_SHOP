import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getAllProducts } from "./CoreApi";
import Card from "./Card";

const Home = () => {
  const [productsBySold, setProductsBySold] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [error, setError] = useState(false);

  const loadProductsBySold = () => {
    return getAllProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySold(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    return getAllProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsBySold();
    loadProductsByArrival();
  }, []);
  return (
    <Layout
      className="container-fluid"
      title="Home"
      description="Home Page goes Here"
    >
      <h3 className="mb-4">Best Selling Products</h3>
      <div className="row">
        {productsBySold.map((product, index) => {
          return <Card key={index} product={product} />;
        })}
      </div>

      <h3 className="mb-4">New Arrivals</h3>
      <div className="row">
        {productsByArrival.map((product, index) => {
          return <Card key={index} product={product} />;
        })}
      </div>
    </Layout>
  );
};

export default Home;
