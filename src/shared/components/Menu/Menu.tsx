import ArrowIcon from '../../icons/ArrowIcon/ArrowIcon';
import MenuTab from '../MenuTab/MenuTab';
import {NAV_ITEMS} from "../../../layouts/navItems.ts";
import IconButton from "../IconButton/IconButton.tsx";

interface MenuProps {
    isOpen: boolean;
    onToggle: () => void;
}

export default function Menu({ isOpen, onToggle }: MenuProps) {
    return (
        <>
            <nav className="lg:hidden bg-bg-secondary px-[8px] py-[8px] overflow-x-auto overflow-y-hidden fixed top-0 left-0 right-0 z-30">
                <div className="flex items-center gap-[4px] w-max">
                    {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
                        <MenuTab
                            key={to}
                            to={to}
                            end={end}
                            isCollapsed={false}
                            compact
                        >
                            <Icon className="shrink-0" />
                            <span className="text-[12px] font-text whitespace-nowrap">
                                {label}
                            </span>
                        </MenuTab>
                    ))}
                </div>
            </nav>

            <nav
                className={`hidden lg:flex bg-bg-secondary rounded-[10px] pt-[49px] flex-col items-center h-screen transition-[width] duration-300 ease-in-out overflow-hidden fixed top-0 left-0 z-20 ${
                    isOpen ? 'w-[200px]' : 'w-[100px]'
                }`}
            >
                <IconButton
                    onClick={onToggle}
                    ariaLabel={isOpen ? 'Close menu' : 'Open menu'}
                    ariaExpanded={isOpen}
                    iconClassName={`text-bg-icon transition-transform duration-500 ease-in-out ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                >
                    <ArrowIcon />
                </IconButton>

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
        </>
    );
}