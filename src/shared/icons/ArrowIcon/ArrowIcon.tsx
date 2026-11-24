interface ArrowIconProps {
    size?: number;
    className?: string;
}

export default function ArrowIcon({
                                      size = 40,
                                      className = '',
                                  }: ArrowIconProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-hidden="true"
        >
            <circle cx="20" cy="20" r="20" fill="currentColor" />
            <path
                d="M16.2852 9.99992L26.5694 20.2841L16.2852 30.5684"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}