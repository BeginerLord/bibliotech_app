"use client"

import { Loader2, X, CheckCircle } from "lucide-react"
import type { LoanModel } from "@/models/loans_model"

type DeliverLoanModalProps = {
  isOpen: boolean
  onClose: () => void
  onDeliver: () => Promise<void>
  loan: LoanModel | null
  isDelivering: boolean
}

export default function DeliverLoanModal({ isOpen, onClose, onDeliver, loan, isDelivering }: DeliverLoanModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 border border-gray-200">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">Marcar Préstamo como Entregado</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4">
          {loan && (
            <div className="space-y-4">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                  <CheckCircle size={32} className="text-emerald-500" />
                </div>
              </div>

              <p className="text-center text-gray-700">
                ¿Estás seguro de que deseas marcar este préstamo como entregado?
              </p>

              <div className="p-4 bg-gray-50 rounded-lg mt-4">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Usuario</p>
                    <p className="font-medium">
                      {loan.user?.firstName} {loan.user?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{loan.userCedula}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Libro</p>
                    <p className="font-medium">{loan.nameBook}</p>
                    <p className="text-sm text-gray-500">Copia: {loan.copyId}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Fecha de inicio</p>
                    <p className="font-medium">{new Date(loan.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Fecha de devolución</p>
                    <p className="font-medium">{new Date(loan.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                Al marcar el préstamo como entregado, se registrará la fecha actual como fecha de entrega y se liberará
                la copia del libro para nuevos préstamos.
              </p>
            </div>
          )}
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
            onClick={onDeliver}
            disabled={isDelivering}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 flex items-center"
          >
            {isDelivering ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Procesando...
              </>
            ) : (
              "Confirmar Entrega"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
