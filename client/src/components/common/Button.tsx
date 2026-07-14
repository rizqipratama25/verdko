import type { MouseEventHandler, ReactNode } from "react";

interface Props {
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    children: ReactNode;
}

const Button = ({ disabled, onClick, className = "", children }: Props) => {
    return (
        <>
            <button
                type="submit"
                disabled={disabled}
                onClick={onClick}
                className={`${onClick ? "" : "w-full"} ${className} bg-primary hover:bg-primary-hover disabled:bg-primary/60 rounded-lg font-medium font-geist text-white cursor-pointer`}
            >
                {children}
            </button>
        </>
    )
}

export default Button