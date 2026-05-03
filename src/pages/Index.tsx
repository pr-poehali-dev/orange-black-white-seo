import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/bd7e7b90-35c3-49cd-913f-4b7db5da15f7/files/83f68304-24ab-4902-bab8-aaf33ca90d26.jpg";

const SERVICES = [
  { id: "audit", label: "SEO-аудит", base: 15000, icon: "Search" as const },
  { id: "promo", label: "Продвижение сайта", base: 30000, icon: "TrendingUp" as const },
  { id: "content", label: "Контент-маркетинг", base: 20000, icon: "FileText" as const },
  { id: "local", label: "Локальное SEO", base: 12000, icon: "MapPin" as const },
  { id: "tech", label: "Техническая оптимизация", base: 25000, icon: "Settings" as const },
  { id: "links", label: "Ссылочная масса", base: 18000, icon: "Link" as const },
];

const REGIONS = [
  { id: "local", label: "Город / регион", mult: 1 },
  { id: "russia", label: "Вся Россия", mult: 1.8 },
  { id: "cis", label: "СНГ", mult: 2.5 },
];

const PERIODS = [
  { id: "3", label: "3 месяца", disc: 0 },
  { id: "6", label: "6 месяцев", disc: 0.05 },
  { id: "12", label: "12 месяцев", disc: 0.15 },
];

const STATS = [
  { value: "850+", label: "Проектов в ТОП-10" },
  { value: "12 лет", label: "На рынке SEO" },
  { value: "3.2x", label: "Рост трафика в среднем" },
  { value: "97%", label: "Клиентов возвращаются" },
];

const HOW = [
  { num: "01", title: "Аудит и анализ", text: "Глубокий анализ сайта, конкурентов и семантики. Находим точки роста и слабые места." },
  { num: "02", title: "Стратегия", text: "Разрабатываем персональную стратегию продвижения с чёткими KPI и сроками." },
  { num: "03", title: "Реализация", text: "Техническая оптимизация, контент, ссылки — работаем по всем фронтам параллельно." },
  { num: "04", title: "Результат", text: "Еженедельные отчёты, прозрачная аналитика и гарантированный рост позиций." },
];

