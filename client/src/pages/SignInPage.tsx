import { Navigate, useNavigate } from "react-router-dom"
import { useLogin } from "../hooks/auth/useLogin"
import { useState, type ChangeEvent } from "react"
import { buildHandleFormLoginChange, buildHandleLoginSubmit } from "../handlers/auth/login.handler"
import type { LoginPayload } from "../types/auth.type"
import Logo from "../components/common/Logo"
import { ArrowLeft } from "lucide-react"
import Input from "../components/common/Input"
import Button from "../components/common/Button"
import { getUser, getVerifiedAt } from "../utils/authStorage.utils"

const SignInPage = () => {
  const user = getUser();
  const verifiedAt = getVerifiedAt();
  const navigate = useNavigate()

  // Login
  const { mutateAsync: login, isPending } = useLogin();

  const [form, setForm] = useState<LoginPayload>({
    email: "",
    password: ""
  });

  const resetForm = () => setForm({
    email: "",
    password: ""
  });

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => buildHandleFormLoginChange(e, setForm);
  const handleLoginSubmit = buildHandleLoginSubmit(form, login, { resetForm }, navigate);

  if (user && verifiedAt) return <Navigate to="/dashboard" />

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
            <span className="font-geist font-medium text-2xl text-text-primary text-center">Welcome Back</span>
            <form onSubmit={handleLoginSubmit} className="w-lg space-y-4 text-secondary">
              <Input label="Email" name="email" type="email" value={form.email} onChange={handleFormChange} placeholder="Enter your email" required={true} />
              <Input label="Password" name="password" type="password" value={form.password} onChange={handleFormChange} placeholder="Enter your password" required={true}>
                <a href="/forgot-password" className="font-inter text-primary underline">Forgot Password?</a>
              </Input>

              <Button className="py-2" disabled={isPending}>{isPending ? "Logging In..." : "Log In"}</Button>
            </form>
            <span>Don't have an account? <a href="/signup" className="font-geist font-medium text-primary underline">Sign Up</a></span>
          </div>
          <span className="text-center text-text-primary">By continuing, you agree to Verdko's <a href="/" className="font-geist font-medium text-primary underline">Terms of Service</a> and <a href="/" className="font-geist font-medium text-primary underline">Privacy Policy</a>.</span>
        </div>
      </div>
    </div>
  )
}

export default SignInPage