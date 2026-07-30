import Logo from "../common/Logo"
import InstagramIcon from "../icons/InstagramIcon"

const Footer = () => {
    return (
        <footer className="relative h-fit flex flex-col justify-center overflow-hiddenbg-surface border border-border-primary">
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-6 md:px-12 sm:px-8 relative z-10">
                <div className="flex justify-between py-14">
                    <div className="flex flex-col gap-4">
                        <Logo textClassName="text-3xl" logoClassName="w-7 h-7" />
                        <span className="font-inter font-light text-md text-text-secondary">Automated price monitoring and<br />instant Telegram alerts for modern<br />e-commerce teams.</span>
                    </div>
                    <div className="grid grid-cols-3 gap-16">
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-text-primary font-medium cursor-pointer">Menu</span>
                            <a href="#problems" className="text-sm text-text-secondary hover:text-text-primary font-light cursor-pointer transition-colors">Problems</a>
                            <a href="#how-it-works" className="text-sm text-text-secondary hover:text-text-primary font-light cursor-pointer transition-colors">How It Works</a>
                            <a href="#features" className="text-sm text-text-secondary hover:text-text-primary font-light cursor-pointer transition-colors">Features</a>
                            <a className="text-sm text-text-secondary hover:text-text-primary font-light cursor-pointer transition-colors">For Who</a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-text-primary font-medium cursor-pointer">Legal</span>
                            <a href="" className="text-sm text-text-secondary hover:text-text-primary font-light cursor-pointer transition-colors">Privacy Policy</a>
                            <a href="" className="text-sm text-text-secondary hover:text-text-primary font-light cursor-pointer transition-colors">Terms of Service</a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm text-text-primary font-medium cursor-pointer">Connect</span>
                            <div className="flex gap-2">
                                <a href="" className="text-sm text-text-secondary hover:text-text-primary font-light cursor-pointer transition-colors"><InstagramIcon className="w-5 h-5" /></a>
                                {/* <a href="" className="text-sm text-text-secondary hover:text-text-primary font-light cursor-pointer transition-colors"><XIcon className="w-5 h-5" /></a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-t border-border-primary">
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-6 md:px-12 sm:px-8 relative z-10">
                    <div className="flex justify-between items-center py-4">
                        <p className="text-sm text-text-primary font-light">© 2026 Verdko. All rights reserved.</p>
                        <p className="text-sm text-text-primary font-light">Made for professional sellers.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer