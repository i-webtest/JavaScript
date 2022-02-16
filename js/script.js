"use strict";

const title = document.getElementsByTagName("h1")[0];

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const buttonPlus = document.querySelector(".screen-btn");

const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback .range-value");

const total = document.getElementsByClassName("total-input");
const totalCount = document.getElementsByClassName("total-input");
const totalCountOther = document.getElementsByClassName("total-input");
const fullTotalCount = document.getElementsByClassName("total-input");
const totalCountRollback = document.getElementsByClassName("total-input");

let blocks = document.querySelectorAll(".screen");

console.log(title);
console.log(startBtn);
console.log(resetBtn);
console.log(buttonPlus);
console.log(otherItemsPercent[0]);
console.log(otherItemsPercent[1]);
console.log(otherItemNumber[0]);
console.log(otherItemNumber[1]);
console.log(otherItemNumber[2]);
console.log(otherItemNumber[3]);
console.log(otherItemNumber[4]);
console.log(inputRange);
console.log(inputRangeValue);
console.log(total[0]);
console.log(totalCount[1]);
console.log(totalCountOther[2]);
console.log(fullTotalCount[3]);
console.log(totalCountRollback[4]);
console.log(blocks[0]);

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
    // appData.asking();
    // appData.addPrices();
    // appData.getFullPrice();
    // appData.getServicePercentPrices();
    // appData.getTitle();
    // appData.logger();
  },
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },
  isString: function (string) {
    return isNaN(string);
  },
  asking: function () {
    // appData.title = prompt("Как называется ваш проект?", "КаЛьКулятор вёрстки");

    do {
      appData.title = prompt(
        "Как называется ваш проект?",
        "КаЛьКулятор вёрстки"
      );
    } while (!appData.isString(appData.title));

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
      let name = "";
      do {
        name = prompt(
          "Какой дополнительный тип услуги нужен?",
          "Административная панель"
        );
      } while (!appData.isString(name));

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
    console.log("Проект: " + appData.title);
    console.log("Типы экранов: ", appData.screens);
    console.log("Данная работа будет стоить: " + appData.fullPrice + " рублей");
    console.log("Дополнительные услуги: ", appData.services);
    console.log(
      "Итоговая стоимость: " + appData.servicePercentPrice + " рублей"
    );
  },
};

appData.start();
