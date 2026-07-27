import { Bell, Box, CircleCheckBig, TriangleAlert } from "lucide-react"
import { useSummary } from "../hooks/dashboard/useSummary";

const DashboardPage = () => {
  const { data: summaryData, isLoading } = useSummary();

  const stats = [
    { label: "Total Products", value: summaryData?.total_products, icon: Box },
    { label: "Active Products", value: summaryData?.success_checks, icon: CircleCheckBig },
    { label: "Failed Checks", value: summaryData?.failed_checks, icon: TriangleAlert },
    { label: "Alerts Sent", value: summaryData?.alerts_sent, icon: Bell },
  ];

  if (isLoading) return <div>Loading...</div>

  return (

    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-surface p-6 rounded-lg shadow-sm border border-border-primary">
              <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <div className="bg-surface p-3 rounded-lg">
                  <Icon size={24} className="text-secondary" />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default DashboardPage