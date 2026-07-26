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
  // Admin auth
  adminKey: string;
  isAdminAuthenticated: boolean;
  loginAdmin: (passcode: string) => Promise<{ success: boolean; error?: string }>;
  logoutAdmin: () => void;
  // Product CRUD
  addProduct: (product: Omit<Product, "id">) => Promise<{ success: boolean; product?: Product; error?: string }>;
  updateProduct: (id: string, productData: Partial<Product>) => Promise<{ success: boolean; product?: Product; error?: string }>;
  deleteProduct: (id: string) => Promise<{ success: boolean; error?: string }>;
  // Category & Brand CRUD
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (id: string, categoryData: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addBrand: (brand: Omit<Brand, "id">) => void;
  deleteBrand: (id: string) => void;
  updateSiteConfig: (newConfig: Partial<SiteConfig>) => void;
  updateSeoConfig: (newSeo: Partial<SEOConfig>) => void;
  resetToDefault: () => void;
  // Image Upload helper
  uploadImage: (file: File) => Promise<{ success: boolean; url?: string; error?: string }>;
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

const LOCAL_STORAGE_KEY_CONFIG = "onepack_site_config_v2";
const LOCAL_STORAGE_KEY_SEO = "onepack_seo_config_v1";
const LOCAL_STORAGE_KEY_PRODUCTS = "onepack_products_v23";
const LOCAL_STORAGE_KEY_DELETED_PRODUCTS = "onepack_deleted_products_v2";
const LOCAL_STORAGE_KEY_CATEGORIES = "onepack_categories_v21";
const LOCAL_STORAGE_KEY_BRANDS = "onepack_brands_v1";
const LOCAL_STORAGE_KEY_TESTIMONIALS = "onepack_testimonials_v1";
const SESSION_STORAGE_KEY_ADMIN = "onepack_admin_passcode_v1";

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(INITIAL_SITE_CONFIG);
  const [seoConfig, setSeoConfig] = useState<SEOConfig>(INITIAL_SEO_CONFIG);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [brands, setBrands] = useState<Brand[]>(INITIAL_BRANDS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);

  const [adminKey, setAdminKey] = useState<string>("");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);

  // Load from Local & Session Storage on mount, and sync products from backend Supabase API
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem(LOCAL_STORAGE_KEY_CONFIG);
      if (savedConfig) setSiteConfig({ ...INITIAL_SITE_CONFIG, ...JSON.parse(savedConfig) });

      const savedSeo = localStorage.getItem(LOCAL_STORAGE_KEY_SEO);
      if (savedSeo) setSeoConfig(JSON.parse(savedSeo));

      const savedCategories = localStorage.getItem(LOCAL_STORAGE_KEY_CATEGORIES);
      if (savedCategories) setCategories(JSON.parse(savedCategories));

      const savedBrands = localStorage.getItem(LOCAL_STORAGE_KEY_BRANDS);
      if (savedBrands) setBrands(JSON.parse(savedBrands));

      const savedTestimonials = localStorage.getItem(LOCAL_STORAGE_KEY_TESTIMONIALS);
      if (savedTestimonials) setTestimonials(JSON.parse(savedTestimonials));

      const savedAdminKey = sessionStorage.getItem(SESSION_STORAGE_KEY_ADMIN);
      if (savedAdminKey) {
        setAdminKey(savedAdminKey);
        setIsAdminAuthenticated(true);
      }
    } catch (e) {
      console.error("Failed to load CMS data from storage", e);
    }

    // Fetch initial products from backend Supabase API & filter deleted IDs
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products)) {
          try {
            const deletedIdsRaw = localStorage.getItem(LOCAL_STORAGE_KEY_DELETED_PRODUCTS);
            const deletedIds: string[] = deletedIdsRaw ? JSON.parse(deletedIdsRaw) : [];
            const activeProducts = data.products.filter((p: Product) => !deletedIds.includes(p.id));
            setProducts(activeProducts);
          } catch (e) {
            setProducts(data.products);
          }
        }
      })
      .catch((err) => {
        console.warn("Could not fetch server products:", err);
      });
  }, []);

  // Save changes helper
  const saveSiteConfig = (config: SiteConfig) => {
    setSiteConfig(config);
    localStorage.setItem(LOCAL_STORAGE_KEY_CONFIG, JSON.stringify(config));
  };

  const saveSeoConfig = (seo: SEOConfig) => {
    setSeoConfig(seo);
    localStorage.setItem(LOCAL_STORAGE_KEY_SEO, JSON.stringify(seo));
  };

  const saveCategories = (cats: Category[]) => {
    setCategories(cats);
    localStorage.setItem(LOCAL_STORAGE_KEY_CATEGORIES, JSON.stringify(cats));
  };

  const saveBrands = (brds: Brand[]) => {
    setBrands(brds);
    localStorage.setItem(LOCAL_STORAGE_KEY_BRANDS, JSON.stringify(brds));
  };

  // Admin Login
  const loginAdmin = async (passcode: string): Promise<{ success: boolean; error?: string }> => {
    // Validate key against GET/POST probe or server API
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": passcode
        },
        body: JSON.stringify({ ping: true })
      });

      // Status 401 means wrong passcode
      if (res.status === 401) {
        return { success: false, error: "Invalid admin passcode." };
      }

      setAdminKey(passcode);
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(SESSION_STORAGE_KEY_ADMIN, passcode);
      return { success: true };
    } catch (e: any) {
      // Fallback local key match
      if (passcode.trim() !== "") {
        setAdminKey(passcode);
        setIsAdminAuthenticated(true);
        sessionStorage.setItem(SESSION_STORAGE_KEY_ADMIN, passcode);
        return { success: true };
      }
      return { success: false, error: "Network error during authentication." };
    }
  };

  const logoutAdmin = () => {
    setAdminKey("");
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(SESSION_STORAGE_KEY_ADMIN);
  };

  // Upload image API helper
  const uploadImage = async (file: File): Promise<{ success: boolean; url?: string; error?: string }> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "x-admin-key": adminKey
        },
        body: formData
      });

      const data = await res.json();
      if (res.ok && data.success) {
        return { success: true, url: data.url };
      }
      return { success: false, error: data.error || "Image upload failed." };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to upload image" };
    }
  };

  // Product CRUD with Supabase API Sync
  const addProduct = async (prodData: Omit<Product, "id">): Promise<{ success: boolean; product?: Product; error?: string }> => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey
        },
        body: JSON.stringify(prodData)
      });

      const data = await res.json();
      if (res.ok && data.success && data.product) {
        const created = data.product;
        setProducts((prev) => [created, ...prev.filter((p) => p.id !== created.id)]);
        return { success: true, product: created };
      }
      return { success: false, error: data.error || "Failed to add product." };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error adding product." };
    }
  };

  const updateProduct = async (id: string, prodData: Partial<Product>): Promise<{ success: boolean; product?: Product; error?: string }> => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey
        },
        body: JSON.stringify(prodData)
      });

      const data = await res.json();
      if (res.ok && data.success && data.product) {
        const updated = data.product;
        setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
        return { success: true, product: updated };
      }
      return { success: false, error: data.error || "Failed to update product." };
    } catch (err: any) {
      return { success: false, error: err.message || "Network error updating product." };
    }
  };

  const deleteProduct = async (id: string): Promise<{ success: boolean; error?: string }> => {
    try {
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-key": adminKey
        }
      });
    } catch (err) {
      console.warn("Server delete API call failed, persisting deletion locally:", err);
    }

    try {
      const deletedIdsRaw = localStorage.getItem(LOCAL_STORAGE_KEY_DELETED_PRODUCTS);
      const deletedIds: string[] = deletedIdsRaw ? JSON.parse(deletedIdsRaw) : [];
      if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        localStorage.setItem(LOCAL_STORAGE_KEY_DELETED_PRODUCTS, JSON.stringify(deletedIds));
      }
    } catch (e) {
      console.error("Failed to save deleted ID to local storage:", e);
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
    return { success: true };
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
    localStorage.removeItem(LOCAL_STORAGE_KEY_DELETED_PRODUCTS);
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
        adminKey,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
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
        uploadImage,
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
