import { Navigate } from "react-router-dom"
import { useState, type ChangeEvent } from "react"
import type { ForgotPasswordPayload } from "../types/auth.type"
import Logo from "../components/common/Logo"
import { ArrowLeft } from "lucide-react"
import Input from "../components/common/Input"
import Button from "../components/common/Button"
import { getUser } from "../utils/authStorage.utils"
import { buildHandleForgotPasswordSubmit, buildHandleFormForgotPasswordChange } from "../handlers/auth/forgotPassword.handler"
import { useForgotPassword } from "../hooks/auth/useForgotPassword"

const ForgotPasswordPage = () => {
  const user = getUser();

  // Reset Password
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();

  const [form, setForm] = useState<ForgotPasswordPayload>({
    email: ""
  });

  const resetForm = () => setForm({
    email: ""
  });

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => buildHandleFormForgotPasswordChange(e, setForm);
  const handleForgotPasswordSubmit = buildHandleForgotPasswordSubmit(form, forgotPassword, { resetForm });

  if (user) return <Navigate to="/dashboard" />

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
          <div className="w-full flex flex-col items-center gap-5">
            <div className="w-full flex flex-col items-center">
              <span className="font-geist font-medium text-2xl text-text-primary text-center">Reset Your Password</span>
              <span className="font-inter font-light text-md text-text-secondary text-center">Enter your email address and we will send you <br />password reset link.</span>
            </div>
            <form onSubmit={handleForgotPasswordSubmit} className="w-lg space-y-4 text-secondary">
              <Input label="Email" name="email" type="email" value={form.email} onChange={handleFormChange} placeholder="Enter your email" required={true} />

              <Button className="py-2" disabled={isPending}>{isPending ? "Sending..." : "Send Reset Code"}</Button>
            </form>
            <span>Already have an account? <a href="/login" className="font-geist font-medium text-primary underline">Login</a></span>
          </div>
          <span className="text-center text-text-primary">By continuing, you agree to Verdko's <a href="/" className="font-geist font-medium text-primary underline">Terms of Service</a> and <a href="/" className="font-geist font-medium text-primary underline">Privacy Policy</a>.</span>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage