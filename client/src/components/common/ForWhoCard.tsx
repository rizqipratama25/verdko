import type { ComponentType } from "react";

interface Props {
    icon: ComponentType<{ size?: number }>;
    title: string
    description: string
}

const ForWhoCard = ({ icon: Icon, title, description }: Props) => {
    return (
        <div className="relative w-full h-full flex flex-col items-center rounded-xl bg-surface shadow px-4 py-6 overflow-hidden">
            <div className="flex flex-col z-10">
                <span className="font-geist font-medium text-xl">{title}</span>
                <span className="font-inter font-light text-md text-text-secondary">{description}</span>
            </div>
            <div className="absolute -bottom-4 -right-4 text-surface-muted">
                <Icon size={120} />
            </div>
        </div>
    )
}

export default ForWhoCard