"use client"

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"

const MotionDiv = motion.div
export default function Hero() {
  return (
    <section className="py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <MotionDiv
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Manage Your Library <span className="text-emerald-600">Effortlessly</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              LibraManager simplifies library management with powerful tools for cataloging, lending, and analytics—all
              in one elegant platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="dashboard"
                className="bg-emerald-600 text-white px-6 py-3 rounded-full hover:bg-emerald-700 transition-all duration-300 font-medium text-center shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Get Started Free
              </Link>
              <Link
                href="dashboard"
                className="bg-white text-emerald-600 border border-emerald-600 px-6 py-3 rounded-full hover:bg-emerald-50 transition-all duration-300 font-medium text-center"
              >
                Watch Demo
              </Link>
            </div>
            <div className="pt-4 text-sm text-gray-500">No credit card required • Free 14-day trial</div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-cyan-500 rounded-2xl blur opacity-20 animate-pulse"></div>
            <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
              <Image
                src="https://howtobecomealibrarian.com/wp-content/uploads/2023/01/iStock-848764642.jpg"
                alt="Persona escribiendo notas"
                width={800}
                height={640}
                className="w-full h-auto rounded-xl"
              />
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  )
}
