import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useAuth } from "../../context/auth";
import moment from "moment";

const AdminProducts = () => {
  const [auth] = useAuth();
  const [products, setProducts] = useState([]);
  console.log(products);
  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Jumbotron title={auth?.user.name.toUpperCase()} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 h4 bg-light">
              {products?.map((e) => (
                <Link key={e._id} to={`admin/product/update/${e.slug}`}>
                  <div className="card">
                    <div className="row ">
                      <div className="col-md-4">
                        <img
                          src={`${process.env.REACT_APP_API}/product/photo/${e._id}`}
                          alt=""
                          className="img img-fluid round-start"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">
                            {e.name}
                            <p>{e.description}</p>
                            <p className="card-text">
                              <small className="text-muted">
                                {moment(e.createdAt).format(
                                  "MMMM Do YYYY, h:mm:ss a"
                                )}
                              </small>
                            </p>
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProducts;
