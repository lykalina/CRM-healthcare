import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

interface MenuTabProps {
    to: string;
    end?: boolean;
    isCollapsed?: boolean;
    children: ReactNode;
    onClick?: () => void;
}

const baseClasses = "relative flex h-[58px] w-full gap-[8px] items-center transition-colors";
const activeClasses = "bg-bg-active text-font-secondary";
const inactiveClasses = "bg-transparent text-font-secondary hover:bg-font-secondary/10";

export default function MenuTab({
                                    to,
                                    end = false,
                                    isCollapsed = false,
                                    children,
                                    onClick,
                                }: MenuTabProps) {

    const layoutClasses = isCollapsed
        ? "justify-center"
        : "pl-[25px] pr-[25px]";

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
                    {isActive && (
                        <span
                            aria-hidden="true"
                            className="absolute left-0 top-1/2 h-full w-[4.55px] -translate-y-1/2 bg-border-active"
                        />
                    )}
                    {children}
                </>
            )}
        </NavLink>
    );
}