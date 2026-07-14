import { useNavigate } from "react-router-dom"
import Button from "../components/common/Button"
import Input from "../components/common/Input"
import Logo from "../components/common/Logo"
import { useLogin } from "../hooks/auth/useLogin"
import { useState, type ChangeEvent, type FormEvent } from "react"
import { buildHandleFormLoginChange } from "../handlers/auth/login.handler"
import toast from "react-hot-toast"
import { ArrowLeft } from "lucide-react"

const SignInPage = () => {
  const navigate = useNavigate()

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
            <form onSubmit={handleSubmit} className="w-lg space-y-4 text-secondary">
              <Input name="email" type="email" value={form.email} onChange={handleFormChange} placeholder="Email" required={true} />
              <Input name="password" type="password" value={form.password} onChange={handleFormChange} placeholder="Password" required={true} />

              <Button className="py-2" disabled={isPending}>{isPending ? "Logging In..." : "Log In"}</Button>
            </form>
          </div>
          <span className="text-center text-text-primary">By continuing, you agree to Verdko's <a href="/" className="font-geist font-medium text-primary underline">Terms of Service</a> and <a href="/" className="font-geist font-medium text-primary underline">Privacy Policy</a>.</span>
        </div>
      </div>
    </div>
  )
}

export default SignInPage