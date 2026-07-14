import { useState, type ChangeEvent, type FormEvent } from "react"
import Navbar from "../components/layout/Navbar"
import Modal from "../components/common/Modal"
import { useLogin } from "../hooks/auth/useLogin"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useLoginModalOpen } from "../stores/ui.store"
import Button from "../components/common/Button"
import Input from "../components/common/Input"
import { buildHandleFormLoginChange } from "../handlers/auth/login.handler"
import Hero from "../sections/Hero"
import Problems from "../sections/Problems"
import Features from "../sections/Features"
import HowItWorks from "../sections/HowItWorks"
import ForWho from "../sections/ForWho"
import CallToAction from "../sections/CallToAction"
import Footer from "../components/layout/Footer"

const Homepage = () => {
    const navigate = useNavigate()
    const { loginModalOpen, closeLoginModal } = useLoginModalOpen();

    // Login
    const { mutate: login, isPending } = useLogin();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => buildHandleFormLoginChange(e, setForm);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        login(
            {
                email: form.email,
                password: form.password
            },
            {
                onSuccess: () => {
                    toast.success("Login Successful");
                    navigate('/dashboard')
                },
                onError: () => {
                    const message = "Invalid Credentials";
                    toast.error(message);
                }
            }
        )
    }

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

            {loginModalOpen && (
                <Modal setShowModal={() => closeLoginModal()} modalTitle="Log In">
                    <form onSubmit={handleSubmit} className="space-y-4 text-secondary">
                        <Input name="email" type="email" value={form.email} onChange={handleFormChange} placeholder="Email" required={true} />
                        <Input name="password" type="password" value={form.password} onChange={handleFormChange} placeholder="Password" required={true} />

                        <Button className="py-2" disabled={isPending}>{isPending ? "Logging In..." : "Log In"}</Button>
                    </form>
                </Modal>
            )}
        </>
    )
}

export default Homepage