"use client"
import FineTable from "@/components/dashboard/fine/FineTable"
import { CreditCard } from "lucide-react"

export default function MultasPage() {
  return (
    <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <CreditCard className="text-emerald-600" />
            Gestión de Multas
          </h1>
          <p className="text-gray-600 mt-1">Administra las multas y pagos en el sistema</p>
        </div>
      </div>

      <FineTable />
    </main>
  )
}