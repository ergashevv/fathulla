import React from "react";
import ProductCardItem from "./ProductCardItem";
const CatalogProductCard = ({ data }) => {
    console.log('CatalogProductCard data', data)

    return data?.map((item, idx) => <ProductCardItem key={idx} product={item} />);
};

export default CatalogProductCard;