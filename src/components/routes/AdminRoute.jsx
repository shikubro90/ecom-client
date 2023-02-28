import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context.js/auth";
import Loading from "./Loading";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const adminCheck = async () => {
        const { data } = await axios.get("/auth-check");
        if (data.ok) {
            setOk(true)
        } else {
            setOk(false)
        }
    };
    if (auth?.token) adminCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Loading path="" />;
};

export default AdminRoute;
