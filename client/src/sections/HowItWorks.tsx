import { BellRing, ChartColumnBig, Link2, SearchAlert } from "lucide-react"
import HowItWorksCard from "../components/common/HowItWorksCard"

const HowItWorks = () => {
    const cards = [
        { id: 1, title: "Add Competitor URL", description: "Paste a competitor product URL into your Verdko dashboard.", icon: Link2 },
        { id: 2, title: "Automatic Monitoring", description: "Verdko continuously monitors the product for price changes.", icon: SearchAlert },
        { id: 3, title: "Price Change Detection", description: "Whenever a competitor updates their price, Verdko detects it automatically.", icon: ChartColumnBig },
        { id: 4, title: "Telegram Alerts", description: "Receive an instant Telegram notification so you can react faster.", icon: BellRing },
    ]

    return (
        <section id="how-it-works" className="relative h-fit flex justify-center overflow-hidden py-16 scroll-mt-32">
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-6 md:px-12 sm:px-8 relative z-10">
                <div className="flex flex-col gap-12 items-center">
                    <div className="flex flex-col gap-2 items-center">
                        <h2 className="font-geist font-bold text-4xl text-text-primary">Monitor Competitor Prices in 4 Simple Steps</h2>
                        <span className="font-inter font-light text-lg text-text-secondary">Add a product URL, and Verdko takes care of the rest.</span>
                    </div>
                    <div className="grid grid-cols-4 gap-6 items-stretch">
                        {cards.map((card) => {
                            return (
                                <div className="h-full" key={card.id}>
                                    <HowItWorksCard index={card.id} icon={card.icon} title={card.title} description={card.description} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks