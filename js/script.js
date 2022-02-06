"use strict";

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: true,
  service1: "",
  service2: "",
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "КаЛьКулятор вёрстки");
    appData.screens = prompt(
      "Какие типы экранов нужно разработать?",
      "Простые, Сложные, Интерактивные"
    );

    do {
      appData.screenPrice = prompt("Сколько будет стоить данная работа?");
    } while (!isNumber(appData.screenPrice));

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что-то пошло не так";
    }
  },

  getAllServicePrices: function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      let price = 0;

      if (i === 0) {
        appData.service1 = prompt(
          "Какой дополнительный тип услуги нужен?",
          "Административная панель"
        );
      } else if (i === 1) {
        appData.service2 = prompt(
          "Какой дополнительный тип услуги нужен?",
          "Слайдер"
        );
      }

      do {
        price = prompt("Сколько это будет стоить?", 1000);
      } while (!isNumber(price));

      sum += +price;
    }

    return sum;
  },

  getFullPrice: function () {
    return +appData.screenPrice + appData.allServicePrices;
  },

  getTitle() {
    return (
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substr(1).toLowerCase()
    );
  },

  getServicePercentPrices: function () {
    return appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },

  start: function () {
    appData.asking();
    appData.allServicePrices = appData.getAllServicePrices();
    appData.fullPrice = appData.getFullPrice();
    appData.servicePercentPrice = appData.getServicePercentPrices();
    appData.title = appData.getTitle();
  },

  logger: function () {
    for (let key in appData) {
      console.log(key + ": " + appData[key]);
      // console.log("Проект: " + appData.getTitle(appData.title));
      // console.log("Типы кранов: " + appData.screens[key]);
      // console.log(
      //   "Стоимость разработки сайта: " + appData.fullPrice + " рублей"
      // );
      // console.log("Дополнительный тип услуги: " + appData.service1);
      // console.log("Дополнительный тип услуги: " + appData.service2);
      // console.log(
      //   "Итоговая стоимость за вычетом процента отката: " +
      //     appData.servicePercentPrice +
      //     " рублей"
      // );
    }
  },
};
appData.start();
appData.logger();

// const isNumber = function (num) {
//   return !isNaN(parseFloat(num)) && isFinite(num);
// };

// const asking = function () {
//   title = prompt("Как называется ваш проект?", "КаЛьКулятор вёрстки");
//   screens = prompt(
//     "Какие типы экранов нужно разработать?",
//     "Простые, Сложные, Интерактивные"
//   );

//   do {
//     screenPrice = prompt("Сколько будет стоить данная работа?");
//   } while (!isNumber(screenPrice));

//   adaptive = confirm("Нужен ли адаптив на сайте?");
// };

// const getRollbackMessage = function (price) {
//   if (price >= 30000) {
//     return "Даем скидку в 10%";
//   } else if (price >= 15000 && price < 30000) {
//     return "Даем скидку в 5%";
//   } else if (price >= 0 && price < 15000) {
//     return "Скидка не предусмотрена";
//   } else {
//     return "Что-то пошло не так";
//   }
// };

// Объявить функцию getAllServicePrices.
// Функция возвращает сумму всех дополнительных услуг.
// Результат сохраняем в переменную allServicePrices. Тип - function expression
// const getAllServicePrices = function () {
//   let sum = 0;

//   for (let i = 0; i < 2; i++) {
//     let price = 0;

//     if (i === 0) {
//       appData.service1 = prompt(
//         "Какой дополнительный тип услуги нужен?",
//         "Административная панель"
//       );
//     } else if (i === 1) {
//       appData.service2 = prompt(
//         "Какой дополнительный тип услуги нужен?",
//         "Слайдер"
//       );
//     }

//     do {
//       price = prompt("Сколько это будет стоить?", 1000);
//     } while (!isNumber(price));

//     sum += +price;
//   }

//   return sum;
// };

// Объявить функцию getFullPrice.
// Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг (screenPrice + allServicePrices).
// Результат сохраняем в переменную fullPrice. Тип - function declaration
// const getFullPrice = function () {
//   return +appData.screenPrice + appData.allServicePrices;
// };

// Объявить функцию getTitle.
// Функция возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой.
// Учесть вариант что строка может начинаться с пустых символов. " КаЛьКулятор Верстки"
// function getTitle() {
//   return (
//     appData.title.trim()[0].toUpperCase() +
//     appData.title.trim().substr(1).toLowerCase()
//   );
// }

// const getServicePercentPrices = function () {
//   return appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
// };

// appData.asking();
// appData.allServicePrices = appData.getAllServicePrices();
// appData.fullPrice = appData.getFullPrice();
// appData.servicePercentPrice = appData.getServicePercentPrices();
// appData.title = appData.getTitle();

// console.log("Стоимость разработки сайта: " + appData.fullPrice + " рублей");
// console.log(
//   "Итоговая стоимость за вычетом процента отката: " +
//     appData.servicePercentPrice +
//     " рублей"
// );

// - вызовы функции showTypeOf
// showTypeOf(title);
// showTypeOf(screenPrice);
// showTypeOf(adaptive);

// console.log("allServicePrices", allServicePrices);

// console.log(typeof title);
// console.log(typeof screenPrice);
// console.log(typeof adaptive);

// console.log("Проект: " + getTitle(title));

// - вывод строки с типами экранов для разработки screens
// console.log("Типы кранов: " + screens);

// console.log("Стоимость вёрстки экранов: " + screenPrice + " рублей");

// - сообщение о скидке пользователю (вызовы функции getRollbackMessage)
// console.log(getRollbackMessage(fullPrice));

// console.log("Стоимость разработки сайта: " + fullPrice + " рублей");

// - стоимость за вычетом процента отката посреднику (вызовы функции getServicePercentPrices)
// console.log("Итоговая стоимость за вычетом процента отката: " + servicePercentPrice + " рублей");
