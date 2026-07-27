import Hero from "../sections/Hero"
import Problems from "../sections/Problems"
import Features from "../sections/Features"
import HowItWorks from "../sections/HowItWorks"
import ForWho from "../sections/ForWho"
import CallToAction from "../sections/CallToAction"
import Footer from "../components/layout/Footer"
import Navbar from "../components/layout/Navbar"

const Homepage = () => {
    return (
        <>
            <div className="bg-background-primary pt-15">
                <Navbar />
                <main>
                    <Hero />
                    <Problems />
                    <HowItWorks />
                    <Features />
                    <ForWho />
                    <CallToAction />
                </main>
                <Footer />
            </div>
        </>
    )
}

export default Homepage