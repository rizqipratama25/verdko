import { useNavigate, useSearchParams } from "react-router-dom";
import type { ResetPasswordPayload } from "../types/auth.type";
import { useState, type ChangeEvent } from "react";
import { useResetPassword } from "../hooks/auth/useResetPassword";
import { buildHandleFormResetPasswordChange, buildHandleResetPasswordSubmit } from "../handlers/auth/resetPassword.handler";
import Logo from "../components/common/Logo";
import { ArrowLeft } from "lucide-react";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

const ResetPasswordPage = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const token = params.get("token");
    const email = params.get("email");

    const { mutateAsync: resetPassword, isPending } = useResetPassword();
    const [form, setForm] = useState<ResetPasswordPayload>({
        email: email ?? "",
        token: token ?? "",
        password: "",
        password_confirmation: ""
    });

    const resetForm = () => setForm({
        email: email ?? "",
        token: token ?? "",
        password: "",
        password_confirmation: ""
    });

    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => buildHandleFormResetPasswordChange(e, setForm);
    const handleResetPasswordSubmit = buildHandleResetPasswordSubmit(form, resetPassword, { resetForm }, navigate);

    if (!token || !email) {
        navigate("/");
        return null;
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
                        <span className="font-geist font-medium text-2xl text-text-primary text-center">Reset Your Password</span>
                        <form onSubmit={handleResetPasswordSubmit} className="w-lg space-y-4 text-secondary">
                            <Input label="Password" name="password" type="password" value={form.password} onChange={handleFormChange} placeholder="Enter your password" required={true} />
                            <Input label="Password Confirmation" name="password_confirmation" type="password" value={form.password_confirmation} onChange={handleFormChange} placeholder="Confirm your password" required={true} />

                            <Button className="py-2" disabled={isPending}>{isPending ? "Resetting..." : "Reset Password"}</Button>
                        </form>
                    </div>
                    <span className="text-center text-text-primary">By continuing, you agree to Verdko's <a href="/" className="font-geist font-medium text-primary underline">Terms of Service</a> and <a href="/" className="font-geist font-medium text-primary underline">Privacy Policy</a>.</span>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPage