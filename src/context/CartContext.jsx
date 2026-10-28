
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { promoCodes } from "../data/menuData";

const CartContext = createContext(null);

const roundMoney = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

const normalizePromoCode = (code) =>
  String(code ?? "").trim().toUpperCase();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [orderStatus, setOrderStatus] = useState("idle");
  const [lastOrder, setLastOrder] = useState(null);

  // Добавить товар. Повторное добавление увеличивает количество.
  const addToCart = useCallback((product, quantity = 1) => {
    if (
      !product?.id ||
      !Number.isFinite(product.price) ||
      product.price < 0 ||
      !Number.isInteger(quantity) ||
      quantity < 1
    ) {
      return;
    }

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...currentItems,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          weight: product.weight,
          quantity,
        },
      ];
    });

    setOrderStatus("idle");
  }, []);

  // Установить количество товара.
  const updateQuantity = useCallback((productId, quantity) => {
    if (!Number.isInteger(quantity)) return;

    if (quantity <= 0) {
      setItems((currentItems) =>
        currentItems.filter((item) => item.id !== productId)
      );
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );

    setOrderStatus("idle");
  }, []);

  const increaseQuantity = useCallback(
    (productId) => {
      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
      setOrderStatus("idle");
    },
    []
  );

  const decreaseQuantity = useCallback(
    (productId) => {
      updateQuantity(
        productId,
        Math.max(
          0,
          (items.find((item) => item.id === productId)?.quantity ?? 0) - 1
        )
      );
    },
    [items, updateQuantity]
  );

  const removeFromCart = useCallback((productId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
    setOrderStatus("idle");
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setPromoCode("");
    setPromoError("");
  }, []);

  // Промокод проверяется относительно текущей суммы корзины.
  const applyPromoCode = useCallback(
    (rawCode) => {
      const code = normalizePromoCode(rawCode);
      const promo = promoCodes[code];

      const subtotal = roundMoney(
        items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      );

      if (!code) {
        setPromoError("Введите промокод.");
        return false;
      }

      if (!promo) {
        setPromoError("Такого промокода нет. Проверьте написание.");
        return false;
      }

      if (promo.minOrder && subtotal < promo.minOrder) {
        setPromoError(
          `Минимальная сумма заказа для этого промокода — ${promo.minOrder.toFixed(2)} €.`
        );
        return false;
      }

      setPromoCode(code);
      setPromoError("");
      return true;
    },
    [items]
  );

  const removePromoCode = useCallback(() => {
    setPromoCode("");
    setPromoError("");
  }, []);

  // Итоговые значения рассчитываются автоматически.
  const totals = useMemo(() => {
    const itemCount = items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    const subtotal = roundMoney(
      items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
    );

    const promo = promoCode ? promoCodes[promoCode] : null;

    let discount = 0;

    if (promo) {
      if (promo.type === "percent") {
        discount = (subtotal * promo.discount) / 100;
      } else if (
        promo.type === "fixed" &&
        subtotal >= (promo.minOrder ?? 0)
      ) {
        discount = promo.discount;
      }
    }

    discount = roundMoney(Math.min(subtotal, discount));

    return {
      itemCount,
      subtotal,
      discount,
      total: roundMoney(subtotal - discount),
    };
  }, [items, promoCode]);

  // Фронтенд-only оформление заказа без реальной оплаты.
  const submitOrder = useCallback(
    (customerData) => {
      if (items.length === 0) {
        return {
          success: false,
          error: "Корзина пуста.",
        };
      }

      if (orderStatus === "submitting") {
        return {
          success: false,
          error: "Заказ уже обрабатывается.",
        };
      }

      const name = String(customerData?.name ?? "").trim();
      const phone = String(customerData?.phone ?? "").trim();
      const deliveryType = customerData?.deliveryType;
      const address = String(customerData?.address ?? "").trim();

      const phoneDigits = phone.replace(/\D/g, "");

      if (name.length < 2) {
        return {
          success: false,
          error: "Укажите имя (не менее двух символов).",
        };
      }

      if (phoneDigits.length < 7 || phoneDigits.length > 15) {
        return {
          success: false,
          error: "Укажите корректный номер телефона.",
        };
      }

      if (!["pickup", "delivery"].includes(deliveryType)) {
        return {
          success: false,
          error: "Выберите способ получения заказа.",
        };
      }

      if (deliveryType === "delivery" && address.length < 5) {
        return {
          success: false,
          error: "Укажите полный адрес доставки.",
        };
      }

      const order = {
        id: `HE-${Date.now().toString(36).toUpperCase()}`,
        createdAt: new Date().toISOString(),
        customer: {
          name,
          phone,
          deliveryType,
          address: deliveryType === "delivery" ? address : "",
        },
        items: items.map((item) => ({ ...item })),
        subtotal: totals.subtotal,
        discount: totals.discount,
        total: totals.total,
        promoCode: promoCode || null,
        paymentStatus: "not_paid",
        status: "received_demo",
      };

      setLastOrder(order);
      setOrderStatus("success");
      clearCart();

      return {
        success: true,
        order,
      };
    },
    [items, orderStatus, totals, promoCode, clearCart]
  );

  const resetOrderStatus = useCallback(() => {
    setOrderStatus("idle");
  }, []);

  const value = useMemo(
    () => ({
      items,
      promoCode,
      promoError,
      orderStatus,
      lastOrder,
      ...totals,
      addToCart,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      applyPromoCode,
      removePromoCode,
      submitOrder,
      resetOrderStatus,
    }),
    [
      items,
      promoCode,
      promoError,
      orderStatus,
      lastOrder,
      totals,
      addToCart,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      applyPromoCode,
      removePromoCode,
      submitOrder,
      resetOrderStatus,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart() должен использоваться внутри CartProvider.");
  }

  return context;
}
