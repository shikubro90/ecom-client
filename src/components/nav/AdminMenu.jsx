import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="p-3 mt-2 mb-2 h4 bg-light">AdminMenu</div>
      <ul className="list-group list-unstyled">
        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/category">
            Create Category
          </NavLink>
        </li>
        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/product">
            Create Products
          </NavLink>
        </li>
        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/products">
            Products
          </NavLink>
        </li>
        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/orders">
            Orders
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default AdminMenu;
