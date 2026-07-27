import { EyeOff, Hourglass, Snail } from "lucide-react"
import ProblemsFeaturesCard from "../components/common/ProblemsFeaturesCard";

const Problems = () => {
    const cards = [
        { id: 1, title: "Manual Monitoring", description: "You waste hours opening the same marketplace pages every day.", icon: Hourglass },
        { id: 2, title: "Missed Price Changes", description: "Competitors can change prices before you even notice.", icon: EyeOff },
        { id: 3, title: "Lost Sales", description: "Every delayed reaction is a chance for competitors to win the sale.", icon: Snail },
    ]

    return (
        <section id="problems" className="relative h-fit flex justify-center overflow-hidden py-16 bg-surface border border-border-primary scroll-mt-32">
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-6 md:px-12 sm:px-8 relative z-10">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="font-geist font-bold text-4xl text-text-primary">Stop checking competitor prices manually</h2>
                        <span className="font-inter font-light text-lg text-text-secondary">Competitor prices can change at any time. Manually checking marketplace listings<br />wastes valuable time and missing even one price change could mean losing sales.</span>
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

export default Problems