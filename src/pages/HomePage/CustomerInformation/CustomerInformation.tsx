import { useCustomerInformationViewModel } from './useCustomerInformationViewModel';
import InfoCard from '../../../shared/components/InfoCard/InfoCard';
import Section from '../../../shared/components/Section/Section';

interface CustomerInformationProps {
    customerId: string;
}

export default function CustomerInformation({ customerId }: CustomerInformationProps) {
    const customer = useCustomerInformationViewModel(customerId);

    if (customer.isLoading) {
        return <p className="mt-[50px] pl-[20px]">Loading...</p>;
    }

    if (customer.isError) {
        return (
            <div className="mt-[50px] pl-[20px]">
                <p>Failed to load customer</p>
                <button
                    type="button"
                    onClick={customer.refetch}
                    className="mt-[10px] text-font-accent underline"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (!customer.information || !customer.master || !customer.description) {
        return <p className="mt-[50px] pl-[20px]">No information</p>;
    }

    return (
        <>
            <div className="mt-[50px] mb-[118px] grid grid-cols-1 lg:grid-cols-2 gap-[50px]">
                <InfoCard infoCard={customer.information} onSave={customer.handleSaveInformation} />
                <InfoCard infoCard={customer.master} onSave={customer.handleSaveMaster} />
            </div>

            <Section
                title={customer.description.title}
                tabs={customer.description.tabs}
                info={customer.description.info}
                customerId={customerId}
            />
        </>
    );
}