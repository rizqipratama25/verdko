import { Mail } from "lucide-react"
import type { ReactNode } from "react";
import { getUser } from "../../utils/authStorage.utils";
import { useResendVerificationEmail } from "../../hooks/email/useResendVerificationEmail";
import { buildHandleResendVerificationEmail } from "../../handlers/email/email.handler";

interface Props {
    title: string;
    message: string;
    children?: ReactNode;
}

const VerifyEmailCard = ({ title, message, children }: Props) => {
    const user = getUser();

    const { mutateAsync: resendVerificationEmail } = useResendVerificationEmail();
    const handleResendVerificationEmail = buildHandleResendVerificationEmail(resendVerificationEmail);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background-primary">
            <div className="flex flex-col items-center bg-surface w-2xl shadow-lg rounded-lg gap-6 py-8 px-16">
                <div className="w-fit flex items-center justify-center text-primary-hover bg-primary-soft p-3 rounded-full">
                    <Mail size={28} />
                </div>
                <div className="flex flex-col items-center">
                    <h1 className="font-geist font-bold text-2xl">{title}</h1>
                    {children}
                </div>
                <div className="flex flex-col items-center font-inter font-light text-md text-text-secondary text-center">
                    <span>{message}</span>
                    <span className="font-geist text-text-primary font-semibold text-lg">{user.email}</span>
                </div>
                <span className="font-inter font-light text-md text-text-secondary text-center">Just click on the link in that email to complete your signup. If you don't see it, you may need to <span className="font-semibold text-primary">check your spam</span> folder.</span>
                <span className="font-inter font-light text-md text-text-secondary text-center">Still can't find the email? No problem.</span>
                <button className="cursor-pointer bg-primary hover:bg-primary-hover text-surface px-4 py-2 rounded-lg" onClick={handleResendVerificationEmail}>
                    Resend Verification Email
                </button>
            </div>
        </div>
    )
}

export default VerifyEmailCard