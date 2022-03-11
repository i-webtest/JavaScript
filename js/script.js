"use strict";

let screens = document.querySelectorAll(".screen");
const title = document.getElementsByTagName("h1")[0];
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback .range-value");

const startBtn = document.getElementsByClassName("handler_btn")[0];
const resetBtn = document.getElementsByClassName("handler_btn")[1];

const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const fullTotalCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

const cloneScreen = screens[0].cloneNode(true);

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
    this.addTitle();

    startBtn.addEventListener("click", this.checkValue);
    resetBtn.addEventListener("click", this.reset);
    buttonPlus.addEventListener("click", this.addScreenBlock);
    inputRange.addEventListener("input", this.addRollback);
  },

  addRollback() {
    inputRangeValue.textContent = inputRange.value + "%";
    this.rollback = +inputRange.value;
    // appData.getServicePercentPrices();

    console.log(inputRange);
  },

  addTitle: function () {
    document.title = title.textContent;
  },

  checkValue() {
    this.isChecked = true;

    screens.forEach((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");

      if (!input.value || !select.value) {
        this.isChecked = false;
      }

      //Блокировать все input[type=text] и select с левой стороны после нажатия кнопки Рассчитать
      if (this.isChecked) {
        appData.start();
        select.disabled = true;
        input.disabled = true;
        // inputRange.disabled = true;
        // otherItemsPercent.disabled = true;
        // otherItemsNumber.disabled = true;
        buttonPlus.disabled = true;
        startBtn.style.display = "none";
        resetBtn.style.display = "block";
      } else {
        alert("Заполните поля!");
      }
    });
  },

  //Удаляем и очищаем поля select, input при нажатии на кнопку СБРОС
  reset: function () {
    screens.forEach((screen, i) => {
      if (i === 0) {
        const select = document.querySelector("select");
        const input = document.querySelector("input[type=text]");

        select.disabled = false;
        select.selectedIndex = 0;
        input.disabled = false;
        input.value = "";
        buttonPlus.disabled = false;
        startBtn.style.display = "block";
        resetBtn.style.display = "none";
      } else {
        screen.remove();
      }

      //сброс откат посреднику
      inputRange.value = 0;
      inputRangeValue.textContent = inputRange.value + "%";
      //очистка полей ИТОГО
      total.value = 0;
      totalCount.value = 0;
      totalCountOther.value = 0;
      fullTotalCount.value = 0;
      totalCountRollback.value = 0;
      //очистка checkbox
      document.querySelectorAll(".other-items input").forEach((item) => (item.checked = false));
      //очистка объекта
      // this.appData = {};
    });
  },

  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.showResult();
    this.getServicePercentPrices();
  },

  isString: function (string) {
    return isNaN(string);
  },

  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber;
    fullTotalCount.value = this.fullPrice;
    totalCount.value = this.screensCount;
    totalCountRollback.value = this.servicePercentPrice;
  },

  addScreens: function () {
    screens = document.querySelectorAll(".screen");
    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
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
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector("input[type=checkbox]");
      const label = item.querySelector("label");
      const input = item.querySelector("input[type=text]");

      if (check.checked) {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    screens[screens.length - 1].after(cloneScreen.cloneNode(true));
    screens = document.querySelectorAll(".screen");
  },

  addPrices: function () {
    for (const screen of this.screens) {
      this.screenPrice += +screen.price;
      this.screensCount += +screen.count;
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
    // перенёс логику getServicePercentPrices
    this.servicePercentPrice = this.fullPrice - this.fullPrice * (this.rollback / 100);
  },

  getServicePercentPrices: function () {
    // this.servicePercentPrice = Math.floor(this.fullPrice - this.fullPrice * (this.rollback / 100));
    totalCountRollback.value = this.servicePercentPrice;
  },

  // getRollbackMessage: function (price) {
  //   if (price >= 30000) {
  //     return "Даем скидку в 10%";
  //   } else if (price >= 15000 && price < 30000) {
  //     return "Даем скидку в 5%";
  //   } else if (price >= 0 && price < 15000) {
  //     return "Скидка не предусмотрена";
  //   } else {
  //     return "Что-то пошло не так";
  //   }
  // },
};

appData.init();
