import type { ComponentType } from "react";

interface Props {
    icon: ComponentType<{ size?: number }>;
    title: string
    description: string
}

const ProblemsFeaturesCard = ({ icon, title, description }: Props) => {
    const Icon = icon;

    return (
        <div className="w-full flex flex-col gap-4 p-4 rounded-xl border border-border-primary">
            <div className="w-fit flex items-center justify-center text-primary-hover bg-primary-soft p-3 rounded-lg">
                <Icon size={24} />
            </div>
            <div className="flex flex-col">
                <span className="font-geist font-medium text-xl">{title}</span>
                <span className="font-inter font-light text-md text-text-secondary">{description}</span>
            </div>
        </div>
    )
}

export default ProblemsFeaturesCard