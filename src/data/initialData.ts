import { Product, Category, Brand, Testimonial, SiteConfig, SEOConfig } from "@/types";

export const INITIAL_SITE_CONFIG: SiteConfig = {
  companyName: "One Pack",
  tagline: "ONE SOURCE EVERY PACK",
  heroHeading: "One Source.\nEvery Pack.",
  heroSubheading: "PREMIUM BIO DISPOSABLE & PACKAGING SOLUTIONS. We only sell bio products - No Plastic. Serving restaurants, hotels, cafes, bakeries, juice shops, catering & wholesale dealers across Kasaragod.",
  heroImage: "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?q=80&w=1200&auto=format&fit=crop",
  whatsappNumber: "919019966790",
  phoneNumber: "+91 99952 16808",
  secondaryPhone: "+91 90199 66790",
  email: "info@onepackonline.com",
  address: "3rd floor, Brothers Traders, Railway Station road",
  cityState: "Kanhangad, 671315",
  gstin: "32AALFB1621M1ZN",
  deliveryArea: "DELIVERY ALL OVER KASARAGOD",
  bioNotice: "WE ONLY SELL BIO PRODUCTS - NO PLASTIC",
  googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.3496464879036!2d75.09355!3d12.31688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba47f524458b2bd%3A0x4a1804f58bdf0590!2sKanhangad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  cataloguePdfUrl: "#download-catalogue",
  workingHours: "Mon - Sat: 9:00 AM - 7:00 PM | Sun: Closed"
};

