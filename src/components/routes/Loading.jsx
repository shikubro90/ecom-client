import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Loading = () => {
  const [count, setCount] = useState(3);
  const navigation = useNavigate();
  useEffect(() => {
    const Interval = setInterval(() => {
      setCount((pre) => --pre);
    }, 1000);
    count === 0 && navigation("/login");
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
        <h1>{count}</h1>
      </div>
    </div>
  );
};

export default Loading;
