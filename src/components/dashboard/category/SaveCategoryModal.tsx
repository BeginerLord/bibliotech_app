"use client"

import { useState } from "react"
import { Loader2, X } from "lucide-react"
import { CategoryModel } from "@/models/category_model"

type SaveCategoryModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (category: CategoryModel) => Promise<void>
  isCreating: boolean
}

export default function SaveCategoryModal({
  isOpen,
  onClose,
  onSave,
  isCreating,
}: SaveCategoryModalProps) {
  const [formData, setFormData] = useState<Partial<CategoryModel>>({
    name: "",
    description: ""
  })
  const [formErrors, setFormErrors] = useState({
    name: false,
    description: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (formErrors[name as "name" | "description"]) {
      setFormErrors(prev => ({ ...prev, [name]: false }))
    }
  }

  const validateForm = () => {
    const errors = {
      name: !formData.name?.trim(),
      description: !formData.description?.trim()
    }
    setFormErrors(errors)
    return !errors.name && !errors.description
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    try {
      await onSave(formData as CategoryModel)
      resetForm()
    } catch (error) {
      console.error("Error al crear la categoría:", error)
    }
  }

  const resetForm = () => {
    setFormData({ name: "", description: "" })
    setFormErrors({ name: false, description: false })
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 border border-gray-200">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">Nueva Categoría</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre <span className="text-rose-500">*</span>
              </label>
              <input
                id="name"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.name ? "border-rose-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-rose-500">
                  El nombre de la categoría es obligatorio
                </p>
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descripción <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description || ""}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.description ? "border-rose-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {formErrors.description && (
                <p className="mt-1 text-sm text-rose-500">
                  La descripción de la categoría es obligatoria
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isCreating}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 flex items-center"
          >
            {isCreating ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Creando...
              </>
            ) : (
              "Crear Categoría"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
