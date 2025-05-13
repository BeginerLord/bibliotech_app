"use client"

import { X } from "lucide-react"

interface User {
  dni: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  isActive: boolean
}

interface UserDetailModalProps {
  isOpen: boolean
  onClose: () => void
  user: User
}

export default function UserDetailModal({ isOpen, onClose, user }: UserDetailModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-500/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">Detalles del Usuario</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl font-bold">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Nombre</p>
                <p className="text-base text-gray-900">{user.firstName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Apellidos</p>
                <p className="text-base text-gray-900">{user.lastName}</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">DNI</p>
              <p className="text-base text-gray-900">{user.dni}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-base text-gray-900">{user.email}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Teléfono</p>
              <p className="text-base text-gray-900">{user.phoneNumber}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Dirección</p>
              <p className="text-base text-gray-900">{user.address}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">Estado</p>
              <span
                className={`inline-flex px-2 py-1 text-xs rounded-full ${
                  user.isActive ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                }`}
              >
                {user.isActive ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
