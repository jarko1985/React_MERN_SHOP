import React from "react";
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
import { FaCartPlus } from "react-icons/fa";

const Card = ({ product }) => {
  return (
    <div className="col-3 mb-3">
      <div className="card">
        <div style={{ textAlign: "center" }} className="card-header">
          {product.name}
        </div>
        <div className="card-body">
          <ShowImage item={product} url="products" />
          <p style={{ textAlign: "center" }}>{product.description} </p>
          <p style={{ textAlign: "center" }}>{product.price} AED</p>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Link to="">
              <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                View Product
              </button>
            </Link>
            <button className="btn btn-outline-success mt-2 mb-2">
              Add to Cart &nbsp;
              <FaCartPlus size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
