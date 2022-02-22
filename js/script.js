"use strict";

let screens = document.querySelectorAll(".screen");
const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

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
const cloneScreen = screens[0].cloneNode(true);

// Повесить на input[type=range] (в блоке с классом .rollback) обработчик события

// totalCount.textContent = screensCount.value;

const appData = {
  title: "",
  screens: [],
  screensCount: 0,
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  isChecked: true,

  init: function () {
    appData.addTitle();

    startBtn.addEventListener("click", appData.checkValue);
    buttonPlus.addEventListener("click", appData.addScreenBlock);
    inputRange.addEventListener("input", appData.addRollback);
  },

  addRollback() {
    inputRangeValue.textContent = inputRange.value + "%";
    appData.rollback = +inputRange.value;
    appData.getServicePercentPrices();
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  checkValue() {
    appData.isChecked = true;

    screens.forEach(function (screen) {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");

      if (!input.value || !select.value) {
        appData.isChecked = false;
      }
    });

    if (appData.isChecked) {
      appData.start();
    } else {
      alert("Заполните поля!");
    }
  },

  start: function () {
    appData.addScreens();
    appData.addServices();
    appData.addPrices();
    appData.showResult();
  },
  // isNumber: function (num) {
  //   return !isNaN(parseFloat(num)) && isFinite(num);
  // },
  isString: function (string) {
    return isNaN(string);
  },
  showResult: function () {
    total.value = appData.screenPrice;
    totalCountOther.value =
      appData.servicePricesPercent + appData.servicePricesNumber;
    fullTotalCount.value = appData.fullPrice;
    totalCount.value = appData.screensCount;
    totalCountRollback.value = appData.servicePercentPrice;
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
        //Добавить свойство count в которое занести количество экранов из input
        count: +input.value,
      });
    });
    console.log(appData.screens);
  },
  addServices: function () {
    otherItemsPercent.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach(function (item) {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        appData.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    screens[screens.length - 1].after(cloneScreen.cloneNode(true));
    screens = document.querySelectorAll(".screen");
  },

  addPrices: function () {
    for (const screen of appData.screens) {
      appData.screenPrice += +screen.price;
      appData.screensCount += +screen.count;
    }

    for (let key in appData.servicesNumber) {
      appData.servicePricesNumber += appData.servicesNumber[key];
    }

    for (let key in appData.servicesPercent) {
      appData.servicePricesPercent +=
        appData.screenPrice * (appData.servicesPercent[key] / 100);
    }

    appData.fullPrice =
      +appData.screenPrice +
      appData.servicePricesNumber +
      appData.servicePricesPercent;
    // перенёс логику getServicePercentPrices
    appData.servicePercentPrice =
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100);
  },
  getServicePercentPrices: function () {
    appData.servicePercentPrice = Math.floor(
      appData.fullPrice - appData.fullPrice * (appData.rollback / 100)
    );
    totalCountRollback.value = appData.servicePercentPrice;
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
};

appData.init();
