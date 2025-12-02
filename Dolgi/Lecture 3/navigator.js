"use strict"
var time
console.log("Значение переменной", time)
let speed = Number(prompt("Введите скорость Км/ч"))
const distance = Number(prompt("Введите расстояние Км"))
console.log("Начало поездки")
console.log(`Оставшееся время в минутах: ${(distance/speed)*60}`)
console.log(`Скорость:  ${speed} км/ч`)
console.log(`Расстояние ${distance} км.`)