import Tabs, { type TabItem } from "../../shared/components/Tabs/Tabs.tsx";
import { useState } from "react";
import InfoCard, { type InfoCardProps, type InfoCardRow } from "../../shared/components/InfoCard/InfoCard.tsx";

const initialTabs: TabItem[] = [
    { title: 'Home', id: 'home', selected: false },
    { title: 'Customers', id: 'customers', selected: false },
    { title: 'Customer information', id: 'information', selected: true },
];

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
        <div className="font-text">
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
                <div className="mt-[50px]">
                    <InfoCard
                        infoCard={infoCard}
                        onSave={handleSaveRows}
                    />
                </div>
            </main>
        </div>
    );
}