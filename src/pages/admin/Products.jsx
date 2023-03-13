import { Select } from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [auth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  // console.log(photo);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      const { data } = await axios.get("/list");
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);
      const { data } = await axios.post("/create-product", productData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" is created`);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      toast.error("Product create failed. Try again.");
    }
  };

  return (
    <>
      <Jumbotron title={`Hello ${auth?.user?.name.toUpperCase()}`} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Create Products</div>

            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product photo"
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            )}
            <div className="pt-2">
              <label className="btn btn-outline-secondary col-12 mb-3">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                />
              </label>
            </div>
            <input
              type="text"
              className="form-control p-2 mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Write a description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="number"
              className="form-control p-2 mb-3"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Select
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose category"
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((e) => (
                <Option key={e._id} value={e._id}>
                  {e.name}
                </Option>
              ))}
            </Select>

            <Select
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Choose shipping"
              onChange={(value) => setShipping(value)}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>

            <input
              type="number"
              min="1"
              className="form-control p-2 mb-3"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <button onClick={handleSubmit} className="btn btn-primary mb-5">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
