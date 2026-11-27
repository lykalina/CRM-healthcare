import SmallArrowIcon from '../../icons/SmallArrowIcon/SmallArrowIcon';

interface ButtonProps {
    title: string;
    icon?: boolean;
    onClick?: () => void;
    className?: string;
}

export default function Button({ title, icon, onClick, className = '' }: ButtonProps) {
    return (
        <button
            type="button"
            className={`bg-bg-secondary font-bold text-bg-card text-[13px] sm:text-[16px] lg:text-[20px] px-[10px] py-[6px] lg:p-[10px] rounded-[8px] lg:rounded-[10px] cursor-pointer flex items-center gap-[6px] ${className}`}
            onClick={onClick}
        >
            {title}
            {icon && <SmallArrowIcon />}
        </button>
    );
}