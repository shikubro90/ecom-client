import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-hot-toast";

const UserCardSideBar = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, setinstance] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();

  // get token

  useEffect(() => {
    if (auth?.token) {
      getClientToken();
    }
  }, [auth?.token]);

  const getClientToken = async () => {
    try {
      const { data } = await axios.get("/braintree/token");
      setClientToken(data.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  // total price
  const cartTotal = () => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  const handleBuy = async () => {
    try {
      setLoading(true)
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/braintree/payment", {
        nonce, 
        cart
      })
      console.log("handle buy response >", data)
      localStorage.removeItem("cart")
      setLoading(false)
      setCart([])
      navigate("/dashboard/user/orders")
      toast.success("Payment successful")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="col-md-5 mb-5">
      <div className="cart-info" style={{ width: "100%" }}>
        <div className="cart-title" style={{ width: "100%" }}>
          <h4>Your Cart Summary</h4>
          <p>Total / Address / Payment</p>
        </div>
        <hr />
        <div className="cart-p">
          <h6>Total : {cartTotal()}</h6>
        </div>
        <div className="address">
          {auth?.user?.address ? (
            <>
              <div className="mb-3">
                <div className="user-address">
                  <h4>Delivery Address</h4>
                  <h5>{auth?.user?.address}</h5>
                </div>
                <div className="user-update">
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user")}
                  >
                    Update Address
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-3">
                {auth?.token ? (
                  <>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user")}
                    >
                      Add delivery address
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="btn btn-danger"
                      onClick={() => navigate("/login")}
                    >
                      Login to check out
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        <div className="mt-3">
          {!clientToken || !cart?.length ? (
            ""
          ) : (
            <>
              <DropIn
                options={{
                  authorization: clientToken,
                  paypal: {
                    flow: "vault",
                  },
                  }}
                  onInstance={(instance)=> setinstance(instance)}
              />
            </>
          )}
        </div>
        <button 
          onClick={handleBuy}
          className="btn btn-primary col-md-12 mt-2"
          disabled={!auth?.user?.address || !instance || loading}
        >
          {loading ? "Processing" : "Buy"}
        </button>

      </div>
    </div>
  );
};

export default UserCardSideBar;
