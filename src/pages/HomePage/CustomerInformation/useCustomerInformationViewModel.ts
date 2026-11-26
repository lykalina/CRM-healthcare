import { useState, useEffect } from 'react';
import type { InfoCardProps, InfoCardRow } from '../../../shared/components/InfoCard/InfoCard';
import { useGetCustomerQuery } from '../../../services/customerApi';

const STORAGE_PREFIX = 'crm-customer';

function getStorageKey(customerId: string, block: 'information' | 'master') {
    return `${STORAGE_PREFIX}-${customerId}-${block}`;
}

function readFromStorage(customerId: string, block: 'information' | 'master'): InfoCardRow[] | null {
    try {
        const raw = localStorage.getItem(getStorageKey(customerId, block));
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : null;
    } catch {
        return null;
    }
}

function writeToStorage(customerId: string, block: 'information' | 'master', rows: InfoCardRow[]) {
    localStorage.setItem(getStorageKey(customerId, block), JSON.stringify(rows));
}

function applyLocalOverrides(card: InfoCardProps | undefined, overrides: InfoCardRow[] | null): InfoCardProps | undefined {
    if (!card) return card;
    if (!overrides) return card;
    return { ...card, rows: overrides };
}

export function useCustomerInformationViewModel(customerId: string) {
    const { data, isLoading, isError, refetch } = useGetCustomerQuery(customerId);

    const [information, setInformation] = useState<InfoCardProps | undefined>(undefined);
    const [master, setMaster] = useState<InfoCardProps | undefined>(undefined);

    useEffect(() => {
        if (!data) return;

        const infoOverrides = readFromStorage(customerId, 'information');
        const masterOverrides = readFromStorage(customerId, 'master');

        setInformation(applyLocalOverrides(data.information, infoOverrides));
        setMaster(applyLocalOverrides(data.master, masterOverrides));
    }, [data, customerId]);

    const handleSaveInformation = (rows: InfoCardRow[]) => {
        setInformation((prev) => (prev ? { ...prev, rows } : prev));
        writeToStorage(customerId, 'information', rows);
    };

    const handleSaveMaster = (rows: InfoCardRow[]) => {
        setMaster((prev) => (prev ? { ...prev, rows } : prev));
        writeToStorage(customerId, 'master', rows);
    };

    return {
        customerId,
        information,
        master,
        description: data?.description,
        isLoading,
        isError,
        refetch,
        handleSaveInformation,
        handleSaveMaster,
    };
}