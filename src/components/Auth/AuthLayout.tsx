"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect } from "react"
import { useMediaQuery } from "@/hooks"
import Image from "next/image"


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    // Add Inter font to body
    useEffect(() => {
        document.body.classList.add("font-inter")
    }, [])

    const isDesktop = useMediaQuery("(min-width: 1024px)")

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Decorative side for larger screens */}
            {isDesktop && (
                <motion.div
                    className="hidden lg:flex lg:w-1/2 bg-emerald-50 items-center justify-center p-12"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="max-w-md">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                                <Image
                                    src="https://as2.ftcdn.net/v2/jpg/03/40/07/85/1000_F_340078556_YD52qpLaiTbO5E0OF90FuOaAq3sZr8yF.jpg"
                                    alt="Persona escribiendo notas"
                                    width={980}
                                    height={640}
                                    className="w-full h-auto rounded-xl"
                                />
                            </div>
                            <h2 className="text-3xl font-bold text-emerald-800 mt-8">Acceso a la Biblioteca</h2>
                            <p className="text-emerald-600 mt-4 text-lg">
                                Accede a tu cuenta para gestionar préstamos, reservas y explorar el catálogo de libros.
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            )}

            {/* Login form side */}
            <div className="flex flex-1 items-center justify-center p-6 sm:p-12">{children}</div>
        </div>
    )
}
