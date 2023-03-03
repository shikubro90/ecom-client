import { useState, useEffect } from "react";
import axios from "axios";

const useCategory = () => {
  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/list");
      setCategory(data);
    } catch (e) {
      console.log(e);
    }
  };

  return category;
};


export default useCategory;