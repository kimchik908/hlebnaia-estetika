
import { useState } from "react";
import {
  MapPin,
  Navigation,
  Plus,
  Minus,
  ExternalLink,
} from "lucide-react";

export default function BakeryMap() {
  const [zoom, setZoom] = useState(1);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <section id="contacts" className="section-padding bg-[#F2E8DA]">
      <div className="page-container">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Всегда рядом</span>
            <h2 className="font-display mt-4 text-4xl sm:text-5xl">
              Найдите нас
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-bread-600">
            Заходите за свежей выпечкой и оставайтесь на чашку кофе.
            Адрес добавим после настройки реальной точки на карте.
          </p>
        </div>

        <div className="grid overflow-hidden rounded-[28px] border border-bread-200 bg-cream shadow-card md:grid-cols-[1.2fr_0.8fr]">
          <div className="relative min-h-[320px] overflow-hidden bg-[#E9DDC9] sm:min-h-[390px]">
            <div
              className="bakery-grid absolute inset-0 transition-transform duration-500"
              style={{ transform: `scale(${zoom})` }}
            />

            <svg
              viewBox="0 0 640 400"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <g
                fill="none"
                stroke="#C5AD8E"
                strokeWidth="19"
                strokeLinecap="round"
              >
                <path d="M-40 75 L180 120 L340 50 L680 115" />
                <path d="M70 -40 L120 160 L65 440" />
                <path d="M360 -20 L310 160 L430 440" />
                <path d="M-40 315 L210 270 L390 330 L690 250" />
              </g>
              <g
                fill="none"
                stroke="#FCF9F4"
                strokeWidth="13"
                strokeLinecap="round"
              >
                <path d="M-40 75 L180 120 L340 50 L680 115" />
                <path d="M70 -40 L120 160 L65 440" />
                <path d="M360 -20 L310 160 L430 440" />
                <path d="M-40 315 L210 270 L390 330 L690 250" />
              </g>
              <g fill="#D5C7A8" opacity="0.65">
                <rect x="160" y="145" width="105" height="78" rx="12" />
                <rect x="395" y="145" width="110" height="67" rx="12" />
                <rect x="155" y="315" width="82" height="65" rx="12" />
                <rect x="475" y="30" width="90" height="60" rx="12" />
              </g>
            </svg>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-bread-800 text-white shadow-xl">
                <MapPin size={28} />
                <span className="absolute inset-[-8px] animate-ping rounded-full border border-bread-700/30" />
              </span>
            </div>

            <div className="absolute left-4 top-4 rounded-2xl border border-white/70 bg-cream/95 px-4 py-3 shadow-card backdrop-blur">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-bread-500">
                Наша пекарня
              </p>
              <p className="font-display mt-1 text-lg">
                Хлебная Эстетика
              </p>
            </div>

            <div className="absolute bottom-4 right-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setZoom((value) => Math.min(1.4, value + 0.1))}
                disabled={zoom >= 1.4}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-bread-200 bg-cream shadow-sm transition hover:bg-bread-100 disabled:opacity-40"
                aria-label="Приблизить схему"
              >
                <Plus size={18} />
              </button>
              <button
                type="button"
                onClick={() => setZoom((value) => Math.max(1, value - 0.1))}
                disabled={zoom <= 1}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-bread-200 bg-cream shadow-sm transition hover:bg-bread-100 disabled:opacity-40"
                aria-label="Отдалить схему"
              >
                <Minus size={18} />
              </button>
            </div>
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bread-100">
              <Navigation size={22} />
            </span>

            <h3 className="font-display mt-5 text-2xl">
              Будем рады встрече
            </h3>

            <p className="mt-3 text-sm leading-6 text-bread-600">
              Адрес, ориентиры и ссылка для построения маршрута
              появятся здесь после указания реального местоположения.
            </p>

            {showDetails && (
              <div
                role="status"
                className="mt-4 rounded-xl border border-bread-200 bg-bread-50 p-3 text-sm leading-6"
              >
                <p className="font-medium">Как нас найти</p>
                <p className="mt-1 text-bread-600">
                  Добавьте адрес пекарни в настройки сайта,
                  чтобы посетители могли построить маршрут.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowDetails((value) => !value)}
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-bread-800 px-5 py-3.5 text-sm font-medium text-white transition hover:bg-bread-700"
            >
              {showDetails ? "Скрыть информацию" : "Как нас найти"}
              <ExternalLink size={16} />
            </button>

            <p className="mt-3 text-center text-xs text-bread-500">
              Интерактивная схема · Демонстрационный режим
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
