import React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    /** Состояние загрузки */
    loading?: boolean;
    /** Текст кнопки */
    children: React.ReactNode;
    state?: boolean;
    className?: string;
    onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
    children,
    className,
    onClick,
    ...props
}) => {
    return (
        <button className="submit-btn"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;