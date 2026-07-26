import { Product } from "@/types";
import { INITIAL_PRODUCTS } from "@/data/initialData";

// In-memory fallback cache for server runtime
let memoryProducts: Product[] = [...INITIAL_PRODUCTS];

export async function getProductsFromStore(): Promise<Product[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/products?select=*&order=isFeatured.desc,name.asc`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        },
        next: { revalidate: 60 }
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data.map((item: any) => ({
            id: item.id,
            name: item.name,
            slug: item.slug || item.id,
            categoryId: item.category_id || item.categoryId || "custom-boxes",
            categoryName: item.category_name || item.categoryName || "Custom Boxes",
            image: item.image,
            gallery: Array.isArray(item.gallery) ? item.gallery : (typeof item.gallery === "string" ? JSON.parse(item.gallery) : [item.image]),
            description: item.description || "",
            sizes: Array.isArray(item.sizes) ? item.sizes : (typeof item.sizes === "string" ? JSON.parse(item.sizes) : []),
            moq: item.moq || "100 Pcs",
            material: item.material || "",
            usage: item.usage || "",
            packagingDetails: item.packaging_details || item.packagingDetails || "",
            foodGrade: Boolean(item.food_grade ?? item.foodGrade),
            ecoFriendly: Boolean(item.eco_friendly ?? item.ecoFriendly),
            isFeatured: Boolean(item.is_featured ?? item.isFeatured)
          }));
        }
      }
    } catch (err) {
      console.warn("Failed to fetch products from Supabase, falling back to memory store:", err);
    }
  }

  return memoryProducts;
}

export async function addProductToStore(productData: Omit<Product, "id">): Promise<Product> {
  const newId = `prod-${Date.now()}`;
  const newProduct: Product = {
    ...productData,
    id: newId,
    slug: productData.slug || productData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  };

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const payload = {
        id: newProduct.id,
        name: newProduct.name,
        slug: newProduct.slug,
        category_id: newProduct.categoryId,
        category_name: newProduct.categoryName,
        image: newProduct.image,
        gallery: newProduct.gallery,
        description: newProduct.description,
        sizes: newProduct.sizes,
        moq: newProduct.moq,
        material: newProduct.material,
        usage: newProduct.usage,
        packaging_details: newProduct.packagingDetails,
        food_grade: newProduct.foodGrade,
        eco_friendly: newProduct.ecoFriendly,
        is_featured: newProduct.isFeatured
      };

      const res = await fetch(`${supabaseUrl}/rest/v1/products`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation"
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const returned = await res.json();
        if (returned && returned[0]) {
          const item = returned[0];
          return {
            id: item.id,
            name: item.name,
            slug: item.slug,
            categoryId: item.category_id || item.categoryId,
            categoryName: item.category_name || item.categoryName,
            image: item.image,
            gallery: item.gallery || [],
            description: item.description,
            sizes: item.sizes || [],
            moq: item.moq,
            material: item.material,
            usage: item.usage,
            packagingDetails: item.packaging_details || item.packagingDetails,
            foodGrade: item.food_grade ?? item.foodGrade,
            ecoFriendly: item.eco_friendly ?? item.ecoFriendly,
            isFeatured: item.is_featured ?? item.isFeatured
          };
        }
      }
    } catch (err) {
      console.error("Supabase insert failed, adding to memory fallback:", err);
    }
  }

  // Fallback to memory
  memoryProducts = [newProduct, ...memoryProducts];
  return newProduct;
}

export async function updateProductInStore(id: string, updates: Partial<Product>): Promise<Product | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const payload: Record<string, any> = {};
      if (updates.name !== undefined) payload.name = updates.name;
      if (updates.slug !== undefined) payload.slug = updates.slug;
      if (updates.categoryId !== undefined) payload.category_id = updates.categoryId;
      if (updates.categoryName !== undefined) payload.category_name = updates.categoryName;
      if (updates.image !== undefined) payload.image = updates.image;
      if (updates.gallery !== undefined) payload.gallery = updates.gallery;
      if (updates.description !== undefined) payload.description = updates.description;
      if (updates.sizes !== undefined) payload.sizes = updates.sizes;
      if (updates.moq !== undefined) payload.moq = updates.moq;
      if (updates.material !== undefined) payload.material = updates.material;
      if (updates.usage !== undefined) payload.usage = updates.usage;
      if (updates.packagingDetails !== undefined) payload.packaging_details = updates.packagingDetails;
      if (updates.foodGrade !== undefined) payload.food_grade = updates.foodGrade;
      if (updates.ecoFriendly !== undefined) payload.eco_friendly = updates.ecoFriendly;
      if (updates.isFeatured !== undefined) payload.is_featured = updates.isFeatured;

      const res = await fetch(`${supabaseUrl}/rest/v1/products?id=eq.${id}`, {
        method: "PATCH",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation"
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const returned = await res.json();
        if (returned && returned[0]) {
          const item = returned[0];
          return {
            id: item.id,
            name: item.name,
            slug: item.slug,
            categoryId: item.category_id || item.categoryId,
            categoryName: item.category_name || item.categoryName,
            image: item.image,
            gallery: item.gallery || [],
            description: item.description,
            sizes: item.sizes || [],
            moq: item.moq,
            material: item.material,
            usage: item.usage,
            packagingDetails: item.packaging_details || item.packagingDetails,
            foodGrade: item.food_grade ?? item.foodGrade,
            ecoFriendly: item.eco_friendly ?? item.ecoFriendly,
            isFeatured: item.is_featured ?? item.isFeatured
          };
        }
      }
    } catch (err) {
      console.error("Supabase update failed, updating memory fallback:", err);
    }
  }

  let updatedProd: Product | null = null;
  memoryProducts = memoryProducts.map((p) => {
    if (p.id === id) {
      updatedProd = { ...p, ...updates };
      return updatedProd;
    }
    return p;
  });

  return updatedProd;
}

export async function deleteProductFromStore(id: string): Promise<boolean> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/products?id=eq.${id}`, {
        method: "DELETE",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        }
      });
      if (res.ok) {
        memoryProducts = memoryProducts.filter((p) => p.id !== id);
        return true;
      }
    } catch (err) {
      console.error("Supabase delete failed, removing from memory fallback:", err);
    }
  }

  const initialLength = memoryProducts.length;
  memoryProducts = memoryProducts.filter((p) => p.id !== id);
  return memoryProducts.length < initialLength;
}
