const defaultNutrition = [
  { name: "Energy", value: "120 kcal" },
  { name: "Protein", value: "6.5 g" },
  { name: "Calcium", value: "240 mg" },
  { name: "Fat", value: "6 g" },
];

const defaultReviews = [
  {
    id: "review-1",
    name: "Priya Sharma",
    rating: 5,
    date: "2 days ago",
    title: "Fresh and delicious",
    comment: "Great quality and delivered fresh.",
  },
];

function createProduct(product) {
  return {
    badge: null,
    oldPrice: null,
    featured: false,
    bestSeller: false,
    newArrival: false,
    images: [product.image],
    nutrition: defaultNutrition,
    reviews: defaultReviews,
    reviewCount: defaultReviews.length,
    longDescription: product.description,
    ...product,
  };
}

export const products = [
  createProduct({
    id: 1,
    name: "Fresh A2 Cow Milk",
    categoryId: 1,
    category: "Milk",
    categorySlug: "milk",
    price: 65,
    rating: 4.8,
    unit: "1 L",
    image: "/milk.jpg",
    badge: "Daily Fresh",
    featured: true,
    bestSeller: true,
    description: "Farm-fresh pure A2 Desi cow milk delivered daily.",
    longDescription:
      "Fresh A2 Desi cow milk sourced with care and delivered to your doorstep for a wholesome start to every day.",
  }),

  createProduct({
    id: 2,
    name: "Fresh Natural Curd",
    categoryId: 2,
    category: "Curd",
    categorySlug: "curd",
    price: 60,
    rating: 4.7,
    unit: "500 g",
    image: "/milk.jpg",
    featured: true,
    bestSeller: true,
    description: "Thick, creamy and naturally set fresh curd.",
  }),

  createProduct({
    id: 3,
    name: "Fresh Malai Paneer",
    categoryId: 3,
    category: "Paneer",
    categorySlug: "paneer",
    price: 120,
    rating: 4.9,
    unit: "250 g",
    image: "/paneer.jpg",
    badge: "Popular",
    featured: true,
    bestSeller: true,
    description: "Soft and protein-rich malai paneer made from whole milk.",
  }),

  createProduct({
    id: 4,
    name: "Vedic Bilona Ghee",
    categoryId: 4,
    category: "Ghee",
    categorySlug: "ghee",
    price: 650,
    rating: 4.9,
    unit: "500 ml",
    image: "/ghee.jpg",
    badge: "Premium",
    featured: true,
    bestSeller: true,
    description: "Traditional Bilona ghee churned from cultured curd.",
  }),

  createProduct({
    id: 5,
    name: "Fresh Dairy Butter",
    categoryId: 5,
    category: "Butter",
    categorySlug: "butter",
    price: 110,
    rating: 4.7,
    unit: "200 g",
    image: "/milk.jpg",
    featured: true,
    bestSeller: true,
    description: "Freshly churned traditional dairy butter.",
  }),

  createProduct({
    id: 6,
    name: "Pure Cow Milk Cheese",
    categoryId: 6,
    category: "Cheese",
    categorySlug: "cheese",
    price: 180,
    rating: 4.8,
    unit: "200 g",
    image: "/paneer.jpg",
    newArrival: true,
    description: "Creamy artisan cheese made from pure cow milk.",
  }),

  createProduct({
    id: 7,
    name: "Traditional Shrikhand",
    categoryId: 7,
    category: "Shrikhand",
    categorySlug: "shrikhand",
    price: 140,
    rating: 4.8,
    unit: "250 g",
    image: "/milk.jpg",
    newArrival: true,
    description: "Authentic Maharashtrian shrikhand made from strained curd.",
  }),

  createProduct({
    id: 8,
    name: "Alphonso Amrakhand",
    categoryId: 8,
    category: "Amrakhand",
    categorySlug: "amrakhand",
    price: 150,
    rating: 4.8,
    unit: "250 g",
    image: "/milk.jpg",
    newArrival: true,
    description: "Rich mango-infused shrikhand prepared with Alphonso pulp.",
  }),

  createProduct({
    id: 9,
    name: "Fresh Lassi",
    categoryId: 9,
    category: "Lassi",
    categorySlug: "lassi",
    price: 50,
    rating: 4.7,
    unit: "300 ml",
    image: "/milk.jpg",
    newArrival: true,
    description: "Refreshing sweet and salted traditional lassi.",
  }),

  createProduct({
    id: 10,
    name: "Flavoured Milk",
    categoryId: 10,
    category: "Flavoured Milk",
    categorySlug: "flavoured-milk",
    price: 45,
    rating: 4.6,
    unit: "200 ml",
    image: "/milk.jpg",
    newArrival: true,
    description: "Chilled milk infused with kesar, elaichi and badam.",
  }),

  createProduct({
    id: 11,
    name: "Traditional Dairy Sweets",
    categoryId: 11,
    category: "Sweets",
    categorySlug: "sweets",
    price: 250,
    rating: 4.8,
    unit: "500 g",
    image: "/milk.jpg",
    description: "Traditional milk pedas, basundi and festive Indian sweets.",
  }),

  createProduct({
    id: 12,
    name: "Natural Dairy Ice Cream",
    categoryId: 12,
    category: "Ice Cream",
    categorySlug: "ice-cream",
    price: 120,
    rating: 4.7,
    unit: "500 ml",
    image: "/milk.jpg",
    description: "Rich and creamy natural dairy ice cream.",
  }),
];

export const getProductById = (id) =>
  products.find((product) => String(product.id) === String(id));

export const getProductsByCategory = (categorySlug) =>
  products.filter((product) => product.categorySlug === categorySlug);