"use client"

import { useState } from "react"
import { Edit, Trash2, Eye, ChevronDown, ChevronUp, Search, BookOpen } from "lucide-react"

// Datos de ejemplo para autores
const authorsData = [
  {
    id: 1,
    name: "Gabriel García Márquez",
    nationality: "Colombia",
    birthYear: 1927,
    deathYear: 2014,
    books: 25,
    genres: ["Realismo mágico", "Novela"],
  },
  {
    id: 2,
    name: "J.K. Rowling",
    nationality: "Reino Unido",
    birthYear: 1965,
    deathYear: null,
    books: 15,
    genres: ["Fantasía", "Misterio"],
  },
  {
    id: 3,
    name: "George Orwell",
    nationality: "Reino Unido",
    birthYear: 1903,
    deathYear: 1950,
    books: 12,
    genres: ["Ciencia ficción", "Distopía"],
  },
  {
    id: 4,
    name: "Miguel de Cervantes",
    nationality: "España",
    birthYear: 1547,
    deathYear: 1616,
    books: 16,
    genres: ["Novela", "Drama"],
  },
  {
    id: 5,
    name: "Isabel Allende",
    nationality: "Chile",
    birthYear: 1942,
    deathYear: null,
    books: 23,
    genres: ["Realismo mágico", "Ficción histórica"],
  },
]

export default function AuthorTable() {
  const [sortField, setSortField] = useState("")
  const [sortDirection, setSortDirection] = useState("asc")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  // Filtra y ordena los autores
  const filteredAuthors = authorsData
    .filter(
      (author) =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.nationality.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (!sortField) return 0

      const fieldA = a[sortField as keyof typeof a]
      const fieldB = b[sortField as keyof typeof b]

      if (fieldA === null) return 1
      if (fieldB === null) return -1

      if (fieldA < fieldB) return sortDirection === "asc" ? -1 : 1
      if (fieldA > fieldB) return sortDirection === "asc" ? 1 : -1
      return 0
    })

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
          <select className="ml-4 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-200 outline-none">
            <option value="">Todos los géneros</option>
            <option value="Realismo mágico">Realismo mágico</option>
            <option value="Novela">Novela</option>
            <option value="Fantasía">Fantasía</option>
            <option value="Ciencia ficción">Ciencia ficción</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Nombre
                  {sortField === "name" &&
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
                onClick={() => handleSort("birthYear")}
              >
                <div className="flex items-center">
                  Año de nacimiento
                  {sortField === "birthYear" &&
                    (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Géneros
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Obras
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
            {filteredAuthors.map((author) => (
              <tr key={author.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{author.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{author.nationality}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {author.birthYear}
                  {author.deathYear ? ` - ${author.deathYear}` : ""}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {author.genres.map((genre, index) => (
                      <span key={index} className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                        {genre}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <BookOpen size={16} className="mr-2 text-emerald-500" />
                    <span>{author.books} libros</span>
                  </div>
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
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Mostrando <span className="font-medium">{filteredAuthors.length}</span> de{" "}
          <span className="font-medium">{authorsData.length}</span> autores
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            Anterior
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  )
}
