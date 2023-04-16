import React from "react";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";

const UserCardSideBar = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

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

  return (
    <div className="col-md-5 mb-5">
      <div className="cart-info" style={{width : "100%"}}>
        <div className="cart-title" style={{width : "100%"}}>
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
                  <button className="btn btn-outline-warning" onClick={()=>navigate("/dashboard/user")}>
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
                      <button className="btn btn-outline-warning" onClick={()=>navigate("/dashboard/user")}>
                        Add delivery address
                      </button>
                    </>
                  ) : (<>
                      <button className="btn btn-danger" onClick={()=>navigate("/login")}>
                        Login to check out
                      </button>
                  </>)}
              </div>
              </>
          )}
        </div>

      </div>
    </div>
  );
};

export default UserCardSideBar;
