// src/api/dummyData.js

export default {
  '/products': [
    {
      id: 'p1',
      name: 'Classic Cotton T-Shirt',
      price: 299,
      image: 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=T-Shirt',
      category: 'men'
    },
    {
      id: 'p2',
      name: 'Coffee Mug',
      price: 199,
      image: 'https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=Mug',
      category: 'home'
    },
    {
      id: 'p3',
      name: 'Denim Jacket',
      price: 1299,
      image: 'https://via.placeholder.com/300x300/95E1D3/FFFFFF?text=Jacket',
      category: 'men'
    },
    {
      id: 'p4',
      name: 'Running Shoes',
      price: 2499,
      image: 'https://via.placeholder.com/300x300/F38181/FFFFFF?text=Shoes',
      category: 'sports'
    },
    {
      id: 'p5',
      name: 'Backpack',
      price: 899,
      image: 'https://via.placeholder.com/300x300/AA96DA/FFFFFF?text=Backpack',
      category: 'accessories'
    },
    {
      id: 'p6',
      name: 'Watch',
      price: 3999,
      image: 'https://via.placeholder.com/300x300/FCBAD3/FFFFFF?text=Watch',
      category: 'accessories'
    }
  ],

  '/products/p1': {
    id: 'p1',
    name: 'Classic Cotton T-Shirt',
    price: 299,
    image: 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=T-Shirt',
    description: 'Premium soft cotton t-shirt. Perfect for everyday wear. Breathable and comfortable fabric.',
    stock: 10,
    category: 'men'
  },

  '/products/p2': {
    id: 'p2',
    name: 'Coffee Mug',
    price: 199,
    image: 'https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=Mug',
    description: 'Ceramic coffee mug with ergonomic handle. Holds 350ml. Microwave safe.',
    stock: 25,
    category: 'home'
  },

  '/products/p3': {
    id: 'p3',
    name: 'Denim Jacket',
    price: 1299,
    image: 'https://via.placeholder.com/300x300/95E1D3/FFFFFF?text=Jacket',
    description: 'Classic denim jacket with button closure. Multiple pockets. Durable and stylish.',
    stock: 8,
    category: 'men'
  },

  '/cart/u123': [
    {
      productId: 'p1',
      name: 'Classic Cotton T-Shirt',
      price: 299,
      qty: 1,
      image: 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=T-Shirt'
    }
  ],

  '/orders/u123': [
    {
      orderId: 'o1',
      total: 598,
      date: '2025-01-15',
      status: 'Delivered',
      items: [
        { name: 'Classic Cotton T-Shirt', qty: 2, price: 299 }
      ]
    },
    {
      orderId: 'o2',
      total: 1498,
      date: '2025-01-10',
      status: 'Shipped',
      items: [
        { name: 'Denim Jacket', qty: 1, price: 1299 },
        { name: 'Coffee Mug', qty: 1, price: 199 }
      ]
    }
  ]
};