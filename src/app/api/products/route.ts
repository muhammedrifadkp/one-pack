import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/adminAuth";
import { getProductsFromStore, addProductToStore } from "@/lib/productsStore";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await getProductsFromStore();
    return NextResponse.json(
      { success: true, products },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
        }
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const auth = verifyAdminAuth(req);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const body = await req.json();
    if (!body.name || !body.categoryId || !body.categoryName) {
      return NextResponse.json(
        { success: false, error: "Missing required product fields (name, categoryId, categoryName)" },
        { status: 400 }
      );
    }

    const createdProduct = await addProductToStore({
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      categoryId: body.categoryId,
      categoryName: body.categoryName,
      image: body.image || "/images/placeholder.jpg",
      gallery: Array.isArray(body.gallery) ? body.gallery : [body.image || "/images/placeholder.jpg"],
      description: body.description || "",
      sizes: Array.isArray(body.sizes) ? body.sizes : (typeof body.sizes === "string" ? body.sizes.split(",").map((s: string) => s.trim()) : []),
      moq: body.moq || "100 Pcs",
      material: body.material || "Eco Paper",
      usage: body.usage || "Packaging",
      packagingDetails: body.packagingDetails || "Standard Cartons",
      foodGrade: Boolean(body.foodGrade),
      ecoFriendly: Boolean(body.ecoFriendly ?? true),
      isFeatured: Boolean(body.isFeatured)
    });

    return NextResponse.json({ success: true, product: createdProduct }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
