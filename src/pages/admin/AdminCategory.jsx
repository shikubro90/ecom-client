import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/forms/CategoryForm";
import { Modal } from "antd";

const AdminCategory = () => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [visiable, setVisiable] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatatingName, setUpdatingName] = useState("");

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      const { data } = await axios.get("/list");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      console.log(name)
      const {data} = await axios.post("/category", {name});
      
      if(data?.error){
        toast.error(data.error);
      }else{
        loadCategory();
        setName("")
        toast.success(`${data.name} is created`)
      }
    }catch(err){
      console.log(err)
    }

  }

  return (
    <>
      <Jumbotron
        title={`Hello ${auth?.user?.name}`}
        subTitle="Admin Dashboard"
      />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">
              <CategoryForm
                value={name}
                setValue={setName}
                handleSubmit={handleSubmit}
              />
              <hr/>
              <div className="col">
                  {categories?.map((e)=>{
                    return (
                      <button key={e._id} className="btn btn-outline-primary m-3">{e.name}</button>
                    )
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCategory;
