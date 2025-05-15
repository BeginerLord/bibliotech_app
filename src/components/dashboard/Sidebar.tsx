"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Book, Users, FileText, AlertTriangle, Home, User, LogOut, Menu, X } from "lucide-react"

const menuItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Libros",
    href: "/dashboard/libros",
    icon: Book,
  },
  {
    name: "Autores",
    href: "/dashboard/autores",
    icon: FileText,
  },
  {
    name: "Usuarios",
    href: "/dashboard/usuarios",
    icon: Users,
  },
  {
    name: "Préstamos",
    href: "/dashboard/prestamos",
    icon: FileText,
  },
  {
    name: "Multas",
    href: "/dashboard/multas",
    icon: AlertTriangle,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden absolute top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-emerald-500 text-white"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 w-64 flex-shrink-0 flex flex-col z-40
                   ${isMobileMenuOpen ? "fixed inset-y-0 left-0" : "hidden lg:flex"}
                   transition-all duration-300 ease-in-out`}
      >
        {/* Logo */}
        <div className="px-6 py-8 flex items-center border-b border-gray-200">
          <span className="text-2xl font-bold text-emerald-600">BiblioTech</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 pt-6 px-4 pb-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link key={item.name} href={item.href} className="block" onClick={() => setIsMobileMenuOpen(false)}>
                <motion.div
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive ? "bg-emerald-50 text-emerald-600" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <item.icon size={20} className="mr-3 flex-shrink-0" />
                  <span className="font-medium">{item.name}</span>
                  {isActive && <div className="ml-auto w-1.5 h-6 bg-emerald-500 rounded-full" />}
                </motion.div>
              </Link>
            )
          })}
        </nav>

        {/* User Section 
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-3">
              <User size={20} />
            </div>
            <div>
              <p className="font-medium text-gray-800">Admin Usuario</p>
              <p className="text-sm text-gray-500">Bibliotecario</p>
            </div>
          </div>
          <button className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors duration-200">
            <LogOut size={16} className="mr-2" />
            Cerrar sesión
          </button>
        </div>*/}
      </aside>
    </>
  )
}
