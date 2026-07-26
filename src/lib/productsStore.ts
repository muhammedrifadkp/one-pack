import { Product } from "@/types";
import { SEED_PRODUCTS } from "@/data/seedProducts";

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
        } else {
          // Table exists but is empty -> trigger auto-seed
          return await autoSeedSupabase(supabaseUrl, supabaseKey);
        }
      }
    } catch (err) {
      console.warn("Failed to fetch products from Supabase:", err);
    }
  }

  return SEED_PRODUCTS;
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
      console.error("Supabase insert failed:", err);
    }
  }

  return newProduct;
}

export async function updateProductInStore(id: string, updates: Partial<Product>): Promise<Product | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const fullPayload: Record<string, any> = {
    id,
    name: updates.name || "Updated Product",
    slug: updates.slug || id,
    category_id: updates.categoryId || "food-containers",
    category_name: updates.categoryName || "Food Containers",
    image: updates.image || "/products/disposable-rectangle-black-container.png",
    gallery: updates.gallery || (updates.image ? [updates.image] : []),
    description: updates.description || "",
    sizes: updates.sizes || [],
    moq: updates.moq || "100 Pcs",
    material: updates.material || "",
    usage: updates.usage || "",
    packaging_details: updates.packagingDetails || "",
    food_grade: updates.foodGrade ?? true,
    eco_friendly: updates.ecoFriendly ?? true,
    is_featured: updates.isFeatured ?? false
  };

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
      console.error("Supabase update/upsert failed:", err);
    }
  }

  // Fallback returned product object
  return {
    id,
    name: updates.name || "Updated Product",
    slug: updates.slug || id,
    categoryId: updates.categoryId || "food-containers",
    categoryName: updates.categoryName || "Food Containers",
    image: updates.image || "/products/disposable-rectangle-black-container.png",
    gallery: updates.gallery || [],
    description: updates.description || "",
    sizes: updates.sizes || [],
    moq: updates.moq || "100 Pcs",
    material: updates.material || "",
    usage: updates.usage || "",
    packagingDetails: updates.packagingDetails || "",
    foodGrade: updates.foodGrade ?? true,
    ecoFriendly: updates.ecoFriendly ?? true,
    isFeatured: updates.isFeatured ?? false
  };
}

export async function deleteProductFromStore(id: string): Promise<boolean> {
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
