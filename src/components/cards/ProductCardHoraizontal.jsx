import React from "react";
import { useCart } from "../../context/cart";
import moment from "moment";

const ProductCardHoraizontal = ({ p, remove = true }) => {
  const [cart, setCart] = useCart();

  const removeProducts = (productId) => {
    const myCart = [...cart];
    const index = myCart.findIndex((product) => product._id === productId);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  return (
    <div>
      <div className="card mb-3 ">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
              alt={p.name}
              style={{
                height: "150px",
                width: "150px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="card-title">
                <h5>
                  {p?.name}{" "}
                  {p?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </h5>
                <p className="card-text">{p?.description?.substring(0, 50)}</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between px-3">
            <p className="card-text">
              <small className="text-muted">
                Listed {moment(p.createdAt).fromNow()}
              </small>
            </p>
            {remove && (
              <p
                className="text-danger mb-2 pointer"
                onClick={() => removeProducts(p._id)}
              >
                Remove
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardHoraizontal;
