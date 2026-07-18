import type { ComponentType } from "react";

interface Props {
  icon: ComponentType<{ size?: number }>;
  title: string;
  message: string;
}

const VerifyEmailStatusCard = ({icon: Icon, title, message}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background-primary">
      <div className="flex flex-col items-center bg-surface w-2xl shadow-lg rounded-lg gap-6 py-8 px-16">
        <div className="w-fit flex items-center justify-center text-primary-hover bg-primary-soft p-3 rounded-full">
          <Icon size={28} />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="font-geist font-bold text-2xl">{title}</h1>
          <span className="font-inter font-light text-md text-text-secondary text-center">{message}</span>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmailStatusCard