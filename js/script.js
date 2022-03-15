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
  rollback: 0,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},
  isChecked: true,

  init: function () {
    this.addTitle();

    startBtn.addEventListener("click", this.checkValue.bind(this));
    resetBtn.addEventListener("click", this.reset.bind(this));
    buttonPlus.addEventListener("click", this.addScreenBlock.bind(this));
    inputRange.addEventListener("input", this.addRollback.bind(this));
  },

  addRollback() {
    this.rollback = +inputRange.value;
    inputRangeValue.textContent = inputRange.value + "%";
    this.servicePercentPrice = Math.floor(this.fullPrice - this.fullPrice * (this.rollback / 100));
    this.showResult();
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
    });
    if (this.isChecked) {
      appData.start();
    } else {
      alert("Заполните поля!");
    }
  },

  disabledInput: function () {
    const select = document.querySelectorAll(".screen select");
    const input = document.querySelectorAll(".screen input[type=text]");

    startBtn.style.display = "none";
    resetBtn.style.display = "block";
    buttonPlus.disabled = true;

    select.forEach((item) => {
      item.setAttribute("disabled", true);
    });

    input.forEach((item) => {
      item.setAttribute("disabled", true);
    });
  },

  //Удаляем и очищаем поля select, input при нажатии на кнопку СБРОС
  reset: function () {
    startBtn.style.display = "block";
    resetBtn.style.display = "none";
    buttonPlus.disabled = false;
    const select = document.querySelectorAll(".screen select");
    const input = document.querySelectorAll(".screen input[type=text]");
    const total = document.querySelectorAll(".total-input");

    select.forEach((item) => {
      item.removeAttribute("disabled");
      item.selectedIndex = 0;
    });

    input.forEach((item) => {
      item.removeAttribute("disabled");
      item.value = "";
    });

    total.forEach((item) => {
      item.value = "";
    });

    document.querySelectorAll(".other-items input").forEach((item) => (item.checked = false));

    inputRange.value = 0;
    inputRangeValue.textContent = inputRange.value + "%";

    for (let i = 1; i < screens.length; i++) {
      screens[i].remove();
      console.log(screens);
    }

    screens[screens.length - 1].after(cloneScreen.cloneNode(true));
    screens = document.querySelectorAll(".screen");

    this.title = "";
    this.screens = [];
    this.screensCount = 0;
    this.screenPrice = 0;
    this.adaptive = true;
    this.rollback = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
    this.isChecked = true;
  },

  start: function () {
    this.addScreens();
    this.addServices();
    this.addPrices();
    this.showResult();
    this.disabledInput();
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
    appData.length = 0;
    this.screens.length = 0;
    // screens = document.querySelectorAll(".screen");
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
    // console.log(screens.length - 1);
  },

  addPrices: function () {
    for (let screen of this.screens) {
      this.screenPrice += +screen.price;
      this.screensCount += +screen.count;
    }

    for (let key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (let key in this.servicesPercent) {
      this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100);
    }

    // this.screens.forEach((item) => (this.screensCount += +item.count));

    this.fullPrice = +this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;
    // перенёс логику getServicePercentPrices
    this.servicePercentPrice = +this.fullPrice - this.fullPrice * (this.rollback / 100);
    totalCountRollback.value = this.servicePercentPrice;

    for (let screen of this.screens) {
      this.screenCount += +screen.count;
    }
  },
};

appData.init();
