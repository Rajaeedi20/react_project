// src/data/seedProducts.js
import { v4 as uuidv4 } from "uuid";

const categories = ["Electronics","Clothing","Furniture","Toys","Sports","Beauty"];
const brands = ["Acme","Nova","Zenith","Orbit","Apex","Mira"];

function rand(min, max){ return Math.floor(Math.random() * (max - min + 1)) + min; }

export default function seedProducts(){
  const statuses = ["Available","Out of Stock","Coming Soon"];
  const colors = ["Red","Blue","Green","Black","White","Yellow"];
  const products = [];
  for (let i = 1; i <= 45; i++) {
    const brand = brands[i % brands.length];
    const name = `${brand} Product ${i}`;
    products.push({
      id: uuidv4(),
      name,
      price: parseFloat((Math.random() * 500 + 10).toFixed(2)),
      inStock: Math.random() > 0.2,
      category: categories[i % categories.length],
      brand,
      status: statuses[i % statuses.length],
      quantity: rand(1, 200),
      color: colors[i % colors.length],
      sku: `SKU-${10000 + i}`,
      rating: parseFloat((Math.random() * 5).toFixed(1)),
      imageUrl: "https://via.placeholder.com/480x320?text=" + encodeURIComponent(name)
    });
  }
  return products;
}
