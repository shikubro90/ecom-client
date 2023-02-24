import React from "react";
import { NavLink } from "react-router-dom";
const Menu = () => {
  return (
    <>
      <ul className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top bg-light">
        <li>
          <NavLink className="nav-link" to="/" arial-current="page">
            Home
          </NavLink>
        </li>
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
      </ul>
    </>
  );
};

export default Menu;
