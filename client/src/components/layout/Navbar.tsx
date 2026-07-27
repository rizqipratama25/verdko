import { ArrowRight } from "lucide-react"
import Button from "../common/Button";
import Logo from "../common/Logo";
import { useActiveSection } from "../../hooks/navbar/useActiveSection";
import { useNavigate } from "react-router-dom";

const navItems = [
    { id: "hero", label: "" },
    { id: "problems", label: "Problems" },
    { id: "how-it-works", label: "How It Works" },
    { id: "features", label: "Features" },
    { id: "for-who", label: "For Who" }
]

const Navbar = () => {
    const navigate = useNavigate();
    const activeSection = useActiveSection(navItems.map((item) => item.id));

    return (
        <header className="fixed top-0 left-0 right-0 z-45 bg-white border-b border-border-primary">
            <nav className="w-full max-w-7xl mx-auto px-6 lg:px-6 md:px-12 sm:px-8 p-4 flex justify-between items-center">
                <Logo textClassName="text-2xl" logoClassName="w-6 h-6" />
                <div className="flex items-center gap-6">
                    {navItems.map((item) => (
                        <a
                            key={item.id}
                            href={`#${item.id}`}
                            className={`text-sm cursor-pointer transition-all ${activeSection === item.id
                                ? 'text-text-primary font-medium'
                                : 'text-text-secondary hover:text-text-primary font-light'
                                }`}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <Button className="flex items-center gap-2 px-4 py-2 text-sm" onClick={() => navigate("/signup")}>
                        Start Monitoring
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </nav>
        </header>
    )
}

export default Navbar