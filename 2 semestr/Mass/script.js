//Множества Set - это структура данных, которая хранит уникальные значения

//Узнать уникальных посетителей сайта 
//Управление разрешенями доступа 
//Удаление дубликатов из списка данных 

//Создание пустого множества 
// const mySet = new Set(); 
const mySet = new Set([1,2,3,4,4,4,4,5]);
console.log(mySet); //{1, 2, 3, 4, 5}

// console.log(mySet[0])//  НЕ РАБОТАЕТ!

//add - добавить элемент в множество 
mySet.add(6); //добавилось
mySet.add(2); //Не добавилось
console.log(mySet);

//delete - удаление элемента множества 
mySet.delete(2);
console.log(mySet);
mySet.delete(100);
console.log(mySet);


//has проверяет наличие элемента в множестве, true/false 

console.log(mySet.has(4)); //true
console.log(mySet.has(1000));  //false

//Свойство множества - size 
console.log(mySet.size); //5

//Перебор элементов множества 

for (let item of mySet){
  console.log(item);
}


mySet.forEach((item)=>{  console.log(item)})


//Как сделать из множества массив 
//Пример 1. Убрать из массива повторяющиеся элементы 
//и получить массив с уникальными элементами 

const order = ['бургер', 'картошка', 'кола', 'картошка', 'пирожок', 'бургер'];

function uniqueItem(arr){
  //создаем множество
  const uniqueItemSet = new Set(arr); 
  return [...uniqueItemSet ] 
  
}

console.log(uniqueItem(order)); //['бургер', 'картошка', 'кола', 'пирожок']


//... спред выполняет деструктуризацию элемента

//   ...{1,2,3,4,5} =>  1,2,3,4,5
//    ...[1,4,5,3,2] => 1,4,5,3,2



//Пример 2. Проверка уникальности массива 

const array = [1,2,3,2,4,5,6,7];

function hasDoubles(arr){
    const set = new Set(arr);
    return set.size !== arr.length;
}

console.log(hasDoubles(array)); //true - повторения в массиве есть 


//Пример 3. Подсчет уникальных слов в строке 

const sentence = 'мороз и солнце день чудесный мороз';

function countUniqueWords(str){
     //из строки сделать массив 
  
    const words = str.split(" "); //['мороз', 'и', 'солнце', 'день', 'чудесный', 'мороз']
    console.log(words);
     //из массива сделать множество 
    const set = new Set(words);
    //вернуть размер множества
  return set.size;
}

console.log(countUniqueWords(sentence)); //5





//Пример 4. Объединение двух массивов без повторений 
//Даны два массива, нужно объединить их исключая дублирующиеся элементы

const array1 = [1,2,3,4];
const array2 = [3,4,5,6];

function mergeUnique(arr1, arr2){
  
   const merge = [...arr1, ...arr2];
   const set = new Set(merge)
   return [...set];
}
console.log(mergeUnique(array1, array2)); // [1, 2, 3, 4, 5, 6]