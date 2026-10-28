import OrderForm from "./components/OrderForm";
import { useState } from "react";
import { ArrowDown, ArrowRight, Clock, MapPin, ShoppingBag } from "lucide-react";
import "./App.css";
import Cart from "./components/Cart";
import { useCart } from "./context/CartContext";



const products = [
  {
    id: 1,
    name: "Хлеб на закваске",
    description: "Хрустящая корочка, нежный мякиш и 24 часа терпения.",
    price: 5.9,
    category: "Хлеб",
    image:
      "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Масляный круассан",
    description: "Слоистый, воздушный, с ароматом настоящего сливочного масла.",
    price: 3.2,
    category: "Выпечка",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Булочка с корицей",
    description: "Мягкая сдоба, тёплая корица и тонкая сахарная глазурь.",
    price: 3.5,
    category: "Сладкое",
    image:
      "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=900&q=85",
  },
];

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { itemCount, addToCart } = useCart();
  const [notice, setNotice] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const categories = ["Все", "Хлеб", "Выпечка", "Сладкое"];

const filteredProducts = products
  .filter((product) => {
    const matchesCategory =
      activeCategory === "Все" ||
      product.category === activeCategory;

    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  })
  .sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <div className="bakery">
      <header className="header">
        <a className="brand" href="#home">
          <span className="brand-mark">х.</span>
          <span>
            <strong>Хлебная Эстетика</strong>
            <small>ПЕКАРНЯ МЕДЛЕННОГО ХЛЕБА</small>
          </span>
        </a>

        <nav className="navigation">
          <a href="#menu">Наше меню</a>
          <a href="#story">О пекарне</a>
          <a href="#advantages">Наши преимущества</a>
          <a href="#visit">Контакты</a>
        </nav>

        <button
          type="button"
          className="cart-trigger"
          onClick={() => setIsCartOpen(true)}
          aria-label={`Открыть корзину, товаров: ${itemCount}`}
        >
          <ShoppingBag size={19} />
          <span>Корзина</span>
          <span className="cart-trigger-count">{itemCount}</span>
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              С любовью к простым вещам
            </span>

            <h1>
              Хороший хлеб.
              <br />
              <em>Хорошее утро.</em>
            </h1>

            <p>
              Печём вручную, ждём естественного брожения и выбираем
              ингредиенты, за которые нам не стыдно. Каждый день —
              маленькое удовольствие в большой бумажной упаковке.
            </p>

            <div className="hero-actions">
              <a className="primary-button" href="#menu">
                Выбрать выпечку <ArrowRight size={18} />
              </a>
              <a className="text-button" href="#story">
                Наша философия
              </a>
            </div>

            <div className="hero-note">
              <span className="note-icon">✳</span>
              <span>
                <strong>Каждый день с 08:00</strong>
                <small>Свежая выпечка прямо из печи</small>
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=90"
              alt="Свежий ремесленный хлеб с хрустящей корочкой"
            />
            <div className="image-caption">
              <span className="caption-star">✳</span>
              <span>
                <strong>Ничего лишнего</strong>
                <small>Мука · Вода · Соль · Время</small>
              </span>
            </div>
            <div className="round-stamp">
              <span>BAKED</span>
              <strong>with</strong>
              <span>LOVE</span>
              <i>✳</i>
            </div>
          </div>

          <a href="#menu" className="scroll-cue">
            <ArrowDown size={15} /> ЛИСТАЙТЕ ДАЛЬШЕ
          </a>
        </section>

<div className="catalog-controls">
  <div className="category-filters">
    {categories.map((category) => (
      <button
        key={category}
        className={`filter-button ${
          activeCategory === category ? "active" : ""
        }`}
        onClick={() => setActiveCategory(category)}
      >
        {category}
      </button>
    ))}
  </div>

  <input
    className="search-input"
    type="search"
    placeholder="Найти любимую выпечку..."
    value={search}
    onChange={(event) => setSearch(event.target.value)}
    aria-label="Поиск товаров"
  />

  <select
    className="sort-select"
    value={sortOrder}
    onChange={(event) => setSortOrder(event.target.value)}
    aria-label="Сортировка по цене"
  >
    <option value="default">По умолчанию</option>
    <option value="asc">Сначала дешевле</option>
    <option value="desc">Сначала дороже</option>
  </select>
</div>

