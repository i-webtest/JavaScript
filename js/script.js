"use strict";

// const isString = function (str) {
//   return isNaN(parseFloat(str)) || !isFinite(str);
// };

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},
  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrices();
    appData.getTitle();

    // appData.isString();

    appData.logger();
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  isString: function (str) {
    return !isNaN(parseFloat(str)) || isFinite(str);
  },
  asking: function () {
    appData.title = prompt("Как называется ваш проект?", "КаЛьКулятор вёрстки");
    // appData.screens = prompt(
    //   "Какие типы экранов нужно разработать?",
    //   "Простые, Сложные, Интерактивные"
    // );

    // do {
    //   appData.screenPrice = prompt("Сколько будет стоить данная работа?");
    // } while (!appData.isNumber(appData.screenPrice));

    for (let i = 0; i < 2; i++) {
      let name = "";
      let price = 0;

      do {
        name = prompt(
          "Какие типы экранов нужно разработать?",
          "Простые, Сложные, Интерактивные"
        );
      } while (!appData.isString(name));

      do {
        price = prompt("Сколько будет стоить данная работа?", 10000);
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name, price: price });
    }

    for (let i = 0; i < 2; i++) {
      let name = prompt(
        "Какой дополнительный тип услуги нужен?",
        "Административная панель"
      );
      let price = 0;

      do {
        price = prompt("Сколько это будет стоить?", 1000);
      } while (!appData.isNumber(price));

      appData.services[i + " " + name] = +price;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },
  addPrices: function () {
    for (let screen of appData.screens) {
      appData.screenPrice += +screen.price;
    }

    for (let key in appData.services) {
      appData.allServicePrices += appData.services[key];
    }
  },
  getFullPrice: function () {
    appData.fullPrice = +appData.screenPrice + appData.allServicePrices;
  },
  getServicePercentPrices: function () {
    appData.servicePercentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },
  getTitle() {
    appData.title =
      appData.title.trim()[0].toUpperCase() +
      appData.title.trim().substr(1).toLowerCase();
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
  logger: function () {
    // for (let key in appData) {
    //   console.log(key + ": " + appData[key]);
    // }
    console.log("Проект: " + typeof appData.title);
    console.log("Типы экранов: " + typeof appData.screens);
    console.log("Данная работа будет стоить: " + typeof appData.fullPrice);
    console.log("Дополнительные услуги: " + typeof appData.services);
    console.log("Итоговая стоимость: " + typeof appData.servicePercentPrice);
    // console.log(appData.title);
    // console.log(appData.screens);
    // console.log(typeof appData.fullPrice);
    // console.log(appData.services);
    // console.log(appData.servicePercentPrice);
  },
};

appData.start();
