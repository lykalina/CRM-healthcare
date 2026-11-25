import SmallArrowIcon from "../../icons/SmallArrowIcon/SmallArrowIcon.tsx";

interface ButtonProps {
    title: string;
    icon?: boolean;
    onClick?: () => void;
}

export default function Button({ title, icon, onClick }: ButtonProps) {
    return (
        <button
            className="bg-bg-secondary font-bold text-bg-card text-[20px] p-[10px] rounded-[10px] cursor-pointer"
            onClick={onClick}
        >
            {title}
            {icon && <SmallArrowIcon />}
        </button>
    )
}