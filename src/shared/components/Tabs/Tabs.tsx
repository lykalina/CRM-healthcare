export interface TabItem {
    title: string;
    id: string;
    selected: boolean;
}

export interface TabsProps {
    tabs: TabItem[];
    onSelect: (id: string) => void;
}

export default function Tabs({ tabs = [], onSelect }: TabsProps) {
    return (
        <div className="flex text-font-tabs text-[22px] border-b border-bg-border">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`pt-[10px] pb-[10px] pl-[20px] pr-[20px] border-b -mb-[1px] ${
                        tab.selected
                            ? 'border-b-bg-primary border-t border-l border-r border-bg-border rounded-t-lg'
                            : 'border-bg-border cursor-pointer'
                    }`}
                    onClick={() => onSelect(tab.id)}
                >
                    {tab.title}
                </button>
            ))}
        </div>
    )
}