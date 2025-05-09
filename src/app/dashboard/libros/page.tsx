import { Book, Plus, Filter } from "lucide-react"
import BookTable from "@/components/dashboard/book/BookTable"

export default function LibrosPage() {
  return (
    <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Book className="text-emerald-600" />
            Gestión de Libros
          </h1>
          <p className="text-gray-600 mt-1">Administra el catálogo de libros de la biblioteca</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={16} />
            <span>Filtrar</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
            <Plus size={16} />
            <span>Nuevo Libro</span>
          </button>
        </div>
      </div>

      <BookTable />
    </main>
  )
}
