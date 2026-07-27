import { ShieldCheck, ShoppingCart, UsersRound } from "lucide-react"
import ForWhoCard from "../components/common/ForWhoCard"

const ForWho = () => {
    const cards = [
        { id: 1, title: "Marketplace Sellers", description: "Stay competitive without checking competitor prices manually every day.", icon: ShoppingCart },
        { id: 2, title: "Brand Owners", description: "Protect your brand value by keeping retailer pricing consistent.", icon: ShieldCheck },
        { id: 3, title: "E-commerce Teams", description: "Keep your entire team informed without manually checking marketplace listings.", icon: UsersRound },
    ]

    return (
        <section id="for-who" className="relative h-fit flex justify-center overflow-hidden py-16 scroll-mt-32">
            <div className="w-full max-w-7xl mx-auto px-6 lg:px-6 md:px-12 sm:px-8 relative z-10">
                <div className="flex flex-col gap-12 items-center">
                    <div className="flex flex-col gap-2 items-center text-center">
                        <h2 className="font-geist font-bold text-4xl text-text-primary">Built for Marketplace Teams</h2>
                        <span className="font-inter font-light text-lg text-text-secondary">Whether you manage one store or an entire e-commerce team,<br />Verdko helps you stay ahead of competitor price changes without manual work.</span>
                    </div>
                    <div className="grid grid-cols-3 gap-6 items-stretch">
                        {cards.map((card) => {
                            return (
                                <div className="h-full" key={card.id}>
                                    <ForWhoCard icon={card.icon} title={card.title} description={card.description} />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ForWho