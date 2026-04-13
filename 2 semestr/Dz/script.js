// const cost = [50, 30, 200, 150];
// const moreThanHundred = cost.some((element) => {return element > 100});
// console.log(moreThanHundred);


// const a = [22, 17, 30];
// const b = a.every((element) => {return element >= 18});
// console.log(b);


// const a = ["Света", "Илья", "Коля"];
// console.log(...a);



// const a = [100, 200, 300];
// const b = a.map((element) => {return Math.round(element * 1.1)})
// console.log(b)


// const a = [1, 4, 6, 9];
// const b = a.filter((element) => {return element % 2 === 0});
// console.log(b);


// const a = [25, 70, 15];
// const b = a.reduce((element, total) => (total + element))
// console.log(b)



// const a = ["яблоко", "банан", "огурец", "хурма"]
// function bass (arr){
//     let a1 = []
//     let a2 = []
//     for (let i = arr.length - 1; i >= 0; i--){
//         let element = arr[i]
//         let firstLetter = element.charAt(0)
//         if (["А", "О", "У", "Э", "Ы", "И", "Я", "Ё", "Е", "Ю"].includes(firstLetter)) {
//             a1.push(element)
//         } else {
//             a2.push(element)
//         }
//     }
//     return [a1, a2]
// }
// console.log(bass(a))



// const arr = ["Игорь", "Даша", "Павел"]
// console.log(...arr)



// const a = [5, 12, 8, 20, 3, 15];
// const b = a.filter((element) => {return element > 10})
// const ab = b.filter((element) => {return element % 2 === 0})
// const c = ab.reduce((element, total) => {return total + element})
// console.log(c)