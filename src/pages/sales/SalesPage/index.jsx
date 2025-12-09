// src/pages/sales/SalesPage.jsx

import React, { useState, useEffect } from "react";
import MainLayout from "../../../widgets/layout/MainLayout.jsx";
import "./SalesPage.scss";

// Axios инстанциясын импорттоо
import { scladApi } from "../../../shared/api/scladApi.js";
import Button from "../../../shared/ui/Button/Button.jsx";

/**
 * Сатуулар бөлүмүнүн негизги баракчасы.
 * (Управление продажами со склада готовой продукции).
 */
const SalesPage = () => {
  const [stats, setStats] = useState([]);
  const [availableProducts, setAvailableProducts] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  // ----------------------------------------------------
  // API Чакыруулар (Axios колдонулат)
  // ----------------------------------------------------

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Статистиканы алуу: scladApi.get() - бул Axios чакыруусу
      const statsResponse = await scladApi.get("/sales/stats");

      // Маалыматтарды структуралоо
      const fetchedStats = [
        {
          title: "Всего продаж",
          value: statsResponse.data.totalSales || "0",
          icon: "🛒",
        },
        {
          title: "Продаж сегодня",
          value: statsResponse.data.salesToday || "0",
          icon: "📈",
        },
        {
          title: "Выручка сегодня",
          value: `${statsResponse.data.revenueToday || 0} ₽`,
          icon: "💲",
        },
        {
          title: "Общая выручка",
          value: `${statsResponse.data.totalRevenue || 0} ₽`,
          icon: "💰",
        },
      ];
      setStats(fetchedStats);

      // 2. Сатууга жеткиликтүү продукцияны алуу
      const productsResponse = await scladApi.get(
        "/finished-products/available"
      );
      setAvailableProducts(productsResponse.data);

      // 3. Сатуу тарыхын алуу
      const historyResponse = await scladApi.get("/sales/history");
      setSalesHistory(historyResponse.data);
    } catch (err) {
      // Axios каталарын иштетүү
      console.error("Ошибка загрузки данных продаж:", err.message);
      setError("Не удалось загрузить данные с сервера. Проверьте соединение.");

      // Кошумча: Серверден келген ката маалыматын көрсөтүү
      // if (err.response) {
      //     console.error('Серверден келген ката:', err.response.data);
      // }
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSale = () => {
    // "Оформить продажу" логикасы
    alert("Форма оформления продажи будет открыта.");
  };

  // ----------------------------------------------------
  // Рендеринг үчүн Сатуу Тарыхынын Таблица Компоненти
  // ----------------------------------------------------
  const SalesHistoryTable = ({ data }) => (
    <table className="salesHistoryTable">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Товар</th>
          <th>Количество</th>
          <th>Цена за ед.</th>
          <th>Сумма</th>
          <th>Покупатель</th>
          <th>Оплата</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{new Date(item.date).toLocaleDateString("ru-RU")}</td>
            <td>{item.productName}</td>
            <td>{item.quantity}</td>
            <td>{`${item.unitPrice} ₽`}</td>
            <td>{`${item.totalSum} ₽`}</td>
            <td>
              <div className="customerInfo">
                {item.customerName} <br />
                <span style={{ fontSize: "0.8em", color: "#666" }}>
                  {item.contactInfo}
                </span>
              </div>
            </td>
            <td>
              <span
                className={
                  item.paymentStatus === "Оплачено"
                    ? "paymentStatusPaid"
                    : "paymentStatusPending"
                }
              >
                {item.paymentStatus}
              </span>
              <div className="paymentMethod">{item.paymentMethod}</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="salesPage">
      {/* 1. Башкы аталыш жана баскыч */}
      <header className="header">
        <div className="titleContainer">
          <h1>Продажи готовой продукции</h1>
          <p>Управление продажами со склада готовой продукции</p>
        </div>
        <Button onClick={handleCreateSale} variant="primary-icon">
          + Оформить продажу
        </Button>
      </header>

      {/* 2. Статистикалык карточкалар */}
      <section className="statsGrid">
        {stats.map((stat, index) => (
          <div key={index} className="statCard">
            <div className="statInfo">
              <div className="statTitle">{stat.title}</div>
              <div className="statValue">{stat.value}</div>
            </div>
            <div
              className="statIcon"
              style={{
                backgroundColor: index % 2 === 0 ? "#E8F5FF" : "#E6F8E8",
              }}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </section>

      {/* 3. Сатууга жеткиликтүү продукция */}
      <section className="availableSection">
        <h2>Доступно для продажи</h2>
        <div className="productCards">
          {availableProducts.length > 0 ? (
            availableProducts.slice(0, 2).map((product, index) => (
              <div key={index} className="productCard">
                <h3>{product.name}</h3>
                <p>Цвет: {product.color}</p>
                {product.size && <p>Размер: {product.size}</p>}
                <p>В наличии: {product.stock} шт</p>
              </div>
            ))
          ) : (
            <p>Нет доступной продукции для продажи.</p>
          )}
        </div>
      </section>

      {/* 4. Сатуу тарыхы */}
      <section className="historySection">
        <h2>История продаж</h2>
        {salesHistory.length > 0 ? (
          <SalesHistoryTable data={salesHistory} />
        ) : (
          <p>Нет данных по истории продаж.</p>
        )}
      </section>
    </div>
  );
};

export default SalesPage;
