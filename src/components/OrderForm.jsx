
import { useState } from "react";
import { CheckCircle, ClipboardList } from "lucide-react";
import { useCart } from "../context/CartContext";
import "./OrderForm.css";

export default function OrderForm() {
  const {
    items,
    totals,
    submitOrder,
    orderStatus,
    lastOrder,
    resetOrderStatus,
  } = useCart();

  const [customerData, setCustomerData] = useState({
    name: "",
    phone: "",
    deliveryType: "pickup",
    address: "",
    comment: "",
  });

  const [formError, setFormError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCustomerData((current) => ({
      ...current,
      [name]: value,
    }));

    setFormError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const result = submitOrder(customerData);

    if (!result?.success) {
      setFormError(result?.message || "Проверьте введённые данные.");
      return;
    }

    setFormError("");
  };

  if (orderStatus === "success") {
    return (
      <section className="order-section" id="order">
        <div className="order-success">
          <CheckCircle size={48} />
          <h2>Заказ оформлен!</h2>
          <p>
            Спасибо! Ваш заказ
            {lastOrder?.id ? ` №${lastOrder.id}` : ""} принят.
          </p>
          <p>Мы свяжемся с вами для подтверждения.</p>

          <button
            type="button"
            className="order-button"
            onClick={() => {
              resetOrderStatus();
              setCustomerData({
                name: "",
                phone: "",
                deliveryType: "pickup",
                address: "",
                comment: "",
              });
            }}
          >
            Вернуться к покупкам
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="order-section" id="order">
      <div className="order-heading">
        <span className="eyebrow">ПОСЛЕДНИЙ ШТРИХ</span>
        <h2>Оформление заказа</h2>
        <p>Заполните данные, и мы подготовим всё к вашему визиту.</p>
      </div>

      <div className="order-layout">
        <form className="order-form" onSubmit={handleSubmit}>
          <label>
            Ваше имя
            <input
              name="name"
              type="text"
              autoComplete="name"
              value={customerData.name}
              onChange={handleChange}
              placeholder="Как к вам обращаться?"
              required
            />
          </label>

          <label>
            Телефон
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              value={customerData.phone}
              onChange={handleChange}
              placeholder="+7 900 123-45-67"
              required
            />
          </label>

          <fieldset className="delivery-options">
            <legend>Как получите заказ?</legend>

            <label className="delivery-option">
              <input
                type="radio"
                name="deliveryType"
                value="pickup"
                checked={customerData.deliveryType === "pickup"}
                onChange={handleChange}
              />
              <span>
                <strong>Самовывоз</strong>
                <small>Забрать в нашей пекарне</small>
              </span>
            </label>

            <label className="delivery-option">
              <input
                type="radio"
                name="deliveryType"
                value="delivery"
                checked={customerData.deliveryType === "delivery"}
                onChange={handleChange}
              />
              <span>
                <strong>Доставка</strong>
                <small>Указать адрес получения</small>
              </span>
            </label>
          </fieldset>

          {customerData.deliveryType === "delivery" && (
            <label>
              Адрес доставки
              <input
                name="address"
                type="text"
                autoComplete="street-address"
                value={customerData.address}
                onChange={handleChange}
                placeholder="Улица, дом, квартира"
                required
              />
            </label>
          )}

          <label>
            Комментарий к заказу
            <textarea
              name="comment"
              value={customerData.comment}
              onChange={handleChange}
              placeholder="Например, удобное время получения"
              rows={3}
            />
          </label>

          {formError && (
            <p className="order-error" role="alert">
              {formError}
            </p>
          )}

          <button
            type="submit"
            className="order-button"
            disabled={!items.length}
          >
            Подтвердить заказ
          </button>

          {!items.length && (
            <p className="order-hint">
              Сначала добавьте товары в корзину.
            </p>
          )}
        </form>

        <aside className="order-summary">
          <div className="summary-title">
            <ClipboardList size={21} />
            <h3>Ваш заказ</h3>
          </div>

          {items.map((item) => (
            <div className="summary-item" key={item.id}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <strong>
                {(item.price * item.quantity).toFixed(2)} €
              </strong>
            </div>
          ))}

          {!items.length && (
            <p className="order-hint">Корзина пока пуста.</p>
          )}

          <div className="summary-total">
            <span>Итого</span>
            <strong>{(totals?.total ?? 0).toFixed(2)} €</strong>
          </div>
        </aside>
      </div>
    </section>
  );
}
