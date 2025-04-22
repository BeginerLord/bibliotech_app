"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useLoginHook } from "@/hooks"
import InputField from "./InputField"
import PasswordField from "./PasswordField"
import { Loader } from "lucide-react"


export default function LoginCard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // This hook would be implemented by the user
  const { login, isPending } = useLoginHook()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login({ email, password })
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido de nuevo</h1>
          <p className="text-gray-600 mb-8">Inicia sesión para continuar</p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="space-y-6"
          >
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />

            <PasswordField
              label="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Tu contraseña"
              required
            />

            <div className="pt-2">
              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
              >
                 {isPending ? <Loader size={20} color="white" /> : "Iniciar sesión"}
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
            ¿No tienes cuenta?{" "}
            <Link href="/Auth/signup" className="text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
              Regístrate
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
