"use client";

import React, { useState } from "react";
import { AlertTriangle, X, Trash2 } from "lucide-react";
import { Product } from "@/types";

interface DeleteConfirmModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  product,
  isOpen,
  onClose,
  onConfirm
}) => {
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleDelete = async () => {
    setLoading(true);
    await onConfirm();
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 animate-in fade-in zoom-in duration-200">
        <div className="p-6 text-center space-y-4">
          <div className="w-14 h-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-100">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 font-heading">Delete Product?</h3>
            <p className="text-xs text-gray-500 mt-1">
              Are you sure you want to delete <span className="font-bold text-gray-800">"{product.name}"</span>? This action cannot be undone.
            </p>
          </div>

          <div className="p-3 bg-gray-50 rounded-2xl flex items-center gap-3 text-left border border-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-12 h-12 rounded-xl object-cover border border-gray-200 shrink-0"
            />
            <div className="truncate">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C89A2B]">
                {product.categoryName}
              </span>
              <h4 className="text-xs font-bold text-gray-800 truncate">{product.name}</h4>
              <p className="text-[11px] text-gray-400">MOQ: {product.moq}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={loading}
              className="flex-1 py-3 border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              <span>{loading ? "Deleting..." : "Delete"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
