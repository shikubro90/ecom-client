import { Checkbox, Radio } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import ProductsCard from "../components/cards/ProductsCard";
import { prices } from "../prices";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  console.log(radio);

  useEffect(() => {
    if (!checked.length) loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data } = await axios.get("/products");
      if (data) {
        setProducts(data);
      }
    } catch (error) {}
  };

  const loadCategory = async () => {
    try {
      const { data } = await axios.get("/list");
      setCategory(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCategory();
  }, []);

  const onHandleCheck = (value, id) => {
    console.log(value, id);
    let all = [...checked];
    if (value) {
      all.push(id);
      console.log(all);
    } else {
      all = all.filter((e) => e !== id);
    }
    setChecked(all);
  };

  const loadFiltered = async () => {
    try {
      const { data } = await axios.post("/filter-product", {
        checked,
        radio,
      });
      setProducts(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (checked.length || radio.length) loadFiltered();
  }, [checked, radio]);

  return (
    <>
      <Jumbotron />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
              Filter by Categories
            </h2>
            <div className="row p-5">
              {category?.map((category) => (
                <Checkbox
                  key={category._id}
                  onChange={(e) =>
                    onHandleCheck(e.target.checked, category._id)
                  }
                >
                  {category.name}
                </Checkbox>
              ))}
            </div>
            <div className="row">Check Box</div>
            <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center">
              Filter by Price
            </h2>
            <div className="row p-5">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {prices.map((e) => (
                  <div className="" key={e._id}>
                    <Radio value={e.array}>{e.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="p-5 pt-0">
              <button onClick={(e)=>window.location.reload()} className="btn btn-outline-secondary col-12">Reset</button>
            </div>
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
