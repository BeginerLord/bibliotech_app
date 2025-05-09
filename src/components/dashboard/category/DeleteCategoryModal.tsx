"use client"

import { Loader2 } from "lucide-react"
import { CategoryModel } from "@/models/category_model"

type DeleteCategoryModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  category: CategoryModel | null
  isDeleting: boolean
}

export default function DeleteCategoryModal({
  isOpen,
  onClose,
  onConfirm,
  category,
  isDeleting,
}: DeleteCategoryModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 border border-gray-200">
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Estás seguro?</h3>
          <p className="text-gray-500">
            Esta acción eliminará permanentemente la categoría "{category?.name}" y podría afectar a los libros
            asociados. Esta acción no se puede deshacer.
          </p>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 flex items-center"
          >
            {isDeleting ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Eliminando...
              </>
            ) : (
              "Eliminar"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
