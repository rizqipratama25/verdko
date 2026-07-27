import { LogOut, Menu, Trash2, X, type LucideIcon } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/auth/useLogout";
import { buildHandleLogout } from "../../handlers/auth/logout.handler";
import { useDeleteAccount } from "../../hooks/auth/useDeleteAccount";
import { buildHandleDeleteAccount, buildHandleFormDeletedAccountChange } from "../../handlers/auth/deleteAccount.handler";
import type { DeleteAccountPayload } from "../../types/auth.type";
import Modal from "../common/Modal";
import Input from "../common/Input";

interface MenuItem {
    label: string;
    to: string;
    icon: LucideIcon;
}

interface Props {
    menuItems: MenuItem[];
}


const DashboardSidebar = ({ menuItems }: Props) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const { mutate: logout, isPending: isLogoutPending } = useLogout();
    const { mutateAsync: deleteAccount, isPending: isDeleteAccountPending } = useDeleteAccount();
    const navigate = useNavigate();

    const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

    const [form, setForm] = useState<DeleteAccountPayload>({
        password: ""
    });
    const resetForm = () => setForm({
        password: ""
    });

    const handleLogout = buildHandleLogout(logout, navigate);
    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => buildHandleFormDeletedAccountChange(e, setForm);
    const handleDeleteAccount = buildHandleDeleteAccount(form, deleteAccount, { setShowDeleteAccountModal, resetForm }, navigate);

    return (
        <div className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r border-border-primary transition-all duration-300 flex flex-col`}>
            <div className="p-4.5 border-b border-border-primary flex items-center justify-between">
                {sidebarOpen && <h1 className="text-xl text-primary font-bold">Verdko</h1>}
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-secondary hover:text-secondary/90">
                    {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.label}
                        to={item.to}
                        className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                            ? 'bg-primary text-white'
                            : 'text-secondary hover:bg-primary-hover hover:text-white'
                            }`}
                    >
                        <item.icon size={20} />
                        {sidebarOpen && <span>{item.label}</span>}
                    </NavLink>
                ))}
            </nav>


            <div className="py-4 px-4">
                <button
                    onClick={handleLogout}
                    disabled={isLogoutPending}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                >
                    <LogOut size={20} />
                    {sidebarOpen && <span>{isLogoutPending ? "Logging out..." : "Log Out"}</span>}
                </button>
                <button
                    onClick={() => setShowDeleteAccountModal(true)}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors cursor-pointer"
                >
                    <Trash2 size={20} />
                    {sidebarOpen && <span>{isDeleteAccountPending ? "Deleting account..." : "Delete Account"}</span>}
                </button>
            </div>

            {showDeleteAccountModal && (
                <Modal setShowModal={setShowDeleteAccountModal} modalTitle="Delete Account" >
                    <span className="font-inter font-light text-md text-text-primary">This action cannot be undone. Enter your password to permanently delete your account and all associated data.</span>
                    <form onSubmit={handleDeleteAccount} className="space-y-4 text-text-primary mt-8">
                        <Input label="Password" name="password" value={form.password} onChange={handleFormChange} placeholder="Enter your account password" type="password" required={true} danger={true} />
                        <button className="w-full py-2 bg-danger/80 hover:bg-danger disabled:bg-danger/50 rounded-lg font-medium font-geist text-white cursor-pointer" disabled={isDeleteAccountPending}>
                            {isDeleteAccountPending ? "Deleting..." : "Delete"}
                        </button>
                    </form>
                </Modal>
            )}

        </div>
    )
}

export default DashboardSidebar