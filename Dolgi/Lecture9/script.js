function pow(x, n) {
  if (typeof x !== 'number' || typeof n !== 'number') {
    console.error('Оба должны быть числами');
    return null;
  }
  if (isNaN(x) || isNaN(n) || !isFinite(x) || !isFinite(n)) {
    console.error('Аргументы должны быть корректными числами');
    return null;
  }
  if (n === 0) {
    return 1;
  }
  
  let result = 1;
  const absN = Math.abs(n); 
  
  for (let i = 0; i < absN; i++) {
    result *= x;
  }
  
  return n > 0 ? result : 1 / result;
}

let baseInput = prompt('Введите число (основание):');
let exponentInput = prompt('Введите степень:');

let base = parseFloat(baseInput);
let exponent = parseFloat(exponentInput);
    if (isNaN(base) || isNaN(exponent)) {
  console.error('Данные не являются числами');
} else {
  const result = pow(base, exponent);
  
  if (result !== null) {
    console.log(`${base} в степени ${exponent} = ${result}`);
    console.log(`Проверка (Math.pow): ${Math.pow(base, exponent)}`);
  }
}