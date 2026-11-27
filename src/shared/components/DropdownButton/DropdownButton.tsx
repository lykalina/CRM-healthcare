import SmallArrowIcon from '../../icons/SmallArrowIcon/SmallArrowIcon';
import { useDropdownButtonViewModel } from './useDropdownButtonViewModel';

type ButtonVariant = 'primary' | 'secondary';

export interface DropdownItem {
    id: string;
    label: string;
    onClick?: () => void;
}

interface DropdownButtonProps {
    title: string;
    items: DropdownItem[];
    variant?: ButtonVariant;
    className?: string;
    disabled?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'text-font-accent',
    secondary: 'bg-bg-secondary text-bg-card',
};

export default function DropdownButton({
                                           title,
                                           items,
                                           variant = 'primary',
                                           className = '',
                                           disabled = false,
                                       }: DropdownButtonProps) {
    const { isOpen, containerRef, toggle, handleItemClick } =
        useDropdownButtonViewModel();

    return (
        <div ref={containerRef} className={`relative inline-block ${className}`}>
            <button
                type="button"
                onClick={toggle}
                disabled={disabled}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                className={`flex items-center justify-center gap-[8px] p-[10px] rounded-[10px] font-semibold text-[16px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${variantClasses[variant]}`}
            >
                <span>{title}</span>
                <SmallArrowIcon
                    className={`shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                />
            </button>

            {isOpen && (
                <div
                    role="menu"
                    className="absolute top-full left-0 mt-[6px] min-w-full bg-bg-card rounded-[10px] shadow-lg p-[6px] z-50"
                >
                    {items.length > 0 ? (
                        <ul>
                            {items.map((item) => (
                                <li key={item.id} role="none">
                                    <button
                                        type="button"
                                        role="menuitem"
                                        onClick={() => handleItemClick(item)}
                                        className="w-full text-left px-[12px] py-[8px] rounded-[6px] text-[15px] text-text-primary hover:bg-bg-primary cursor-pointer whitespace-nowrap"
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="px-[12px] py-[8px] text-[14px] text-font-primary whitespace-nowrap">
                            Here should be {title.toLowerCase()}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}