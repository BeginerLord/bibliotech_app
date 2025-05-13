"use client"

import type React from "react"

import { Loader2, X, Calendar } from "lucide-react"
import type { LoanModel, UpdateLoanModel } from "@/models/loans_model"

type EditLoanModalProps = {
    isOpen: boolean
    onClose: () => void
    onSave: () => Promise<void>
    loan: LoanModel | null
    formData: UpdateLoanModel
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
    isUpdating: boolean
}

export default function EditLoanModal({
    isOpen,
    onClose,
    onSave,
    loan,
    formData,
    onChange,
    isUpdating,
}: EditLoanModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 border border-gray-200">
                <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
                    <h3 className="text-lg font-semibold text-gray-900">Editar Préstamo</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500 focus:outline-none">
                        <X size={20} />
                    </button>
                </div>

                <div className="px-6 py-4">
                    {loan && (
                        <div className="space-y-4">
                            {/* Información del préstamo (no editable) */}
                            {/* Información del préstamo (no editable) */}
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Usuario</p>
                                        <p className="font-medium">
                                            {loan.user?.firstName || "N/A"} {loan.user?.lastName || ""}
                                        </p>
                                        <p className="text-sm text-gray-500">{loan.userCedula}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Libro</p>
                                        <p className="font-medium">{loan.nameBook || "N/A"}</p>
                                        <p className="text-sm text-gray-500">Copia: {loan.copyId}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Fecha de inicio</p>
                                    <p className="font-medium">{loan.startDate ? new Date(loan.startDate).toLocaleDateString() : "N/A"}</p>
                                </div>
                            </div>

                            {/* Fecha de devolución (editable) */}
                            <div>
                                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                                    Fecha de Devolución
                                </label>
                                <div className="relative">
                                    <input
                                        id="dueDate"
                                        name="dueDate"
                                        type="date"
                                        value={formData.dueDate || ""}
                                        onChange={onChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                    <Calendar
                                        size={18}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                                    />
                                </div>
                            </div>

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
