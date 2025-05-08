"use client"
import CategoryTable from "@/components/dashboard/category/CategoryTable"
import { FileText } from "lucide-react"

export default function CategoriasPage() {
  return (
    <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-emerald-600" />
            Gestión de Categorías
          </h1>
          <p className="text-gray-600 mt-1">Administra la información de categorías en el sistema</p>
        </div>
      </div>

      <CategoryTable />
    </main>
  )
}