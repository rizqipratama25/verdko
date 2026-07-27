import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { useVerifyEmail } from "../hooks/email/useVerifyEmail";
import toast from "react-hot-toast";
import VerifyEmailCard from "../components/email/VerifyEmailCard";
import VerifyEmailStatusCard from "../components/email/VerifyEmailStatusCard";
import { Check, MailOpen, X } from "lucide-react";

type VerifyStatus = "idle" | "loading" | "success" | "error";

const EmailVerifyPage = () => {
    const [params] = useSearchParams();
    const navigate = useNavigate();

    const verifyUrl = params.get("verify_url");
    const verified = params.get("verified");

    const [status, setStatus] = useState<VerifyStatus>("loading");
    const { mutateAsync: verifyEmail, isPending } = useVerifyEmail();
    

    useEffect(() => {
        const verify = async () => {
            if (verified) {
                setStatus("success");
                return;
            }

            if (!verifyUrl) {
                setStatus("idle");
                return;
            }

            try {
                await verifyEmail(verifyUrl);

                setStatus("success");

                const timeout = setTimeout(() => {
                    toast.success("Email verified successfully! Please login to continue");
                    navigate("/login");
                }, 1500);

                return () => clearTimeout(timeout);
            } catch (err: any) {
                setStatus("error");
            }
        };

        verify();
    }, [verified, verifyUrl, verifyEmail, navigate]);

    return (
        <div>
            {isPending && <VerifyEmailStatusCard icon={MailOpen} title="Verifying Your Email..." message="Please wait while we verify your email" />}
            {status === "success" && <VerifyEmailStatusCard icon={Check} title="Email Verified Successfully" message="Redirecting you to the login page..." />}
            {status === "idle" && <VerifyEmailCard title="Please Verify Your Email" message="You're almost there! We sent an email to" />}
            {status === "error" && <VerifyEmailStatusCard icon={X} title="Email Not Verified" message="The link is invalid or has expired" />}

            {verified && (
                <Link to="/login">
                    Login
                </Link>
            )}
        </div>
    );
};

export default EmailVerifyPage;