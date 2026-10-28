
import {
  Sprout,
  Timer,
  Hand,
  Heart,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    icon: Sprout,
    number: "01",
    title: "Честные ингредиенты",
    description:
      "Выбираем качественную муку, натуральное масло и простые ингредиенты без лишнего.",
  },
  {
    icon: Timer,
    number: "02",
    title: "Живая закваска",
    description:
      "Даём тесту время раскрыть вкус и получить характерную хрустящую корочку.",
  },
  {
    icon: Hand,
    number: "03",
    title: "Ручная работа",
    description:
      "Формуем каждую буханку вручную и внимательно следим за каждым этапом.",
  },
  {
    icon: Heart,
    number: "04",
    title: "Тепло каждый день",
    description:
      "Создаём уютное место, куда приятно зайти за хлебом и остаться на кофе.",
  },
];

export default function Features() {
  return (
    <section id="about" className="section-padding bg-cream">
      <div className="page-container">
        <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">Маленькие детали, большой вкус</span>
            <h2 className="font-display mt-4 text-4xl leading-tight tracking-tight sm:text-5xl">
              Почему выбирают нас
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-bread-600">
            Мы не торопим тесто. Мы не усложняем рецепты.
            Мы просто делаем хлеб так, как любим сами.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.number}
                className="group relative rounded-3xl border border-bread-200/80 bg-white/60 p-6 transition duration-300 hover:-translate-y-1 hover:border-bread-400 hover:bg-white hover:shadow-card sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-bread-100 transition duration-300 group-hover:bg-bread-800 group-hover:text-white">
                    <Icon size={22} strokeWidth={1.5} />
                  </span>
                  <span className="font-display text-sm text-bread-400">
                    {feature.number}
                  </span>
                </div>

                <h3 className="font-display mt-7 text-xl">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-bread-600">
                  {feature.description}
                </p>

                <ArrowUpRight
                  size={18}
                  className="mt-5 text-bread-400 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-terracotta"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
