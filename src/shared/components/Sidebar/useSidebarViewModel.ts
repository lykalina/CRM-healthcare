import { useState, useEffect, useRef } from 'react';
import {useGetCurrentUserQuery} from "../../../services/userApi.ts";

type PopoverType = 'profile' | 'settings' | 'help' | null;

export function useSidebarViewModel() {
    const { data: user, isLoading, isError } = useGetCurrentUserQuery();
    const [activePopover, setActivePopover] = useState<PopoverType>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!activePopover) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setActivePopover(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activePopover]);

    const togglePopover = (type: Exclude<PopoverType, null>) => {
        setActivePopover((prev) => (prev === type ? null : type));
    };

    return {
        user,
        isLoading,
        isError,
        activePopover,
        togglePopover,
        closePopover: () => setActivePopover(null),
        containerRef,
    };
}