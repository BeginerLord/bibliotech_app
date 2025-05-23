import { Plus, Search } from "lucide-react"

type LoanTableHeaderProps = {
  searchTerm: string
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCreateClick?: () => void
  showActiveOnly: boolean
  onStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function LoanTableHeader({
  searchTerm,
  onSearchChange,
  onCreateClick,
  showActiveOnly,
  onStatusChange,
}: LoanTableHeaderProps) {
  return (
    <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 flex-grow">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Buscar por libro o usuario..."
            value={searchTerm}
            onChange={onSearchChange}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-200 outline-none"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <div className="w-full md:w-auto">
          <select
            value={showActiveOnly ? "ACTIVE" : "ALL"}
            onChange={onStatusChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-200 outline-none"
          >
            <option value="ACTIVE">Préstamos activos</option>
            <option value="ARCHIVED">Préstamos devueltos</option>
            <option value="ALL">Todos los préstamos</option>
          </select>
        </div>
      </div>
      
      {onCreateClick && (
        <button 
          onClick={onCreateClick}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 flex items-center gap-2 transition-colors whitespace-nowrap"
        >
          <Plus size={18} />
          Nuevo Préstamo
        </button>
      )}
    </div>
  )
}