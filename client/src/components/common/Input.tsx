import type { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode } from "react";

interface Props {
    name: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder: string;
    type: HTMLInputTypeAttribute;
    label: string;
    disabled?: boolean;
    children?: ReactNode;
    required?: boolean;
    danger?: boolean;
}

const Input = ({ name, value, disabled, onChange, placeholder, type, label, children, required = false, danger = false }: Props) => {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
                <label className="font-geist font-medium text-text-secondary" htmlFor={name}>{label}</label>
                {children}
            </div>
            <input
                name={name}
                id={name}
                value={value}
                disabled={disabled}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`w-full bg-background-primary border border-secondary/50 ${danger ? "focus:border-danger/70 focus:ring-1 focus:ring-danger/70" : "focus:border-primary/70 focus:ring-1 focus:ring-primary/70"} outline-none rounded-lg p-2 transition-all duration-300`}
                type={type}
            />
        </div>
    )
}

export default Input