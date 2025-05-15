import { Plus, Search, Archive, Users } from "lucide-react"

type UserTableHeaderProps = {
  searchTerm: string
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCreateClick?: () => void
  showInactive: boolean
  onToggleView: () => void
}

export default function UserTableHeader({
  searchTerm,
  onSearchChange,
  onCreateClick,
  showInactive,
  onToggleView
}: UserTableHeaderProps) {
  return (
    <div className="p-5 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="relative flex-grow max-w-xl">
          <input
            type="text"
            placeholder="Buscar por nombre, email o DNI..."
            value={searchTerm}
            onChange={onSearchChange}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-200 outline-none"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        <button
          onClick={onToggleView}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            showInactive
              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title={showInactive ? "Ver usuarios activos" : "Ver usuarios archivados"}
        >
          {showInactive ? (
            <>
              <Users size={18} />
              <span className="hidden sm:inline">Activos</span>
            </>
          ) : (
            <>
              <Archive size={18} />
              <span className="hidden sm:inline">Archivados</span>
            </>
          )}
        </button>
      </div>
      
      <div className="flex items-center gap-2">
        {onCreateClick && (
          <button 
            onClick={onCreateClick}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 flex items-center gap-2 transition-colors"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">Nuevo Usuario</span>
          </button>
        )}
      </div>
    </div>
  )
}