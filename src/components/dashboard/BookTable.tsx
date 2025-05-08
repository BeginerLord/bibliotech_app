"use client"

import { useState } from "react"
import { Edit, Trash2, Eye, ChevronDown, ChevronUp, Search } from "lucide-react"

// Datos de ejemplo para libros
const booksData = [
  {
    id: 1,
    title: "Cien años de soledad",
    author: "Gabriel García Márquez",
    isbn: "9780307474728",
    year: 1967,
    category: "Novela",
    copies: 5,
    available: 2,
  },
  {
    id: 2,
    title: "El principito",
    author: "Antoine de Saint-Exupéry",
    isbn: "9780156012195",
    year: 1943,
    category: "Ficción",
    copies: 8,
    available: 3,
  },
  {
    id: 3,
    title: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    isbn: "9788420412146",
    year: 1605,
    category: "Novela",
    copies: 3,
    available: 1,
  },
  {
    id: 4,
    title: "Harry Potter y la piedra filosofal",
    author: "J.K. Rowling",
    isbn: "9788478884459",
    year: 1997,
    category: "Fantasía",
    copies: 10,
    available: 7,
  },
  {
    id: 5,
    title: "1984",
    author: "George Orwell",
    isbn: "9788499890944",
    year: 1949,
    category: "Ciencia ficción",
    copies: 6,
    available: 4,
  },
]

export default function BookTable() {
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

  // Filtra y ordena los libros
  const filteredBooks = booksData
    .filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.includes(searchTerm),
    )
    .sort((a, b) => {
      if (!sortField) return 0

      const fieldA = a[sortField as keyof typeof a]
      const fieldB = b[sortField as keyof typeof b]

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
              placeholder="Buscar por título, autor o ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-200 outline-none"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <select className="ml-4 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-200 outline-none">
            <option value="">Todas las categorías</option>
            <option value="Novela">Novela</option>
            <option value="Ficción">Ficción</option>
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
                onClick={() => handleSort("title")}
              >
                <div className="flex items-center">
                  Título
                  {sortField === "title" &&
                    (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("author")}
              >
                <div className="flex items-center">
                  Autor
                  {sortField === "author" &&
                    (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ISBN
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("year")}
              >
                <div className="flex items-center">
                  Año
                  {sortField === "year" &&
                    (sortDirection === "asc" ? <ChevronUp size={15} /> : <ChevronDown size={15} />)}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Categoría
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Disponibles
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
              <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{book.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{book.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{book.isbn}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{book.year}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">{book.category}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div
                      className={`h-2 w-16 rounded-full ${
                        book.available / book.copies > 0.5
                          ? "bg-emerald-200"
                          : book.available / book.copies > 0.2
                            ? "bg-amber-200"
                            : "bg-rose-200"
                      }`}
                    >
                      <div
                        className={`h-2 rounded-full ${
                          book.available / book.copies > 0.5
                            ? "bg-emerald-500"
                            : book.available / book.copies > 0.2
                              ? "bg-amber-500"
                              : "bg-rose-500"
                        }`}
                        style={{ width: `${(book.available / book.copies) * 100}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {book.available} / {book.copies}
                    </span>
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
          Mostrando <span className="font-medium">{filteredBooks.length}</span> de{" "}
          <span className="font-medium">{booksData.length}</span> libros
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
