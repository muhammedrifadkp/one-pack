import { NextResponse } from "next/server";
import { SEED_PRODUCTS } from "@/data/seedProducts";

export async function GET() {
  return handleSeed();
}

export async function POST() {
  return handleSeed();
}

async function handleSeed() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { success: false, error: "Supabase environment variables are missing." },
      { status: 500 }
    );
  }

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

    // Upsert into Supabase products table
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

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { success: false, error: `Supabase seeding failed: ${errText}` },
        { status: res.status }
      );
    }

    const inserted = await res.json();
    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${inserted.length || SEED_PRODUCTS.length} products to Supabase.`,
      count: inserted.length || SEED_PRODUCTS.length
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to seed Supabase database." },
      { status: 500 }
    );
  }
}
