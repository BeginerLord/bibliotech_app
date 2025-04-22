"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import InputField from "./InputField"
import PasswordField from "./PasswordField"
import RoleSelector from "./RoleSelector"
import { useSingup } from "@/hooks/Auth/useSingup"
import { Loader2 } from "lucide-react"
import { UserModel } from "@/models/user_model"


export default function SignupCard() {
  const [formData, setFormData] = useState<UserModel>({
    username: "",
    dni: "",
    email: "",
    password: "",
    phone: "",
    roleRequest: {
      roleListName: ["USER"],
    },
  })

  // This hook would be implemented by the user
  const { signup, isPending } = useSingup()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRoleChange = (roles: string[]) => {
    setFormData((prev) => ({
      ...prev,
      roleRequest: {
        roleListName: roles,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    signup(formData)
  }

  return (
    <motion.div
      className="w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-2xl shadow-soft p-8 sm:p-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.4 }}>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Crear cuenta</h1>
          <p className="text-gray-600 mb-8">Completa tus datos para registrarte</p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="space-y-5"
          >
            <InputField
              label="Nombre de usuario"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="usuario123"
              required
            />

            <InputField
              label="DNI"
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              placeholder="12345678A"
              required
            />

            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />

            <PasswordField
              label="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Tu contraseña"
              required
            />

            <InputField
              label="Teléfono"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+57 314 655 26 42"
              required
            />

            <RoleSelector selectedRoles={formData.roleRequest.roleListName} onChange={handleRoleChange} />

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPending ? <Loader2 size={20} color="white" />: "Registrarse"}
              </button>
            </div>
          </motion.div>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <Link href="/Auth/login" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
              Iniciar sesión
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
