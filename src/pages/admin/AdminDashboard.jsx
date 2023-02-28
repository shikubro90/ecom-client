import React from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useAuth } from "../../context.js/auth";
const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <>
      <Jumbotron
        subTitle="Admin Dashboard"
        title={`Hello ${auth?.user?.name}`}
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Admin Information</div>

            <ul className="list-group">
              <li className="list-group-item">{auth?.user?.name}</li>
              <li className="list-group-item">{auth?.user?.email}</li>
              <li className="list-group-item">Admin</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
