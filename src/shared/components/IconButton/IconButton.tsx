import type { ReactNode } from 'react';

interface IconButtonProps {
    children: ReactNode;
    onClick?: () => void;
    ariaLabel: string;
    ariaExpanded?: boolean;
    className?: string;
    iconClassName?: string;
    disabled?: boolean;
    type?: 'button' | 'submit';
}

export default function IconButton({
                                       children,
                                       onClick,
                                       ariaLabel,
                                       ariaExpanded,
                                       className = '',
                                       iconClassName = '',
                                       disabled = false,
                                       type = 'button',
                                   }: IconButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            aria-label={ariaLabel}
            aria-expanded={ariaExpanded}
            disabled={disabled}
            className={`flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            <span className={iconClassName}>{children}</span>
        </button>
    );
}