import type { ComponentType } from "react";

interface Props {
    index: number;
    icon: ComponentType<{ size?: number }>;
    title: string
    description: string
}

const HowItWorksCard = ({ index, icon: Icon, title, description }: Props) => {
    return (
        <div className="relative w-full h-full flex flex-col items-center rounded-xl">
            <span className="absolute -top-4 flex justify-center items-center font-geist font-semibold text-sm text-primary bg-surface-muted border border-border-primary py-0.5 px-4 rounded-full">0{index}</span>
            <div className="w-full h-full flex flex-col items-center gap-2 px-4 py-6 bg-surface rounded-xl shadow">
                <div className="w-fit flex items-center justify-center text-surface bg-success p-3 rounded-full">
                    <Icon size={24} />
                </div>
                <div className="flex flex-col items-center text-center">
                    <span className="font-geist font-medium text-xl">{title}</span>
                    <span className="font-inter font-light text-md text-text-secondary">{description}</span>
                </div>
            </div>
        </div>
    )
}

export default HowItWorksCard