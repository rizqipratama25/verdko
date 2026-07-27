import { Navigate, Outlet } from "react-router-dom";
import { getToken, getUser } from "../utils/authStorage.utils";
import VerifyEmailCard from "../components/email/VerifyEmailCard";

const VerifiedRoute = () => {
    const user = getUser();
    const token = getToken();

    if (!user.email_verified_at) {
        return (
            <VerifyEmailCard title="Email Not Verified" message="We've already sent a verification email to">
                <span className="font-inter font-light text-md text-text-secondary text-center">Your account has not been verified yet!</span>
            </VerifyEmailCard>
        )
    } else if (!user.email_verified_at && token) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />;
}

export default VerifiedRoute