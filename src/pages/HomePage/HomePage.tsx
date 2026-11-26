import { useState } from 'react';
import Tabs, { type TabItem } from '../../shared/components/Tabs/Tabs';
import { useCustomersListViewModel } from './CustomersList/useCustomersListViewModel';
import CustomersList from './CustomersList/CustomersList';
import CustomerInformation from './CustomerInformation/CustomerInformation';
import {useGetCustomerQuery} from "../../services/customerApi.ts";

const initialTabs: TabItem[] = [
    { title: 'Home', id: 'home', selected: false },
    { title: 'Customers', id: 'customers', selected: true },
    { title: 'Customer information', id: 'information', selected: false },
];

export default function HomePage() {
    const [tabs, setTabs] = useState<TabItem[]>(initialTabs);
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

    const {
        customers,
        isLoading: isCustomersLoading,
        isError: isCustomersError,
        isEmpty: isCustomersEmpty,
        refetch: refetchCustomers,
    } = useCustomersListViewModel();

    const handleSelectTab = (id: string) => {
        setTabs((prev) =>
            prev.map((tab) => ({
                ...tab,
                selected: tab.id === id,
            }))
        );
    };

    const handleShowCustomer = (id: number) => {
        setSelectedCustomerId(String(id));
        handleSelectTab('information');
    };

    const activeTab = tabs.find((tab) => tab.selected);

    return (
        <div className="font-text overscroll-x-none min-h-screen">
            <header className="h-[84px]">
                <h1 className="font-title text-[34px] text-font-accent font-semibold">
                    {activeTab?.title}
                </h1>

                {selectedCustomerId && activeTab?.id === 'information' && (
                    <p className="text-[18px] text-font-primary mt-[20px]">
                        Customer ID: <span>{selectedCustomerId}</span>
                    </p>
                )}
            </header>

            <main className="mt-[50px]">
                <Tabs tabs={tabs} onSelect={handleSelectTab} />

                {activeTab?.id === 'home' && (
                    <p className="mt-[50px]">No information</p>
                )}

                {activeTab?.id === 'customers' && (
                    <CustomersList
                        customers={customers}
                        isLoading={isCustomersLoading}
                        isError={isCustomersError}
                        isEmpty={isCustomersEmpty}
                        onRetry={refetchCustomers}
                        onShow={handleShowCustomer}
                    />
                )}

                {activeTab?.id === 'information' && selectedCustomerId && (
                    <CustomerInformation customerId={selectedCustomerId} />
                )}

                {activeTab?.id === 'information' && !selectedCustomerId && (
                    <p className="mt-[50px] pl-[20px]">Select a customer to view details</p>
                )}
            </main>
        </div>
    );
}