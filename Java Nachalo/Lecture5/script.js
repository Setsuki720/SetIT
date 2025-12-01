// function getUserEmail () {}
// function calculateTwoNumber () {}
// function showErrorMessage () {}


// function isPositiveNumber () {}

// Шаг 1
function isVip(purchase) {
    return purchase > 20;
}

console.log(isVip(21)); 
console.log(isVip(19)); 

// Шаг 2
function getDiscount(purchase, total) {

    if (!isVip(purchase)) {
        return 0;
    }
    
    if (total <= 1000) {
        return 0;
    }
    return total * 0.1;
}

console.log(getDiscount(21, 1500)); 
console.log(getDiscount(21, 900)); 
console.log(getDiscount(15, 1200));

// Шаг 3

function getTotalPrice(discount, total) {
    return total - discount;
}

const discount = getDiscount(21, 1500); 
const total = 1500; 

console.log(getTotalPrice(discount, total)); 

// Шаг 4

function formatPrice(name, price) {
    return name + ", стоимость заказа: " + price + " ₽";
}

console.log(formatPrice("John", 1350)); 

// Шаг 5

function getUserData() {
    let userName;
    let purchase;
}