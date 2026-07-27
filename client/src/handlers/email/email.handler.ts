import toast from "react-hot-toast";

export const buildHandleResendVerificationEmail = (
    resendVerifyEmailNotification: () => Promise<void>
) => async () => {
    const toastId = toast.loading("Please wait...");

    try {
        await resendVerifyEmailNotification();

        toast.success("Email verification notification resent successfully!", { id: toastId });
    } catch (error: any) {
        const message = error.response?.data?.errors || error.response?.data?.message || "Something went wrong!";
        toast.error(message, { id: toastId });
    }
}