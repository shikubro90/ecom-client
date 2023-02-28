import React, { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [name, setName] = useState("shiku");
  const [email, setEmail] = useState("shikubro90@gmail.com");
  const [password, setPassword] = useState("asdfasdf");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name, email, password)
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/register`,
        {
          name,
          email,
          password,
        }
      );
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success("Registration success");
        navigate("/login")
      }
    } catch (e) {
      toast.error("Registration filed, try again please.");
    }
  };

  return (
    <div>
      <Jumbotron title="Register" subTitle="Welcome to Register page" />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                placeholder="Enter you name"
                className="form-control mb-4 p-2"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                value={email}
                placeholder="Enter you email"
                className="form-control mb-4 p-2"
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

export default Register;
