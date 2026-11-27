import { useEffect, useRef, useState } from 'react';
import type { DropdownItem } from './DropdownButton';

export function useDropdownButtonViewModel() {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const toggle = () => setIsOpen((v) => !v);

    const handleItemClick = (item: DropdownItem) => {
        item.onClick?.();
        setIsOpen(false);
    };

    return {
        isOpen,
        containerRef,
        toggle,
        handleItemClick,
    };
}