import { useState } from "react";

interface UseMenuToggleResult {
    isOpen: boolean;
    toggle: () => void;
    open: () => void;
    close: () => void;
}

export function useMenuToggle(initial = false): UseMenuToggleResult {
    const [isOpen, setIsOpen] = useState(initial);

    return {
        isOpen,
        toggle: () => setIsOpen((v) => !v),
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
    };
}