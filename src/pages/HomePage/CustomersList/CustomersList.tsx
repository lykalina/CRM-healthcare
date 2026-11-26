import type {CustomerListItem} from "../../../services/customerApi.ts";
import Button from "../../../shared/components/Button/Button.tsx";

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
        return <p className="mt-[30px] pl-[20px]">Loading...</p>;
    }

    if (isError) {
        return (
            <div className="mt-[30px] pl-[20px]">
                <p>Failed to load customers</p>
                <Button
                    title='Retry'
                    onClick={onRetry}
                />
            </div>
        );
    }

    if (isEmpty) {
        return <p className="mt-[30px] pl-[20px]">No customers</p>;
    }

    return (
        <div className="mt-[50px] grid grid-cols-1 gap-[20px]">
            {customers.map((customer) => (
                <div
                    key={customer.id}
                    className="bg-bg-card rounded-[10px] p-[20px] flex justify-between items-center"
                >
                    <span className="text-[20px] font-semibold text-text-primary">
                        {customer.name}
                    </span>
                    <Button
                        title='Show information'
                        onClick={() => onShow(customer.id)}
                    />
                </div>
            ))}
        </div>
    );
}