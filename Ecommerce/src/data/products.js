// src/data/products.js


const products = [
  {
    id: 1,
    name: 'LED Crystal Lamp',
    description: 'Beautiful RGB bedside lamp for gifts.',
    price: 1299,
    rating: 5,
    category: 'Lighting',
    image: 'https://source.unsplash.com/400x400/?gift,lamp',
    topSelling: true, 
  },
  {
    id: 2,
    name: 'Photo Frame',
    description: 'Custom photo frame – perfect for memories.',
    price: 899,
    rating: 4,
    category: 'Home Decor',
    image: 'https://source.unsplash.com/400x400/?gift,photo',
    
  },
  {
    id: 3,
    name: 'Gift Hamper',
    description: 'Complete surprise box with sweets & candles.',
    price: 1599,
    rating: 4,
    category: 'Gift Sets',
    image: 'https://source.unsplash.com/400x400/?gift,box',
  },
  {
    id: 4,
    name: 'Scented Candle',
    description: 'Soothing fragrance candle in a glass jar.',
    price: 499,
    rating: 4,
    category: 'Candles & Fragrance',
    image: 'https://source.unsplash.com/400x400/?gift,candle',
    topSelling: true, 
  },
  {
    id: 5,
    name: 'Custom Mug',
    description: 'Personalized photo mug, microwave safe.',
    price: 599,
    rating: 5,
    category: 'Personalized Items',
    image: 'https://source.unsplash.com/400x400/?gift,mug',
  },
  {
    id: 6,
    name: 'Fairy Lights',
    description: 'Decorative string lights for romantic evenings.',
    price: 399,
    rating: 3,
    category: 'Lighting',
    image: 'https://source.unsplash.com/400x400/?gift,light',
    topSelling: true, 
  },
  // Auto-generated sample products to reach 50+
  ...Array.from({ length: 44 }, (_, i) => {
    const id = i + 7;
    return {
      id,
      name: `Sample Product ${id}`,
      description: `This is the description of product ${id}. Great gift idea!`,
      price: 300 + (id * 10) % 1500,
      rating: Math.floor(Math.random() * 3) + 3,
      category: ['Lighting', 'Home Decor', 'Gift Sets', 'Candles & Fragrance', 'Personalized Items'][id % 5],
      image: `https://source.unsplash.com/400x400/?gift,product${id}`,
    };
  })
];

export default products;
