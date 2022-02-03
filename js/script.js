"use strict";

let title = prompt("Как называется ваш проект?", "КаЛьКулятор"),
screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные"),
screenPrice = +prompt("Сколько будет стоить данная работа?", 10000),
adaptive = confirm("Нужен ли адаптив на сайте?"),
service1 = prompt("Какой дополнительный тип услуги нужен?", "Административная панель"),
servicePrice1 = +prompt("Сколько это будет стоить?", 1000),
service2 = prompt("Какой дополнительный тип услуги нужен?", "Слайдер"),
servicePrice2 = +prompt("Сколько это будет стоить?", 1000),
rollback = 10,
fullPrice = screenPrice + servicePrice1 + servicePrice2,
servicePercentPrice = fullPrice - (fullPrice * (rollback / 100)),
allServicePrices;

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
// getAllServicePrices();

// Объявить функцию getFullPrice. 
// Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг (screenPrice + allServicePrices).
// Результат сохраняем в переменную fullPrice. Тип - function declaration
function getFullPrice() {
  fullPrice = screenPrice + allServicePrices;
  return fullPrice;
}
// getFullPrice();

// Объявить функцию getTitle.
// Функция возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой.
// Учесть вариант что строка может начинаться с пустых символов. " КаЛьКулятор Верстки"
function getTitle() {
  return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  
}
// getTitle();

function getServicePercentPrices() {
  return servicePercentPrice;
}
// getServicePercentPrices();

// - вызовы функции showTypeOf
showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("Проект: " + getTitle(title));

// - вывод строки с типами экранов для разработки screens
console.log("Типы кранов: " + screens);

// - сообщение о скидке пользователю (вызовы функции getRollbackMessage)
console.log(getRollbackMessage(fullPrice));

// - стоимость за вычетом процента отката посреднику (вызовы функции getServicePercentPrices)
console.log("Итоговая стоимость за вычетом процента отката: " + servicePercentPrice);

