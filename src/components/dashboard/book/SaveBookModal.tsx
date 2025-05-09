"use client"

import { useState } from "react"
import { Loader2, X } from "lucide-react"
import { CreateBookModel } from "@/models/book_model"

type SaveBookModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (book: CreateBookModel) => Promise<void>
  isCreating: boolean
  categories: { categoryUuid: string; name: string }[]
}

interface FormErrors {
  title: boolean
  publicationDate: boolean
  isbn: boolean
  quantityPage: boolean
  categoryUuid: boolean
  cantidadDeCopies: boolean
  authorsUuids: boolean
}

export default function SaveBookModal({
  isOpen,
  onClose,
  onSave,
  isCreating,
  categories,
}: SaveBookModalProps) {
  const [formData, setFormData] = useState<CreateBookModel>({
    title: "",
    publicationDate: new Date().toISOString().split("T")[0], // "YYYY-MM-DD"
    quantityPage: 0,
    isbn: "",
    categoryUuid: "",
    cantidadDeCopies: 1,
    authorsUuids: [],
  })

  const [formErrors, setFormErrors] = useState<FormErrors>({
    title: false,
    publicationDate: false,
    isbn: false,
    quantityPage: false,
    categoryUuid: false,
    cantidadDeCopies: false,
    authorsUuids: false,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    if (name === "quantityPage" || name === "cantidadDeCopies") {
      setFormData(prev => ({
        ...prev,
        [name]: Number(value),
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: false }))
    }
  }

  const handleAuthorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arr = e.target.value
      .split(",")
      .map(s => s.trim())
      .filter(s => s)
    setFormData(prev => ({ ...prev, authorsUuids: arr }))
    if (formErrors.authorsUuids) {
      setFormErrors(prev => ({ ...prev, authorsUuids: false }))
    }
  }

  const validateForm = () => {
    const errors: FormErrors = {
      title: !formData.title.trim(),
      publicationDate: !formData.publicationDate.trim(),
      isbn: !formData.isbn.trim(),
      quantityPage: formData.quantityPage <= 0,
      categoryUuid: !formData.categoryUuid.trim(),
      cantidadDeCopies: formData.cantidadDeCopies <= 0,
      authorsUuids: formData.authorsUuids.length === 0,
    }
    setFormErrors(errors)
    return !Object.values(errors).some(Boolean)
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    try {
      await onSave(formData)
      resetForm()
    } catch (error) {
      console.error("Error al crear el libro:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      publicationDate: new Date().toISOString().split("T")[0],
      quantityPage: 0,
      isbn: "",
      categoryUuid: "",
      cantidadDeCopies: 1,
      authorsUuids: [],
    })
    setFormErrors({
      title: false,
      publicationDate: false,
      isbn: false,
      quantityPage: false,
      categoryUuid: false,
      cantidadDeCopies: false,
      authorsUuids: false,
    })
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4 border border-gray-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4 sticky top-0 bg-white">
          <h3 className="text-lg font-semibold text-gray-900">Nuevo Libro</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Título <span className="text-rose-500">*</span>
              </label>
              <input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.title ? "border-rose-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {formErrors.title && (
                <p className="mt-1 text-sm text-rose-500">El título es obligatorio</p>
              )}
            </div>

            {/* Authors (UUIDs) */}
            <div>
              <label htmlFor="authorsUuids" className="block text-sm font-medium text-gray-700 mb-1">
                Autores (UUIDs) <span className="text-rose-500">*</span>
              </label>
              <input
                id="authorsUuids"
                name="authorsUuids"
                value={formData.authorsUuids.join(",")}
                onChange={handleAuthorsChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.authorsUuids ? "border-rose-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {formErrors.authorsUuids && (
                <p className="mt-1 text-sm text-rose-500">Debes indicar al menos un autor</p>
              )}
            </div>

            {/* ISBN */}
            <div>
              <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">
                ISBN <span className="text-rose-500">*</span>
              </label>
              <input
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.isbn ? "border-rose-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {formErrors.isbn && (
                <p className="mt-1 text-sm text-rose-500">El ISBN es obligatorio</p>
              )}
            </div>

            {/* Publication Date */}
            <div>
              <label htmlFor="publicationDate" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de publicación <span className="text-rose-500">*</span>
              </label>
              <input
                id="publicationDate"
                name="publicationDate"
                type="date"
                value={formData.publicationDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.publicationDate ? "border-rose-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {formErrors.publicationDate && (
                <p className="mt-1 text-sm text-rose-500">La fecha es obligatoria</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="categoryUuid" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría <span className="text-rose-500">*</span>
              </label>
              <select
                id="categoryUuid"
                name="categoryUuid"
                value={formData.categoryUuid}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.categoryUuid ? "border-rose-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              >
                <option value="">Seleccionar categoría</option>
                {categories.map(cat => (
                  <option key={cat.categoryUuid} value={cat.categoryUuid}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {formErrors.categoryUuid && (
                <p className="mt-1 text-sm text-rose-500">La categoría es obligatoria</p>
              )}
            </div>

            {/* Quantity Page */}
            <div>
              <label htmlFor="quantityPage" className="block text-sm font-medium text-gray-700 mb-1">
                Páginas <span className="text-rose-500">*</span>
              </label>
              <input
                id="quantityPage"
                name="quantityPage"
                type="number"
                min="1"
                value={formData.quantityPage}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.quantityPage ? "border-rose-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {formErrors.quantityPage && (
                <p className="mt-1 text-sm text-rose-500">Debe ser mayor a 0</p>
              )}
            </div>

            {/* Copies */}
            <div>
              <label htmlFor="cantidadDeCopies" className="block text-sm font-medium text-gray-700 mb-1">
                Ejemplares <span className="text-rose-500">*</span>
              </label>
              <input
                id="cantidadDeCopies"
                name="cantidadDeCopies"
                type="number"
                min="1"
                value={formData.cantidadDeCopies}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.cantidadDeCopies ? "border-rose-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {formErrors.cantidadDeCopies && (
                <p className="mt-1 text-sm text-rose-500">Debe ser al menos 1</p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3 sticky bottom-0 bg-white">
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
              "Guardar Libro"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
