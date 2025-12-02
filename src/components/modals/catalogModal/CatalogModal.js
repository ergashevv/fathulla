import React, { useEffect, useState } from "react";
import catalogModal from "../../../images/catalog-modal-img.png";
import arrow from "../../../images/arrow-top-right-large.svg";
import "./catalogModal.scss";
import OrderForm from "../orderFormModal/OrderFormModal";
import exitBtn from "../../../images/exit-btn.svg";
import axios from "axios";
import OrderFormModal from "../orderFormModal/OrderFormModal";
import BasketModal from "../basketModal/BasketModal";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
const CatalogModal = ({ active, setActive, product }) => {
  const [orderModal, setOrderModal] = useState(false);

  const closeModal = () => {
    setActive(false);
    document.body.style.overflow = "auto";
  };
const {t} = useTranslation()
  const openModal = () => {
    setActive(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => setActive(false);
  const handleShow = () => setActive(true);
  return (
    <>
    <div
      style={{ overflow: "hidden" }}
      className={
        active ? "catalog-modal modal activeCatalog" : "catalog-modal modal"
      }
      onClick={() => closeModal()}
    >
      <div
        className="catalog-modal-dialog modal-dialog modal-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="catalog-modal-content modal-content">
          <div className="catalog-modal-body p-lg-2 modal-body">
            <img
              className="exit-btn"
              src={exitBtn}
              alt=""
              onClick={() => closeModal()}
            />
            <div className="catalog-body-img">
              <img src={product?.image} alt="" />
            </div>
            <div className="catalog-body-about text-white">
              <div className="catalog-body-info">
                <h4 className="catalog-body-title">{product?.title}</h4>
                <div className="scrollable-description">
                  <p
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                    className=""
                    dangerouslySetInnerHTML={{
                      __html: product?.descriptions,
                    }}
                  />
                </div>
                <div className="catalog-body-btn mt-2">
                  <button
                    className="catalog-body-button btn"
                    onClick={() => {
                      setOrderModal(true);
                      setActive(false);
                    }}
                  >
                    {t("settings.order")} <br /> {t("settings.order2")} <img src={arrow} alt="" />
                  </button>
                  <div className="catalog-body-term">
                    <div className="catalog-body-term-block">
                      <p className="catalog-body-term-title d-flex">
                        {product?.GMO}
                      </p>
                      <p className="catalog-body-term-title">
                        {product?.substance}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <OrderFormModal
                active={orderModal}
                setActive={setOrderModal}
                product={product}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default CatalogModal;
