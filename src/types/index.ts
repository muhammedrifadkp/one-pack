export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  categoryName: string;
  image: string;
  gallery: string[];
  description: string;
  sizes: string[];
  moq: string;
  material: string;
  usage: string;
  packagingDetails: string;
  foodGrade: boolean;
  ecoFriendly: boolean;
  isFeatured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string; // Lucide icon name or image path
  description: string;
  itemCount?: number;
}

export interface Brand {
  id: string;
  name: string;
  logoUrl?: string;
  tagline?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  businessName: string;
  businessType: string;
  rating: number;
  comment: string;
  location: string;
  avatar?: string;
}

export interface SiteConfig {
  companyName: string;
  tagline: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  whatsappNumber: string; // e.g. "919995216808"
  phoneNumber: string;
  secondaryPhone?: string;
  email: string;
  address: string;
  cityState: string;
  gstin?: string;
  deliveryArea?: string;
  bioNotice?: string;
  googleMapEmbedUrl: string;
  cataloguePdfUrl: string;
  workingHours: string;
}

export interface SEOConfig {
  siteTitle: string;
  siteDescription: string;
  keywords: string;
  ogImage: string;
}
