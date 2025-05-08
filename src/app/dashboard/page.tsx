import DashboardHeader from "@/components/dashboard/DashboardHeader";
import QuickAccessGrid from "@/components/dashboard/QuickAccessGrid";
import StatisticsSection from "@/components/dashboard/StatisticsSection";


export default function DashboardPage() {
    return (
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <DashboardHeader />
  
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Acceso Rápido</h2>
          <QuickAccessGrid />
        </div>
  
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Información General</h2>
          <StatisticsSection />
        </div>
        
      </main>
    )
  }