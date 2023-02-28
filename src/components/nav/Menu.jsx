import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context.js/auth";
const Menu = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };
  return (
    <>
      <ul className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top bg-light">
        <li>
          <NavLink className="nav-link" to="/" arial-current="page">
            Home
          </NavLink>
        </li>

        {!auth?.user ? (
          <>
            <li>
              <NavLink className="nav-link" to="/login" arial-current="page">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/register" arial-current="page">
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <NavLink
              onClick={handleLogout}
              className="nav-link"
              arial-current="page"
              to="/login"
            >
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </>
  );
};

export default Menu;
