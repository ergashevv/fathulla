import axios from "axios";
import { useState } from "react";
import { toastSuccess, toastError } from "../../utils/toastAlert";
import { useTranslation } from "react-i18next";

const token = "6870733564:AAH4GKZRjTXUQZ1-ndFry1R-I2SBMEjkcdI";
const chat_id = "-1002108902387";

export const OrderForm = ({ product }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [count, setCount] = useState(1);
  const [formData, setFormData] = useState({
    fname: "",
    number: "",
  });
  const { t } = useTranslation()
  const handleClick = () => {
    setIsClicked(!isClicked);
  };
  const decrementCount = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  const incrementCount = () => {
    setCount((prev) => prev + 1);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, number } = formData;
  
    // Проверяем, что поля не пустые
    if (!fname || !number) {
      toastError(t("form.requiredFields"));
      return; // Прерываем выполнение, если хотя бы одно поле пустое
    }
  
    const orderId = Date.now(); // Уникальный идентификатор заказа
    const text = `<b>ID заказа:</b> ${orderId}\n<b>Продукт:</b> ${product?.title}\n<b>Количество:</b> ${count}\n<b>ФИО:</b> ${fname}\n<b>Номер телефона:</b> ${number}\n<b>Статус:</b> в процессе`;
  
    const reply_markup = JSON.stringify({
      inline_keyboard: [
        [{ text: "✅ Обработано", callback_data: `status:success:${orderId}` }],
        // [{ text: "Отменен", callback_data: `status:cancelled:${orderId}` }],
      ],
    });
  
    try {
      await axios.post(`https://api.telegram.org/bot${token}/sendMessage`, {
        chat_id,
        text,
        reply_markup,
        parse_mode: "HTML",
      });
      toastSuccess(t("orderForm.successMessage"));
      setTimeout(() => window.location.reload(), 3500);
    } catch (error) {
      toastError(error.message);
      console.error("Error sending data:", error);
    }
  };

  return (
    <form className="basket-about" onSubmit={handleSubmit}>
      <h3 className="basket-title">{product?.title}</h3>
      <p className="basket-subtitle">{product?.short_descriptions}</p>
      <div className="value" style={{ display: "none" }}>
        Объём (л):
        <span
          className={isClicked ? "span-active span-btn" : "span-btn"}
          onClick={handleClick}
        >
          {product?.volume}
        </span>
      </div>
      <div className="amount d-flex">
        <h3>{t('settings.quan')}:</h3>
        <div
  style={{
    display: "flex",
    alignItems: "center",
    marginLeft: "10px",
    gap: "8px", // Расстояние между кнопками и input
  }}
>
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "32px",
      height: "32px",
      // backgroundColor: "#f0f0f0",
      border: "1px solid #ccc",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "18px",
    }}
    onClick={decrementCount}
  >
    -
  </span>
  <input
  type="number"
  value={count}
  min="1"
  onChange={(e) => {
    const newValue = e.target.value;
    if (newValue === "" || newValue === "0") {
      // Разрешаем временно оставить поле пустым
      setCount("");
    } else {
      const parsedValue = parseInt(newValue, 10);
      if (!isNaN(parsedValue) && parsedValue > 0) {
        setCount(parsedValue);
      }
    }
  }}
  onBlur={() => {
    // Возвращаем значение 1, если поле остается пустым
    if (count === "" || count === 0) {
      setCount(1);
    }
  }}
  style={{
    width: "50px", // Ширина поля
    height: "32px", // Делаем одинаковую высоту с кнопками
    textAlign: "center",
    border: "1px solid #ccc",
    borderRadius: "4px",
    margin: "0px",
    color: "#fff",
    fontSize: "16px",
  }}
/>
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "32px",
      height: "32px",
      // backgroundColor: "#f0f0f0",
      border: "1px solid #ccc",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "18px",
    }}
    onClick={incrementCount}
  >
    +
  </span>
</div>
      </div>
      <input
        className="input-name form-control"
        type="text"
        placeholder={t("form.namePlaceholder")}
        name="fname"
        value={formData.fname}
        onChange={handleChange}
      />
      <input
        className="input-number form-control"
        type="tel"
        placeholder={t("form.phonePlaceholder")}
        name="number"
        value={formData.number}
        onChange={handleChange}
      />
      <div className="d-grid">
        <button className="basket-btn btn" type="submit">
          {t("settings.order")} {t("settings.order2")}
        </button>
      </div>
    </form>
  );
};
