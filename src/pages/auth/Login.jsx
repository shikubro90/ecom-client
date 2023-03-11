import React, { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigation = useNavigate()
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const {data} = await axios
        .post(`/login`, {
          email,
          password,
        })
      if (data?.error) {
        toast.error("Login Failed")
      } else {
        localStorage.setItem("auth", JSON.stringify(data))
        setAuth({ ...auth, token: data.token, user: data.user })
        toast.success("Login Success")
        navigation("/")
      }
        // .then((res) => {
        //   toast.success("Successfully Login");
        //   localStorage.setItem("auth", JSON.stringify(res));
        //   setAuth({ ...auth, user: res.user, token: res.token });
        // })
        // .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    }
  };

  return (
    <div>
      <Jumbotron title="Login" subTitle="Welcome to Login page" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                className="form-control mb-4 p-2"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                value={password}
                placeholder="Enter you password"
                className="form-control mb-4 p-2"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
