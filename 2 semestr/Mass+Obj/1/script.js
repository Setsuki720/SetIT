const orders = [
  {
    orderId: 1,
    customerName: 'Алексей',
    items: ['iPhone', 'Apple Watch'],
    totalPrice: 1200
  },
  {
    orderId: 2,
    customerName: 'Ольга',
    items: ['Samsung TV'],
    totalPrice: 800
  },
  {
    orderId: 3,
    customerName: 'Дмитрий',
    items: ['iPhone', 'MacBook'],
    totalPrice: 2500
  }
];


const IPhone = orders.filter(order => order.items.includes('iPhone'));