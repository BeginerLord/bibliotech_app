"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Crear componentes de motion
const MotionDiv = motion.div

export default function Faq() {
  const faqs = [
    {
      question: "How easy is it to migrate from our current system?",
      answer:
        "LibraManager makes migration simple with our import tools that support all major library management formats. Our team can also provide personalized assistance to ensure a smooth transition.",
    },
    {
      question: "Is LibraManager suitable for small libraries?",
      answer:
        "LibraManager scales to fit libraries of all sizes. Our pricing is based on your collection size and user count, making it affordable for small libraries while providing all the powerful features.",
    },
    {
      question: "Can LibraManager integrate with our existing systems?",
      answer:
        "Yes, LibraManager offers robust API access and integrations with popular educational platforms, payment processors, and authentication systems. Our team can help set up custom integrations as needed.",
    },
    {
      question: "How secure is our library data?",
      answer:
        "Security is our top priority. LibraManager uses industry-standard encryption, regular security audits, and complies with data protection regulations. Your data is backed up daily and stored in multiple secure locations.",
    },
    {
      question: "What kind of support do you offer?",
      answer:
        "We provide comprehensive support including detailed documentation, video tutorials, email support, and live chat. Premium plans include dedicated support representatives and priority response times.",
    },
    {
      question: "Can patrons access the catalog from home?",
      answer:
        "Yes! LibraManager includes a beautiful public-facing catalog that works on all devices. Patrons can search the collection, place holds, and manage their accounts from anywhere.",
    },
  ]

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">Find answers to common questions about LibraManager</p>
        </MotionDiv>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <MotionDiv
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFaq(index)}
                className={`w-full text-left p-6 rounded-lg flex justify-between items-center transition-colors duration-300 ${
                  activeIndex === index ? "bg-emerald-50 text-emerald-700" : "bg-white text-gray-800 hover:bg-gray-100"
                } shadow-sm`}
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 transition-transform duration-300 ${
                    activeIndex === index ? "transform rotate-180 text-emerald-600" : ""
                  }`}
                />
              </button>
              <AnimatePresence mode="wait">
                {activeIndex === index && (
                  <MotionDiv
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-white rounded-b-lg shadow-sm border-t border-gray-100">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </MotionDiv>
                )}
              </AnimatePresence>
            </MotionDiv>
          ))}
        </div>
      </div>
    </section>
  )
}
