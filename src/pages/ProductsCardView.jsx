import React, { useEffect, useState } from "react";
import ProductsCard from "../components/cards/ProductsCard";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductsCardView = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  console.log(product);

  useEffect(() => {
    loadProduct();
  }, [slug]);

  const loadProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${slug}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
    };
    
    // info obj 
    const bootstrapInfo = {
        buttonInfo: "!viewProduct",
        titleInfo : 'fz-h1-fw-bold'
    }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <ProductsCard p={product} bootstrapInfo={bootstrapInfo}  />
        </div>
        <div className="col-md-3"></div>
      </div>
    </div>
  );
};

export default ProductsCardView;
