import { Outlet } from "react-router-dom";
import { saveUser } from "../utils/authStorage.utils";
import Modal from "../components/common/Modal";
import { Send } from "lucide-react";
import Button from "../components/common/Button";
import { useEffect } from "react";
import { useMe } from "../hooks/auth/useMe";

const TelegramRoute = () => {
  const { data: me, isSuccess, isLoading } = useMe();

  useEffect(() => {
    if (isSuccess && me) {
      saveUser(me);
    }
  }, [me, isSuccess]);

  const currentUser = me;

  const handleTelegramConnect = () => {
    window.open("https://t.me/verdko_bot?start=signup", "_blank");
  };

  if (isLoading && !currentUser) {
    return null;
  }

  return (
    <>
      {!currentUser?.telegram_id && (
        <Modal>
          <div className="flex flex-col items-center gap-6">
            <div className="w-fit flex items-center justify-center text-primary-hover bg-primary-soft p-3 rounded-full">
              <Send size={28} />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="font-geist font-bold text-2xl">
                Connect Telegram To Complete Setup
              </h1>
              <span className="font-inter font-light text-md text-text-secondary text-center">
                Verdko sends competitor price alerts through Telegram. Connect your
                account to start receiving real-time notifications.
              </span>
            </div>
            <Button className="text-lg px-4 py-2" onClick={handleTelegramConnect}>
              Connect Your Telegram
            </Button>
            <span className="font-inter font-light text-sm text-text-secondary text-center">
              You'll only need to do this once.
            </span>
          </div>
        </Modal>
      )}

      <Outlet />
    </>
  );
};

export default TelegramRoute;