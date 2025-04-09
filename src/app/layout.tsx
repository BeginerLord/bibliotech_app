import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"


const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "LibraManager - Sistema de Gestión de Bibliotecas",
  description: "Sistema moderno e intuitivo para la gestión eficiente de bibliotecas",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <>
          {children}

        </>

      </body>
    </html>
  )
}
