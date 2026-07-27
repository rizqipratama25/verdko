import type { ReactNode } from "react";

interface Props {
    title: string;
    description: string;
    children?: ReactNode;
}

const PageHeader = ({ title, description, children }: Props) => {
    return (
        <>
            <div className="mb-6 flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
                    <p className="text-sm text-text-secondary">{description}</p>
                </div>
                {children}
            </div>
        </>
    )
}

export default PageHeader