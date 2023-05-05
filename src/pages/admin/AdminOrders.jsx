import { useEffect, useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
import { Option } from "antd/es/mentions";

const AdminOrders = () => {
  const [auth, setAuth] = useAuth();
  const [order, setOrder] = useState();
  const [status, setStatus] = useState([
    "Not processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);

  const [changeStatus, setChangeStatus] = useState("");

  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);

  const getOrder = async () => {
    try {
      const { data } = await axios.get("/all-order");
      setOrder(data);
    } catch (error) {}
  };

  const handleChange = async (orderId, value) => {
    // setChangedStatus(value);
    try {
      const { data } = await axios.put(`/order-status/${orderId}`, {
        status: value,
      });
      getOrder();
    } catch (error) {}
  };

  return (
    <div>
      <Jumbotron title={auth?.user.name.toUpperCase()} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Orders</div>
            {order?.map((o, i) => {
              return (
                <div
                  key={o._id}
                  className="border shadow bg-light rounded-4 mb-5"
                >
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Ordered</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            onChange={(value) => handleChange(o._id, value)}
                            bordered={false}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => {
                              return (
                                <Option key={i} value={s}>
                                  {s}
                                </Option>
                              );
                            })}
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length} products</td>
                      </tr>
                    </tbody>
                  </table>
                      {o?.products?.map((p, i) => (
                      
                          <div className="card mb-3 ">
                              {console.log(p)}
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img
                            src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                            alt={p?.name}
                            style={{
                              height: "150px",
                              width: "150px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <div className="card-title">
                              <h5>
                                {p?.name}{" "}
                                {p?.price?.toLocaleString("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                })}
                              </h5>
                              <p className="card-text">
                                {p?.description?.substring(0, 50)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
