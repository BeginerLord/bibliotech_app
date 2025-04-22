"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface RoleSelectorProps {
  selectedRoles: string[]
  onChange: (roles: string[]) => void
}

export default function RoleSelector({ selectedRoles, onChange }: RoleSelectorProps) {
  const availableRoles = ["ADMIN", "USER"]

  const selectRole = (role: string) => {
    // Permitir solo un rol seleccionado
    onChange([role])
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Tipo de cuenta</label>
      <div className="flex flex-wrap gap-3">
        {availableRoles.map((role) => (
          <motion.button
            key={role}
            type="button"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => selectRole(role)}
            className={`px-4 py-2 rounded-lg border transition-all duration-200 flex items-center gap-2 ${
              selectedRoles.includes(role)
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : "border-gray-300 hover:border-emerald-300 text-gray-700"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-sm flex items-center justify-center ${
                selectedRoles.includes(role) ? "bg-emerald-500" : "border border-gray-400"
              }`}
            >
              {selectedRoles.includes(role) && <Check size={14} className="text-white" />}
            </div>
            {role === "ADMIN" ? "Administrador" : "Usuario"}
          </motion.button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-1">Selecciona el tipo de cuenta que deseas crear</p>
    </div>
  )
}