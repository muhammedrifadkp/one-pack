import { NextRequest, NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/adminAuth";

export async function POST(req: NextRequest) {
  const auth = verifyAdminAuth(req);
  if (!auth.authorized) {
    return auth.response!;
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, error: "No image file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Option 1: Cloudinary Upload if credentials exist
    const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const cloudinaryUploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

    if (cloudinaryCloudName && cloudinaryUploadPreset) {
      try {
        const cloudFormData = new FormData();
        cloudFormData.append("file", new Blob([buffer], { type: file.type }), file.name);
        cloudFormData.append("upload_preset", cloudinaryUploadPreset);

        const cloudRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/upload`,
          {
            method: "POST",
            body: cloudFormData
          }
        );

        if (cloudRes.ok) {
          const cloudData = await cloudRes.json();
          return NextResponse.json({
            success: true,
            url: cloudData.secure_url || cloudData.url
          });
        }
      } catch (err) {
        console.warn("Cloudinary upload failed, using Data URL fallback:", err);
      }
    }

    // Option 2: Supabase Storage Upload if credentials exist
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const bucketName = process.env.SUPABASE_STORAGE_BUCKET || "products";

    if (supabaseUrl && supabaseKey) {
      try {
        const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const uploadRes = await fetch(`${supabaseUrl}/storage/v1/object/${bucketName}/${fileName}`, {
          method: "POST",
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${supabaseKey}`,
            "Content-Type": file.type || "image/jpeg"
          },
          body: buffer
        });

        if (uploadRes.ok) {
          const publicUrl = `${supabaseUrl}/storage/v1/object/public/${bucketName}/${fileName}`;
          return NextResponse.json({
            success: true,
            url: publicUrl
          });
        }
      } catch (err) {
        console.warn("Supabase storage upload failed, using Data URL fallback:", err);
      }
    }

    // Option 3: Base64 Data URL fallback (Zero dependency, instant local & serverless support)
    const base64Image = `data:${file.type || "image/jpeg"};base64,${buffer.toString("base64")}`;
    return NextResponse.json({
      success: true,
      url: base64Image
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to upload image" },
      { status: 500 }
    );
  }
}
