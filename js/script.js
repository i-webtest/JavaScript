let title = "Javascript";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 450;
let rollback = 10;
let fullPrice = 30000;
let adaptive = true;

console.log("Тип данных значения переменной title: " + typeof title);
console.log("Тип данных значения переменной fullPrice: " + typeof fullPrice);
console.log("Тип данных значения переменной adaptive: " + typeof adaptive);
console.log("Длинна строки переменной screens: " + screens.length);
console.log("Стоимость верстки экранов " + screenPrice + " рублей");
console.log("Стоимость разработки сайта " + fullPrice + " рублей");
console.log(screens.toLowerCase().split(", "));
console.log(
  "Процент отката посреднику за работу: " + fullPrice * (rollback / 100)
);
