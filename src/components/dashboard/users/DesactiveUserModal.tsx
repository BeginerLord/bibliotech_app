"use client"

import { Loader2 } from "lucide-react"
import { UserModel } from "@/models/persons_model"

type DeactivateUserModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  user: UserModel | null
  isProcessing: boolean
}

export default function DeactivateUserModal({
  isOpen,
  onClose,
  onConfirm,
  user,
  isProcessing,
}: DeactivateUserModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 border border-gray-200">
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">¿Desactivar usuario?</h3>
          <p className="text-gray-500">
            Esta acción desactivará al usuario "{user?.firstName} {user?.lastName}" ({user?.email}). 
            El usuario no podrá acceder al sistema hasta que sea reactivado.
          </p>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            disabled={isProcessing}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isProcessing}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 flex items-center"
          >
            {isProcessing ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Procesando...
              </>
            ) : (
              "Desactivar"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}