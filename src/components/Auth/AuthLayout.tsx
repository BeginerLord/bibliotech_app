"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect } from "react"
import { useMediaQuery } from "@/hooks"


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
                            <div className="relative w-full h-80">
                                <img src="/placeholder.svg?height=400&width=400" alt="Login illustration" className="object-contain" />
                            </div>
                            <h2 className="text-3xl font-bold text-emerald-800 mt-8">Secure Access Portal</h2>
                            <p className="text-emerald-600 mt-4 text-lg">
                                Access your dashboard with enhanced security and a seamless experience.
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
