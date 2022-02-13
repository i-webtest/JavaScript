"use strict";

const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items .percent");
const otherItemNumber = document.querySelectorAll(".other-items .number");

// const input = document.querySelector(".rollback").querySelector("input");
const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback .range-value");
// const span = document.querySelector(".rollback").querySelector(".range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

let screens = document.querySelectorAll(".screen");

// console.log(title[0]);
// console.log(button[0]);
// console.log(button[1]);
// console.log(buttonPlus);
// console.log(otherItemsPercent[0]);
// console.log(otherItemsPercent[1]);
// console.log(otherItemNumber[0]);
// console.log(otherItemNumber[1]);
// console.log(otherItemNumber[2]);
// console.log(otherItemNumber[3]);
// console.log(otherItemNumber[4]);
// console.log(input);
// console.log(span);
// console.log(totalInput[0]);
// console.log(totalInput[1]);
// console.log(totalInput[2]);
// console.log(totalInput[3]);
// console.log(totalInput[4]);
// console.log(blocks);

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
  init: function () {
    appData.addTitle();

    startBtn.addEventListener("click", appData.start);
    buttonPlus.addEventListener("click", appData.addScreenBlock);
  },
  addTitle: function () {
    document.title = title.textContent;
  },
  start: function () {
    appData.addScreens();
    // appData.asking();
    // appData.addPrices();
    // appData.getFullPrice();
    // appData.getServicePercentPrices();
    // appData.getTitle();
    // appData.logger();
  },
  // isNumber: function (num) {
  //   return !isNaN(parseFloat(num)) && isFinite(num);
  // },
  isString: function (string) {
    return isNaN(string);
  },
  addScreens: function () {
    screens = document.querySelectorAll(".screen");

    screens.forEach(function (screen, index) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      appData.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
      });
    });
    console.log(appData.screens);
  },
  addScreenBlock: function () {
    const cloneScreen = screens[0].cloneNode(true);
    screens[screens.length - 1].after(cloneScreen);
  },
  asking: function () {
    do {
      appData.title = prompt(
        "Как называется ваш проект?",
        "КаЛьКулятор вёрстки"
      );
    } while (!appData.isString(appData.title));

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

    // appData.adaptive = confirm("Нужен ли адаптив на сайте?");
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

appData.init();
