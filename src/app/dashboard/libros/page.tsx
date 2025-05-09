"use client"
import BookTable from "@/components/dashboard/book/BookTable"
import { Book } from "lucide-react"

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
      </div>

      <BookTable />
    </main>
  )
}