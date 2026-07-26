import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/adminAuth";
import { updateProductInStore, deleteProductFromStore } from "@/lib/productsStore";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = verifyAdminAuth(req);
  if (!auth.authorized) {
    return auth.response!;
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ success: false, error: "Missing product ID parameter" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const updated = await updateProductInStore(id, body);

    if (!updated) {
      return NextResponse.json({ success: false, error: "Product not found or update failed" }, { status: 404 });
    }

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = verifyAdminAuth(req);
  if (!auth.authorized) {
    return auth.response!;
  }

  const { id } = await params;
  if (!id) {
    return NextResponse.json({ success: false, error: "Missing product ID parameter" }, { status: 400 });
  }

  try {
    const success = await deleteProductFromStore(id);
    if (!success) {
      return NextResponse.json({ success: false, error: "Product not found or delete failed" }, { status: 404 });
    }

    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}
