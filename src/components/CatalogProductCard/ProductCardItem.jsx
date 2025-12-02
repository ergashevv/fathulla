import React, { useState } from "react";
import korzino from "../../images/card-korzina.svg";
import arrow from "../../images/arrow-top-right-large.svg";
import BasketModal from "../modals/basketModal/BasketModal";
import CatalogModal from "../modals/catalogModal/CatalogModal";
import "./catalogProductCard.scss";
import { useTranslation } from "react-i18next";

const ProductCardItem = ({ product }) => {
  const [activeModal, setActiveModal] = useState(false);
  const [activeBasket, setActiveBasket] = useState(false);
  const { t } = useTranslation()
  const openBasketModal = () => {
    setActiveBasket(true);
    document.body.style.overflow = "hidden";
  };
  const openModal = () => {
    setActiveModal(true);
    document.body.style.overflow = "hidden";
  };

  return (
    <div className="product__item mt-3">
      <div className="catalog-card p-3">
        <div className="card-img">
          <img className="main-img" src={product.image} alt="" />
          <img
            className="card-korzino"
            src={korzino}
            alt=""
            onClick={openBasketModal}
          />
        </div>
        <h3 className="text-center mt-3">{product.title}</h3>
        <div
          onClick={openModal}
          className="card-button d-flex align-products-center"
        >
          <span>{t("settings.pod")}</span>
          <img className="" src={arrow} alt="" />
        </div>
      </div>
      <BasketModal
        product={product}
        openCatalogModal={setActiveModal}
        active={activeBasket}
        setActive={setActiveBasket}
      />
      <CatalogModal
        product={product}
        active={activeModal}
        setActive={setActiveModal}
      />
    </div>
  );
};

export default ProductCardItem;
