interface AvatarButtonProps {
    src?: string;
    alt: string;
    isOnline?: boolean;
    isLoading?: boolean;
    isError?: boolean;
    onClick?: () => void;
    size?: 'sm' | 'md';
    className?: string;
    onlineLabel?: string;
}

const sizeMap = {
    sm: { img: 'w-[36px] h-[36px] lg:w-[48px] lg:h-[48px]', dot: 'w-[10px] h-[10px] lg:w-[12px] lg:h-[12px]' },
    md: { img: 'w-[48px] h-[48px]', dot: 'w-[12px] h-[12px]' },
};

export default function AvatarButton({
                                         src,
                                         alt,
                                         isOnline = false,
                                         isLoading = false,
                                         isError = false,
                                         onClick,
                                         size = 'sm',
                                         className = '',
                                         onlineLabel = 'Online',
                                     }: AvatarButtonProps) {
    const sizes = sizeMap[size];
    const showPlaceholder = isLoading || isError || !src;

    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={alt}
            className={`relative block rounded-full cursor-pointer ${className}`}
        >
            {showPlaceholder ? (
                <div className={`${sizes.img} rounded-full bg-bg-border`} />
            ) : (
                <img
                    src={src}
                    alt={alt}
                    className={`${sizes.img} rounded-full object-cover`}
                />
            )}

            {isOnline && (
                <span
                    aria-label={onlineLabel}
                    className={`absolute top-0 right-0 ${sizes.dot} rounded-full bg-red-700`}
                />
            )}
        </button>
    );
}