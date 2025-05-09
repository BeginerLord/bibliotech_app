"use client"

import { useState } from "react"
import { Edit, Trash2, Eye, ChevronDown, ChevronUp, Search } from "lucide-react"
import { useGetAllAuthors } from "@/hooks/Author"
import { AuthorModel } from "@/models/author_model"

export default function AuthorTable() {
  const [sortField, setSortField] = useState("")
  const { isLoading, data, error } = useGetAllAuthors(0, 10, "fullName", "asc", "ACTIVE");
  const [sortDirection, setSortDirection] = useState("asc")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Ensure that data.content is always an array, even if data is undefined
  const filteredAuthors = (data?.content ?? [])
    .filter(
      (author) =>
        author.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.nationality.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!sortField) return 0

      const fieldA = a[sortField as keyof AuthorModel]
      const fieldB = b[sortField as keyof AuthorModel]

      if (fieldA === null) return 1
      if (fieldB === null) return -1

      if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1
      if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1
      return 0
    })

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1)
    } else if (direction === "next") {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Buscar por nombre o nacionalidad..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-200 outline-none"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("fullName")}
              >
                <div className="flex items-center">
                  Nombre
                  {sortField === "fullName" &&
                    (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("nationality")}
              >
                <div className="flex items-center">
                  Nacionalidad
                  {sortField === "nationality" &&
                    (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("birthDate")}
              >
                <div className="flex items-center">
                  Año de nacimiento
                  {sortField === "birthDate" &&
                    (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAuthors.map((author) => (
              <tr key={author.uuid} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{author.fullName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{author.nationality}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{author.birthDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{author.statusEntity}</td>
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
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{filteredAuthors.length}</span> de{" "}
          <span className="font-medium">{data?.totalElements || 0}</span> autores
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => handlePageChange("prev")}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Anterior
          </button>
          <button
            onClick={() => handlePageChange("next")}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  )
}
