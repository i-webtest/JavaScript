let title = "Javascript";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 450;
let rollback = 10;
let fullPrice = 30000;
let adaptive = true;

console.log(typeof title);
console.log(typeof fullPrice);
console.log(typeof adaptive);
console.log(screens.length);
console.log(
  "Стоимость верстки экранов " + screenPrice + " рублей/долларов/гривен/юани"
);
console.log(
  "Стоимость разработки сайта " + fullPrice + " рублей/долларов/гривен/юани"
);
console.log(screens.toLowerCase());
console.log(screens.split(", "));
console.log(fullPrice * (rollback / 100));
