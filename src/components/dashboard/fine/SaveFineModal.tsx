"use client"

import { Loader2, X, AlertCircle } from "lucide-react"

type SaveFineModalProps = {
  isOpen: boolean
  onClose: () => void
  onGenerateFines: () => Promise<void>
  isGenerating: boolean
}

export default function SaveFineModal({ isOpen, onClose, onGenerateFines, isGenerating }: SaveFineModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 border border-gray-200">
        <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900">Generar Multas</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertCircle size={32} className="text-amber-500" />
              </div>
            </div>

            <p className="text-center text-gray-700">
              ¿Estás seguro de que deseas generar multas para todos los préstamos vencidos?
            </p>

            <div className="p-4 bg-gray-50 rounded-lg mt-4">
              <p className="text-sm text-gray-600">
                Esta acción generará automáticamente multas para todos los préstamos que hayan excedido 
                su fecha de devolución y que aún no tengan una multa asociada.
              </p>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Las multas se calcularán según las políticas establecidas por la biblioteca.
              Este proceso no puede deshacerse una vez confirmado.
            </p>
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
            onClick={onGenerateFines}
            disabled={isGenerating}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 flex items-center"
          >
            {isGenerating ? (
              <>
                <Loader2 size={16} className="animate-spin mr-2" />
                Procesando...
              </>
            ) : (
              "Confirmar Generación"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}