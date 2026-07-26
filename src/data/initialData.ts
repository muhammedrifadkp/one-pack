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

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    name: "Disposable Rectangle Black Container with Natural Lid",
    slug: "disposable-rectangle-black-container",
    categoryId: "food-containers",
    categoryName: "Food Containers",
    image: "/products/disposable-rectangle-black-container.png",
    gallery: ["/products/disposable-rectangle-black-container.png"],
    description: "Keep your food fresh, secure, and presentation-ready with our premium Disposable Rectangle Black Containers with Natural Lids. Food grade, leak resistant, strong & durable.",
    sizes: ["500 ML", "750 ML", "1000 ML"],
    moq: "500 Pcs",
    material: "Food Grade Polypropylene (PP)",
    usage: "Meals, Salads, Takeaway, Food Delivery, Restaurants & Cafés",
    packagingDetails: "50 Pcs per pack, 10 Packs per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-2",
    name: "Disposable Round Black Container with Natural Lid",
    slug: "disposable-round-black-container",
    categoryId: "food-containers",
    categoryName: "Food Containers",
    image: "/products/disposable-round-black-container.png",
    gallery: ["/products/disposable-round-black-container.png"],
    description: "Keep your food fresh, secure, and professionally presented with One Pack's premium round black containers with natural leak-resistant lids. Food grade, strong and durable.",
    sizes: ["250 ML", "500 ML", "750 ML"],
    moq: "500 Pcs",
    material: "Food Grade Polypropylene (PP)",
    usage: "Curries, Noodles, Salads, Rice & Meals, Takeaway & Food Delivery, Restaurants, Cafés & Cloud Kitchens",
    packagingDetails: "50 Pcs per pack, 10 Packs per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-3",
    name: "Premium SIMI Paper Roll",
    slug: "premium-simi-paper-roll",
    categoryId: "paper-rolls",
    categoryName: "Paper Rolls & Foils",
    image: "/products/premium-simi-paper-roll.png",
    gallery: ["/products/premium-simi-paper-roll.png"],
    description: "Strong, reliable, and versatile—our SIMI Paper Rolls are the perfect choice for wrapping, lining, packing, and general purpose use across food service and commercial businesses. High absorbency and premium quality.",
    sizes: ["Standard Roll", "Jumbo Roll"],
    moq: "10 Rolls",
    material: "100% High Absorbency Food Grade SIMI Paper",
    usage: "Kitchen, Catering, Events, Industrial Use, General Purpose Wrapping & Packing",
    packagingDetails: "6 Rolls per bundle, 4 Bundles per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-4",
    name: "Bio Paper Plates & Trays",
    slug: "bio-paper-plates-and-trays",
    categoryId: "paper-plates",
    categoryName: "Paper Plates",
    image: "/products/bio-paper-plates-and-trays.png",
    gallery: ["/products/bio-paper-plates-and-trays.png"],
    description: "Serve every meal with confidence using our premium Bio Paper Plates & Trays. Made from 100% eco-friendly biodegradable materials, oil & water resistant, strong, food-safe, and perfect for hot & cold foods.",
    sizes: ['6" Round', '8" Round', '9"x10" Square Tray', '10"x12" Square Tray'],
    moq: "500 Pcs",
    material: "100% Biodegradable Eco-Friendly Paper Pulp",
    usage: "Restaurants, Cafés, Hotels, Caterers, Events & Functions, Takeaway & Food Delivery",
    packagingDetails: "100 Pcs per pack, 10 Packs per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-5",
    name: "Cutting Paper Tissues (5kg Bundle)",
    slug: "cutting-paper-tissues-5kg-bundle",
    categoryId: "hygiene",
    categoryName: "Hygiene & Disposables",
    image: "/products/cutting-paper-tissues-5kg-bundle.png",
    gallery: ["/products/cutting-paper-tissues-5kg-bundle.png"],
    description: "A practical and economical solution for everyday food service and cleaning needs. Our 5 kg Cutting Paper Tissue Bundles are soft, absorbent, hygienic, food safe, strong & durable. Ideal for bulk commercial use.",
    sizes: ["5 KG Bundle"],
    moq: "1 Bundle (5 KG)",
    material: "100% Food Grade Absorbent Tissue Paper",
    usage: "Restaurants, Cafés, Bakeries, Hotels, Catering Services, Commercial & Cloud Kitchens",
    packagingDetails: "5 KG Strapped Tissue Bundle",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-6",
    name: "Premium Biriyani Bucket with Handle & Lid",
    slug: "premium-biriyani-bucket",
    categoryId: "meal-boxes",
    categoryName: "Meal & Biriyani Packaging",
    image: "/products/premium-biriyani-bucket.png",
    gallery: ["/products/premium-biriyani-bucket.png"],
    description: "Serve, pack, and deliver biriyani with confidence using our premium food grade biriyani buckets with secure leak-resistant lids and sturdy handles. Keeps food hot, fresh, secure, and easy to carry.",
    sizes: ["3200 ML", "4500 ML"],
    moq: "100 Pcs",
    material: "Heavy Duty Food Grade Polypropylene (PP)",
    usage: "Biriyani Packing, Bulk Family Meals, Takeaway & Food Delivery, Restaurants, Caterers & Cloud Kitchens",
    packagingDetails: "25 Pcs per pack, 4 Packs per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-7",
    name: "Premium Wooden Kabab Sticks & Skewers",
    slug: "premium-wooden-kabab-sticks",
    categoryId: "wooden-cutlery",
    categoryName: "Wooden Cutlery & Skewers",
    image: "/products/premium-wooden-kabab-sticks.png",
    gallery: ["/products/premium-wooden-kabab-sticks.png"],
    description: "Serve delicious kababs, BBQ, and grilled chicken with high-quality wooden kabab sticks. Smooth finish, 100% food grade material, strong & splinter-free for heavy grilling.",
    sizes: ['6 Inch', '8 Inch', '10 Inch', '12 Inch', '14 Inch'],
    moq: "500 Pcs",
    material: "100% Natural Bamboo / Birchwood (Splinter-Free)",
    usage: "Kababs, BBQ, Grilled Chicken, Meat Skewers, Party Snacks, Restaurants & Catering",
    packagingDetails: "100 Pcs per pack, 50 Packs per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-8",
    name: "Disposable Chef Cap Net",
    slug: "disposable-chef-cap-net",
    categoryId: "hygiene",
    categoryName: "Hygiene & Disposables",
    image: "/products/disposable-chef-cap-net.png",
    gallery: ["/products/disposable-chef-cap-net.png"],
    description: "Maintain ultimate hygiene and professionalism with our premium disposable Chef Cap Nets. Hygienic, breathable, lightweight, with a comfortable fit for kitchen and food service staff.",
    sizes: ["Free Size (Pack of 100)"],
    moq: "1 Pack (100 Pcs)",
    material: "Non-Woven Breathable Bouffant Net",
    usage: "Restaurants, Shawarma Shops, Fried Chicken Outlets, Bakeries, Cafés, Hotels, Catering & Cloud Kitchens",
    packagingDetails: "100 Pcs per pack, 10 Packs per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-9",
    name: "Disposable Food Grade Hand Gloves",
    slug: "disposable-food-grade-hand-gloves",
    categoryId: "hygiene",
    categoryName: "Hygiene & Disposables",
    image: "/products/disposable-food-grade-hand-gloves.png",
    gallery: ["/products/disposable-food-grade-hand-gloves.png"],
    description: "Maintain safety and hygiene in food handling with our food grade hand gloves. Available in clear plastic PE gloves and heavy-duty black nitrile gloves. Powder-free, comfortable fit, strong & durable.",
    sizes: ["Clear Plastic PE Gloves (Pack of 100)", "Black Nitrile Gloves (Box of 100)"],
    moq: "1 Pack / Box",
    material: "Food Grade Polyethylene (PE) / Black Nitrile (Powder-Free)",
    usage: "Restaurants, Shawarma Shops, Fried Chicken Outlets, Bakeries, Cafés, Hotels, Catering & Cloud Kitchens",
    packagingDetails: "100 Pcs per pack/box, 10 Packs per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-10",
    name: "Mayo Dip Cups & Portion Containers with Lid",
    slug: "mayo-dip-cups-and-portion-containers",
    categoryId: "food-containers",
    categoryName: "Food Containers",
    image: "/products/mayo-dip-cups-and-portion-containers.png",
    gallery: ["/products/mayo-dip-cups-and-portion-containers.png"],
    description: "Serve dips, sauces, mayonnaise, chutneys, and dressings in premium food-grade plastic dip cups. Crystal clear finish, leak resistant, strong & hygienic. Available in round cups and square hinged cups.",
    sizes: ["30 ML Round", "50 ML Round", "100 ML Round", "120 ML Round", "30 ML Square Hinged", "50 ML Square Hinged"],
    moq: "500 Pcs",
    material: "Food Grade Crystal Clear Polypropylene (PP) / PET",
    usage: "Burger Shops, Shawarma Outlets, Fast Food Restaurants, Cafés, Fried Chicken Shops, Takeaway & Delivery",
    packagingDetails: "100 Pcs per pack, 10 Packs per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-11",
    name: "Printed Paper & Clear Plastic Burger Boxes",
    slug: "printed-paper-and-clear-plastic-burger-boxes",
    categoryId: "burger-boxes",
    categoryName: "Burger Boxes",
    image: "/products/printed-paper-and-clear-plastic-burger-boxes.png",
    gallery: ["/products/printed-paper-and-clear-plastic-burger-boxes.png"],
    description: "Serve your burgers with packaging that looks as good as your food! Sturdy printed kraft paper clamshell burger boxes and crystal clear plastic burger clamshells. Oil & grease resistant, food grade, strong & durable.",
    sizes: ["Printed Kraft Paper Burger Box", "Printed Red Burger Box", "Printed Black Burger Box", "Clear Plastic Clamshell Box"],
    moq: "250 Pcs",
    material: "Food Grade Eco Paper Board / PET Plastic",
    usage: "Burger Shops, Cafés, Fast Food Outlets, Cloud Kitchens, Takeaway & Food Delivery",
    packagingDetails: "50 Pcs per pack, 10 Packs per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-12",
    name: "Premium Printed Corrugated Pizza Boxes",
    slug: "premium-printed-corrugated-pizza-boxes",
    categoryId: "pizza-boxes",
    categoryName: "Pizza Boxes",
    image: "/products/premium-printed-corrugated-pizza-boxes.png",
    gallery: ["/products/premium-printed-corrugated-pizza-boxes.png"],
    description: "Present your pizzas in style with our premium food grade pizza boxes. Heavy-duty corrugated paperboard, attractive printed designs, oil & grease resistant, designed to keep pizzas fresh, hot, and secure.",
    sizes: ['8"x8" Inch', '9"x9" Inch', '10"x10" Inch'],
    moq: "250 Pcs",
    material: "Heavy Duty Food Grade Corrugated Kraft Board",
    usage: "Pizzerias, Italian Restaurants, Cafés, Cloud Kitchens, Takeaway & Delivery",
    packagingDetails: "50 Pcs per pack, 5 Packs per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-13",
    name: "Printed Shawarma, Wrap & French Fries Boxes",
    slug: "printed-shawarma-wrap-and-french-fries-boxes",
    categoryId: "take-away-boxes",
    categoryName: "Broast & Takeaway Boxes",
    image: "/products/printed-shawarma-wrap-and-french-fries-boxes.png",
    gallery: ["/products/printed-shawarma-wrap-and-french-fries-boxes.png"],
    description: "Serve your food in premium-quality packaging that looks great and keeps it fresh! Stylish printed paper packaging designed for Shawarma, Chicken Wraps, and Crispy French Fries. Oil & grease resistant, food grade, strong & durable.",
    sizes: ["Shawarma Box", "Wrap Box", "French Fries Scoop Box (Regular)", "French Fries Scoop Box (Large)"],
    moq: "500 Pcs",
    material: "Food Grade Heavy Duty Paper Board (Oil & Grease Resistant)",
    usage: "Shawarma Shops, Wrap & Roll Outlets, Fast Food Outlets, Cafés, Cloud Kitchens, Food Delivery",
    packagingDetails: "100 Pcs per pack, 10 Packs per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-14",
    name: "Printed Chicken Broast Boxes with Handle",
    slug: "printed-chicken-broast-boxes-with-handle",
    categoryId: "take-away-boxes",
    categoryName: "Broast & Takeaway Boxes",
    image: "/products/printed-chicken-broast-boxes-with-handle.png",
    gallery: ["/products/printed-chicken-broast-boxes-with-handle.png"],
    description: "Serve your broast in style with our premium Printed Chicken Broast Boxes with Handle. Designed for convenience, durability, and a professional presentation. Oil & grease resistant, keeps food hot, fresh, and easy to carry.",
    sizes: ["4 Pcs Broast (Small Box)", "8 Pcs Broast (Medium Box)", "16 Pcs Broast (Large Box)"],
    moq: "250 Pcs",
    material: "Heavy Duty Food Grade Paper Board (Oil & Grease Resistant)",
    usage: "Broast, Fried Chicken, Crispy Chicken, Wings, Family Meal Packs, Takeaway Orders",
    packagingDetails: "50 Pcs per pack, 10 Packs per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-15",
    name: "Printed Chicken Broast Boxes",
    slug: "printed-chicken-broast-boxes",
    categoryId: "take-away-boxes",
    categoryName: "Broast & Takeaway Boxes",
    image: "/products/printed-chicken-broast-boxes.png",
    gallery: ["/products/printed-chicken-broast-boxes.png"],
    description: "Keep your broast hot, fresh, and ready to serve with our premium Printed Chicken Broast Boxes. Features attractive printed designs, leak-resistant paperboard, and oil & grease resistant coating.",
    sizes: ['5x6x3 Inch (4 Pcs Broast)', '8x6x3 Inch (8 Pcs Broast)', '8x6x5 Inch (12 Pcs Broast)', '8x8x5 Inch (16 Pcs Broast)'],
    moq: "250 Pcs",
    material: "Heavy Duty Food Grade Paper Board (Oil & Grease Resistant)",
    usage: "Broast, Fried Chicken, Wings, Crispy Chicken, Fast-Food Outlets, Takeaway & Delivery",
    packagingDetails: "50 Pcs per pack, 10 Packs per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-16",
    name: "White & Printed Premium Sweet Boxes",
    slug: "white-and-printed-premium-sweet-boxes",
    categoryId: "bakery-packaging",
    categoryName: "Bakery Packaging",
    image: "/products/white-and-printed-premium-sweet-boxes.png",
    gallery: ["/products/white-and-printed-premium-sweet-boxes.png"],
    description: "Make every sweet look even more special with our premium Sweet Boxes, available in Plain White and Beautiful Printed Designs. Food grade paperboard, strong & durable, elegant look for sweets, chocolates, mithai & gift packs.",
    sizes: ['4x4x2 Inch', '4x4x3 Inch', '5x5x2 Inch', '5x5x3 Inch', '5x6x3 Inch', '6x8x3 Inch'],
    moq: "250 Pcs",
    material: "Premium Food Grade White Paper Board / Printed Duplex Board",
    usage: "Bakeries, Sweet Shops, Mithai, Dry Fruits, Chocolates, Festival Gifts & Return Gifts",
    packagingDetails: "50 Pcs per pack, 10 Packs per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-17",
    name: "Premium Printed Cake Boxes with Handle",
    slug: "premium-printed-cake-boxes",
    categoryId: "bakery-packaging",
    categoryName: "Bakery Packaging",
    image: "/products/premium-printed-cake-boxes.png",
    gallery: ["/products/premium-printed-cake-boxes.png"],
    description: "Present your cakes in style with our premium Printed Cake Boxes with Handle. Strong, elegant, food grade material with sturdy construction. Perfect for bakeries, cake shops, home bakers, celebrations & special occasions.",
    sizes: ['7x7 Inch', '7x7x5 Inch', '8x8 Inch', '9x9 Inch', '9x9x5 Inch', '10x10 Inch', '10x10x5 Inch', '12x12 Inch', '12x12x5 Inch', '14x14 Inch', '15x15 Inch', '18x18 Inch'],
    moq: "100 Pcs",
    material: "Heavy Duty Food Grade White Paper Board / Corrugated Board",
    usage: "Cakes, Pastries, Desserts, Bakeries, Cake Shops, Home Bakers, Special Occasions",
    packagingDetails: "25 Pcs per pack, 4 Packs per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-18",
    name: "Premium Silver Cake Base Boards",
    slug: "premium-silver-cake-base-boards",
    categoryId: "bakery-packaging",
    categoryName: "Bakery Packaging",
    image: "/products/premium-silver-cake-base-boards.png",
    gallery: ["/products/premium-silver-cake-base-boards.png"],
    description: "Present your cakes with confidence using our premium Silver Cake Bases. Strong foundation, oil & water resistant with a premium metallic silver finish. Ideal for birthday cakes, wedding cakes, pastries, and dessert displays.",
    sizes: ['7x7 Inch', '8x8 Inch', '9x9 Inch', '10x10 Inch', '12x12 Inch', '14x14 Inch', '15x15 Inch', '18x18 Inch'],
    moq: "100 Pcs",
    material: "Heavy Duty Food Grade Paperboard with Metallic Silver Foil Coating",
    usage: "Birthday Cakes, Wedding Cakes, Pastries, Dessert Displays, Bakeries, Cake Shops, Home Bakers",
    packagingDetails: "50 Pcs per pack, 10 Packs per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
  },
  {
    id: "prod-19",
    name: "Premium Silver Round Cake Base Boards",
    slug: "premium-silver-round-cake-base-boards",
    categoryId: "bakery-packaging",
    categoryName: "Bakery Packaging",
    image: "/products/premium-silver-round-cake-base-boards.png",
    gallery: ["/products/premium-silver-round-cake-base-boards.png"],
    description: "Give your cakes a professional finish with our premium Silver Round Cake Bases. Strong, durable, oil & water resistant with a sleek metallic silver finish. Ideal for round birthday cakes, wedding cakes, pastries, and dessert displays.",
    sizes: ['7 Inch Round', '8 Inch Round', '9 Inch Round', '10 Inch Round', '12 Inch Round', '14 Inch Round', '15 Inch Round'],
    moq: "100 Pcs",
    material: "Heavy Duty Food Grade Paperboard with Metallic Silver Foil Coating",
    usage: "Round Birthday Cakes, Tiered Wedding Cakes, Pastries, Dessert Displays, Bakeries, Cake Shops, Home Bakers",
    packagingDetails: "50 Pcs per pack, 10 Packs per master carton",
    foodGrade: true,
    ecoFriendly: true,
    isFeatured: true
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
