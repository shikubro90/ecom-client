import axios from "axios";
import { useState, useEffect } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import ProductsCard from "../components/cards/ProductsCard";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    loadProduct();
    getTotal();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/list-product/${page}`);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/list-product/${page}`);
      setProducts([...products, ...data]);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/count-product");
      setTotal(data);
    } catch (error) {
      console.log(error);
    }
  };

  const arr = [...products];
  const sortProduct = arr?.sort((a, b) => (a.sold < b.sold ? 1 : -1));
  return (
    <>
      <Jumbotron title="" />
      <div className="row">
        <div className="col-md-6">
          <h2 className="p-3 mt-2 h4 bg-light text-center">New Arrive</h2>
          <div className="row">
            {products?.map((p) => (
              <div className="col-md-6" key={p._id}>
                <ProductsCard p={p} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
            Best Sellers
          </div>
          <div className="row">
            <div className="row">
              {sortProduct?.map((p) => (
                <div className="col-md-6" key={p._id}>
                  <ProductsCard p={p} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="container text-center">
          {products && products.length < total && (
            <button
              className="btn btn-warning btn-lg col-md-6"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
