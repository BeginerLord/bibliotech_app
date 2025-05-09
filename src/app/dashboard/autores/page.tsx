"use client"
import AuthorTable from "@/components/dashboard/author/AuthorTable"
import { FileText } from "lucide-react"

export default function AutoresPage() {
  return (
    <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FileText className="text-emerald-600" />
            Gestión de Autores
          </h1>
          <p className="text-gray-600 mt-1">Administra la información de autores en el sistema</p>
        </div>
      </div>

      <AuthorTable />
    </main>
  )
}