import React, { useEffect, useState } from "react";
import ProductsCard from "../components/cards/ProductsCard";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductsCardView = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  useEffect(() => {
    if (slug) loadProduct();
  }, [slug]);

  

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${slug}`);
      setProduct(data);
      loadRelated(data._id, data.category._id)
    } catch (error) {
      console.log(error);
    }
  };

  const loadRelated = async (productId,categoryId) => {
    try {
      const { data } = await axios.get(`/related-products/${productId}/${categoryId}`)
      setRelated(data)
    } catch (error) {
      console.log(error)
    }
  }


  // info obj
  const bootstrapInfo = {
    buttonInfo: "!viewProduct",
    titleInfo: "fz-h1-fw-bold",
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <ProductsCard p={product} bootstrapInfo={bootstrapInfo} />
        </div>
        <div className="col-md-3">
          <h2>Related Products</h2>
          <hr />
          {related?.map((e) => (
            <ProductsCard key={e._id} p={e}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsCardView;
