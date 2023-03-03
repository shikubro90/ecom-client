import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context.js/auth";
import useCategory from "../../hooks/useCategory";
const Menu = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  const category = useCategory();

  return (
    <>
      <ul className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top bg-light">
        <li>
          <NavLink className="nav-link" to="/" arial-current="page">
            Home
          </NavLink>
        </li>

        <div className="dropdown">
          <li>
            <a
              href=""
              className="nav-link pointer dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              CATEGORY
            </a>

            <ul
              className="dropdown-menu"
              style={{ height: "300px", overflow: "scroll" }}
            >
              <li>
                <NavLink to="/categories">All Category</NavLink>
              </li>
              {category.map((e) => {
                console.log(e._id)
                return (
                  
                  <li key={e._id}>
                    
                    <NavLink to={`/category/${e.slug}`} className="nav-link">{e.name}</NavLink>
                  </li>
                );
              })}
            </ul>
          </li>
        </div>

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
          <div className="dropdown">
            <li>
              <a
                className="nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {auth?.user?.name?.toUpperCase()}
              </a>

              <ul className="dropdown-menu">
                <li>
                  <NavLink
                    className="nav-link"
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    Dashboard
                  </NavLink>
                </li>

                <li className="nav-item pointer">
                  <a onClick={handleLogout} className="nav-link">
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </div>
        )}
      </ul>
    </>
  );
};

export default Menu;
