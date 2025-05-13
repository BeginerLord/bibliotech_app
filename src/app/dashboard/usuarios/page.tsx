"use client"
import UserTable from "@/components/dashboard/users/UserTable"
import { Users } from "lucide-react"

export default function UsuariosPage() {
  return (
    <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="text-emerald-600" />
            Gestión de Usuarios
          </h1>
          <p className="text-gray-600 mt-1">Administra los usuarios registrados en el sistema</p>
        </div>
      </div>

      <UserTable />
    </main>
  )
}
