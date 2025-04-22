"use client"

import type React from "react"

import { motion } from "framer-motion"

interface InputFieldProps {
  label: string
  type: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  required?: boolean
  name?: string
}

export default function InputField({ label, type, value, onChange, placeholder, required = false,name, }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <motion.div whileTap={{ scale: 0.995 }} className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          name={name}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all duration-200 outline-none"
        />
      </motion.div>
    </div>
  )
}
