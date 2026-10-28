
import { useState } from "react";
import {
  Wheat,
  ShoppingBag,
  Menu,
  X,
  Search,
  ArrowUpRight,
} from "lucide-react";
import { useCart } from "../hooks/useCart";

const navLinks = [
  { label: "Главная", href: "#home" },
  { label: "Меню", href: "#menu" },
  { label: "О нас", href: "#about" },
  { label: "Контакты", href: "#contacts" },
];

export default function Header({ onCartOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount } = useCart();

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-bread-200/60 bg-cream/95 backdrop-blur-xl">
      <div className="page-container flex h-[76px] items-center justify-between gap-5">
        <a
          href="#home"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="Хлебная Эстетика — на главную"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-bread-100 transition group-hover:rotate-[-8deg]">
            <Wheat size={23} strokeWidth={1.5} />
          </span>
          <span className="font-display text-lg font-semibold leading-tight tracking-tight">
            Хлебная
            <br />
            Эстетика
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-bread-700 transition hover:text-terracotta"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#menu"
            aria-label="Найти товары в меню"
            className="hidden h-10 w-10 items-center justify-center rounded-full transition hover:bg-bread-100 sm:flex"
          >
            <Search size={19} />
          </a>

          <button
            type="button"
            onClick={onCartOpen}
            className="relative flex h-11 items-center gap-2 rounded-full border border-bread-200 px-3.5 transition hover:border-bread-500 hover:bg-bread-50"
            aria-label={`Открыть корзину, товаров: ${itemCount}`}
          >
            <ShoppingBag size={19} strokeWidth={1.7} />
            <span className="hidden text-sm sm:inline">Корзина</span>

            {itemCount > 0 && (
              <span
                key={itemCount}
                className="flex min-w-5 animate-pop-in items-center justify-center rounded-full bg-terracotta px-1.5 py-0.5 text-[10px] font-bold text-white"
              >
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-bread-100 md:hidden"
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="animate-fade-up border-t border-bread-200 bg-cream px-5 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobileMenu}
              className="flex items-center justify-between border-b border-bread-100 py-3.5 text-sm last:border-0"
            >
              {link.label}
              <ArrowUpRight size={16} className="text-bread-400" />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
