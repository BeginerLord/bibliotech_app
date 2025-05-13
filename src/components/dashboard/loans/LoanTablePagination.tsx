
type LoansTablePaginationProps = {
  page: number
  onPrevPage: () => void
  onNextPage: () => void
  filteredCount: number
  totalElements: number
  isLastPage: boolean
}

export default function CategoryTablePagination({
  page,
  onPrevPage,
  onNextPage,
  filteredCount,
  totalElements,
  isLastPage,
}: LoansTablePaginationProps) {
  return (
    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
      <div className="text-sm text-gray-700">
        Mostrando <span className="font-medium">{filteredCount}</span> de{" "}
        <span className="font-medium">{totalElements}</span> categorías
      </div>
      <div className="flex space-x-2">
        <button 
          className={`px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium ${
            page > 0 ? "text-gray-700 hover:bg-gray-50" : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={onPrevPage}
          disabled={page === 0}
        >
          Anterior
        </button>
        <button 
          className={`px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium ${
            !isLastPage ? "text-gray-700 hover:bg-gray-50" : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={onNextPage}
          disabled={isLastPage}
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}