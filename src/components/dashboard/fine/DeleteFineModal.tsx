"use client"

import { Loader2, CreditCard } from "lucide-react"
import { FineModel } from "@/models/fine_model"

type DeleteFineModalProps = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
  fine: FineModel | null
  isProcessing: boolean
}

export default function DeleteFineModal({
  isOpen,
  onClose,
  onConfirm,
  fine,
  isProcessing,
}: DeleteFineModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 border border-gray-200">
        <div className="px-6 py-5">
          <div className="flex items-center justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
              <CreditCard size={28} className="text-green-600" />
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">Registrar Pago de Multa</h3>
          
          {fine && (
            <div className="p-4 bg-gray-50 rounded-lg mt-4">
              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Usuario</p>
                  <p className="font-medium">{fine.userDni || "No disponible"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">ID Préstamo</p>
                  <p className="font-medium">{fine.loanId || "No disponible"}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Monto</p>
                  <p className="font-medium text-green-600">${fine.amount?.toFixed(2) || "0.00"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Fecha</p>
                  <p className="font-medium">
                    {fine.issuedDate ? new Date(fine.issuedDate).toLocaleDateString() : "No disponible"}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-500">Estado</p>
                <p className="font-medium">{fine.status || "Pendiente"}</p>
              </div>
            </div>
          )}
          
          <p className="text-gray-500 mt-4 text-sm">
            Al registrar el pago de esta multa se realizarán las siguientes acciones:
          </p>
          
          <ul className="list-disc ml-5 mt-2 text-sm text-gray-500">
            <li>La multa será marcada como pagada</li>
            <li>La copia del libro será reactivada en el sistema</li>
            <li>El préstamo será marcado como entregado</li>
            <li>Si el usuario no tiene más deudas, será reactivado automáticamente</li>
          </ul>
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
            disabled={isProcessing}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 flex items-center"
          >
            {isProcessing ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Procesando...
              </>
            ) : (
              "Confirmar Pago"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}