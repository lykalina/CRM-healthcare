import Tabs, { type TabItem } from "../../shared/components/Tabs/Tabs.tsx";
import { useState } from "react";
import InfoCard, { type InfoCardProps, type InfoCardRow } from "../../shared/components/InfoCard/InfoCard.tsx";
import Section from "../../shared/components/Section/Section.tsx";

const initialTabs: TabItem[] = [
    { title: 'Home', id: 'home', selected: false },
    { title: 'Customers', id: 'customers', selected: false },
    { title: 'Customer information', id: 'information', selected: true },
];

const sectionTabs: TabItem[] = [
    {
        title: 'Contacts details',
        id: 'contact',
        selected: false
    },
    {
        title: 'Order placed',
        id: 'order',
        selected: true
    },
    {
        title: 'Tickets',
        id: 'tickets',
        selected: false
    },
    {
        title: 'Pending payments',
        id: 'pending',
        selected: false
    },
    {
        title: 'Meeting history',
        id: 'history',
        selected: false
    },
    {
        title: 'Call recordings',
        id: 'recordings',
        selected: false
    },
    {
        title: 'Feedback',
        id: 'feedback',
        selected: false
    },
    {
        title: 'Survey',
        id: 'survey',
        selected: false
    }
]

export default function HomePage() {
    const [tabs, setTabs] = useState<TabItem[]>(initialTabs);

    const [infoCard, setInfoCard] = useState<InfoCardProps>({
        title: 'Customer information',
        rows: [
            { id: 'name', title: 'Name', value: 'Palma Pvt Ltd' },
            { id: 'address', title: 'Address', value: '548 Orn Isle, West Marline, NV 14898-4576' },
        ],
    });

    const handleSaveRows = (updatedRows: InfoCardRow[]) => {
        setInfoCard((prev) => ({ ...prev, rows: updatedRows }));
    };

    const handleSelectTab = (id: string) => {
        setTabs((prev) =>
            prev.map((tab) => ({
                ...tab,
                selected: tab.id === id,
            }))
        );
    };

    const activeTab = tabs.find((tab) => tab.selected);

    return (
        <div className="font-text overscroll-x-none">
            <header className="flex h-[84px]">
                <div>
                    <h1 className="font-title text-[34px] text-font-accent font-semibold">
                        {activeTab?.title}
                    </h1>
                    {activeTab?.id === 'information' && (
                        <p className="text-[18px] text-font-primary mt-[20px]">
                            Customer ID: <span>76</span>
                        </p>
                    )}
                </div>
                <div></div>
            </header>
            <main className="mt-[50px]">
                <Tabs tabs={tabs} onSelect={handleSelectTab} />
                {activeTab?.id === 'information' && (
                    <>
                        <div className="mt-[50px] mb-[118px] grid grid-cols-1 lg:grid-cols-2 gap-[50px]">
                            <InfoCard
                                infoCard={infoCard}
                                onSave={handleSaveRows}
                            />
                            <InfoCard
                                infoCard={infoCard}
                                onSave={handleSaveRows}
                            />
                        </div>
                        <Section
                            title="Description"
                            tabs={sectionTabs}
                            info={[
                                {
                                    tab: 'contacts',
                                    data: [],
                                    columns: []
                                },
                                {
                                    tab: 'order',
                                    columns: [
                                        { key: 'createDate', title: 'Create date', placeholder: 'Enter date', type: 'date' },
                                        { key: 'product', title: 'Product', placeholder: 'Enter name', type: 'text' },
                                        { key: 'quantity', title: 'Quantity', placeholder: '0', type: 'number' },
                                        { key: 'productAmount', title: 'Product amount', placeholder: '0', type: 'number' },
                                        { key: 'totalPaid', title: 'Total paid', placeholder: '0', type: 'number' },
                                        { key: 'pendingAmount', title: 'Pending amount', placeholder: '0', type: 'number' },
                                        {
                                            key: 'orderStatus',
                                            title: 'Order status',
                                            placeholder: 'Status',
                                            type: 'select',
                                            options: ['Shipping', 'Pending', 'Delivered', 'Cancelled'],
                                        },
                                    ],
                                    data: [
                                        {
                                            id: 'row-1',
                                            values: {
                                                createDate: '01 Jun, 2023',
                                                product: 'Pain relieve ointment',
                                                quantity: '10',
                                                productAmount: '12,000',
                                                totalPaid: '18,000',
                                                pendingAmount: '4000',
                                                orderStatus: 'Shipping',
                                            },
                                        },
                                    ],
                                },
                                {
                                    tab: 'tickets',
                                    data: [],
                                    columns: []
                                },
                                {
                                    tab: 'pending',
                                    data: [],
                                    columns: []
                                },
                                {
                                    tab: 'history',
                                    data: [],
                                    columns: []
                                },
                                {
                                    tab: 'recordings',
                                    data: [],
                                    columns: []
                                },
                                {
                                    tab: 'feedback',
                                    data: [],
                                    columns: []
                                },
                                {
                                    tab: 'survey',
                                    data: [],
                                    columns: []
                                },
                            ]}
                        />
                    </>
                )}
            </main>
        </div>
    );
}