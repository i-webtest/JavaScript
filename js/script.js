"use strict";

let title = prompt("Как называется ваш проект?");
let screens = prompt("Какие типы экранов нужно разработать?");
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
let rollback = 10;
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
let servicePercentPrice = fullPrice - (fullPrice * (rollback / 100));
let allServicePrices;

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getRollbackMessage = function(price) {
  if (price >= 30000) {
    return "Даем скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даем скидку в 5%";
  } else if (price >= 0 && price < 15000) {
    return "Скидка не предусмотрена";
  } else {
    return "Что-то пошло не так";
  }
};

// Объявить функцию getAllServicePrices. 
// Функция возвращает сумму всех дополнительных услуг. 
// Результат сохраняем в переменную allServicePrices. Тип - function expression
const getAllServicePrices = function () {
  allServicePrices = servicePrice1 + servicePrice2;
  return allServicePrices;
};
getAllServicePrices();

// Объявить функцию getFullPrice. 
// Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг (screenPrice + allServicePrices).
// Результат сохраняем в переменную fullPrice. Тип - function declaration
function getFullPrice() {
  fullPrice = screenPrice + allServicePrices;
  return fullPrice;
}
getFullPrice();

// Объявить функцию getTitle.
// Функция возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой.
// Учесть вариант что строка может начинаться с пустых символов. " КаЛьКулятор Верстки"
function getTitle(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
getTitle(title);

function getServicePercentPrices() {
  return servicePercentPrice;
}
getServicePercentPrices();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log(getTitle(title));
console.log(getRollbackMessage(fullPrice));

console.log(screens.length);
console.log(servicePercentPrice);
console.log(getServicePercentPrices());

