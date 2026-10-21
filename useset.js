use('SmallDayDataset');
db.products.insertMany([
  {
    name: "UltraWide Gaming Monitor",
    price: 34999,
    category: "Computers",
    stock: 25,
    ratings: 4.7,
    tags: ["monitor", "gaming", "display", "4k"],
    createdAt: new Date()
  },
  {
    name: "Noise Cancelling Headphones",
    price: 14999,
    category: "Audio",
    stock: 60,
    ratings: 4.6,
    tags: ["headphones", "wireless", "audio", "blutooth"],
    createdAt: new Date()
  },
  {
    name: "Ergonomic Office Chair",
    price: 18500,
    category: "Furniture",
    stock: 15,
    ratings: 4.3,
    tags: ["chair", "office", "ergonomic"],
    createdAt: new Date()
  },
  {
    name: "Smart Fitness Watch",
    price: 5499,
    category: "Electronics",
    stock: 200,
    ratings: 4.2,
    tags: ["wearable", "fitness", "smartwatch", "wireless"],
    createdAt: new Date()
  },
  {
    name: "Mechanical Numpad",
    price: 1299,
    category: "Electronics",
    stock: 45,
    ratings: 4.4,
    tags: ["keyboard", "accessory", "mechanical"],
    createdAt: new Date()
  },
  {
    name: "1TB Portable SSD",
    price: 8999,
    category: "Computers",
    stock: 110,
    ratings: 4.9,
    tags: ["storage", "ssd", "accessory"],
    createdAt: new Date()
  }
]);