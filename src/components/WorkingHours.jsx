
import { useEffect, useState } from "react";
import { Clock, Coffee, CalendarDays } from "lucide-react";

const TIME_ZONE = "Europe/Berlin";

function getBakeryStatus() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map((part) => [part.type, part.value])
  );

  const day = values.weekday;
  const minutes = Number(values.hour) * 60 + Number(values.minute);

  // Демонстрационный график: каждый день с 08:00 до 20:00.
  const isOpen =
    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].includes(day) &&
    minutes >= 480 &&
    minutes < 1200;

  return {
    isOpen,
    time: `${values.hour}:${values.minute}`,
  };
}

export default function WorkingHours() {
  const [status, setStatus] = useState(getBakeryStatus);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setStatus(getBakeryStatus());
    }, 60000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="bg-bread-900 py-16 text-cream sm:py-20">
      <div className="page-container grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-bread-300">
            Заглядывайте в гости
          </span>
          <h2 className="font-display mt-4 max-w-lg text-4xl leading-tight sm:text-5xl">
            Хороший день начинается с хорошего хлеба.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-bread-200">
            Приходите за тёплой буханкой, свежей выпечкой или
            чашкой любимого кофе. Будем рады вас видеть.
          </p>
        </div>

        <div className="rounded-3xl border border-white/15 bg-white/[0.05] p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                <Clock size={21} />
              </span>
              <div>
                <p className="font-medium">Сегодня</p>
                <p className="mt-1 text-xs text-bread-300">
                  Ежедневно, 08:00–20:00
                </p>
              </div>
            </div>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                status.isOpen
                  ? "bg-emerald-400/15 text-emerald-300"
                  : "bg-white/10 text-bread-200"
              }`}
            >
              {status.isOpen ? "Открыто" : "Закрыто"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 border-b border-white/10 py-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10">
                <CalendarDays size={21} />
              </span>
              <div>
                <p className="font-medium">Время в пекарне</p>
                <p className="mt-1 text-xs text-bread-300">
                  Часовой пояс {TIME_ZONE}
                </p>
              </div>
            </div>
            <span className="font-display text-2xl">{status.time}</span>
          </div>

          <div className="flex items-start gap-3 pt-6">
            <Coffee size={20} className="mt-0.5 shrink-0 text-bread-300" />
            <p className="text-sm leading-6 text-bread-200">
              График демонстрационный. Актуальное расписание
              пекарни необходимо подтвердить перед запуском сайта.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
