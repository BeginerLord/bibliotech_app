"use client";
import {
  BookOpen,
  Users,
  CalendarClock,
  BarChart3,
  Search,
  Tag,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: <BookOpen className="h-10 w-10 text-emerald-600" />,
      title: "Book Management",
      description:
        "Easily catalog and organize your entire collection with powerful search and filtering.",
    },
    {
      icon: <Users className="h-10 w-10 text-emerald-600" />,
      title: "User Management",
      description:
        "Keep track of members, their borrowing history, and preferences with detailed profiles.",
    },
    {
      icon: <CalendarClock className="h-10 w-10 text-emerald-600" />,
      title: "Lending System",
      description:
        "Streamline checkouts, returns, and reservations with automated reminders.",
    },
    {
      icon: <BarChart3 className="h-10 w-10 text-emerald-600" />,
      title: "Analytics & Reports",
      description:
        "Gain insights into your library's performance with comprehensive statistics and reports.",
    },
    {
      icon: <Search className="h-10 w-10 text-emerald-600" />,
      title: "Advanced Search",
      description:
        "Find any book instantly with our powerful search engine that indexes all metadata.",
    },
    {
      icon: <Tag className="h-10 w-10 text-emerald-600" />,
      title: "Customizable Tags",
      description:
        "Create your own classification system with custom tags and categories.",
    },
    {
      icon: <Shield className="h-10 w-10 text-emerald-600" />,
      title: "Secure Access",
      description:
        "Control who can access what with role-based permissions and secure authentication.",
    },
    {
      icon: <Zap className="h-10 w-10 text-emerald-600" />,
      title: "Fast Performance",
      description:
        "Enjoy lightning-fast performance even with large collections and multiple users.",
    },
  ];

  // Variants for animation
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.2, // Delay between children animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Powerful Features for Modern Libraries
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to run your library efficiently in one elegant
            platform
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={itemVariants}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
