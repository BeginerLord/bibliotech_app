"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Star } from "lucide-react"

// Crear componentes de motion
const MotionDiv = motion.div

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Head Librarian, City Public Library",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "LibraManager has transformed how we operate. The intuitive interface and powerful features have saved us countless hours of administrative work.",
      stars: 5,
    },
    {
      name: "Michael Chen",
      role: "University Library Director",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "The analytics tools alone are worth the investment. We now have insights into our collection usage that we never had before.",
      stars: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "School Librarian",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "Our students love the modern interface, and I love how easy it is to manage checkouts and returns. Highly recommended!",
      stars: 4,
    },
  ]

  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Loved by Librarians Everywhere</h2>
          <p className="text-lg text-gray-600">See what our users have to say about LibraManager</p>
        </MotionDiv>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6 flex-grow">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="mr-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
}
