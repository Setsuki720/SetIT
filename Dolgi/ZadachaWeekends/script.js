function getWeekends(format = 'long') {
  if (format === 'short') {
    return ['sat', 'sun'];
  }
  return ['saturday', 'sunday'];
}

console.log(getWeekends('long'));  
console.log(getWeekends('short')); 
