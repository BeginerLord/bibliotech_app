import Link from "next/link"
import { Book, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Book className="h-8 w-8 text-emerald-500" />
              <span className="text-xl font-bold text-white">LibraManager</span>
            </div>
            <p className="mb-6">
              Modern library management software that simplifies cataloging, lending, and analytics for libraries of all
              sizes.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-emerald-500 transition-colors duration-300">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-emerald-500 transition-colors duration-300">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-emerald-500 transition-colors duration-300">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-emerald-500 transition-colors duration-300">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-emerald-500 transition-colors duration-300">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-emerald-500 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-emerald-500 transition-colors duration-300">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="hover:text-emerald-500 transition-colors duration-300">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-emerald-500 transition-colors duration-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-500 transition-colors duration-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-500 transition-colors duration-300">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="hover:text-emerald-500 transition-colors duration-300">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-500 transition-colors duration-300">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-500 transition-colors duration-300">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-500 transition-colors duration-300">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-500 transition-colors duration-300">
                  Webinars
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-500 transition-colors duration-300">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-emerald-500 mr-3 mt-0.5" />
                <span>123 Library Street, Booktown, BK 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-emerald-500 mr-3" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-emerald-500 mr-3" />
                <span>info@libramanager.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="#"
                className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 transition-colors duration-300 inline-block"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {currentYear} LibraManager. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-sm hover:text-emerald-500 transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:text-emerald-500 transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm hover:text-emerald-500 transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
