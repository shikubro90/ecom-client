import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image from '../../images/preloader.png'
const Loading = ({ path = "loading" }) => {
  const [count, setCount] = useState(3);
  const navigation = useNavigate();
  useEffect(() => {
    const Interval = setInterval(() => {
      setCount((pre) => --pre);
    }, 1000);
    count === 0 && navigation(`/${path}`);
    return () => clearInterval(Interval);
  }, [count]);
  return (
    <div
      className="container"
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="counter">
        <img alt="preloader" src={image} />
      </div>
    </div>
  );
};

export default Loading;
