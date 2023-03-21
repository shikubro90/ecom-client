import { Badge } from "antd";
import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";

import {
  FaDollarSign,
  FaProjectDiagram,
  FaRegClock,
  FaCheck,
  FaTimes,
  FaTruckMoving,
  FaWarehouse,
  FaRocket,
} from "react-icons/fa";
import moment from "moment/moment";


const ProductsCard = ({ p, bootstrapInfo }) => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  return (
    <>
      {bootstrapInfo ? (
        <div className="card mb-3 hoverable">
          <Badge.Ribbon text={`${p?.sold} sold`} color="red">
            <Badge.Ribbon
              text={`${
                p?.quantity >= 1
                  ? `${p?.quantity - p?.sold} in stock`
                  : "Out of stock"
              }`}
              placement="start"
              color="green"
            >
              <img
                className="card-img-top"
                src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                alt=""
              />  
            </Badge.Ribbon>
          </Badge.Ribbon>

          <div className="card-body">
            <h1>{p.name}</h1>
            <p className="card-text lead">{p?.description?.substring(0, 60)}....</p>

            <div className="d-flex justify-content-between lead p-5 bg-light fw-bold">
              <div>
                <p>
                  <FaDollarSign /> Price : {" "}{p?.price?.toLocaleString("en-US", {
                    style : "currency", currency : "USD"
                  })}
                </p>
                <p>
                  <FaProjectDiagram/> Category : {p?.category?.name}
                </p>
                <p>
                  <FaRegClock/> Added: {moment(p.createdAt).fromNow()}
                </p>
                <p>
                  {p?.quantity > 0 ? <FaCheck /> : <FaTimes />}
                  {p?.quantity> 0 ? " In Stock" : " Out of Stock"}
                </p>
                <p>
                  <FaRocket/> Sold {p.sold}
                </p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div
              className="btn btn-outline-primary col card-button"
              style={{ borderBottomRightRadius: "5px" }}
              onClick={(e) => {
                setCart([...cart, p]);
                localStorage.setItem("cart", JSON.stringify([...cart, p]));
                toast.success("Added to cart");
              }}
            >
              Add to Cart
            </div>
          </div>
        </div>
      ) : (
        // here is differentiate two types of button components
        <div className="card mb-3 hoverable">
          <Badge.Ribbon text={`${p?.sold} sold`} color="red">
            <Badge.Ribbon
              text={`${
                p?.quantity >= 1
                  ? `${p?.quantity - p?.sold} in stock`
                  : "Out of stock"
              }`}
              placement="start"
              color="green"
            >
              <img
                className="card-img-top"
                src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                alt=""
              />
            </Badge.Ribbon>
          </Badge.Ribbon>

          <div className="card-body">
            <h5>{p.name}</h5>
            <p className="card-text lead">{p?.description}</p>
            <h4 className="fw-bold">
              {p?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h4>
            <p>{p?.description?.substring(0, 60)}....</p>
          </div>
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-primary col card-button"
              style={{ borderBottomLeftRadius: "5px" }}
              onClick={(e) => navigate(`/products/${p.slug}`)}
            >
              View Products
            </button>

            <div
              className="btn btn-outline-primary col card-button"
              style={{ borderBottomRightRadius: "5px" }}
              onClick={(e) => {
                setCart([...cart, p]);
                localStorage.setItem("cart", JSON.stringify([...cart, p]));
                toast.success("Added to cart");
              }}
            >
              Add to Cart
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsCard;
