import axios from "axios";
import React, { useEffect, useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import ProductsCard from "../components/cards/ProductsCard";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      if (data) {
        setProducts(data);
      }
    } catch (error) {}
  };

  return (
    <>
      <Jumbotron />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
              Filter by Categories
            </h2>
            <div className="row">Check Box</div>
            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
              Filter by Price
            </h2>
            <div className="row">Radio</div>
          </div>
          <div className="col-md-9">
            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
              {products?.length} Products
            </h2>
            <div className="row">
              {products?.map((p) => (
                <div className="col-md-4">
                  <ProductsCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
