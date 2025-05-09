import { Search } from "lucide-react";

type BookTableHeaderProps = {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  statusEntity: string;
  onStatusChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onCreateClick?: () => void;
};

export default function BookTableHeader({
  searchTerm,
  onSearchChange,
  statusEntity,
  onStatusChange,
  onCreateClick,
}: BookTableHeaderProps) {
  return (
    <div className="p-5 border-b border-gray-200">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Buscar por título, autor o ISBN..."
            value={searchTerm}
            onChange={onSearchChange}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-200 outline-none"
          />
          <Search
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
        <select
          value={statusEntity}
          onChange={onStatusChange}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-200 outline-none"
        >
          <option value="ACTIVE">Activo</option>
          <option value="INACTIVE">Inactivo</option>
        </select>

        {onCreateClick && (
          <button
            onClick={onCreateClick}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 flex items-center gap-2 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Nuevo Libro
          </button>
        )}
      </div>
    </div>
  );
}