import React from "react";

// STYLES ------------------------------------------
import "./home.css";
// -------------------------------------------------

// COMPONENTS --------------------------------------
// -------------------------------------------------

type Props = {};

const Home: React.FC<Props> = (props) => {
  return (
    <div className="app-home">
      <h1>Калькулятор обьёмных тренировок</h1>
      <p>Бодибилдинг, как и любая другая силовая активность, это прежде всего работа с нагрузкой, и нагрузку эту важно правильно планировать и расчитывать.</p>

      <h2>Тренировочные дни</h2>
      <p>Каждая неделя включает в себя семь дней, любой из которых потенциально может быть тренировочным.</p>

      <h2>Тренировки</h2>
      <p>Тренировочный день включает одну или больше тренировок.</p>

      <h2>Упражнения</h2>
      <p>В тренировке может быть одно или больше упражнений.</p>

      <h2>Сеты (подходы)</h2>
      <p>Упражнение состоит из нескольких сетов (подходов)</p>

      <h2>Эпилог</h2>
      <p>Пока больше ничего не придумал написать.</p>
    </div>
  );
}

export { Home };