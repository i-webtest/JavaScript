"use strict";
// Спрашиваем у пользователя “Как называется ваш проект?” и результат сохраняем в переменную title
let title = prompt("Как называется ваш проект?", "");
console.log("Ваш проект называется: " + title);

// Спросить у пользователя “Какие типы экранов нужно разработать?” сохранить в переменную screens
let screens = prompt(
  "Какие типы экранов нужно разработать?",
  "Простые, Сложные, Интерактивные"
);
console.log("Нужно разработать " + screens + " типы экранов");

// Спросить у пользователя “Сколько будет стоить данная работа?” и сохранить в переменную screenPrice
let screenPrice = prompt("Сколько будет стоить данная работа?", 12000);
console.log("Данная работа будет стоить: " + screenPrice + " рублей");

// Спросить у пользователя “Нужен ли адаптив на сайте?” и сохранить данные в переменной adaptive
let adaptive = confirm("Нужен ли адаптив на сайте?");
console.log(adaptive);


// Спросить у пользователя по 2 раза каждый вопрос и записать ответы в разные переменные
// 1. “Какой дополнительный тип услуги нужен?”
// 2. “Сколько это будет стоить?”
let service1 = prompt("Какой дополнительный тип услуги нужен?");
console.log("Дополнительная услуга: " + service1);

let servicePrice1 = prompt("Сколько это будет стоить?");
console.log("Стоимость: " + servicePrice1);

let service2 = prompt("Какой дополнительный тип услуги нужен?");
console.log("Дополнительная услуга: " + service2);

let servicePrice2 = prompt("Сколько это будет стоить?");
console.log("Стоимость: " + servicePrice2);

// Вычислить итоговую стоимость работы учитывая стоимость верстки экранов и дополнительных услуг и результат занести в
//переменную fullPrice
let fullPrice =
  Number(screenPrice) + Number(servicePrice1) + Number(servicePrice2);
alert("Итоговая стоимость: " + fullPrice);
console.log("Итоговая стоимость: " + fullPrice);

// Объявить переменную servicePercentPrice и занести в нее итоговую стоимость за вычетом отката посреднику, округлив
//результат в большую сторону. Вывести servicePercentPrice в консоль.
let rollback = 10;
let servicePercentPrice = fullPrice * (rollback / 100);
console.log("Откат посреднику: " + Math.ceil(servicePercentPrice));

// Написать конструкцию условий
if (fullPrice >= 30000) {
  console.log("Даем скидку в 10%");
} else if (15000 <= fullPrice && fullPrice < 30000) {
  console.log("Даем скидку в 5%");
} else if (15000 > fullPrice && fullPrice >= 0) {
  console.log("Скидка не предусмотрена");
} else {
  console.log("Что-то пошло не так");
}
