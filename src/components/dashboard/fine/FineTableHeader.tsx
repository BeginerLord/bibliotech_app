import { Plus, Search } from "lucide-react"

type FineTableHeaderProps = {
  searchTerm: string
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCreateClick?: () => void
}

export default function FineTableHeader({
  searchTerm,
  onSearchChange,
  onCreateClick,
}: FineTableHeaderProps) {
  return (
    <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="relative flex-grow max-w-xl">
        <input
          type="text"
          placeholder="Buscar por usuario, libro o monto..."
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-200 outline-none"
        />
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      
      {onCreateClick && (
        <button 
          onClick={onCreateClick}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          Generar Multas
        </button>
      )}
    </div>
  )
}