import { useSidebarViewModel } from './useSidebarViewModel';
import SettingsIcon from "../../icons/SettingsIcon/SettingsIcon";
import HelpIcon from "../../icons/HelpIcon/HelpIcon";
import IconButton from "../IconButton/IconButton.tsx";
import AvatarButton from "../AvatarButton/AvatarButton.tsx";

export default function Sidebar() {
    const {
        user,
        isLoading,
        isError,
        activePopover,
        togglePopover,
        containerRef,
    } = useSidebarViewModel();

    return (
        <aside
            ref={containerRef}
            className="bg-bg-primary shadow-[-4px_0_12px_rgba(0,0,0,0.25)] rounded-t-[10px] lg:rounded-none lg:rounded-l-[10px]
               flex lg:flex-col items-center justify-around lg:justify-start lg:gap-[24px]
               px-[16px] py-[12px] lg:px-0 lg:pt-[49px]
               w-full lg:w-[100px] h-auto lg:h-screen
               fixed bottom-0 left-0 right-0 lg:top-0 lg:right-0 lg:bottom-auto lg:left-auto
               z-30"
        >
            <div className="relative">
                <AvatarButton
                    src={user?.avatarUrl}
                    alt={user ? `${user.firstName} ${user.lastName}` : 'Profile'}
                    isOnline={user?.isOnline}
                    isLoading={isLoading}
                    isError={isError}
                    onClick={() => togglePopover('profile')}
                />

                {activePopover === 'profile' && user && (
                    <div className="absolute right-0 bottom-full lg:bottom-auto lg:top-0 lg:right-full lg:mr-[12px] mb-[8px] lg:mb-0 bg-bg-card rounded-[10px] shadow-lg p-[12px] min-w-[180px] z-40">
                        <p className="text-[15px] font-semibold text-text-primary whitespace-nowrap">
                            {user.firstName} {user.lastName}
                        </p>
                        <p className="text-[13px] text-text-secondary mt-[2px]">
                            {user.isOnline ? 'Online' : 'Offline'}
                        </p>
                    </div>
                )}
            </div>

            <div className="relative lg:mt-[69px]">
                <IconButton
                    onClick={() => togglePopover('settings')}
                    ariaLabel="Настройки"
                >
                    <SettingsIcon className="text-bg-icon w-[24px] h-[26px] lg:w-[29px] lg:h-[31px]" />
                </IconButton>

                {activePopover === 'settings' && (
                    <div className="absolute right-0 bottom-full lg:bottom-auto lg:top-0 lg:right-full lg:mr-[12px] mb-[8px] lg:mb-0 bg-bg-card rounded-[10px] shadow-lg p-[12px] min-w-[180px] z-40">
                        <p className="text-[14px] text-text-primary">here should be settings</p>
                    </div>
                )}
            </div>

            <div className="relative lg:mt-[39px]">
                <IconButton
                    onClick={() => togglePopover('help')}
                    ariaLabel="Help"
                >
                    <HelpIcon className="text-bg-icon w-[24px] h-[24px] lg:w-[29px] lg:h-[29px]" />
                </IconButton>

                {activePopover === 'help' && (
                    <div className="absolute right-0 bottom-full lg:bottom-auto lg:top-0 lg:right-full lg:mr-[12px] mb-[8px] lg:mb-0 bg-bg-card rounded-[10px] shadow-lg p-[12px] min-w-[180px] z-40">
                        <p className="text-[14px] text-text-primary">here should be help</p>
                    </div>
                )}
            </div>
        </aside>
    );
}