import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getAllCategories } from "./CoreApi";
import Card from "./Card";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);

  const init = () => {
    getAllCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <Layout
      className="container-fluid"
      title="Shop Page"
      description="Search Our Shop"
    >
      <div className="row">
        <div className="col-4">
          {categories.map((cat) => {
            return <p>{cat.name}</p>;
          })}
        </div>
        <div className="col-8">Right</div>
      </div>
    </Layout>
  );
};

export default Shop;
