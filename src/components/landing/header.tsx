"use client";
import { useState } from "react";
import Link from "next/link";
import { Book, Menu, X } from "lucide-react";
import { motion } from "framer-motion"
// Crear componentes de motion
const MotionHeader = motion.header
const MotionDiv = motion.div

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <MotionHeader
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Book className="h-8 w-8 text-emerald-600" />
          <span className="text-xl font-bold text-gray-800">LibraManager</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-600 hover:text-emerald-600 transition-colors duration-300 font-medium"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="dashboard"
            className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors duration-300 font-medium"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 hover:text-emerald-600 transition-colors duration-300"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <MotionDiv
          className="md:hidden bg-white"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-emerald-600 transition-colors duration-300 font-medium py-2"
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="dashboard"
              className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors duration-300 font-medium text-center"
              onClick={toggleMenu}
            >
              Get Started
            </Link>
          </div>
        </MotionDiv>
      )}
    </MotionHeader>
  )
}
