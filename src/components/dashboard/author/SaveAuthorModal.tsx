"use client"

import { useState } from "react"
import { Loader2, X } from "lucide-react"
import { AuthorModel, CreateAuthorDto } from "@/models/author_model"

type SaveAuthorModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (author: CreateAuthorDto) => Promise<void>
  isCreating: boolean
}

export default function SaveAuthorModal({
  isOpen,
  onClose,
  onSave,
  isCreating,
}: SaveAuthorModalProps) {
  const [formData, setFormData] = useState<CreateAuthorDto>({
    fullName: "",
    birthDate: "",
    nationality: ""
  })
  
  const [formErrors, setFormErrors] = useState({
    fullName: false,
    birthDate: false,
    nationality: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: false }))
    }
  }

  const validateForm = () => {
    const errors = {
      fullName: !formData.fullName?.trim(),
      birthDate: !formData.birthDate?.trim(),
      nationality: !formData.nationality?.trim()
    }
    setFormErrors(errors)
    return !errors.fullName && !errors.birthDate && !errors.nationality
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    try {
      await onSave(formData)
      resetForm()
    } catch (error) {
      console.error("Error al crear el autor:", error)
    }
  }

  const resetForm = () => {
    setFormData({ fullName: "", birthDate: "", nationality: "" })
    setFormErrors({ fullName: false, birthDate: false, nationality: false })
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
          <h3 className="text-lg font-semibold text-gray-900">Nuevo Autor</h3>
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
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo <span className="text-rose-500">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.fullName ? "border-rose-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {formErrors.fullName && (
                <p className="mt-1 text-sm text-rose-500">
                  El nombre del autor es obligatorio
                </p>
              )}
            </div>

            <div>
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Nacimiento <span className="text-rose-500">*</span>
              </label>
              <input
                id="birthDate"
                name="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.birthDate ? "border-rose-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {formErrors.birthDate && (
                <p className="mt-1 text-sm text-rose-500">
                  La fecha de nacimiento es obligatoria
                </p>
              )}
            </div>

            <div>
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-1">
                Nacionalidad <span className="text-rose-500">*</span>
              </label>
              <input
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.nationality ? "border-rose-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {formErrors.nationality && (
                <p className="mt-1 text-sm text-rose-500">
                  La nacionalidad del autor es obligatoria
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
              "Crear Autor"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}