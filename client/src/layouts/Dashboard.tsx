import { Box, LayoutDashboard, Tag } from "lucide-react"
import { getUser } from "../utils/authStorage.utils"
import DashboardHeader from "../components/dashboard/DashboardHeader";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";

const menuItems = [
  {label: "Dashboard", to: "/dashboard", icon: LayoutDashboard},
  {label: "Monitored Products", to: "/monitored-products", icon: Box},
  {label: "Price History", to: "/price-histories", icon: Tag}
]

const Dashboard = () => {
  const {name, email} = getUser();

  return (
    <div>
      <div className="flex h-screen bg-gray-50">
        <DashboardSidebar menuItems={menuItems}/>

        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader name={name} email={email} />

          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default Dashboard