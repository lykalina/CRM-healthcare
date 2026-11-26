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
        <div className="border-b border-bg-border overflow-x-auto overflow-hidden scrollbar-hide">
            <div className="flex text-font-tabs text-[13px] sm:text-[16px] lg:text-[22px] min-w-max">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        className={`whitespace-nowrap px-[10px] sm:px-[14px] lg:px-[20px] pt-[8px] lg:pt-[10px] pb-[8px] lg:pb-[10px] border-b translate-y-[1px] transition-colors ${
                            tab.selected
                                ? 'border-b-bg-primary border-t border-l border-r border-bg-border rounded-t-lg'
                                : 'border-bg-border cursor-pointer text-text-secondary hover:text-text-primary'
                        }`}
                        onClick={() => onSelect(tab.id)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>
        </div>
    );
}