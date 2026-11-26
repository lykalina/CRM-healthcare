import type { CustomerListItem } from '../../../services/customerApi';
import Button from '../../../shared/components/Button/Button';

interface CustomersListProps {
    customers: CustomerListItem[];
    isLoading: boolean;
    isError: boolean;
    isEmpty: boolean;
    onRetry: () => void;
    onShow: (id: number) => void;
}

export default function CustomersList({
                                          customers,
                                          isLoading,
                                          isError,
                                          isEmpty,
                                          onRetry,
                                          onShow,
                                      }: CustomersListProps) {
    if (isLoading) {
        return <p className="mt-[24px] lg:mt-[30px]">Loading...</p>;
    }

    if (isError) {
        return (
            <div className="mt-[24px] lg:mt-[30px]">
                <p>Failed to load customers</p>
                <Button title="Retry" onClick={onRetry} className="mt-[10px]" />
            </div>
        );
    }

    if (isEmpty) {
        return <p className="mt-[24px] lg:mt-[30px]">No customers</p>;
    }

    return (
        <div className="mt-[24px] lg:mt-[50px] flex flex-col gap-[12px] lg:gap-[20px]">
            {customers.map((customer) => (
                <div
                    key={customer.id}
                    className="bg-bg-card rounded-[10px] p-[14px] lg:p-[20px] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-[10px] sm:gap-[20px] w-full"
                >
                    <span className="text-[16px] lg:text-[20px] font-semibold text-text-primary break-words min-w-0">
                        {customer.name}
                    </span>
                    <Button
                        title="Show information"
                        onClick={() => onShow(customer.id)}
                        className="self-start sm:self-auto shrink-0"
                    />
                </div>
            ))}
        </div>
    );
}