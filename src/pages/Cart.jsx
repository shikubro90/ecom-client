import React, { useState } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate()
  return (
    <div>
      <Jumbotron
        title={`Hello ${auth?.token && auth?.user?.name}`}
        subTitle={
          cart?.length
            ? `You have ${cart.length} items in cart. ${
                auth?.token ? "" : "Please login to checkout"
              }`
            : `Cart is empty`
        }
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="p-3 mt-2 mb-2 h4 bg-light text-center">
              {cart?.length ? (
                "My Cart"
              ) : (<div>
                  <button className="btn btn-primary" onClick={()=>navigate("/")} >Continue Shopping</button>
              </div>)}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Cart;
