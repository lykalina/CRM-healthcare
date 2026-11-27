import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

interface MenuTabProps {
    to: string;
    end?: boolean;
    isCollapsed?: boolean;
    compact?: boolean;
    children: ReactNode;
    onClick?: () => void;
}

const baseClasses = "relative flex gap-[8px] items-center transition-colors scrollbar-hide";
const activeClasses = "bg-bg-active text-font-secondary";
const inactiveClasses = "bg-transparent text-font-secondary hover:bg-font-secondary/10";

export default function MenuTab({
                                    to,
                                    end = false,
                                    isCollapsed = false,
                                    compact = false,
                                    children,
                                    onClick,
                                }: MenuTabProps) {
    const layoutClasses = compact
        ? "h-[48px] px-[10px] rounded-[8px] justify-center"
        : isCollapsed
            ? "h-[58px] w-full justify-center"
            : "h-[58px] w-full pl-[25px] pr-[25px]";

    return (
        <NavLink
            to={to}
            end={end}
            onClick={onClick}
            className={({ isActive }) =>
                `${baseClasses} ${layoutClasses} ${
                    isActive ? activeClasses : inactiveClasses
                }`
            }
        >
            {({ isActive }) => (
                <>
                    {isActive && !compact && (
                        <span
                            aria-hidden="true"
                            className="absolute left-0 top-1/2 h-full w-[4.55px] -translate-y-1/2 bg-border-active"
                        />
                    )}
                    {isActive && compact && (
                        <span
                            aria-hidden="true"
                            className="absolute left-1/2 bottom-0 h-[3px] w-[60%] -translate-x-1/2 bg-border-active rounded-full"
                        />
                    )}
                    {children}
                </>
            )}
        </NavLink>
    );
}