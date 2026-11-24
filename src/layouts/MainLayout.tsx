import { Outlet } from "react-router-dom";
import ArrowIcon from "../shared/icons/ArrowIcon/ArrowIcon";
import MenuTab from "../shared/MenuTab/MenuTab";
import { NAV_ITEMS } from "./navItems";
import {useMenuToggle} from "../shared/hooks/useMenuToggle.ts";

export default function MainLayout() {
    const { isOpen, toggle } = useMenuToggle();

    return (
        <div className="flex">
            <nav
                className={`bg-bg-secondary rounded-[10px] pt-[49px] flex flex-col items-center h-screen transition-[width] duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "w-[200px]" : "w-[100px]"
                }`}
            >
                <button
                    type="button"
                    onClick={toggle}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                    className="flex items-center justify-center"
                >
                    <ArrowIcon
                        className={`text-bg-icon transition-transform duration-500 ease-in-out cursor-pointer ${
                            isOpen ? "rotate-180" : "rotate-0"
                        }`}
                    />
                </button>

                <div className="w-full mt-[40px] flex flex-col gap-[20px]">
                    {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
                        <MenuTab
                            key={to}
                            to={to}
                            end={end}
                            isCollapsed={!isOpen}
                        >
                            <Icon className="shrink-0" />
                            {isOpen && (
                                <span className="text-[22px] font-text whitespace-nowrap">
                                    {label}
                                </span>
                            )}
                        </MenuTab>
                    ))}
                </div>
            </nav>
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}