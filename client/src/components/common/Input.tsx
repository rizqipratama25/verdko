import type { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface Props {
    name: string;
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
    placeholder: string;
    type: HTMLInputTypeAttribute;
    required?: boolean;
}

const Input = ({ name, value, onChange, placeholder, type, required = false }: Props) => {
    return (
        <>
            <input
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className="w-full bg-background-primary border border-secondary/50 focus:border-primary/70 focus:ring-1 focus:ring-primary/70 outline-none rounded-lg p-2 transition-all duration-300"
                type={type}
            />
        </>
    )
}

export default Input