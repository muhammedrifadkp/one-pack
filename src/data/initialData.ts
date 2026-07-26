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
  email: "onepackonline@gmail.com",
  address: "3rd floor, Brothers Traders, Railway Station road",
  cityState: "Kanhangad, 671315",
  gstin: "32AALFB1621M1ZN",
  deliveryArea: "DELIVERY ALL OVER KASARAGOD",
  bioNotice: "WE ONLY SELL BIO PRODUCTS - NO PLASTIC",
  googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3898.3496464879036!2d75.09355!3d12.31688!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba47f524458b2bd%3A0x4a1804f58bdf0590!2sKanhangad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  cataloguePdfUrl: "#download-catalogue",
  workingHours: "Mon - Sat: 9:00 AM - 7:00 PM | Sun: Closed",
  instagramUrl: "https://www.instagram.com/onepack_official_/"
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
    itemCount: 1
  },
  {
    id: "food-containers",
    name: "Food Containers",
    slug: "food-containers",
    iconName: "FoodContainers",
    description: "Leak-proof food containers, meal prep boxes & portion cups.",
    itemCount: 3
  },
  {
    id: "paper-cups",
    name: "Paper Cups",
    slug: "paper-cups",
    iconName: "PaperCups",
    description: "Hot & cold single wall paper cups for tea, coffee, and beverages.",
    itemCount: 0
  },
  {
    id: "wooden-cutlery",
    name: "Wooden Cutlery & Skewers",
    slug: "wooden-cutlery",
    iconName: "WoodenCutlery",
    description: "100% natural birchwood spoons, forks, knives & bamboo kabab skewers.",
    itemCount: 1
  },
  {
    id: "paper-straws",
    name: "Paper Straws",
    slug: "paper-straws",
    iconName: "PaperStraws",
    description: "Soggy-free high strength food grade paper straws for juices & shakes.",
    itemCount: 0
  },
  {
    id: "carry-bags",
    name: "Carry Bags & Covers",
    slug: "carry-bags",
    iconName: "CarryBags",
    description: "Durable kraft paper bags, bio-compostable carry bags & flat covers.",
    itemCount: 0
  },
  {
    id: "bakery-packaging",
    name: "Bakery Packaging",
    slug: "bakery-packaging",
    iconName: "BakeryPackaging",
    description: "Cake boxes, silver cake bases, sweet boxes & pastry holders.",
    itemCount: 4
  },
  {
    id: "meal-boxes",
    name: "Meal & Biriyani Packaging",
    slug: "meal-boxes",
    iconName: "MealBoxes",
    description: "Multi-compartment eco meal boxes & biriyani buckets.",
    itemCount: 1
  },
  {
    id: "pizza-boxes",
    name: "Pizza Boxes",
    slug: "pizza-boxes",
    iconName: "PizzaBoxes",
    description: "Heavy-duty corrugated pizza boxes in all standard sizes.",
    itemCount: 1
  },
  {
    id: "salad-bowls",
    name: "Salad Bowls",
    slug: "salad-bowls",
    iconName: "SaladBowls",
    description: "Clear lid round kraft paper salad & bowl packages.",
    itemCount: 0
  },
  {
    id: "ripple-cups",
    name: "Ripple Cups",
    slug: "ripple-cups",
    iconName: "Flame",
    description: "Insulated triple-wall ripple cups designed for hot beverages without sleeves.",
    itemCount: 0
  },
  {
    id: "burger-boxes",
    name: "Burger Boxes",
    slug: "burger-boxes",
    iconName: "Layers",
    description: "Sturdy clamshell burger packaging keeping food hot & fresh.",
    itemCount: 1
  },
  {
    id: "take-away-boxes",
    name: "Broast & Takeaway Boxes",
    slug: "take-away-boxes",
    iconName: "Truck",
    description: "Chicken broast boxes, wrap boxes & paper cones.",
    itemCount: 3
  },
  {
    id: "eco-friendly-products",
    name: "Eco Friendly Products",
    slug: "eco-friendly-products",
    iconName: "Leaf",
    description: "100% compostable sugarcane bagasse & cornstarch alternatives.",
    itemCount: 0
  },
  {
    id: "hygiene",
    name: "Hygiene & Disposables",
    slug: "hygiene",
    iconName: "ShieldCheck",
    description: "Tissues, hand gloves, wet wipes & heavy duty garbage bags.",
    itemCount: 3
  },
  {
    id: "paper-rolls",
    name: "Paper Rolls & Foils",
    slug: "paper-rolls",
    iconName: "Package",
    description: "Simi paper rolls, jumbo kitchen towels, cling films & aluminium foils.",
    itemCount: 1
  }
];

export const INITIAL_PRODUCTS: Product[] = [];

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