export default function Index() {
  const [selectedServices, setSelectedServices] = useState<string[]>(["promo"]);
  const [region, setRegion] = useState("local");
  const [period, setPeriod] = useState("6");
  const [pages, setPages] = useState(50);
  const [competition, setCompetition] = useState(50);

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const calcTotal = () => {
    const regionMult = REGIONS.find((r) => r.id === region)?.mult ?? 1;
    const periodObj = PERIODS.find((p) => p.id === period);
    const disc = periodObj?.disc ?? 0;
    const months = parseInt(period);
    const pageMult = 1 + (pages - 10) / 200;
    const competMult = 1 + (competition / 100) * 0.8;

    const base = selectedServices.reduce((sum, id) => {
      const s = SERVICES.find((sv) => sv.id === id);
      return sum + (s?.base ?? 0);
    }, 0);

    const monthly = base * regionMult * pageMult * competMult;
    const total = monthly * months * (1 - disc);
    return { monthly: Math.round(monthly / 1000) * 1000, total: Math.round(total / 1000) * 1000, disc };
  };

  const { monthly, total, disc } = calcTotal();

  const formatPrice = (n: number) => n.toLocaleString("ru-RU") + " ₽";

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white" style={{ fontFamily: "'Golos Text', sans-serif" }}>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FF6A00] rounded flex items-center justify-center">
            <Icon name="TrendingUp" size={16} className="text-black" />
          </div>
          <span className="font-bold text-lg tracking-wide" style={{ fontFamily: "'Oswald', sans-serif" }}>
            APEX<span className="text-[#FF6A00]">SEO</span>
          </span>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-white/60">
          {["Услуги", "Как работаем", "Результаты", "Калькулятор"].map((item) => (
            <a key={item} href={`#${item}`} className="hover:text-[#FF6A00] transition-colors duration-200">
              {item}
            </a>
          ))}
        </div>
        <button className="bg-[#FF6A00] text-black font-semibold text-sm px-5 py-2.5 rounded hover:bg-[#FF8C38] transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,106,0,0.4)]">
          Получить аудит
        </button>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="SEO" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D0D0D] via-[#0D0D0D]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6 animate-slide-up stagger-1">
              <div className="h-px w-10 bg-[#FF6A00]" />
              <span className="text-[#FF6A00] text-sm font-semibold tracking-widest uppercase">SEO-продвижение</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold leading-none mb-6 animate-slide-up stagger-2" style={{ fontFamily: "'Oswald', sans-serif" }}>
              ВЫВЕДЕМ ВАШ<br />
              <span className="text-[#FF6A00]">САЙТ В ТОП</span><br />
              ГАРАНТИРОВАННО
            </h1>

            <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-10 animate-slide-up stagger-3">
              Реальные результаты, прозрачная аналитика и рост органического трафика уже через 90 дней работы.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up stagger-4">
              <button className="bg-[#FF6A00] text-black font-bold px-8 py-4 rounded text-base hover:bg-[#FF8C38] transition-all hover:shadow-[0_0_30px_rgba(255,106,0,0.5)] hover:scale-105">
                Бесплатный аудит сайта
              </button>
              <button className="border border-white/20 text-white px-8 py-4 rounded text-base hover:border-[#FF6A00] hover:text-[#FF6A00] transition-all">
                Смотреть кейсы →
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-[#0D0D0D]/80 backdrop-blur">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold text-[#FF6A00]" style={{ fontFamily: "'Oswald', sans-serif" }}>{s.value}</div>
                <div className="text-white/50 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="Услуги" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-14 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-10 bg-[#FF6A00]" />
            <span className="text-[#FF6A00] text-sm font-semibold tracking-widest uppercase">Что мы делаем</span>
            <div className="h-px w-10 bg-[#FF6A00]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Oswald', sans-serif" }}>НАШИ УСЛУГИ</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service) => (
            <div key={service.id} className="group p-6 rounded bg-white/[0.03] border border-white/10 hover:border-[#FF6A00]/50 transition-all duration-300 hover:bg-white/[0.06] cursor-default">
              <div className="w-12 h-12 rounded bg-[#FF6A00]/10 border border-[#FF6A00]/30 flex items-center justify-center mb-4 group-hover:bg-[#FF6A00]/20 transition-colors">
                <Icon name={service.icon} size={20} className="text-[#FF6A00]" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: "'Oswald', sans-serif" }}>{service.label}</h3>
              <div className="text-white/50 text-sm">от {service.base.toLocaleString("ru-RU")} ₽/мес</div>
              <div className="mt-4 h-px w-0 group-hover:w-full bg-[#FF6A00] transition-all duration-500" />
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="Как работаем" className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-14 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-10 bg-[#FF6A00]" />
              <span className="text-[#FF6A00] text-sm font-semibold tracking-widest uppercase">Процесс</span>
              <div className="h-px w-10 bg-[#FF6A00]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Oswald', sans-serif" }}>КАК МЫ РАБОТАЕМ</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW.map((step, i) => (
              <div key={i} className="relative p-6 rounded bg-[#0D0D0D] border border-white/10 hover:border-[#FF6A00]/40 transition-all duration-300">
                <div className="text-6xl font-bold text-[#FF6A00]/10 absolute top-4 right-4 leading-none select-none" style={{ fontFamily: "'Oswald', sans-serif" }}>
                  {step.num}
                </div>
                <div className="text-[#FF6A00] font-bold text-sm mb-3 tracking-wider">{step.num}</div>
                <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="Калькулятор" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-14 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-10 bg-[#FF6A00]" />
            <span className="text-[#FF6A00] text-sm font-semibold tracking-widest uppercase">Стоимость</span>
            <div className="h-px w-10 bg-[#FF6A00]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Oswald', sans-serif" }}>КАЛЬКУЛЯТОР SEO</h2>
          <p className="text-white/50 mt-3 max-w-xl mx-auto">Рассчитайте примерную стоимость продвижения вашего сайта онлайн</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">

            {/* Услуги */}
            <div className="p-6 rounded bg-white/[0.03] border border-white/10">
              <h3 className="font-semibold mb-4 text-white/80 flex items-center gap-2">
                <Icon name="Package" size={16} className="text-[#FF6A00]" />
                Выберите услуги
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICES.map((s) => {
                  const active = selectedServices.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => toggleService(s.id)}
                      className={`flex items-center gap-3 p-3 rounded border text-left transition-all duration-200 ${
                        active ? "bg-[#FF6A00]/10 border-[#FF6A00] text-white" : "bg-transparent border-white/10 text-white/60 hover:border-white/30"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${active ? "bg-[#FF6A00]" : "bg-white/5"}`}>
                        <Icon name={s.icon} size={14} className={active ? "text-black" : "text-white/40"} />
                      </div>
                      <span className="text-sm font-medium">{s.label}</span>
                      {active && <Icon name="Check" size={14} className="text-[#FF6A00] ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Регион */}
            <div className="p-6 rounded bg-white/[0.03] border border-white/10">
              <h3 className="font-semibold mb-4 text-white/80 flex items-center gap-2">
                <Icon name="Globe" size={16} className="text-[#FF6A00]" />
                География продвижения
              </h3>
              <div className="flex gap-3">
                {REGIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRegion(r.id)}
                    className={`flex-1 py-3 px-4 rounded border text-sm font-medium transition-all ${
                      region === r.id ? "bg-[#FF6A00] border-[#FF6A00] text-black" : "bg-transparent border-white/10 text-white/60 hover:border-white/30"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Срок */}
            <div className="p-6 rounded bg-white/[0.03] border border-white/10">
              <h3 className="font-semibold mb-4 text-white/80 flex items-center gap-2">
                <Icon name="Calendar" size={16} className="text-[#FF6A00]" />
                Срок продвижения
              </h3>
              <div className="flex gap-3">
                {PERIODS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPeriod(p.id)}
                    className={`flex-1 py-3 px-3 rounded border text-sm font-medium transition-all text-center ${
                      period === p.id ? "bg-[#FF6A00] border-[#FF6A00] text-black" : "bg-transparent border-white/10 text-white/60 hover:border-white/30"
                    }`}
                  >
                    {p.label}
                    {p.disc > 0 && (
                      <span className={`block text-xs mt-0.5 ${period === p.id ? "text-black/70" : "text-[#FF6A00]"}`}>
                        -{p.disc * 100}%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Слайдеры */}
            <div className="p-6 rounded bg-white/[0.03] border border-white/10 space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-white/80 flex items-center gap-2">
                    <Icon name="LayoutGrid" size={14} className="text-[#FF6A00]" />
                    Количество страниц
                  </span>
                  <span className="text-[#FF6A00] font-bold">{pages} стр.</span>
                </div>
                <input
                  type="range" min={10} max={500} value={pages}
                  onChange={(e) => setPages(Number(e.target.value))}
                  className="slider-orange"
                  style={{ ["--val" as string]: `${((pages - 10) / 490) * 100}%` }}
                />
                <div className="flex justify-between text-xs text-white/30 mt-1">
                  <span>10</span><span>500</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-white/80 flex items-center gap-2">
                    <Icon name="Zap" size={14} className="text-[#FF6A00]" />
                    Конкурентность ниши
                  </span>
                  <span className="text-[#FF6A00] font-bold">
                    {competition < 33 ? "Низкая" : competition < 66 ? "Средняя" : "Высокая"}
                  </span>
                </div>
                <input
                  type="range" min={0} max={100} value={competition}
                  onChange={(e) => setCompetition(Number(e.target.value))}
                  className="slider-orange"
                  style={{ ["--val" as string]: `${competition}%` }}
                />
                <div className="flex justify-between text-xs text-white/30 mt-1">
                  <span>Низкая</span><span>Высокая</span>
                </div>
              </div>
            </div>
          </div>

          {/* Итог */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded bg-white/[0.04] border border-[#FF6A00]/30 shadow-[0_0_40px_rgba(255,106,0,0.08)]">
              <div className="text-[#FF6A00] text-sm font-semibold uppercase tracking-widest mb-6">Расчёт стоимости</div>

              {selectedServices.length === 0 ? (
                <div className="text-white/30 text-sm py-8 text-center">Выберите хотя бы одну услугу</div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {selectedServices.map((id) => {
                      const s = SERVICES.find((sv) => sv.id === id)!;
                      return (
                        <div key={id} className="flex justify-between text-sm">
                          <span className="text-white/60">{s.label}</span>
                          <span className="text-white">от {s.base.toLocaleString("ru-RU")} ₽</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="border-t border-white/10 pt-4 mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/50">В месяц</span>
                      <span className="text-white font-semibold">{formatPrice(monthly)}</span>
                    </div>
                    {disc > 0 && (
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/50">Скидка за период</span>
                        <span className="text-green-400 font-semibold">-{disc * 100}%</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-white/50">Срок</span>
                      <span className="text-white">{period} мес.</span>
                    </div>
                  </div>

                  <div className="bg-[#FF6A00]/10 rounded p-4 border border-[#FF6A00]/20 mb-5">
                    <div className="text-white/60 text-xs uppercase tracking-wider mb-1">Итого за весь период</div>
                    <div className="text-3xl font-bold text-[#FF6A00]" style={{ fontFamily: "'Oswald', sans-serif" }}>
                      {formatPrice(total)}
                    </div>
                  </div>
                </>
              )}

              <button className="w-full bg-[#FF6A00] text-black font-bold py-4 rounded hover:bg-[#FF8C38] transition-all hover:shadow-[0_0_25px_rgba(255,106,0,0.4)] text-sm">
                Получить точный расчёт
              </button>
              <p className="text-white/30 text-xs text-center mt-3">Итоговая цена зависит от конкретного проекта</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#FF6A00] relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-black mb-5" style={{ fontFamily: "'Oswald', sans-serif" }}>
            ГОТОВЫ ВЫЙТИ В ТОП?
          </h2>
          <p className="text-black/70 text-lg mb-8 max-w-xl mx-auto">
            Получите бесплатный аудит сайта и персональную стратегию продвижения за 24 часа
          </p>
          <button className="bg-black text-white font-bold px-10 py-5 rounded text-base hover:bg-[#1a1a1a] transition-all hover:scale-105">
            Начать бесплатно →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-white/5 max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-4 items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#FF6A00] rounded flex items-center justify-center">
            <Icon name="TrendingUp" size={12} className="text-black" />
          </div>
          <span className="font-bold text-sm tracking-wide" style={{ fontFamily: "'Oswald', sans-serif" }}>
            APEX<span className="text-[#FF6A00]">SEO</span>
          </span>
        </div>
        <div className="text-white/30 text-sm">© 2024 ApexSEO. Все права защищены.</div>
        <div className="flex gap-5 text-sm text-white/40">
          <a href="#" className="hover:text-[#FF6A00] transition-colors">Политика конфиденциальности</a>
          <a href="#" className="hover:text-[#FF6A00] transition-colors">Контакты</a>
        </div>
      </footer>
    </div>
  );
}