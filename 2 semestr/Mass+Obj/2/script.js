

// //  1. 

// const orders = [
//   {
//     orderId: 1,
//     customerName: 'Алексей',
//     items: ['iPhone', 'Apple Watch'],
//     totalPrice: 1200
//   },
//   {
//     orderId: 2,
//     customerName: 'Ольга',
//     items: ['Samsung TV'],
//     totalPrice: 800
//   },
//   {
//     orderId: 3,
//     customerName: 'Дмитрий',
//     items: ['iPhone', 'MacBook'],
//     totalPrice: 2500
//   }
// ];

// console.log(orders.filter(item => item.items.includes('iPhone')))


// //  2.

// const participants = [
//   { name: 'Иван', age: 25, interests: ['JavaScript', 'Python'] },
//   { name: 'Мария', age: 17, interests: ['Drawing', 'JavaScript'] },
//   { name: 'Павел', age: 30, interests: ['Football', 'Java'] },
//   { name: 'Ольга', age: 22, interests: ['JavaScript', 'Music'] }
// ];


// //  3. 

// const products = [
//   { id: 101, name: 'Карандаш', quantityInStock: 150 },
//   { id: 102, name: 'Ручка', quantityInStock: 300 },
//   { id: 103, name: 'Ластик', quantityInStock: 75 }
// ];
// const sumTovar = products.reduce((acc, product) => {
//   return acc + product.quantityInStock;
// }, 0);

// console.log(`Общее количество: ${sumTovar}`); 


// //  4.



// const employees = [
//   { name: 'Светлана', department: 'HR', salary: 50000 },
//   { name: 'Алексей', department: 'IT', salary: 70000 },
//   { name: 'Ирина', department: 'HR', salary: 52000 }
// ];

//  function updateHR(employeesArray) {
    
//     employeesArray.forEach(employee => {
        
//         if (employee.department === 'HR') {
            
//             employee.salary =  Math.round(employee.salary * 1.1);
//         }
//     });
// }

// //  5.

// const users = [
//   { email: 'user1@example.com', roles: ['user', 'admin'] },
//   { email: 'user2@example.com', roles: ['user'] },
//   { email: 'admin@example.com', roles: ['admin', 'editor'] }
// ];

const admins = []

// users.forEach(user => {
//     if (user.roles.includes('admin')) {
//         admins.push(user.email);
//     }
// });

// console.log(admins); 


// //  6. 

// const orders = [
//   {
//     orderId: 1,
//     customerName: 'Алексей',
//     items: [
//       { productId: 101, quantity: 2 },
//       { productId: 102, quantity: 1 }
//     ]
//   },
//   {
//     orderId: 2,
//     customerName: 'Ольга',
//     items: [
//       { productId: 103, quantity: 4 }
//     ]
//   }
// ];

// const products = [
//   { id: 101, name: 'Карандаш' },
//   { id: 102, name: 'Ручка' },
//   { id: 103, name: 'Ластик' }
// ];

// //  7. 


// const reviews = [
//   { productId: 101, rating: 4 },
//   { productId: 102, rating: 5 },
//   { productId: 101, rating: 3 },
//   { productId: 103, rating: 4 },
//   { productId: 102, rating: 4 }
// ];

// //  8. 

// const articles = [
//   { title: 'Введение в JavaScript', content: 'Основы JS...' },
//   { title: 'CSS стили', content: 'Работа с каскадами' },
//   { title: 'Асинхронность в JavaScript', content: 'Обещания и async/await' }
// ];

// function filterByJavaScript(articles) {
//     return articles.filter(article => 
//         article.title.toLowerCase().includes('javascript') ||
//         article.content.toLowerCase().includes('javascript')
//     );
// }

// const filteredArticles = filterByJavaScript(articles);
// console.log(...filteredArticles);


// //  9.

// const applicants = [
//   { name: 'Марина', skills: ['JavaScript', 'React'], desiredPosition: 'Frontend' },
//   { name: 'Игорь', skills: ['Java', 'Spring'], desiredPosition: 'Backend' },
//   { name: 'Сергей', skills: ['Python', 'Django'], desiredPosition: 'Backend' }
// ];

// const javaSkills = []

// applicants.forEach(candidate => {
//     if (candidate.skills.includes('Java')) {
//         javaSkills.push(candidate);
//     }
// });

// console.log(...javaSkills);

// //  10. 

// const usersFeedback = [
//   { userId: 1, feedback: 'Отличный товар', usedProducts: ['Карандаш', 'Ластик'] },
//   { userId: 2, feedback: 'Очень понравился', usedProducts: ['Ручка', 'Карандаш'] },
// ]