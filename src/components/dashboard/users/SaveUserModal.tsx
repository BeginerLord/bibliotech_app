"use client"

import { useState } from "react"
import { Loader2, X } from "lucide-react"
import { CreateUserDto, UserModel } from "@/models/persons_model"

type SaveUserModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: (user: CreateUserDto) => Promise<void>
  isCreating: boolean
}

export default function SaveUserModal({
  isOpen,
  onClose,
  onSave,
  isCreating,
}: SaveUserModalProps) {
  const [formData, setFormData] = useState<CreateUserDto>({
    dni: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: ""
  })
  
  const [formErrors, setFormErrors] = useState({
    dni: false,
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    address: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: false }))
    }
  }

  const validateForm = () => {
    const errors = {
      dni: !formData.dni?.trim(),
      firstName: !formData.firstName?.trim(),
      lastName: !formData.lastName?.trim(),
      email: !formData.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
      phoneNumber: !formData.phoneNumber?.trim(), 
      address: !formData.address?.trim()
    }
    
    setFormErrors(errors)
    return !Object.values(errors).some(error => error)
  }

  const handleSubmit = async () => {
    if (!validateForm()) return
    
    try {
      await onSave(formData)
      resetForm()
    } catch (error) {
      console.error("Error al crear usuario:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      dni: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: ""
    })
    setFormErrors({
      dni: false,
      firstName: false,
      lastName: false,
      email: false,
      phoneNumber: false,
      address: false
    })
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
          <h3 className="text-lg font-semibold text-gray-900">Nuevo Usuario</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre <span className="text-rose-500">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.firstName ? "border-rose-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                />
                {formErrors.firstName && (
                  <p className="mt-1 text-sm text-rose-500">
                    El nombre es obligatorio
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Apellidos <span className="text-rose-500">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    formErrors.lastName ? "border-rose-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
                />
                {formErrors.lastName && (
                  <p className="mt-1 text-sm text-rose-500">
                    Los apellidos son obligatorios
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">
                DNI <span className="text-rose-500">*</span>
              </label>
              <input
                id="dni"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.dni ? "border-rose-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {formErrors.dni && (
                <p className="mt-1 text-sm text-rose-500">
                  El DNI es obligatorio
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-rose-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.email ? "border-rose-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-rose-500">
                  Introduce un email válido
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono <span className="text-rose-500">*</span>
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  formErrors.phoneNumber ? "border-rose-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {formErrors.phoneNumber && (
                <p className="mt-1 text-sm text-rose-500">
                  El teléfono es obligatorio
                </p>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Dirección <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className={`w-full px-3 py-2 border ${
                  formErrors.address ? "border-rose-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500`}
              />
              {formErrors.address && (
                <p className="mt-1 text-sm text-rose-500">
                  La dirección es obligatoria
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
              "Crear Usuario"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}