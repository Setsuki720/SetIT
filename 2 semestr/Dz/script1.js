//     1

let emails = ['a@example.com', 'b@example.com', 'a@example.com', 'c@example.com'];
function uniqueEmail(arr){
    let a = new Set(arr)
    return a
}
console.log(uniqueEmail(emails))
//      2

let = visitorIPs = ['192.168.0.1', '192.168.0.2', '192.168.0.1', '192.168.0.3'];
function uniqueVisitorsAmmount(arr){
    let a = new Set(arr)
    return a.size
}
console.log(uniqueVisitorsAmmount(visitorIPs))

//      3

let event1Participants = ['Иван', 'Мария', 'Петр'];
let event2Participants = ['Мария', 'Алексей', 'Иван'];
function allParticipants(arr1, arr2){
    let merged = arr1.concat(arr2)
    let mergedSet = new Set(merged)
    return mergedSet
}
console.log(allParticipants(event1Participants, event2Participants))

//     4

let storeAItems = ['молоко', 'хлеб', 'масло'];
let storeBItems = ['хлеб', 'масло', 'сыр'];

function DuplicateItems1(arr1, arr2) {
    const duplicates = [];
    
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]) {
                duplicates.push(arr1[i]);
                break;
            }
        }
    }
    
    return duplicates;
}
console.log(DuplicateItems1(storeAItems, storeBItems))

//    5


function getUniqueItems(arr1, arr2) {
    let a = arr1.filter(item => !arr2.includes(item))
    let b = arr2.filter(item => !arr1.includes(item))
    return new Set(a.concat(b))
}
console.log(getUniqueItems(storeAItems, storeBItems))

//   6

function getUniqueStoreItems(arr1, arr2) {
    let a = arr1.filter(item => !arr2.includes(item))
    return new Set(a)
}
console.log(getUniqueStoreItems(storeAItems, storeBItems))

//   7

const registeredUsers = ['Иван', 'Мария', 'Петр'];
const usernameToCheck = 'Алексей';
function registerCheck(arr, a){
        return arr.includes(a)
}
console.log(registerCheck(registeredUsers, usernameToCheck))

//   8

let hashtags = ['#жара', '#отдых', '#жара', '#лето', '#отдых'];
function uniqueHashtags(arr) {
    return arr.filter(item => 
        arr.indexOf(item) === arr.lastIndexOf(item)
    );
}
console.log(uniqueHashtags(hashtags))

//  9

let allOptions = ['VIP', 'Standard', 'Economy'];
let userOptions = ['VIP', 'Standard'];
function hasAllOptions(arr1, arr2){
    if (arr1.length === arr2.length){
        return true
    }
    else{
        return false
    }
}
console.log(hasAllOptions(allOptions, userOptions))

//  10

const stockItems = ['ноутбук', 'клава', 'мышь', 'монитор'];
const productToCheck = 'принтер';
function hveInStock(arr, a){
    return arr.includes(a)
}
console.log(hveInStock(stockItems, productToCheck))