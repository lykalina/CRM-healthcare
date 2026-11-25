interface SmallArrowIconProps {
    size?: number;
    className?: string;
}

export default function SmallArrowIcon({
                                             size = 11,
                                             className = '',
                                         }: SmallArrowIconProps) {
    return (
        <svg
            width={size}
            height={size * (6 / 11)}
            viewBox="0 0 11 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <path
                d="M5.19617 5.25L1.38104e-05 -2.51245e-08L10.3923 8.834e-07L5.19617 5.25Z"
                fill="currentColor"
            />
        </svg>
    );
}