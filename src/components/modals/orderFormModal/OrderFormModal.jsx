import React from "react";
import { OrderForm } from "../../OrderForm/OrderForm";
import "./orderForm.scss";

const OrderFormModal = ({ active, setActive, product }) => {
  const closeModal = () => {
    setActive(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <div
        className={
          active ? "order-modal modal orderActive" : "order-modal modal"
        }
        onClick={() => closeModal()}
      >
        <div
          className="order-dialog modal-dialog"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="order-content modal-content">
            <div className="order-body modal-body">
              {product && <OrderForm product={product} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderFormModal;
