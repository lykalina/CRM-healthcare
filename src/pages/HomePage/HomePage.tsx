import Tabs from '../../shared/components/Tabs/Tabs';
import { useCustomersListViewModel } from './CustomersList/useCustomersListViewModel';
import CustomersList from './CustomersList/CustomersList';
import CustomerInformation from './CustomerInformation/CustomerInformation';
import { useHomeTabsViewModel } from './useHomeTabsViewModel';
import { useSelectedCustomerViewModel } from './useSelectedCustomerViewModel';

export default function HomePage() {
    const { tabs, activeTab, handleSelectTab } = useHomeTabsViewModel();

    const { selectedCustomerId, handleShowCustomer } = useSelectedCustomerViewModel({
        onNavigateToInformation: () => handleSelectTab('information'),
    });

    const {
        customers,
        isLoading: isCustomersLoading,
        isError: isCustomersError,
        isEmpty: isCustomersEmpty,
        refetch: refetchCustomers,
    } = useCustomersListViewModel();

    return (
        <div className="font-text overscroll-x-none min-h-screen pb-[28px] pt-[60px] lg:pt-[50px]">
            <header className="pt-[16px] lg:pt-0 lg:h-[84px]">
                <h1 className="font-title text-[22px] sm:text-[26px] lg:text-[34px] text-font-accent font-semibold">
                    {activeTab?.title}
                </h1>

                {selectedCustomerId && activeTab?.id === 'information' && (
                    <p className="text-[14px] lg:text-[18px] text-font-primary mt-[8px] lg:mt-[20px]">
                        Customer ID: <span>{selectedCustomerId}</span>
                    </p>
                )}
            </header>

            <main className="mt-[24px] lg:mt-[50px]">
                <Tabs tabs={tabs} onSelect={handleSelectTab} />

                {activeTab?.id === 'home' && (
                    <p className="mt-[14px] lg:mt-[50px]">No information</p>
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
                    <p className="mt-[24px] lg:mt-[50px] lg:pl-[20px]">
                        Select a customer to view details
                    </p>
                )}
            </main>
        </div>
    );
}