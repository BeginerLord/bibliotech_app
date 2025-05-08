import { useState } from "react"
import { useGetAllBooks } from "@/hooks/Book"
import { Loader2, ChevronDown, ChevronUp, Search, Edit, Trash2, Eye } from "lucide-react"

export default function BookTable() {
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const [sortField, setSortField] = useState("title")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [statusEntity, setStatusEntity] = useState("ACTIVE") // Estado del libro (activo o inactivo)

  const { isLoading, data } = useGetAllBooks(page, size, sortField, sortDirection, statusEntity)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const filteredBooks = data?.content?.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authorFullnames.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.isbn.includes(searchTerm)
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
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar por título, autor o ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-200 outline-none"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select
            value={statusEntity}
            onChange={(e) => setStatusEntity(e.target.value)}
            className="ml-4 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-200 outline-none"
          >
            <option value="ACTIVE">Activo</option>
            <option value="INACTIVE">Inactivo</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            <span className="ml-2 text-gray-600">Cargando libros...</span>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("title")}
                >
                  <div className="flex items-center">
                    Título
                    {sortField === "title" && (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("author")}
                >
                  <div className="flex items-center">
                    Autor
                    {sortField === "author" && (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ISBN
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("year")}
                >
                  <div className="flex items-center">
                    Año
                    {sortField === "year" && (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Ejemplares
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
              {filteredBooks.map((book) => (
                <tr key={book.bookUuid} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{book.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{book.authorFullnames}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{book.isbn}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{book.nameCategoria}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {book.cantidadEjemplares} ejemplares
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="p-1 rounded-full hover:bg-gray-100" title="Ver detalles">
                        <Eye size={18} className="text-gray-500" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100" title="Editar">
                        <Edit size={18} className="text-blue-500" />
                      </button>
                      <button className="p-1 rounded-full hover:bg-gray-100" title="Eliminar">
                        <Trash2 size={18} className="text-rose-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{filteredBooks.length}</span> de{" "}
          <span className="font-medium">{data?.totalElements || 0}</span> libros
        </div>
        <div className="flex space-x-2">
          <button
            className={`px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium ${page > 0 ? "text-gray-700 hover:bg-gray-50" : "text-gray-400 cursor-not-allowed"}`}
            onClick={handlePrevPage}
            disabled={page === 0}
          >
            Anterior
          </button>
          <button
            className={`px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium ${data && !data.last ? "text-gray-700 hover:bg-gray-50" : "text-gray-400 cursor-not-allowed"}`}
            onClick={handleNextPage}
            disabled={!data || data.last}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  )
}
