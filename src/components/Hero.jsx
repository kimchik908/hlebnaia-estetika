
import { ArrowDownRight, ArrowRight, Clock3 } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#F2E8DA]"
    >
      <div className="page-container grid min-h-[580px] items-center gap-10 py-12 md:grid-cols-[0.92fr_1.08fr] md:py-16 lg:min-h-[650px]">
        <div className="relative z-10 animate-fade-up">
          <span className="eyebrow">
            <span className="h-px w-7 bg-terracotta" />
            Маленькая пекарня с большой любовью
          </span>

          <h1 className="font-display mt-6 max-w-xl text-5xl font-medium leading-[1.08] tracking-[-0.04em] text-bread-900 sm:text-6xl lg:text-[76px]">
            Хлеб,
            <br />
            который
            <br />
            <span className="italic text-terracotta">чувствуется.</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-bread-700 sm:text-lg sm:leading-8">
            Медленная закваска, натуральные ингредиенты и аромат,
            ради которого хочется просыпаться пораньше.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#menu"
              className="group inline-flex items-center gap-3 rounded-full bg-bread-800 px-6 py-4 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-bread-700"
            >
              Открыть меню
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            <a
              href="#about"
              className="inline-flex items-center gap-2 px-2 py-3 text-sm text-bread-700 transition hover:text-terracotta"
            >
              Наша история
              <ArrowDownRight size={16} />
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 border-t border-bread-300/70 pt-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/70">
              <Clock3 size={19} strokeWidth={1.5} />
            </span>
            <div>
              <p className="text-sm font-semibold">24 часа терпения</p>
              <p className="mt-0.5 text-xs text-bread-600">
                Для настоящего вкуса и текстуры
              </p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[590px] animate-fade-up [animation-delay:150ms]">
          <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full border border-bread-400/50" />
          <div className="absolute -bottom-6 -left-5 h-24 w-24 rounded-full bg-bread-200/60" />

          <div className="relative overflow-hidden rounded-[42%_42%_20px_20px] bg-bread-200 shadow-soft">
            <img
              src="https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&w=1200&q=90"
              alt="Свежий деревенский хлеб с хрустящей корочкой"
              fetchPriority="high"
              className="h-[360px] w-full object-cover transition duration-700 hover:scale-[1.04] sm:h-[470px] lg:h-[520px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bread-900/40 via-transparent to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white sm:bottom-7 sm:left-7 sm:right-7">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
                  Из печи сегодня
                </p>
                <p className="font-display mt-2 text-2xl sm:text-3xl">
                  Деревенский
                </p>
              </div>
              <span className="rounded-full border border-white/50 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
                6,50 €
              </span>
            </div>
          </div>

          <div className="absolute -left-3 top-12 max-w-[190px] rotate-[-5deg] rounded-2xl border border-white/70 bg-cream/95 p-4 shadow-card backdrop-blur-md sm:-left-8 sm:top-16">
            <span className="text-[10px] uppercase tracking-[0.15em] text-bread-500">
              Наш секрет
            </span>
            <p className="font-display mt-1 text-lg leading-tight">
              Время. Закваска. Любовь.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-bread-200 bg-cream/70">
        <div className="page-container flex flex-wrap items-center justify-between gap-3 py-4 text-xs text-bread-600 sm:text-sm">
          <span>Натуральные ингредиенты</span>
          <span className="hidden text-bread-300 sm:inline">✳</span>
          <span>Ручная работа каждый день</span>
          <span className="hidden text-bread-300 sm:inline">✳</span>
          <span>Выпекаем небольшими партиями</span>
        </div>
      </div>
    </section>
  );
}
