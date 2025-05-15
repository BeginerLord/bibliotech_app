"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { useGetAllFinesPendig, useGetAllFinesPaid, useCreateFine, useDeleteFines } from "@/hooks/Fine"
import { FineModelDto } from "@/models/fine_model"

import FineTableHeader from "./FineTableHeader"
import FineTableRow from "./FineTableRow"
import FineTablePagination from "./FineTablePagination"
import DeleteFineModal from "./DeleteFineModal"
import SaveFineModal from "./SaveFineModal"

export default function FineTable() {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [sortField, setSortField] = useState("issuedDate")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<"PENDING" | "PAID">("PENDING")

  // Estado para la generación de multas
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false)

  // Estado para el modal de pago de multa
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [selectedFine, setSelectedFine] = useState<FineModelDto | null>(null)
  
  // Obtenemos los datos según la pestaña activa
  const { 
    isLoading: isLoadingPending, 
    data: pendingFines 
  } = useGetAllFinesPendig(page, size, sortField, sortDirection, "PENDING")
  
  const { 
    isLoading: isLoadingPaid, 
    data: paidFines 
  } = useGetAllFinesPaid(page, size, sortField, sortDirection, "PAID")

  const { createFineMutation, isCreating } = useCreateFine()
  const { deleteBookMutation, isDeleting } = useDeleteFines()
  
  // Determinar qué datos mostrar según la pestaña activa
  const isLoading = activeTab === "PENDING" ? isLoadingPending : isLoadingPaid
  const data = activeTab === "PENDING" ? pendingFines : paidFines
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Función para abrir el modal de generación de multas
  const handleOpenGenerateModal = () => {
    setIsGenerateModalOpen(true)
  }

  // Función para generar multas
  const handleGenerateFines = async () => {
    try {
      await createFineMutation()
      setIsGenerateModalOpen(false)
      alert("Las multas se han generado correctamente")
    } catch (error) {
      console.error("Error al generar multas:", error)
      alert("Error al generar las multas")
    }
  }

  // Abrir modal de pago
  const handlePayFine = (fine: FineModelDto) => {
    setSelectedFine(fine)
    setIsPaymentModalOpen(true)
  }
  
  // Confirmar pago de multa
  const handleConfirmPayment = async () => {
    if (!selectedFine) return
    
    try {
      await deleteBookMutation(selectedFine.id)
      setIsPaymentModalOpen(false)
      alert("El pago se ha registrado correctamente")
    } catch (error) {
      alert("Error: No se pudo registrar el pago")
      console.error("Error al registrar pago:", error)
    }
  }

  // Filtra las multas según el término de búsqueda
  const filteredFines = data?.content?.filter(
    (fine) =>
      (fine.userDni && fine.userDni.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (fine.loanId && fine.loanId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (fine.amount && fine.amount.toString().includes(searchTerm.toLowerCase()))
  ) || []

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  const handleNextPage = () => {
    if (data && !data.last) {
      setPage(page + 1)
    }
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Tabs para alternar entre multas pendientes y pagadas */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("PENDING")}
            className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
              activeTab === "PENDING"
                ? "border-b-2 border-emerald-500 text-emerald-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Multas Pendientes
          </button>
          <button
            onClick={() => setActiveTab("PAID")}
            className={`px-4 py-3 font-medium text-sm flex-1 text-center ${
              activeTab === "PAID"
                ? "border-b-2 border-emerald-500 text-emerald-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            Multas Pagadas
          </button>
        </div>

        <FineTableHeader 
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          onCreateClick={activeTab === "PENDING" ? handleOpenGenerateModal : undefined}
        />

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
              <span className="ml-2 text-gray-600">Cargando multas...</span>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("userDni")}
                  >
                    <div className="flex items-center">
                      Usuario
                      {sortField === "userDni" &&
                        (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("loanId")}
                  >
                    <div className="flex items-center">
                      ID Préstamo
                      {sortField === "loanId" &&
                        (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("amount")}
                  >
                    <div className="flex items-center">
                      Monto
                      {sortField === "amount" &&
                        (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("issuedDate")}
                  >
                    <div className="flex items-center">
                      Fecha
                      {sortField === "issuedDate" &&
                        (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center">
                      Estado
                      {sortField === "status" &&
                        (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFines.length > 0 ? (
                  filteredFines.map((fine) => (
                    <FineTableRow
                      key={fine.id}
                      fine={fine}
                      onPayFine={handlePayFine}
                      isProcessing={isDeleting && selectedFine?.id === fine.id}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                      No se encontraron multas {activeTab === "PENDING" ? "pendientes" : "pagadas"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        <FineTablePagination
          page={page}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          filteredCount={filteredFines.length}
          totalElements={data?.totalElements || 0}
          isLastPage={!data || data.last}
        />
      </div>

      {/* Modals */}
      <SaveFineModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onGenerateFines={handleGenerateFines}
        isGenerating={isCreating}
      />

      <DeleteFineModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={handleConfirmPayment}
        fine={selectedFine}
        isProcessing={isDeleting}
      />
    </>
  )
}