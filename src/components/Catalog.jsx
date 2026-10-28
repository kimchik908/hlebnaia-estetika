
import { useMemo, useState } from "react";
import { ArrowUpDown, Search, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { categories, menuData } from "../data/menuData";
import { useCart } from "../hooks/useCart";

export default function Catalog({ onProductSelect }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const { addToCart } = useCart();

  const products = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("ru");

    const result = menuData.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;
      const matchesSearch =
        !query ||
        product.name.toLocaleLowerCase("ru").includes(query) ||
        product.description.toLocaleLowerCase("ru").includes(query);

      return matchesCategory && matchesSearch;
    });

    if (sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, search, sort]);

  return (
    <section id="menu" className="section-padding bg-cream">
      <div className="page-container">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="eyebrow">Свежая выпечка каждый день</span>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              Наше меню
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-6 text-bread-600">
              От хрустящего хлеба на закваске до ароматного кофе —
              выбирайте то, что сделает ваш день вкуснее.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-[minmax(220px,1fr)_190px] lg:w-[470px]">
            <label className="flex items-center gap-2.5 rounded-full border border-bread-200 bg-white px-4 py-3 focus-within:border-bread-500">
              <Search size={17} className="shrink-0 text-bread-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Найти любимое..."
                aria-label="Поиск по меню"
                className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-bread-400"
              />
            </label>

            <label className="flex items-center gap-2 rounded-full border border-bread-200 bg-white px-4 py-3">
              <ArrowUpDown size={16} className="shrink-0 text-bread-400" />
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                aria-label="Сортировка по цене"
                className="w-full min-w-0 bg-transparent text-sm outline-none"
              >
                <option value="default">По умолчанию</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
              </select>
            </label>
          </div>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-3">
          {categories.map((category) => {
            const active = activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={active}
                className={`shrink-0 rounded-full border px-5 py-3 text-sm transition ${
                  active
                    ? "border-bread-800 bg-bread-800 text-white"
                    : "border-bread-200 bg-white text-bread-700 hover:border-bread-500"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between text-sm text-bread-500">
          <span>
            {products.length === 0
              ? "Ничего не найдено"
              : `${products.length} ${products.length === 1 ? "позиция" : products.length < 5 ? "позиции" : "позиций"}`}
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <SlidersHorizontal size={15} />
            Свежая выпечка и кофе
          </span>
        </div>

        {products.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-3xl border border-bread-200/80 bg-white transition duration-300 hover:-translate-y-1 hover:border-bread-400 hover:shadow-soft"
              >
                <button
                  type="button"
                  onClick={() => onProductSelect?.(product)}
                  className="relative block w-full overflow-hidden bg-bread-100 text-left"
                  aria-label={`Подробнее о товаре: ${product.name}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  {product.labels.length > 0 && (
                    <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                      {product.labels.map((label) => (
                        <span
                          key={label}
                          className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${
                            label === "хит"
                              ? "bg-terracotta text-white"
                              : "bg-cream/95 text-bread-800"
                          }`}
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </button>

                <div className="p-5">
                  <button
                    type="button"
                    onClick={() => onProductSelect?.(product)}
                    className="font-display text-left text-xl transition hover:text-terracotta"
                  >
                    {product.name}
                  </button>

                  <p className="mt-2 min-h-[60px] text-sm leading-5 text-bread-600">
                    {product.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-bread-100 pt-4">
                    <div>
                      <p className="text-lg font-semibold">
                        {product.price.toFixed(2)} €
                      </p>
                      <p className="mt-1 text-xs text-bread-500">
                        {product.weight} г · {product.calories} ккал/100 г
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      aria-label={`Добавить ${product.name} в корзину`}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-bread-800 text-white transition hover:scale-105 hover:bg-terracotta active:scale-95"
                    >
                      <ShoppingBag size={18} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-bread-300 px-6 py-16 text-center">
            <Search size={30} className="mx-auto text-bread-400" />
            <h3 className="font-display mt-4 text-2xl">
              Пока ничего не нашлось
            </h3>
            <p className="mt-2 text-sm text-bread-600">
              Попробуйте изменить запрос или выбрать другую категорию.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("all");
                setSort("default");
              }}
              className="mt-5 rounded-full bg-bread-800 px-5 py-3 text-sm text-white transition hover:bg-bread-700"
            >
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
