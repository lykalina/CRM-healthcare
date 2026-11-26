import { useState } from 'react';

interface UseSelectedCustomerViewModelOptions {
    onNavigateToInformation: () => void;
}

export function useSelectedCustomerViewModel({
                                                 onNavigateToInformation,
                                             }: UseSelectedCustomerViewModelOptions) {
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

    const handleShowCustomer = (id: number) => {
        setSelectedCustomerId(String(id));
        onNavigateToInformation();
    };

    return {
        selectedCustomerId,
        handleShowCustomer,
    };
}