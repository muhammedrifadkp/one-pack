"use client";

import React, { useState, useEffect } from "react";
import { X, Upload, Plus, Trash2, Image as ImageIcon, Check, Loader2, RefreshCw } from "lucide-react";
import { Product } from "@/types";
import { useCms } from "@/context/CmsContext";

interface ProductAdminFormModalProps {
  product?: Product | null; // null for add mode, product object for edit mode
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
}

export const ProductAdminFormModal: React.FC<ProductAdminFormModalProps> = ({
  product,
  isOpen,
  onClose,
  onSaved
}) => {
  const { categories, addProduct, updateProduct, uploadImage } = useCms();

  const isEditMode = Boolean(product);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [autoSlug, setAutoSlug] = useState(true);
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "custom-boxes");
  const [image, setImage] = useState("");
  const [gallery, setGallery] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [sizesInput, setSizesInput] = useState("");
  const [moq, setMoq] = useState("100 Pcs");
  const [material, setMaterial] = useState("Eco Kraft Paper");
  const [usage, setUsage] = useState("Food & Beverage Packaging");
  const [packagingDetails, setPackagingDetails] = useState("Standard Master Carton Box");
  const [foodGrade, setFoodGrade] = useState(true);
  const [ecoFriendly, setEcoFriendly] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);

  const [uploadingMain, setUploadingMain] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setSlug(product.slug || "");
      setAutoSlug(false);
      setCategoryId(product.categoryId || categories[0]?.id || "");
      setImage(product.image || "");
      setGallery(product.gallery || []);
      setDescription(product.description || "");
      setSizesInput(Array.isArray(product.sizes) ? product.sizes.join(", ") : "");
      setMoq(product.moq || "100 Pcs");
      setMaterial(product.material || "");
      setUsage(product.usage || "");
      setPackagingDetails(product.packagingDetails || "");
      setFoodGrade(Boolean(product.foodGrade));
      setEcoFriendly(Boolean(product.ecoFriendly));
      setIsFeatured(Boolean(product.isFeatured));
    } else {
      // Reset defaults for Add
      setName("");
      setSlug("");
      setAutoSlug(true);
      setCategoryId(categories[0]?.id || "");
      setImage("");
      setGallery([]);
      setDescription("");
      setSizesInput("Small, Medium, Large");
      setMoq("500 Pcs");
      setMaterial("100% Recyclable Kraft");
      setUsage("Takeaway & Delivery");
      setPackagingDetails("500 Units / Carton");
      setFoodGrade(true);
      setEcoFriendly(true);
      setIsFeatured(false);
    }
    setErrorMsg("");
  }, [product, categories, isOpen]);

  // Handle auto slug creation
  const handleNameChange = (val: string) => {
    setName(val);
    if (autoSlug) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generatedSlug);
    }
  };

  // Helper to compress image files on client browser before upload
  const compressImageFile = async (file: File, maxWidth = 1000, quality = 0.8): Promise<File> => {
    return new Promise((resolve) => {
      if (file.type.includes("svg") || file.size < 200000) {
        return resolve(file);
      }
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, ".webp"), {
                  type: "image/webp",
                  lastModified: Date.now()
                });
                resolve(compressedFile);
              } else {
                resolve(file);
              }
            },
            "image/webp",
            quality
          );
        } else {
          resolve(file);
        }
      };
      img.onerror = () => resolve(file);
      img.src = url;
    });
  };

  const handleMainFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMain(true);
    setErrorMsg("");

    const compressed = await compressImageFile(file);
    const res = await uploadImage(compressed);
    setUploadingMain(false);

    if (res.success && res.url) {
      setImage(res.url);
      if (gallery.length === 0) {
        setGallery([res.url]);
      }
    } else {
      setErrorMsg(res.error || "Failed to upload image.");
    }
  };

  const handleGalleryFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadingGallery(true);
    setErrorMsg("");

    const uploadedUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const compressed = await compressImageFile(files[i]);
      const res = await uploadImage(compressed);
      if (res.success && res.url) {
        uploadedUrls.push(res.url);
      }
    }

    setUploadingGallery(false);
    if (uploadedUrls.length > 0) {
      setGallery((prev) => [...prev, ...uploadedUrls]);
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGallery((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Product name is required.");
      return;
    }
    if (!image.trim()) {
      setErrorMsg("Please upload a primary product image or provide an image URL.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    const selectedCategoryObj = categories.find((c) => c.id === categoryId) || categories[0];
    const categoryName = selectedCategoryObj ? selectedCategoryObj.name : "Packaging";

    const sizesArray = sizesInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const productPayload = {
      name: name.trim(),
      slug: slug.trim() || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      categoryId,
      categoryName,
      image: image.trim(),
      gallery: gallery.length > 0 ? gallery : [image.trim()],
      description: description.trim(),
      sizes: sizesArray.length > 0 ? sizesArray : ["Standard"],
      moq: moq.trim() || "100 Pcs",
      material: material.trim(),
      usage: usage.trim(),
      packagingDetails: packagingDetails.trim(),
      foodGrade,
      ecoFriendly,
      isFeatured
    };

    let result;
    if (isEditMode && product) {
      result = await updateProduct(product.id, productPayload);
    } else {
      result = await addProduct(productPayload);
    }

    setIsSubmitting(false);

    if (result.success) {
      onSaved();
      onClose();
    } else {
      setErrorMsg(result.error || "Failed to save product.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full my-8 shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-lg font-bold text-gray-900 font-heading">
              {isEditMode ? "Edit Product" : "Add New Product"}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {isEditMode ? `Updating "${product?.name}"` : "Fill in product specifications and images"}
            </p>
          </div>
          <button
            onClick={onClose}
            suppressHydrationWarning
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} suppressHydrationWarning className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          {errorMsg && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-600 rounded-xl font-semibold">
              {errorMsg}
            </div>
          )}

          {/* Section 1: Basic Information */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C89A2B] border-b border-gray-100 pb-1.5">
              Basic Product Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 block">Product Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Eco Printed Burger Box"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#C89A2B] focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 flex items-center justify-between">
                  <span>URL Slug</span>
                  <button
                    type="button"
                    onClick={() => {
                      setAutoSlug(!autoSlug);
                      if (!autoSlug) {
                        setSlug(name.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
                      }
                    }}
                    className="text-[10px] text-[#C89A2B] font-bold hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    {autoSlug ? "Auto Mode" : "Manual Mode"}
                  </button>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => {
                    setAutoSlug(false);
                    setSlug(e.target.value);
                  }}
                  placeholder="e.g. eco-printed-burger-box"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#C89A2B] focus:outline-none font-mono text-[11px]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 block">Category *</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#C89A2B] focus:outline-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 block">Minimum Order Quantity (MOQ)</label>
                <input
                  type="text"
                  value={moq}
                  onChange={(e) => setMoq(e.target.value)}
                  placeholder="e.g. 500 Pcs"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#C89A2B] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-gray-700 block">Product Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe key features, eco benefits, and customization options..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#C89A2B] focus:outline-none leading-relaxed"
              />
            </div>
          </div>

          {/* Section 2: Product Images & Media */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C89A2B] border-b border-gray-100 pb-1.5">
              Product Images
            </h3>

            {/* Primary Main Image Upload */}
            <div className="space-y-2">
              <label className="font-bold text-gray-700 block">Primary Image *</label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {image ? (
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-gray-200 shrink-0 group bg-gray-50">
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImage("")}
                      className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                )}

                <div className="flex-1 space-y-2">
                  <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C89A2B]/10 hover:bg-[#C89A2B]/20 text-[#C89A2B] font-bold rounded-xl cursor-pointer transition-colors text-xs border border-[#C89A2B]/30">
                    {uploadingMain ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4" />
                        <span>Upload File</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleMainFileChange}
                      className="hidden"
                      disabled={uploadingMain}
                    />
                  </label>

                  <div className="text-[11px] text-gray-400">or enter direct image URL:</div>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#C89A2B] focus:outline-none font-mono text-[11px]"
                  />
                </div>
              </div>
            </div>

            {/* Gallery Images Upload */}
            <div className="space-y-2">
              <label className="font-bold text-gray-700 block">Gallery Images (Optional)</label>
              <div className="flex flex-wrap items-center gap-3">
                {gallery.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-200 shrink-0 group bg-gray-50"
                  >
                    <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveGalleryImage(idx)}
                      className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <label className="w-16 h-16 rounded-xl border-2 border-dashed border-gray-200 hover:border-[#C89A2B] bg-gray-50 hover:bg-[#FDF7EA] flex flex-col items-center justify-center text-gray-400 hover:text-[#C89A2B] cursor-pointer transition-colors">
                  {uploadingGallery ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span className="text-[9px] font-bold mt-0.5">Add</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryFileChange}
                    className="hidden"
                    disabled={uploadingGallery}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Section 3: Technical Specifications */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C89A2B] border-b border-gray-100 pb-1.5">
              Technical Specifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 block">Available Sizes (Comma Separated)</label>
                <input
                  type="text"
                  value={sizesInput}
                  onChange={(e) => setSizesInput(e.target.value)}
                  placeholder="e.g. 250ml, 500ml, 750ml, 1000ml"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#C89A2B] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 block">Material</label>
                <input
                  type="text"
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  placeholder="e.g. 300 GSM Virgin Kraft Paper"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#C89A2B] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-gray-700 block">Recommended Usage</label>
                <input
                  type="text"
                  value={usage}
                  onChange={(e) => setUsage(e.target.value)}
                  placeholder="e.g. Hot Coffees, Milkshakes, Juices"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#C89A2B] focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-gray-700 block">Packaging & Carton Details</label>
                <input
                  type="text"
                  value={packagingDetails}
                  onChange={(e) => setPackagingDetails(e.target.value)}
                  placeholder="e.g. 1000 pcs / Master Box (5-Ply)"
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-[#C89A2B] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Badges & Featured Toggle */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#C89A2B] border-b border-gray-100 pb-1.5">
              Badges & Visibility
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 bg-gray-50 cursor-pointer hover:bg-white transition-colors">
                <input
                  type="checkbox"
                  checked={ecoFriendly}
                  onChange={(e) => setEcoFriendly(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C89A2B] focus:ring-[#C89A2B]"
                />
                <span className="font-bold text-gray-800">Eco-Friendly</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-200 bg-gray-50 cursor-pointer hover:bg-white transition-colors">
                <input
                  type="checkbox"
                  checked={foodGrade}
                  onChange={(e) => setFoodGrade(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C89A2B] focus:ring-[#C89A2B]"
                />
                <span className="font-bold text-gray-800">Food Grade</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl border border-amber-200 bg-amber-50/50 cursor-pointer hover:bg-amber-50 transition-colors">
                <input
                  type="checkbox"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C89A2B] focus:ring-[#C89A2B]"
                />
                <span className="font-bold text-[#C89A2B]">Featured Product</span>
              </label>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-5 border border-gray-200 text-gray-700 font-bold uppercase tracking-wider rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-3 px-6 bg-[#C89A2B] hover:bg-[#B38822] text-white font-bold uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>{isEditMode ? "Save Changes" : "Create Product"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
