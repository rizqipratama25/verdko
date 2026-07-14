import { ArrowLeft } from "lucide-react"
import Logo from "../components/common/Logo"
import Input from "../components/common/Input"
import Button from "../components/common/Button"
import { useNavigate } from "react-router-dom"
import { useSignup } from "../hooks/auth/useSignup"
import { useState, type ChangeEvent } from "react"
import { buildHandleFormSignupChange, buildHandleSignupSubmit } from "../handlers/auth/signup.handler"
import type { SignupPayload } from "../types/auth.type"

const SignUpPage = () => {
  const navigate = useNavigate()

  // Login
  const { mutateAsync: signup, isPending } = useSignup();

  const [form, setForm] = useState<SignupPayload>({
    name: "",
    telegram_username: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const resetForm = () => setForm({
    name: "",
    telegram_username: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => buildHandleFormSignupChange(e, setForm);
  const handleSignupSubmit = buildHandleSignupSubmit(form, signup, { resetForm }, navigate);


  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-11">
      <div className="lg:col-span-4 flex flex-col justify-center items-center p-8 bg-surface border-r border-border-primary">
        <Logo textClassName="text-7xl" logoClassName="h-24 w-24" />
        <span className="font-geist font-medium text-2xl text-text-secondary text-center">Never Miss a Competitor <br /> Price Change Again</span>
      </div>

      <div className="lg:col-span-7 flex items-center justify-center p-8 bg-background-primary">
        <div className="w-full flex flex-col justify-between h-full">
          <a href="/" className="font-geist font-medium flex items-center gap-2 py-2 ">
            <ArrowLeft className="w-5 h-5" />
            Home
          </a>
          <div className="w-full flex flex-col items-center gap-4">
            <span className="font-geist font-medium text-2xl text-text-primary text-center">Get Started</span>
            <form onSubmit={handleSignupSubmit} className="w-lg space-y-4 text-secondary">
              <Input name="name" type="text" value={form.name} onChange={handleFormChange} placeholder="Name" required={true} />
              <Input name="telegram_username" type="text" value={form.telegram_username} onChange={handleFormChange} placeholder="Telegram Username" required={true} />
              <Input name="email" type="email" value={form.email} onChange={handleFormChange} placeholder="Email" required={true} />
              <Input name="password" type="password" value={form.password} onChange={handleFormChange} placeholder="Password" required={true} />
              <Input name="password_confirmation" type="password" value={form.password_confirmation} onChange={handleFormChange} placeholder="Password Confirmation" required={true} />

              <Button className="py-2" disabled={isPending}>{isPending ? "Signing Up..." : "Sign Up"}</Button>
            </form>
          </div>
          <span className="text-center text-text-primary">By continuing, you agree to Verdko's <a href="/" className="font-geist font-medium text-primary underline">Terms of Service</a> and <a href="/" className="font-geist font-medium text-primary underline">Privacy Policy</a>.</span>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage