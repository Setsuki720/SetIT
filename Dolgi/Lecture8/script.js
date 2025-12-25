function randomInteger(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number') {
    console.error('Аргументы должны быть числами');
    return null;
  }  
  if (isNaN(min) || isNaN(max) || !isFinite(min) || !isFinite(max)) {
    console.error('Аргументы должны быть корректными числами');
    return null;
  }
  if (!Number.isInteger(min) || !Number.isInteger(max)) {
    console.warn('Аргументы не являются целыми числами. Округляем до целых');
    min = Math.round(min);
    max = Math.round(max);
  }
  if (min > max) {
    console.warn('min больше max, значения будут поменяны местами');
    [min, max] = [max, min]; 
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(randomInteger(1, 5));   
console.log(randomInteger(7, 15));   
console.log(randomInteger(40, 42)); 