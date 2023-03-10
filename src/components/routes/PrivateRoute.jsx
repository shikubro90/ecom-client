import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "./Loading";

const PrivateRoute = () => {
  const [auth] = useAuth();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (auth?.token) {
      setOk(true);
    } else {
      setOk(false);
    }
  }, [auth?.token]);
  return ok ? <Outlet /> : <Loading path="" />;
};

export default PrivateRoute;
