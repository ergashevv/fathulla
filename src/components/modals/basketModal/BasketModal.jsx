import React from "react";
import arrowImg from "../../../images/arrow-top-right-large.svg";
import exitBtn from "../../../images/exit-btn.svg";
import { OrderForm } from "../../OrderForm/OrderForm";
import "./basketModal.scss";

const BasketModal = ({ active, setActive, openCatalogModal, product }) => {
  const closeModal = () => {
    setActive(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div
        className={
          active ? "basket-modal modal active-basket" : "basket-modal modal"
        }
        onClick={() => closeModal()}
      >
        <div
          className="basket-dialog modal-dialog"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="basket-content modal-content">
            <div className="basket-body modal-body">
              <div className="row">
                <div className="col-lg-5">
                  <div className="basket-img">
                    <img src={product?.image} alt="" />
                    <div className="marketing-btn">
                      <span
                        onClick={() => {
                          openCatalogModal(true);
                          setActive(false);
                        }}
                      >
                        ВСЯ ИНФОРМАЦИЯ <br />О ПРОДУКТЕ
                        <img src={arrowImg} alt="" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7">
                  <img
                    className="exit-btn"
                    src={exitBtn}
                    alt=""
                    onClick={() => closeModal()}
                  />
                  {product && <OrderForm product={product} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasketModal;
