import { ArrowRight } from "lucide-react"
import Button from "../components/common/Button"
import { useLoginModalOpen } from "../stores/ui.store";

const CallToAction = () => {
    const { openLoginModal } = useLoginModalOpen();

    return (
        <section id="for-who" className="relative h-fit flex justify-center overflow-hidden py-20 bg-secondary">
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-6 md:px-12 sm:px-8 relative z-10">
                <div className="flex flex-col gap-12 items-center">
                    <div className="flex flex-col gap-2 items-center text-center">
                        <h2 className="font-geist font-bold text-4xl text-surface">Ready to Stop Checking Competitor Prices Manually?</h2>
                        <span className="font-inter font-light text-lg text-surface-muted">Start monitoring competitor prices automatically and receive Telegram alerts whenever prices change.</span>
                    </div>
                    <Button className="flex items-center gap-2 px-4 py-3 text-md" onClick={() => openLoginModal()}>
                        Start Monitoring
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </section>
    )
}

export default CallToAction