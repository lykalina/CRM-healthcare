import { useState } from 'react';
import type { TabItem } from '../../shared/components/Tabs/Tabs';

const initialTabs: TabItem[] = [
    { title: 'Home', id: 'home', selected: false },
    { title: 'Customers', id: 'customers', selected: true },
    { title: 'Customer information', id: 'information', selected: false },
];

export function useHomeTabsViewModel() {
    const [tabs, setTabs] = useState<TabItem[]>(initialTabs);

    const handleSelectTab = (id: string) => {
        setTabs((prev) =>
            prev.map((tab) => ({ ...tab, selected: tab.id === id }))
        );
    };

    const activeTab = tabs.find((tab) => tab.selected);

    return {
        tabs,
        activeTab,
        handleSelectTab,
    };
}