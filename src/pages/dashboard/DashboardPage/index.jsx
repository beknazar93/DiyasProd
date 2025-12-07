import React from "react";
import "./DashboardPage.scss";
import MainLayout from "../../../widgets/layout/MainLayout";
import { useAuthStore } from "../../../shared/store/useAuthStore";

const statsCards = [
  {
    id: "raw",
    title: "Сырьё на складе",
    value: "12 450 кг",
    note: "+2.5% за неделю",
  },
  {
    id: "production",
    title: "Производство сегодня",
    value: "847 ед.",
    note: "+12% от плана",
  },
  {
    id: "orders",
    title: "Активные заказы",
    value: "24",
    note: "8 в производстве",
  },
  {
    id: "alerts",
    title: "Требуют внимания",
    value: "3",
    note: "Низкий запас сырья",
  },
];

const recentOperations = [
  {
    id: 1,
    title: "ПВХ гранулы добавлены",
    description: "24 кг · Мария Работова",
    time: "5 мин назад",
  },
  {
    id: 2,
    title: "Полиэтилен списан",
    description: "15 кг · Иван Складов",
    time: "23 мин назад",
  },
  {
    id: 3,
    title: "Партия завершена",
    description: "Заказ #1247 · Цех 2",
    time: "1 час назад",
  },
  {
    id: 4,
    title: "Новый заказ",
    description: "Заказ #1248 · 500 ед.",
    time: "2 часа назад",
  },
];

const warnings = [
  {
    id: 1,
    title: "Низкий запас: ПВХ гранулы",
    description: "Осталось 150 кг (минимум 200 кг)",
  },
  {
    id: 2,
    title: "Низкий запас: Краситель синий",
    description: "Осталось 12 кг (минимум 20 кг)",
  },
  {
    id: 3,
    title: "Задержка заказа #1235",
    description: "Ожидает контроля качества 2 дня",
  },
];

const DashboardPage = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="dashboard-page">
      <div className="dashboard-page__header">
        <div>
          <h2 className="dashboard-page__title">Главная панель</h2>
          <p className="dashboard-page__subtitle">
            Обзор производства и складских операций
          </p>
        </div>

        {user && (
          <div className="dashboard-page__user">
            <span className="dashboard-page__user-label">Вы вошли как</span>
            <span className="dashboard-page__user-name">
              {user.username || user.email}
            </span>
          </div>
        )}
      </div>

      <div className="dashboard-page__stats">
        {statsCards.map((card) => (
          <div key={card.id} className="dashboard-page__stat-card">
            <div className="dashboard-page__stat-header">
              <span className="dashboard-page__stat-title">{card.title}</span>
              <span className="dashboard-page__stat-dot" />
            </div>
            <div className="dashboard-page__stat-value">{card.value}</div>
            <div className="dashboard-page__stat-note">{card.note}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-page__grid">
        <section className="dashboard-page__section">
          <div className="dashboard-page__section-header">
            <h3 className="dashboard-page__section-title">
              Последние операции
            </h3>
          </div>
          <div className="dashboard-page__list">
            {recentOperations.map((op, index) => (
              <div
                key={op.id}
                className={
                  "dashboard-page__list-row" +
                  (index !== recentOperations.length - 1
                    ? " dashboard-page__list-row--bordered"
                    : "")
                }
              >
                <div className="dashboard-page__list-main">
                  <p className="dashboard-page__list-title">{op.title}</p>
                  <p className="dashboard-page__list-desc">{op.description}</p>
                </div>
                <span className="dashboard-page__list-time">{op.time}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-page__section">
          <div className="dashboard-page__section-header">
            <h3 className="dashboard-page__section-title">Предупреждения</h3>
          </div>
          <div className="dashboard-page__warnings">
            {warnings.map((w) => (
              <div key={w.id} className="dashboard-page__warning-item">
                <div className="dashboard-page__warning-icon" />
                <div className="dashboard-page__warning-text">
                  <p className="dashboard-page__warning-title">{w.title}</p>
                  <p className="dashboard-page__warning-desc">
                    {w.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardPage;
