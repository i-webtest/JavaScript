"use strict";

let title,
screens,
screenPrice,
adaptive,
service1,
service2,
rollback = 10,
allServicePrices,
fullPrice,
servicePercentPrice;

const isNumber = function (num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
};

const asking = function() {
  title = prompt("Как называется ваш проект?", "КаЛьКулятор"),
  screens = prompt("Какие типы экранов нужно разработать?", "Простые, Сложные, Интерактивные");


  do {
    screenPrice = +prompt("Сколько будет стоить данная работа?");
  } while (!isNumber(screenPrice));
  
  // while(!isNumber(screenPrice)) {
  //   screenPrice = +prompt("Сколько будет стоить данная работа?");
  // }

  adaptive = confirm("Нужен ли адаптив на сайте?");
};

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
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    let price = 0;

    if (i === 0) {
      service1 = prompt("Какой дополнительный тип услуги нужен?", "Административная панель");
    } else if (i === 1) {
      service2 = prompt("Какой дополнительный тип услуги нужен?", "Слайдер");
    }

    // sum += +prompt("Сколько это будет стоить?", 1000);
    // let sum1 = 0;
    
    do {
      price = +prompt("Сколько это будет стоить?", 1000);
    } while (!isNumber(price));
    
    sum += price;
    
  }

  return sum;
};

// Объявить функцию getFullPrice. 
// Функция возвращает сумму стоимости верстки и стоимости дополнительных услуг (screenPrice + allServicePrices).
// Результат сохраняем в переменную fullPrice. Тип - function declaration
const getFullPrice = function() {
  return screenPrice + allServicePrices;
};

// Объявить функцию getTitle.
// Функция возвращает title меняя его таким образом: первый символ с большой буквы, остальные с маленькой.
// Учесть вариант что строка может начинаться с пустых символов. " КаЛьКулятор Верстки"
function getTitle() {
  // return title.charAt(0).toUpperCase() + title.slice(1).toLowerCase();
  return title.trim()[0].toUpperCase() + title.trim().substr(1).toLowerCase();
}

const getServicePercentPrices = function() {
  return fullPrice - (fullPrice * (rollback / 100));
};

asking();
// Переопределили значения переменным, т.е. назначили переменным результат выполнения определлённых функций
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

// - вызовы функции showTypeOf
showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices);

console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log("Проект: " + getTitle(title));

// - вывод строки с типами экранов для разработки screens
console.log("Типы кранов: " + screens);

console.log("Стоимость вёрстки экранов: " + screenPrice + " рублей");

// - сообщение о скидке пользователю (вызовы функции getRollbackMessage)
console.log(getRollbackMessage(fullPrice));

// - стоимость за вычетом процента отката посреднику (вызовы функции getServicePercentPrices)
console.log("Итоговая стоимость за вычетом процента отката: " + servicePercentPrice + " рублей");

