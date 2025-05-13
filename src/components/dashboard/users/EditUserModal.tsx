"use client"

import { Loader2, X } from "lucide-react"
import { UserModel, UpdateUserModel } from "@/models/persons_model"

type EditUserModalProps = {
  isOpen: boolean
  onClose: () => void
  onSave: () => Promise<void>
  user: UserModel | null
  formData: Partial<UserModel>
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onCheckboxChange: (name: string, checked: boolean) => void
  isUpdating: boolean
}

export default function EditUserModal({
  isOpen,
  onClose,
  onSave,
  formData,
  onChange,
  onCheckboxChange,
  isUpdating,
}: EditUserModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 border border-gray-200">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">Editar Usuario</h3>
          <button
            onClick={onClose}
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
                  Nombre
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={onChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Apellidos
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={onChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">
                DNI
              </label>
              <input
                id="dni"
                name="dni"
                value={formData.dni || ""}
                onChange={onChange}
                required
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">El DNI no se puede modificar</p>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email || ""}
                onChange={onChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={onChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Dirección
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address || ""}
                onChange={onChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center">
              <input
                id="statusEntity"
                name="statusEntity"
                type="checkbox"
                checked={formData.statusEntity === "ACTIVE"}
                onChange={(e) => onCheckboxChange("statusEntity", e.target.checked)}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="statusEntity" className="ml-2 block text-sm text-gray-900">
                Usuario activo
              </label>
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