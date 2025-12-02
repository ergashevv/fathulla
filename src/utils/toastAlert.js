import { toast } from "react-toastify";
import "./style.css";

export const toastSuccess = (message) => {
  return toast(message, {
    position: "bottom-right",
    autoClose: 6000,
    progressClassName: "toast-progress-bar",
    style: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      color: "#ffffff",
    },
  });
};

export const toastError = (message) => {
  return toast.error(message, {
    position: "bottom-right",
    autoClose: 6000,
    progressClassName: "toast-progress-bar",
  });
};
