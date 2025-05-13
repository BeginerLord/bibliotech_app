"use client"

import { motion } from "framer-motion"
import { Book, Users, User, FileText, AlertTriangle, Search, BookOpen, Star } from "lucide-react"
import Link from "next/link"

const quickAccessItems = [
  {
    title: "Gestión de Libros",
    description: "Agregar, editar y eliminar libros",
    icon: Book,
    href: "/dashboard/libros",
    color: "bg-blue-500",
  },
  {
    title: "Gestión de Autores",
    description: "Administrar información de autores",
    icon: User,
    href: "/dashboard/autores",
    color: "bg-indigo-500",
  },
  {
    title: "Gestión de Usuarios",
    description: "Gestionar usuarios del sistema",
    icon: Users,
    href: "/dashboard/usuarios",
    color: "bg-emerald-500",
  },
  {
    title: "Gestión de Préstamos",
    description: "Control de préstamos y devoluciones",
    icon: FileText,
    href: "/dashboard/prestamos",
    color: "bg-amber-500",
  },
  {
    title: "Gestión de Multas",
    description: "Administrar multas por retrasos",
    icon: AlertTriangle,
    href: "/dashboard/multas",
    color: "bg-rose-500",
  },
  {
    title: "Catálogo",
    description: "Ver catálogo completo",
    icon: BookOpen,
    href: "/dashboard/categoria",
    color: "bg-teal-500",
  },
 
]

export default function QuickAccessGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {quickAccessItems.map((item, index) => (
        <Link href={item.href} key={index}>
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200 h-full"
          >
            <div className={`${item.color} w-12 h-12 rounded-lg text-white flex items-center justify-center mb-4`}>
              <item.icon size={24} />
            </div>
            <h3 className="font-semibold text-lg text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </motion.div>
        </Link>
      ))}
    </div>
  )
}
