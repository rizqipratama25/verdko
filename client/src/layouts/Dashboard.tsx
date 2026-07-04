import { Box, Tag } from "lucide-react"
import { getUser } from "../utils/authStorage.utils"
import DashboardSidebar from "../components/DashboardSidebar";
import DashboardHeader from "../components/DashboardHeader";
import { Outlet } from "react-router-dom";

const menuItems = [
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