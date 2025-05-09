"use client"

import { Loader2, X } from "lucide-react"
import { BookModel, UpdateBookModel } from "@/models/book_model"
import { useState } from "react"

type EditBookModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: () => Promise<void>
  book: BookModel | null
  formData: Partial<UpdateBookModel>
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void
  isUpdating: boolean
}

export default function EditBookModal({
  isOpen,
  onClose,
  onSave,
  formData,
  onChange,
  isUpdating,
}: EditBookModalProps) {
  if (!isOpen) return null

  // Handle authors string input and convert to array
  const handleAuthorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const authors = e.target.value.split(',').map(uuid => uuid.trim()).filter(Boolean)
    onChange({
      target: {
        name: 'authorsUuids',
        value: authors.join(', '),
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>)
  }

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-4 border border-gray-200">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">Editar Libro</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                id="title"
                name="title"
                value={formData.title || ""}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-1">
                ISBN
              </label>
              <input
                id="isbn"
                name="isbn"
                value={formData.isbn || ""}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="quantityPage" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de páginas
                </label>
                <input
                  id="quantityPage"
                  name="quantityPage"
                  type="number"
                  value={formData.quantityPage || ""}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="cantidadDeCopies" className="block text-sm font-medium text-gray-700 mb-1">
                  Cantidad de ejemplares
                </label>
                <input
                  id="cantidadDeCopies"
                  name="cantidadDeCopies"
                  type="number"
                  value={formData.cantidadDeCopies || ""}
                  onChange={onChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="publicationDate" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de publicación
              </label>
              <input
                id="publicationDate"
                name="publicationDate"
                type="date"
                value={formData.publicationDate || ""}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="categoryUuid" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría (UUID)
              </label>
              <input
                id="categoryUuid"
                name="categoryUuid"
                value={formData.categoryUuid || ""}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="authorsUuids" className="block text-sm font-medium text-gray-700 mb-1">
                Autores (UUIDs separados por comas)
              </label>
              <input
                id="authorsUuids"
                name="authorsUuids"
                value={formData.authorsUuids ? formData.authorsUuids.join(', ') : ""}
                onChange={handleAuthorsChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="statusEntity" className="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <select
                id="statusEntity"
                name="statusEntity"
                value={formData.statusEntity || "ACTIVE"}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="ACTIVE">Activo</option>
                <option value="INACTIVE">Inactivo</option>
              </select>
            </div>
          </div>
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
            onClick={onSave}
            disabled={isUpdating}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 flex items-center"
          >
            {isUpdating ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Guardando...
              </>
            ) : (
              "Guardar Cambios"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}