<div className="product-grid">
  {filteredProducts.map((product, index) => (
    <article className="product-card" key={product.id}>
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} />
        <span className="product-number">
          {String(index + 1).padStart(2, "0")}
        </span>
        <button
          className="quick-add"
          onClick={() => addToCart(product)}
          aria-label={`Добавить: ${product.name}`}
        >
          +
        </button>
      </div>

      <div className="product-info">
        <span className="product-category">
          {product.category}
        </span>

        <div className="product-title-row">
          <h3>{product.name}</h3>
          <strong>{product.price.toFixed(2)} €</strong>
        </div>

        <p>{product.description}</p>

        <button
          className="product-add"
          onClick={() => addToCart(product)}
        >
          Добавить в корзину <ArrowRight size={16} />
        </button>
      </div>
    </article>
  ))}
</div>

{filteredProducts.length === 0 && (
  <p className="empty-results">
    Ничего не найдено. Попробуйте изменить запрос.
  </p>
)}

        <section className="story-section" id="story">
          <div className="story-image">
            <img
              src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1000&q=85"
              alt="Ремесленный хлеб, приготовленный вручную"
              loading="lazy"
            />
          </div>
          <div className="story-copy">
            <span className="eyebrow">НАША ФИЛОСОФИЯ</span>
            <h2>
              Не быстрее.
              <br />
              <em>А с душой.</em>
            </h2>
            <p>
              Мы верим, что у хороших вещей есть свой ритм. Поэтому
              не торопим закваску, не прячем вкус за добавками и
              оставляем в каждом изделии место для простого удовольствия.
            </p>
            <div className="story-facts">
              <div><strong>24 ч</strong><span>медленного брожения</span></div>
              <div><strong>100%</strong><span>любви к своему делу</span></div>
            </div>
          </div>
        </section>
    
<section className="advantages-section section-wrap" id="advantages">
  <div className="advantages-heading">
    <span className="eyebrow">НАША ФИЛОСОФИЯ</span>
    <h2>
      Маленькие детали.
      <br />
      <em>Большая разница.</em>
    </h2>
    <p>
      Мы не ищем коротких путей. Мы выбираем качество,
      внимание к деталям и вкус, к которому хочется возвращаться.
    </p>
  </div>

  <div className="advantages-grid">
    <article className="advantage-card">
      <span className="advantage-number">01</span>
      <div className="advantage-icon">✳</div>
      <h3>Честный состав</h3>
      <p>
        Мука, вода, соль и хорошие ингредиенты.
        Ничего лишнего — только то, что делает вкус настоящим.
      </p>
    </article>

    <article className="advantage-card">
      <span className="advantage-number">02</span>
      <div className="advantage-icon">◷</div>
      <h3>Время — наш секрет</h3>
      <p>
        Даём тесту созреть в собственном ритме,
        чтобы раскрыть аромат и характер каждого изделия.
      </p>
    </article>

    <article className="advantage-card">
      <span className="advantage-number">03</span>
      <div className="advantage-icon">♨</div>
      <h3>Ручная работа</h3>
      <p>
        Формуем и выпекаем с вниманием к деталям.
        Поэтому у каждой буханки свой характер.
      </p>
    </article>

    <article className="advantage-card">
      <span className="advantage-number">04</span>
      <div className="advantage-icon">♡</div>
      <h3>Свежесть каждый день</h3>
      <p>
        Готовим небольшими партиями, чтобы вы могли
        наслаждаться свежей выпечкой в течение дня.
      </p>
    </article>
  </div>
</section>

        <section className="visit-section section-wrap" id="visit">
          <div>
            <span className="eyebrow">БУДЕМ РАДЫ ВАС ВИДЕТЬ</span>
            <h2>Загляните на запах.</h2>
            <p>Кофе уже готов, а первая партия хлеба почти остыла.</p>
          </div>
          <div className="visit-details">
            <div><Clock size={20} /><span><strong>Пн — Вс</strong><small>08:00 — 19:00</small></span></div>
            <div><MapPin size={20} /><span><strong>Наш уютный уголок</strong><small>Адрес будет добавлен перед запуском</small></span></div>
          </div>
        </section>

        <OrderForm />
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">х.</span>
          <strong>Хлебная Эстетика</strong>
        </a>
        <span>Сделано с теплом и щепоткой муки.</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>

      {notice && <div className="toast">{notice}</div>}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          document
            .getElementById("order")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      />
    </div>
  );
}
