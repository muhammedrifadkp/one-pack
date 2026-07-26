import { Product } from "@/types";
import { SEED_PRODUCTS } from "@/data/seedProducts";

// In-memory fallback cache for server runtime
let memoryProducts: Product[] = [...SEED_PRODUCTS];

// Auto-seed helper when Supabase DB is empty
async function autoSeedSupabase(supabaseUrl: string, supabaseKey: string): Promise<Product[]> {
  try {
    const payload = SEED_PRODUCTS.map((prod) => ({
      id: prod.id,
      name: prod.name,
      slug: prod.slug,
      category_id: prod.categoryId,
      category_name: prod.categoryName,
      image: prod.image,
      gallery: prod.gallery,
      description: prod.description,
      sizes: prod.sizes,
      moq: prod.moq,
      material: prod.material,
      usage: prod.usage,
      packaging_details: prod.packagingDetails,
      food_grade: prod.foodGrade,
      eco_friendly: prod.ecoFriendly,
      is_featured: prod.isFeatured
    }));

    const res = await fetch(`${supabaseUrl}/rest/v1/products`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=representation"
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      console.log("Successfully auto-seeded Supabase products table.");
    }
  } catch (err) {
    console.warn("Auto-seed to Supabase failed:", err);
  }
  memoryProducts = [...SEED_PRODUCTS];
  return SEED_PRODUCTS;
}

export async function getProductsFromStore(): Promise<Product[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      const res = await fetch(`${supabaseUrl}/rest/v1/products?select=*&order=is_featured.desc,name.asc`, {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        },
        cache: "no-store"
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          const list = data.map((item: any) => ({
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
          memoryProducts = list;
          return list;
        } else {
          // Table exists but is empty -> trigger auto-seed
          return await autoSeedSupabase(supabaseUrl, supabaseKey);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch products from Supabase:", err);
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

  memoryProducts = [newProduct, ...memoryProducts.filter((p) => p.id !== newProduct.id)];

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
          const createdItem: Product = {
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
          memoryProducts = [createdItem, ...memoryProducts.filter((p) => p.id !== createdItem.id)];
          return createdItem;
        }
      }
    } catch (err) {
      console.error("Supabase insert failed:", err);
    }
  }

  return newProduct;
}

export async function updateProductInStore(id: string, updates: Partial<Product>): Promise<Product | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const updatedLocal = memoryProducts.find((p) => p.id === id);
  const fullPayload: Record<string, any> = {
    id,
    name: updates.name || updatedLocal?.name || "Updated Product",
    slug: updates.slug || updatedLocal?.slug || id,
    category_id: updates.categoryId || updatedLocal?.categoryId || "food-containers",
    category_name: updates.categoryName || updatedLocal?.categoryName || "Food Containers",
    image: updates.image || updatedLocal?.image || "/products/disposable-rectangle-black-container.png",
    gallery: updates.gallery || updatedLocal?.gallery || (updates.image ? [updates.image] : []),
    description: updates.description ?? updatedLocal?.description ?? "",
    sizes: updates.sizes || updatedLocal?.sizes || [],
    moq: updates.moq || updatedLocal?.moq || "100 Pcs",
    material: updates.material ?? updatedLocal?.material ?? "",
    usage: updates.usage ?? updatedLocal?.usage ?? "",
    packaging_details: updates.packagingDetails ?? updatedLocal?.packagingDetails ?? "",
    food_grade: updates.foodGrade ?? updatedLocal?.foodGrade ?? true,
    eco_friendly: updates.ecoFriendly ?? updatedLocal?.ecoFriendly ?? true,
    is_featured: updates.isFeatured ?? updatedLocal?.isFeatured ?? false
  };

  const updatedObj: Product = {
    id,
    name: fullPayload.name,
    slug: fullPayload.slug,
    categoryId: fullPayload.category_id,
    categoryName: fullPayload.category_name,
    image: fullPayload.image,
    gallery: fullPayload.gallery,
    description: fullPayload.description,
    sizes: fullPayload.sizes,
    moq: fullPayload.moq,
    material: fullPayload.material,
    usage: fullPayload.usage,
    packagingDetails: fullPayload.packaging_details,
    foodGrade: fullPayload.food_grade,
    ecoFriendly: fullPayload.eco_friendly,
    isFeatured: fullPayload.is_featured
  };

  memoryProducts = memoryProducts.map((p) => (p.id === id ? updatedObj : p));

  if (supabaseUrl && supabaseKey) {
    try {
      const patchPayload: Record<string, any> = {};
      if (updates.name !== undefined) patchPayload.name = updates.name;
      if (updates.slug !== undefined) patchPayload.slug = updates.slug;
      if (updates.categoryId !== undefined) patchPayload.category_id = updates.categoryId;
      if (updates.categoryName !== undefined) patchPayload.category_name = updates.categoryName;
      if (updates.image !== undefined) patchPayload.image = updates.image;
      if (updates.gallery !== undefined) patchPayload.gallery = updates.gallery;
      if (updates.description !== undefined) patchPayload.description = updates.description;
      if (updates.sizes !== undefined) patchPayload.sizes = updates.sizes;
      if (updates.moq !== undefined) patchPayload.moq = updates.moq;
      if (updates.material !== undefined) patchPayload.material = updates.material;
      if (updates.usage !== undefined) patchPayload.usage = updates.usage;
      if (updates.packagingDetails !== undefined) patchPayload.packaging_details = updates.packagingDetails;
      if (updates.foodGrade !== undefined) patchPayload.food_grade = updates.foodGrade;
      if (updates.ecoFriendly !== undefined) patchPayload.eco_friendly = updates.ecoFriendly;
      if (updates.isFeatured !== undefined) patchPayload.is_featured = updates.isFeatured;

      // 1. Try PATCH update
      const res = await fetch(`${supabaseUrl}/rest/v1/products?id=eq.${id}`, {
        method: "PATCH",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation"
        },
        body: JSON.stringify(patchPayload)
      });

      if (res.ok) {
        const returned = await res.json();
        if (Array.isArray(returned) && returned.length > 0) {
          const item = returned[0];
          const result: Product = {
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
          memoryProducts = memoryProducts.map((p) => (p.id === id ? result : p));
          return result;
        }
      }

      // 2. If PATCH returned no rows (e.g. legacy id), UPSERT product into Supabase
      const upsertRes = await fetch(`${supabaseUrl}/rest/v1/products`, {
        method: "POST",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates,return=representation"
        },
        body: JSON.stringify([fullPayload])
      });

      if (upsertRes.ok) {
        const returned = await upsertRes.json();
        if (Array.isArray(returned) && returned[0]) {
          const item = returned[0];
          const result: Product = {
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
          memoryProducts = memoryProducts.map((p) => (p.id === id ? result : p));
          return result;
        }
      }
    } catch (err) {
      console.error("Supabase update/upsert failed:", err);
    }
  }

  return updatedObj;
}

export async function deleteProductFromStore(id: string): Promise<boolean> {
  memoryProducts = memoryProducts.filter((p) => p.id !== id);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseKey) {
    try {
      await fetch(`${supabaseUrl}/rest/v1/products?id=eq.${id}`, {
        method: "DELETE",
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`
        }
      });
    } catch (err) {
      console.warn("Supabase delete request error:", err);
    }
  }

  return true;
}