export const INITIAL_SEO_CONFIG: SEOConfig = {
  siteTitle: "One Pack | Premium Bio Disposable & Packaging Solutions Kanhangad",
  siteDescription: "One Source. Every Pack. Leading wholesale supplier of 100% biodegradable food packaging in Kanhangad, Kasaragod. We only sell bio products - No Plastic. Call: +91 99952 16808, WhatsApp: +91 90199 66790. GSTIN: 32AALFB1621M1ZN.",
  keywords: "one pack, bio packaging Kanhangad, food packaging Kasaragod, eco disposable tableware, paper plates wholesale, wooden cutlery Kerala, GSTIN 32AALFB1621M1ZN, biodegradable containers",
  ogImage: "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?q=80&w=1200&auto=format&fit=crop"
};

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "paper-plates",
    name: "Paper Plates",
    slug: "paper-plates",
    iconName: "PaperPlates",
    description: "Biodegradable paper plates in multiple sizes for catering and quick service.",
    itemCount: 14
  },
  {
    id: "food-containers",
    name: "Food Containers",
    slug: "food-containers",
    iconName: "FoodContainers",
    description: "Leak-proof kraft & bagasse containers for food deliveries.",
    itemCount: 22
  },
  {
    id: "paper-cups",
    name: "Paper Cups",
    slug: "paper-cups",
    iconName: "PaperCups",
    description: "Hot & cold single wall paper cups for tea, coffee, and beverages.",
    itemCount: 18
  },
  {
    id: "wooden-cutlery",
    name: "Wooden Cutlery",
    slug: "wooden-cutlery",
    iconName: "WoodenCutlery",
    description: "100% natural birchwood spoons, forks, knives & ice cream sticks.",
    itemCount: 16
  },
  {
    id: "paper-straws",
    name: "Paper Straws",
    slug: "paper-straws",
    iconName: "PaperStraws",
    description: "Soggy-free high strength food grade paper straws for juices & shakes.",
    itemCount: 9
  },
  {
    id: "carry-bags",
    name: "Carry Bags",
    slug: "carry-bags",
    iconName: "CarryBags",
    description: "Durable kraft paper bags with twisted handles for takeaway.",
    itemCount: 14
  },
  {
    id: "bakery-packaging",
    name: "Bakery Packaging",
    slug: "bakery-packaging",
    iconName: "BakeryPackaging",
    description: "Cake boxes, pastry trays, window boxes & muffin holders.",
    itemCount: 11
  },
  {
    id: "meal-boxes",
    name: "Meal Boxes",
    slug: "meal-boxes",
    iconName: "MealBoxes",
    description: "Multi-compartment eco meal boxes perfect for thali and combo meals.",
    itemCount: 15
  },
  {
    id: "pizza-boxes",
    name: "Pizza Boxes",
    slug: "pizza-boxes",
    iconName: "PizzaBoxes",
    description: "Heavy-duty corrugated corrugated pizza boxes in all standard sizes.",
    itemCount: 10
  },
  {
    id: "salad-bowls",
    name: "Salad Bowls",
    slug: "salad-bowls",
    iconName: "SaladBowls",
    description: "Clear lid round kraft paper salad & bowl packages.",
    itemCount: 12
  },
  {
    id: "ripple-cups",
    name: "Ripple Cups",
    slug: "ripple-cups",
    iconName: "Flame",
    description: "Insulated triple-wall ripple cups designed for hot beverages without sleeves.",
    itemCount: 12
  },
  {
    id: "burger-boxes",
    name: "Burger Boxes",
    slug: "burger-boxes",
    iconName: "Layers",
    description: "Sturdy clamshell burger packaging keeping food hot & fresh.",
    itemCount: 8
  },
  {
    id: "juice-cups",
    name: "Juice Cups",
    slug: "juice-cups",
    iconName: "CupSoda",
    description: "Clear recyclable PET & PLA cold drink & thick shake cups with dome lids.",
    itemCount: 10
  },
  {
    id: "take-away-boxes",
    name: "Take Away Boxes",
    slug: "take-away-boxes",
    iconName: "Truck",
    description: "Leak-proof folded kraft takeaway boxes with secure locks.",
    itemCount: 13
  },
  {
    id: "eco-friendly-products",
    name: "Eco Friendly Products",
    slug: "eco-friendly-products",
    iconName: "Leaf",
    description: "100% compostable sugarcane bagasse & cornstarch alternatives.",
    itemCount: 25
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Bio Paper Plates",
    slug: "bio-paper-plates",
    categoryId: "paper-plates",
    categoryName: "Paper Plates",
    image: "/products/bio-paper-plates.png",
    gallery: [
      "/products/bio-paper-plates.png"
    ],
    description: "Heavy-duty sugarcane bagasse molded plates. Oil-resistant, microwave safe, and 100% biodegradable within 90 days.",
    sizes: ["6\"", "7\"", "8\"", "9\"", "10\"", "12\""],
    moq: "50 Pack",
    material: "Sugarcane Bagasse / Virgin Food Paper",
    usage: "Hot & Cold meals, Catering, Buffet, Parties & Takeaway",
    packagingDetails: "50 Pcs per pack, 10 Packs per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-2",
    name: "Ripple Cups",
    slug: "ripple-cups",
    categoryId: "ripple-cups",
    categoryName: "Ripple Cups",
    image: "/products/ripple-cups.png",
    gallery: [
      "/products/ripple-cups.png"
    ],
    description: "Triple wall ripple insulated coffee cups. Provides optimal heat insulation, eliminating the need for cup sleeves.",
    sizes: ["120ml", "180ml", "250ml", "300ml"],
    moq: "1000 Pcs",
    material: "Food Grade Kraft Paper with Insulated Corrugated Outer",
    usage: "Espresso, Cappuccino, Hot Tea, Hot Chocolate",
    packagingDetails: "25 Pcs per sleeve, 40 sleeves per case (1000 Pcs)",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-3",
    name: "Kraft Food Container",
    slug: "kraft-food-container",
    categoryId: "food-containers",
    categoryName: "Food Containers",
    image: "/products/kraft-food-container.png",
    gallery: [
      "/products/kraft-food-container.png"
    ],
    description: "Leak-proof round & rectangular kraft containers with clear PET or kraft paper lids. Ideal for soups, gravies, and rice dishes.",
    sizes: ["250ml", "350ml", "500ml", "750ml", "1000ml"],
    moq: "500 Pcs",
    material: "Unbleached Natural Kraft Paper + PE/PLA Lined",
    usage: "Biryani, Curry, Gravy, Soups & Pasta Delivery",
    packagingDetails: "50 Pcs per pack, 10 packs per carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-4",
    name: "Meal Boxes",
    slug: "meal-boxes",
    categoryId: "meal-boxes",
    categoryName: "Meal Boxes",
    image: "/products/meal-boxes.png",
    gallery: [
      "/products/meal-boxes.png"
    ],
    description: "Clamshell meal packaging with 1, 2, or 3 separate compartments to keep main dishes and sides crisp without mixing.",
    sizes: ["1, 2, 3 Compartment"],
    moq: "500 Pcs",
    material: "100% Compostable Sugarcane Fiber",
    usage: "Executive Lunches, Combo Meals, Catering Takeaway",
    packagingDetails: "100 Pcs per sleeve, 5 sleeves per box",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-5",
    name: "Wooden Spoons",
    slug: "wooden-spoons",
    categoryId: "wooden-cutlery",
    categoryName: "Wooden Cutlery",
    image: "/products/wooden-spoons.png",
    gallery: [
      "/products/wooden-spoons.png"
    ],
    description: "Smooth finish birchwood cutlery set including spoons, forks, knives, and ice cream stirrers. Chemical-free and smooth edges.",
    sizes: ["110mm", "160mm", "180mm"],
    moq: "1000 Pcs",
    material: "FSC Certified Birchwood",
    usage: "Ice Cream, Dessert, Snacks, Salads & Main Courses",
    packagingDetails: "100 Pcs per inner pouch, 10 pouches per carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-6",
    name: "Kraft Paper Carry Bags",
    slug: "kraft-paper-carry-bags",
    categoryId: "carry-bags",
    categoryName: "Carry Bags",
    image: "/products/kraft-paper-carry-bags.png",
    gallery: [
      "/products/kraft-paper-carry-bags.png"
    ],
    description: "Eco-friendly takeaway kraft bags with reinforced twisted paper handles. Holds heavy food orders securely.",
    sizes: ["Small (8x5x10\")", "Medium (10x6x12\")", "Large (12x7x15\")"],
    moq: "500 Pcs",
    material: "Heavy Duty 120 GSM Brown / White Kraft Paper",
    usage: "Retail Shopping, Restaurant Food Delivery, Bakery Takeaway",
    packagingDetails: "250 Pcs per bundled bale",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-7",
    name: "Eco Paper Straws",
    slug: "eco-paper-straws",
    categoryId: "paper-straws",
    categoryName: "Paper Straws",
    image: "/products/eco-paper-straws.png",
    gallery: [
      "/products/eco-paper-straws.png"
    ],
    description: "4-ply thick paper straws that hold shape in drinks for up to 4 hours. Available in natural brown, plain white, and custom stripes.",
    sizes: ["6mm (Standard)", "8mm (Smoothie)", "10mm (Boba/Jumbo)"],
    moq: "2000 Pcs",
    material: "Food Grade Virgin Paper + Water-based Ink",
    usage: "Juices, Soft Drinks, Cocktails, Shakes",
    packagingDetails: "250 Pcs per box, 8 boxes per case",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: false
  },
  {
    id: "prod-8",
    name: "Kraft Salad Bowls",
    slug: "kraft-salad-bowls",
    categoryId: "salad-bowls",
    categoryName: "Salad Bowls",
    image: "/products/kraft-salad-bowls.png",
    gallery: [
      "/products/kraft-salad-bowls.png"
    ],
    description: "Round shallow kraft salad bowls with anti-fog PET lids. Showcases fresh greens and poke bowls cleanly.",
    sizes: ["500ml", "750ml", "1000ml", "1300ml"],
    moq: "500 Pcs",
    material: "Kraft Paper + PE Lined Bowl, PET Lid",
    usage: "Salads, Cold Noodles, Fruit Bowls, Grain Bowls",
    packagingDetails: "50 Pcs per pack, 10 packs per carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-9",
    name: "Corrugated Pizza Boxes",
    slug: "corrugated-pizza-boxes",
    categoryId: "pizza-boxes",
    categoryName: "Pizza Boxes",
    image: "/products/corrugated-pizza-boxes.png",
    gallery: [
      "/products/corrugated-pizza-boxes.png"
    ],
    description: "Vented B-flute corrugated kraft pizza boxes. Prevents moisture condensation to keep crusts crispy during transit.",
    sizes: ["7 Inch", "9 Inch", "10 Inch", "12 Inch", "14 Inch"],
    moq: "300 Pcs",
    material: "3-Ply Corrugated Kraft Board",
    usage: "Pizzerias, Italian Cafes, Bakery Breads",
    packagingDetails: "100 Pcs flat packed per bundle",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: false
  },
  {
    id: "prod-10",
    name: "Window Bakery Boxes",
    slug: "window-bakery-boxes",
    categoryId: "bakery-packaging",
    categoryName: "Bakery Packaging",
    image: "/products/window-bakery-boxes.png",
    gallery: [
      "/products/window-bakery-boxes.png"
    ],
    description: "Elegant white & brown pastry boxes with clear viewing window. Perfect for cakes, donuts, cupcakes, and pastries.",
    sizes: ["4 Pack", "6 Pack", "12 Pack", "1kg Cake Box"],
    moq: "500 Pcs",
    material: "High Density Food Board + PLA Window",
    usage: "Cake Shops, Artisan Bakeries, Dessert Parlors",
    packagingDetails: "100 Pcs flat bundle",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: false
  }
];

