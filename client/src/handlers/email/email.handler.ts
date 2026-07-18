import toast from "react-hot-toast";

export const buildHandleResendVerificationEmail = (
    resendVerifyEmailNotification: () => Promise<void>
) => async () => {
    try {
        await resendVerifyEmailNotification();

        toast.success("Email verification notification resent successfully!");
    } catch (error: any) {
        const message = error.response?.data?.errors || error.response?.data?.message || "Something went wrong!";
        toast.error(message);
    }
}