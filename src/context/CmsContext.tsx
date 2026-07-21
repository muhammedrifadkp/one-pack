"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Category, Brand, Testimonial, SiteConfig, SEOConfig } from "@/types";
import {
  INITIAL_SITE_CONFIG,
  INITIAL_SEO_CONFIG,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_BRANDS,
  INITIAL_TESTIMONIALS
} from "@/data/initialData";

interface CmsContextType {
  siteConfig: SiteConfig;
  seoConfig: SEOConfig;
  categories: Category[];
  products: Product[];
  brands: Brand[];
  testimonials: Testimonial[];
  // CRUD
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, productData: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (id: string, categoryData: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addBrand: (brand: Omit<Brand, "id">) => void;
  deleteBrand: (id: string) => void;
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => void;
  updateSeoConfig: (newSeo: Partial<SEOConfig>) => void;
  resetToDefault: () => void;
  // WhatsApp helper
  generateWhatsAppUrl: (options?: {
    productName?: string;
    size?: string;
    moq?: string;
    customerName?: string;
    businessName?: string;
    phone?: string;
    city?: string;
    message?: string;
  }) => string;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_CONFIG = "onepack_site_config_v1";
const LOCAL_STORAGE_KEY_SEO = "onepack_seo_config_v1";
const LOCAL_STORAGE_KEY_PRODUCTS = "onepack_products_v1";
const LOCAL_STORAGE_KEY_CATEGORIES = "onepack_categories_v1";
const LOCAL_STORAGE_KEY_BRANDS = "onepack_brands_v1";
const LOCAL_STORAGE_KEY_TESTIMONIALS = "onepack_testimonials_v1";

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
  const [seoConfig, setSeoConfig] = useState<SEOConfig>(INITIAL_SEO_CONFIG);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [brands, setBrands] = useState<Brand[]>(INITIAL_BRANDS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  // Load from Local Storage on mount
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem(LOCAL_STORAGE_KEY_CONFIG);
      if (savedConfig) setSiteConfig(JSON.parse(savedConfig));

      const savedSeo = localStorage.getItem(LOCAL_STORAGE_KEY_SEO);
      if (savedSeo) setSeoConfig(JSON.parse(savedSeo));

      const savedCategories = localStorage.getItem(LOCAL_STORAGE_KEY_CATEGORIES);
      if (savedCategories) setCategories(JSON.parse(savedCategories));

      const savedProducts = localStorage.getItem(LOCAL_STORAGE_KEY_PRODUCTS);
      if (savedProducts) setProducts(JSON.parse(savedProducts));

      const savedBrands = localStorage.getItem(LOCAL_STORAGE_KEY_BRANDS);
      if (savedBrands) setBrands(JSON.parse(savedBrands));

      const savedTestimonials = localStorage.getItem(LOCAL_STORAGE_KEY_TESTIMONIALS);
      if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));
    } catch (e) {
      console.error("Failed to load CMS data from localStorage", e);
    }
  }, []);

  // Save changes
  const saveSiteConfig = (config: SiteConfig) => {
    setSiteConfig(config);
    localStorage.setItem(LOCAL_STORAGE_KEY_CONFIG, JSON.stringify(config));
  };

  const saveSeoConfig = (seo: SEOConfig) => {
    setSeoConfig(seo);
    localStorage.setItem(LOCAL_STORAGE_KEY_SEO, JSON.stringify(seo));
  };

  const saveProducts = (prods: Product[]) => {
    setProducts(prods);
    localStorage.setItem(LOCAL_STORAGE_KEY_PRODUCTS, JSON.stringify(prods));
  };

  const saveCategories = (cats: Category[]) => {
    setCategories(cats);
    localStorage.setItem(LOCAL_STORAGE_KEY_CATEGORIES, JSON.stringify(cats));
  };

  const saveBrands = (brds: Brand[]) => {
    setBrands(brds);
    localStorage.setItem(LOCAL_STORAGE_KEY_BRANDS, JSON.stringify(brds));
  };

  // CRUD Actions
  const addProduct = (prodData: Omit<Product, "id">) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`
    };
    saveProducts([newProd, ...products]);
  };

  const updateProduct = (id: string, prodData: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...prodData } : p));
    saveProducts(updated);
  };

  const deleteProduct = (id: string) => {
    saveProducts(products.filter((p) => p.id !== id));
  };

  const addCategory = (catData: Omit<Category, "id">) => {
    const newCat: Category = {
      ...catData,
      id: catData.slug || `cat-${Date.now()}`
    };
    saveCategories([...categories, newCat]);
  };

  const updateCategory = (id: string, catData: Partial<Category>) => {
    saveCategories(categories.map((c) => (c.id === id ? { ...c, ...catData } : c)));
  };

  const deleteCategory = (id: string) => {
    saveCategories(categories.filter((c) => c.id !== id));
  };

  const addBrand = (brandData: Omit<Brand, "id">) => {
    const newBrand: Brand = {
      ...brandData,
      id: `brand-${Date.now()}`
    };
    saveBrands([...brands, newBrand]);
  };

  const deleteBrand = (id: string) => {
    saveBrands(brands.filter((b) => b.id !== id));
  };

  const updateSiteConfig = (newConfig: Partial<SiteConfig>) => {
    saveSiteConfig({ ...siteConfig, ...newConfig });
  };

  const updateSeoConfig = (newSeo: Partial<SEOConfig>) => {
    saveSeoConfig({ ...seoConfig, ...newSeo });
  };

  const resetToDefault = () => {
    setSiteConfig(INITIAL_SITE_CONFIG);
    setSeoConfig(INITIAL_SEO_CONFIG);
    setCategories(INITIAL_CATEGORIES);
    setProducts(INITIAL_PRODUCTS);
    setBrands(INITIAL_BRANDS);
    setTestimonials(INITIAL_TESTIMONIALS);

    localStorage.removeItem(LOCAL_STORAGE_KEY_CONFIG);
    localStorage.removeItem(LOCAL_STORAGE_KEY_SEO);
    localStorage.removeItem(LOCAL_STORAGE_KEY_CATEGORIES);
    localStorage.removeItem(LOCAL_STORAGE_KEY_PRODUCTS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_BRANDS);
    localStorage.removeItem(LOCAL_STORAGE_KEY_TESTIMONIALS);
  };

  const generateWhatsAppUrl = (options?: {
    productName?: string;
    size?: string;
    moq?: string;
    customerName?: string;
    businessName?: string;
    phone?: string;
    city?: string;
    message?: string;
  }) => {
    const phone = siteConfig.whatsappNumber.replace(/[^0-9]/g, "");

    let text = `Hello *${siteConfig.companyName}*,\n\n`;

    if (options?.productName) {
      text += `I am interested in ordering/enquiring about:\n`;
      text += `📦 *Product:* ${options.productName}\n`;
      if (options.size) text += `📐 *Size:* ${options.size}\n`;
      if (options.moq) text += `📊 *MOQ:* ${options.moq}\n\n`;
    } else {
      text += `I would like to enquire about your eco packaging products & bulk price list.\n\n`;
    }

    if (options?.customerName) text += `👤 *Name:* ${options.customerName}\n`;
    if (options?.businessName) text += `🏢 *Business:* ${options.businessName}\n`;
    if (options?.city) text += `📍 *City:* ${options.city}\n`;
    if (options?.phone) text += `📞 *Phone:* ${options.phone}\n`;

    if (options?.message) {
      text += `💬 *Message:* ${options.message}\n`;
    }

    text += `\nPlease share pricing, catalogue, and delivery terms. Thank you!`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <CmsContext.Provider
      value={{
        siteConfig,
        seoConfig,
        categories,
        products,
        brands,
        testimonials,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addBrand,
        deleteBrand,
        updateSiteConfig,
        updateSeoConfig,
        resetToDefault,
        generateWhatsAppUrl
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error("useCms must be used within a CmsProvider");
  }
  return context;
};
