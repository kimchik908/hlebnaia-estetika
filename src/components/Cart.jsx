
import { useState } from "react";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const money = (value) =>
  new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "EUR",
  }).format(value);

export default function Cart({
  isOpen,
  onClose,
  onCheckout,
}) {
  const {
    items,
    itemCount,
    subtotal,
    discount,
    total,
    promoCode,
    promoError,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    applyPromoCode,
    removePromoCode,
  } = useCart();

  const [promoInput, setPromoInput] = useState("");

  const handlePromo = (event) => {
    event.preventDefault();

    if (applyPromoCode(promoInput)) {
      setPromoInput("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onMouseDown={onClose}>
      <aside
        className="cart-sidebar"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header className="cart-header">
          <div>
            <span className="cart-eyebrow">ХЛЕБНАЯ ЭСТЕТИКА</span>
            <h2 id="cart-title">Ваша корзина</h2>
            <p>{itemCount} товаров в заказе</p>
          </div>

          <button
            className="cart-close"
            onClick={onClose}
            aria-label="Закрыть корзину"
          >
            <X size={22} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <ShoppingBag size={34} strokeWidth={1.3} />
            </div>

            <h3>Пока здесь пусто</h3>
            <p>
              Самое время выбрать свежий хлеб
              или что-нибудь к кофе.
            </p>

            <button
              className="cart-primary-button"
              onClick={onClose}
            >
              Вернуться в меню <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img
                    className="cart-item-image"
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-item-content">
                    <div className="cart-item-top">
                      <div>
                        <h3>{item.name}</h3>
                        {item.weight && (
                          <span className="cart-item-weight">
                            {item.weight}
                          </span>
                        )}
                      </div>

                      <button
                        className="cart-remove"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Удалить ${item.name}`}
                        title="Удалить товар"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="cart-item-bottom">
                      <div className="cart-quantity">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label={`Уменьшить количество: ${item.name}`}
                        >
                          <Minus size={14} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            addToCart(item, 1)
                          }
                          aria-label={`Увеличить количество: ${item.name}`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <strong>
                        {money(item.price * item.quantity)}
                      </strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-bottom">
              <form
                className="cart-promo"
                onSubmit={handlePromo}
              >
                <label htmlFor="cart-promo-input">
                  <Tag size={16} />
                  Промокод
                </label>

                {promoCode ? (
                  <div className="cart-applied-promo">
                    <span>
                      {promoCode} — применён
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        removePromoCode();
                        setPromoInput("");
                      }}
                    >
                      Удалить
                    </button>
                  </div>
                ) : (
                  <div className="cart-promo-row">
                    <input
                      id="cart-promo-input"
                      value={promoInput}
                      onChange={(event) =>
                        setPromoInput(event.target.value)
                      }
                      placeholder="Введите код"
                      autoComplete="off"
                    />

                    <button type="submit">
                      Применить
                    </button>
                  </div>
                )}

                {promoError && (
                  <p className="cart-promo-error" role="alert">
                    {promoError}
                  </p>
                )}
              </form>

              <div className="cart-summary">
                <div>
                  <span>Стоимость товаров</span>
                  <span>{money(subtotal)}</span>
                </div>

                {discount > 0 && (
                  <div className="cart-discount">
                    <span>Скидка</span>
                    <span>−{money(discount)}</span>
                  </div>
                )}

                <div className="cart-total">
                  <strong>Итого</strong>
                  <strong>{money(total)}</strong>
                </div>
              </div>

              <button
                className="cart-primary-button cart-checkout"
                onClick={onCheckout}
              >
                Перейти к оформлению
                <ArrowRight size={17} />
              </button>

              <button
                className="cart-back-button"
                onClick={onClose}
              >
                <ArrowLeft size={15} />
                Продолжить покупки
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