export const INITIAL_BRANDS: Brand[] = [
  { id: "brand-1", name: "Huhtamaki", tagline: "Global Food Packaging Specialist" },
  { id: "brand-2", name: "Ecoware", tagline: "100% Biodegradable Tableware" },
  { id: "brand-3", name: "Bio Eco", tagline: "Sustainable Eco Solutions" },
  { id: "brand-4", name: "Starpak", tagline: "Premium Industrial Packaging" },
  { id: "brand-5", name: "DART", tagline: "Container Corporation" },
  { id: "brand-6", name: "Naturese", tagline: "Nature Inspired Packaging" },
  { id: "brand-7", name: "BioPak", tagline: "It Doesn't Cost The Earth" },
  { id: "brand-8", name: "Vegware", tagline: "Plant-Based Packaging" },
  { id: "brand-9", name: "Detpak", tagline: "Paper & Board Packaging Solutions" },
  { id: "brand-10", name: "Pap Star", tagline: "Eco Tableware & Catering" },
  { id: "brand-11", name: "Enviro", tagline: "Sustainable Foodservice Containers" },
  { id: "brand-12", name: "EarthChoice", tagline: "Smart Eco Choices" },
  { id: "brand-13", name: "Fineline", tagline: "Settings Fine Tableware" },
  { id: "brand-14", name: "Galaxy", tagline: "Wholesale Packaging Systems" },
  { id: "brand-15", name: "Clariant", tagline: "Specialty Eco Materials" },
  { id: "brand-16", name: "Proex", tagline: "Exporter & Manufacturer" }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    author: "Mohammed Rasheed",
    businessName: "Arabian Grill & Restaurant",
    businessType: "Multi-Cuisine Restaurant",
    rating: 5,
    comment: "One Pack has been supplying all our takeaway meal boxes and ripple cups for over 2 years. Excellent quality, competitive wholesale rates, and always delivered on time!",
    location: "Kasaragod"
  },
  {
    id: "test-2",
    author: "Fathima Suhra",
    businessName: "Bake & Toast Cafe",
    businessType: "Artisan Bakery & Cafe",
    rating: 5,
    comment: "Switched to One Pack's wooden cutlery and bagasse salad bowls. Our customers love the premium eco-friendly feel. The custom sizing options fit our menu items perfectly.",
    location: "Kanhangad"
  },
  {
    id: "test-3",
    author: "Vinod Kumar",
    businessName: "Green Oasis Caterers",
    businessType: "Bulk Catering Service",
    rating: 5,
    comment: "For major wedding orders and corporate catering, One Pack is our go-to partner. Their GST billing and prompt WhatsApp response make order placement smooth and fast.",
    location: "Mangalore / Kasaragod"
  }
];

export const TRUST_FEATURES = [
  {
    icon: "Leaf",
    title: "ECO FRIENDLY",
    desc: "Sustainable Solutions"
  },
  {
    icon: "ShieldCheck",
    title: "FOOD GRADE",
    desc: "Safe & Hygienic"
  },
  {
    icon: "BadgeIndianRupee",
    title: "WHOLESALE PRICING",
    desc: "Best Value"
  },
  {
    icon: "Boxes",
    title: "BULK SUPPLY",
    desc: "Always In Stock"
  },
  {
    icon: "Zap",
    title: "FAST DELIVERY",
    desc: "On Time, Every Time"
  },
  {
    icon: "FileCheck",
    title: "GST BILLING",
    desc: "100% Compliant"
  }
];

export const TARGET_CUSTOMERS = [
  "Restaurants",
  "Hotels",
  "Cafes",
  "Juice Shops",
  "Bakeries",
  "Catering Services",
  "Cloud Kitchens",
  "Wholesale Dealers",
  "Supermarkets",
  "Food Businesses",
  "Retail Shops"
];
