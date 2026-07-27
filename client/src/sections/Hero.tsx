import { ArrowRight, BellRing } from "lucide-react"
import Button from "../components/common/Button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section id="hero" className="relative min-h-screen flex justify-center overflow-hidden scroll-mt-64">
            {/* Bg */}
            <div className="absolute inset-0">
                <img src="/hero-bg.webp" alt="Hero Background" className="w-full h-full object-cover" />
            </div>

            <div className="w-full max-w-7xl mx-auto px-6 lg:px-6 md:px-12 sm:px-8 pt-16 pb-20 relative z-10">
                <div className="w-full flex flex-col items-center gap-12">
                    <div className="w-full flex flex-col items-center gap-6">
                        <div className="w-fit flex items-center gap-2 text-primary bg-primary-soft/80 border border-primary/60 rounded-full px-3 py-1 animate-fade-in animation-delay-100">
                            <BellRing className="w-5 h-5" />
                            <span className="font-inter font-medium text-sm">Automated Competitor Monitoring (NOW IN BETA!)</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 animate-fade-in animation-delay-200">
                            <span className="font-geist font-bold text-7xl text-text-primary">Never Miss a Competitor</span>
                            <span className="font-geist font-bold text-7xl text-primary">Price Change Again</span>
                        </div>
                        <span className="font-inter font-light text-xl text-text-primary text-center animate-fade-in animation-delay-300">Stop checking marketplace listings manually. Verdko automatically monitors<br />competitor prices and sends Telegram alerts whenever competitor prices change.</span>
                        <Button className="flex items-center gap-2 px-4 py-3 text-md animate-fade-in animation-delay-400" onClick={() => navigate("/signup")}>
                            Start Free Monitoring
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </div>
                    <div className="bg-surface p-4 rounded-3xl shadow-2xl animate-fade-in animation-delay-500">
                        <div className="bg-surface-muted py-12 px-18 rounded-3xl">
                            <img src="/screenshot_dashboard.png" alt="Hero Image" className="shadow-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero