"use strict"

console.log("=== Проверка на кредит ===");

let age = prompt("Введите ваш возраст:")
let money = prompt("Введите ваш доход (₽):")
let loose = prompt("Есть ли просроченные платежи? (да/нет):")

let ageNum = Number(age)
let moneyNum = Number(money)
let answer = loose === "да" ? true : false  // ПРИВЕСТИ К РЕГИСТРУ
console.log(`Ваш возраст: ${ageNum}, Ваш доход: ${moneyNum}, Просрочки: ${answer}`)

if (ageNum >= 21 && ageNum <= 65 && moneyNum > 50000 && answer === false) {
    alert("Кредит одобрен!")
    console.log("Кредит одобрен!")
}

else if (21 <= ageNum <= 65 && moneyNum < 50000 && answer === false) {
    alert("Причина отказа: Доход должен быть больше 50 000 ₽")
    console.log("Причина отказа: Доход должен быть больше 50 000 ₽")
}

else if (21 <= ageNum <= 65 && moneyNum > 50000 && answer === true) {
    alert("Причина отказа: Есть просроченные платежи")
    console.log("Причина отказа: Есть просроченные платежи")
}

else {
    alert("Причина отказа: Возраст должен быть от 21 до 65 лет")
    console.log("Причина отказа: Возраст должен быть от 21 до 65 лет")
}