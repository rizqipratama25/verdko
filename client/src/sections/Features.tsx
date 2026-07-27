import { CalendarSync, History, Send} from "lucide-react"
import ProblemsFeaturesCard from "../components/common/ProblemsFeaturesCard"

const Features = () => {
    const cards = [
        { id: 1, title: "Competitor Price Monitoring", description: "Monitor competitor prices automatically without checking marketplace listings yourself.", icon: CalendarSync },
        { id: 2, title: "Telegram Alerts", description: "Be the first to know whenever competitor prices change.", icon: Send },
        { id: 3, title: "Price History", description: "Understand competitor price trends before adjusting your own prices.", icon: History },
    ]

    return (
        <section id="features" className="relative h-fit flex justify-center overflow-hidden py-16 bg-surface border border-border-primary scroll-mt-32">
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-6 md:px-12 sm:px-8 relative z-10">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-geist font-bold text-4xl text-text-primary">Stop refreshing marketplace pages. Verdko<br />watches them for you</h2>
                        <span className="font-inter font-light text-lg text-text-secondary">Automatically monitor competitor prices, receive Telegram alerts, and review price<br />history. All from one dashboard.</span>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        {cards.map((card) => {
                            return (
                                <div key={card.id}>
                                    <ProblemsFeaturesCard icon={card.icon} title={card.title} description={card.description} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Features