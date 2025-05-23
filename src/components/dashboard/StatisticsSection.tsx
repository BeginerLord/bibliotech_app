"use client";
import { useGetCountCopies } from "@/hooks/Book";
import { useCountFines } from "@/hooks/Fine";
import { useGetLoansCount } from "@/hooks/Loans";
import { useGetCountUsersActive } from "@/hooks/Person";
import { AlertTriangle, Book, FileText, TrendingUp, Users } from "lucide-react";
import { motion } from 'framer-motion'; 

export default function StatisticsSection() {
  // Obtenemos datos reales de las APIs
  const { data: loansCount, isLoading: isLoansCountLoading } = useGetLoansCount();
  const { data: bookCopiesData, isLoading: isBookCopiesLoading } = useGetCountCopies();
  const { data: finesData, isLoading: isFinesLoading } = useCountFines();
  const { data: usersData, isLoading: isUsersLoading } = useGetCountUsersActive();
  
  const mockStats = [
    { 
      title: "Total de Libros", 
      value: isBookCopiesLoading ? "..." : String(bookCopiesData?.totalCount|| 0), 
      icon: Book, 
      color: "bg-blue-500", 
      trend: "+12%" 
    },
    { 
      title: "Usuarios Registrados", 
      value: isUsersLoading ? "..." : String(usersData?.count || 0), 
      icon: Users, 
      color: "bg-emerald-500", 
      trend: "+8%" 
    },
    { 
      title: "Préstamos Activos", 
      value: isLoansCountLoading ? "..." : String(loansCount || 0), 
      icon: FileText, 
      color: "bg-amber-500", 
      trend: "-3%" 
    },
    { 
      title: "Multas Pendientes", 
      value: isFinesLoading ? "..." : String(finesData?.count || 0), 
      icon: AlertTriangle, 
      color: "bg-rose-500", 
      trend: "-5%" 
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockStats.map((stat, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -3 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div className={`${stat.color} w-12 h-12 rounded-lg text-white flex items-center justify-center`}>
              <stat.icon size={24} />
            </div>
            <span
              className={`text-sm font-medium flex items-center gap-1 ${stat.trend.startsWith("+") ? "text-emerald-600" : "text-rose-600"}`}
            >
              {stat.trend}
              <TrendingUp size={14} />
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800">{stat.value}</h3>
            <p className="text-gray-500">{stat.title}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}